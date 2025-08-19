// src/features/pronunciation/components/PitchContourTab.tsx
import React, { useRef, useEffect, useState } from "react";
import Pitchfinder from "pitchfinder";
import { usePronunciationStore } from "@/store/pronunciationStore";
import * as styles from "./ResultsStage.css.ts";

interface PitchData {
  frequencies: (number | null)[];
  timestamps: number[];
  averagePitch: number;
  pitchRange: { min: number; max: number };
}

export function PitchContourTab() {
  const { recordedAudioBlob, currentContext } = usePronunciationStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [standardPitchData, setStandardPitchData] = useState<PitchData | null>(
    null
  );
  const [userPitchData, setUserPitchData] = useState<PitchData | null>(null);
  const [similarity, setSimilarity] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 오디오 데이터를 피치 데이터로 변환
  const extractPitchData = async (
    audioBuffer: AudioBuffer
  ): Promise<PitchData> => {
    const sampleRate = audioBuffer.sampleRate;
    const audioData = audioBuffer.getChannelData(0); // 모노 채널 사용

    // YIN 알고리즘으로 피치 추출 (올바른 설정)
    const detectPitch = Pitchfinder.YIN({
      sampleRate: sampleRate,
      probabilityThreshold: 0.1, // 확률 임계값 (올바른 속성명)
    });

    const chunkSize = 1024; // 청크 크기 (약 23ms at 44.1kHz)
    const hopSize = 512; // 오버랩 크기
    const frequencies: (number | null)[] = [];
    const timestamps: number[] = [];

    // 청크 단위로 피치 추출
    for (let i = 0; i < audioData.length - chunkSize; i += hopSize) {
      const chunk = audioData.slice(i, i + chunkSize);
      const pitch = detectPitch(chunk);

      // null 대신 0으로 변환하여 일관성 유지
      frequencies.push(pitch || null);
      timestamps.push(i / sampleRate); // 시간 (초)
    }

    console.log("🎵 피치 추출 완료:", {
      totalChunks: frequencies.length,
      validPitches: frequencies.filter((f) => f !== null).length,
      sampleFrequencies: frequencies.slice(0, 10), // 처음 10개 샘플
    });

    // 유효한 피치 값들로 통계 계산
    const validPitches = frequencies.filter((f) => f !== null) as number[];
    const averagePitch =
      validPitches.length > 0
        ? validPitches.reduce((sum, f) => sum + f, 0) / validPitches.length
        : 0;

    const pitchRange =
      validPitches.length > 0
        ? {
            min: Math.min(...validPitches),
            max: Math.max(...validPitches),
          }
        : { min: 0, max: 0 };

    return {
      frequencies,
      timestamps,
      averagePitch,
      pitchRange,
    };
  };

  // 오디오 파일을 AudioBuffer로 디코딩
  const decodeAudioFile = async (
    source: string | Blob
  ): Promise<AudioBuffer> => {
    const audioContext = new AudioContext();

    let arrayBuffer: ArrayBuffer;

    if (source instanceof Blob) {
      arrayBuffer = await source.arrayBuffer();
    } else {
      const response = await fetch(source);
      arrayBuffer = await response.arrayBuffer();
    }

    return await audioContext.decodeAudioData(arrayBuffer);
  };

  // 피치 유사도 계산
  const calculateSimilarity = (
    standard: PitchData,
    user: PitchData
  ): number => {
    const minLength = Math.min(
      standard.frequencies.length,
      user.frequencies.length
    );
    let validComparisons = 0;
    let totalDifference = 0;

    for (let i = 0; i < minLength; i++) {
      const standardPitch = standard.frequencies[i];
      const userPitch = user.frequencies[i];

      if (standardPitch !== null && userPitch !== null) {
        const difference = Math.abs(standardPitch - userPitch) / standardPitch;
        totalDifference += difference;
        validComparisons++;
      }
    }

    if (validComparisons === 0) return 0;

    const averageDifference = totalDifference / validComparisons;
    return Math.max(0, Math.min(100, (1 - averageDifference) * 100)); // 0-100% 범위
  };

  // 피치 분석 실행
  useEffect(() => {
    const analyzePitch = async () => {
      console.log("🎵 PitchContourTab 분석 시작");
      console.log("📊 currentContext:", currentContext);
      console.log("🎤 recordedAudioBlob:", recordedAudioBlob);

      // 표준 오디오 URL 결정 (audioReference 우선)
      const audioUrl =
        currentContext?.audioReference ||
        "/src/assets/audio/references/Default.wav";

      console.log("🎯 사용할 오디오 URL:", audioUrl);

      if (!audioUrl || !recordedAudioBlob) {
        console.warn("❌ 필수 데이터 누락");
        console.log("  - audioUrl:", !!audioUrl);
        console.log(
          "  - currentContext?.audioReference:",
          !!currentContext?.audioReference
        );
        console.log("  - recordedAudioBlob:", !!recordedAudioBlob);
        return;
      }

      setIsAnalyzing(true);

      try {
        console.log("🚀 오디오 디코딩 시작...");
        // 표준 음성과 녹음된 음성 모두 분석
        const [standardBuffer, userBuffer] = await Promise.all([
          decodeAudioFile(audioUrl),
          decodeAudioFile(recordedAudioBlob),
        ]);

        console.log("✅ 오디오 디코딩 완료");
        console.log("📊 표준 음성:", {
          duration: standardBuffer.duration,
          sampleRate: standardBuffer.sampleRate,
          channels: standardBuffer.numberOfChannels,
        });
        console.log("🎤 사용자 음성:", {
          duration: userBuffer.duration,
          sampleRate: userBuffer.sampleRate,
          channels: userBuffer.numberOfChannels,
        });

        console.log("🔬 피치 데이터 추출 시작...");
        const [standardData, userData] = await Promise.all([
          extractPitchData(standardBuffer),
          extractPitchData(userBuffer),
        ]);

        console.log("✅ 피치 분석 완료:");
        console.log("📊 표준:", {
          validPitches: standardData.frequencies.filter((f) => f !== null)
            .length,
          averagePitch: standardData.averagePitch,
        });
        console.log("🎤 사용자:", {
          validPitches: userData.frequencies.filter((f) => f !== null).length,
          averagePitch: userData.averagePitch,
        });

        setStandardPitchData(standardData);
        setUserPitchData(userData);

        // 유사도 계산
        const similarityScore = calculateSimilarity(standardData, userData);
        console.log("📊 유사도:", similarityScore);
        setSimilarity(similarityScore);
      } catch (error) {
        console.error("❌ 피치 분석 오류:", error);
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzePitch();
  }, [currentContext, recordedAudioBlob]);

  // 캔버스에 피치 곡선 그리기
  useEffect(() => {
    console.log("🎨 캔버스 그리기 시작");
    console.log("  - canvasRef.current:", !!canvasRef.current);
    console.log("  - standardPitchData:", !!standardPitchData);
    console.log("  - userPitchData:", !!userPitchData);

    if (!canvasRef.current || !standardPitchData || !userPitchData) {
      console.warn("❌ 캔버스 그리기 조건 미충족");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("❌ Canvas context 가져오기 실패");
      return;
    }

    console.log("🎨 캔버스 그리기 진행");
    console.log("📊 표준 피치 데이터:", {
      validPitches: standardPitchData.frequencies.filter((f) => f !== null)
        .length,
      totalPitches: standardPitchData.frequencies.length,
      averagePitch: standardPitchData.averagePitch,
      sampleFreqs: standardPitchData.frequencies.slice(0, 5),
    });
    console.log("🎤 사용자 피치 데이터:", {
      validPitches: userPitchData.frequencies.filter((f) => f !== null).length,
      totalPitches: userPitchData.frequencies.length,
      averagePitch: userPitchData.averagePitch,
      sampleFreqs: userPitchData.frequencies.slice(0, 5),
    });

    // 캔버스 크기 설정
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // 배경 그리기
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    // 격자 그리기
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;

    // 수평선 (주파수)
    const freqLines = [100, 150, 200, 250, 300];
    freqLines.forEach((freq) => {
      const y = height - ((freq - 50) / 300) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      // 레이블
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "12px Arial";
      ctx.fillText(`${freq}Hz`, 5, y - 5);
    });

    // 수직선 (시간)
    const maxTime = Math.max(
      standardPitchData.timestamps[standardPitchData.timestamps.length - 1] ||
        0,
      userPitchData.timestamps[userPitchData.timestamps.length - 1] || 0
    );

    for (let i = 0; i <= 4; i++) {
      const x = (width / 4) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();

      // 시간 레이블
      const time = (maxTime / 4) * i;
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillText(`${time.toFixed(1)}s`, x + 5, height - 10);
    }

    // 피치 곡선 그리기 함수
    const drawPitchCurve = (
      pitchData: PitchData,
      color: string,
      lineStyle: number[] = []
    ) => {
      console.log(`🎨 ${color} 곡선 그리기:`, {
        validPitches: pitchData.frequencies.filter((f) => f !== null).length,
        maxTime,
        width,
        height,
      });

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.setLineDash(lineStyle);
      ctx.beginPath();

      let firstPoint = true;
      let drawnPoints = 0;

      pitchData.frequencies.forEach((pitch, i) => {
        if (pitch === null) return;

        const x = (pitchData.timestamps[i] / maxTime) * width;
        const y = height - ((pitch - 50) / 300) * height;

        console.log(`점 ${drawnPoints}: pitch=${pitch}, x=${x}, y=${y}`);

        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
        drawnPoints++;
      });

      console.log(`✅ ${color} 곡선 완료: ${drawnPoints}개 점 그림`);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // 표준 피치 곡선 (실선)
    console.log("🟢 표준 피치 곡선 그리기 시작");
    drawPitchCurve(standardPitchData, "#4CAF50");

    // 사용자 피치 곡선 (점선)
    console.log("🟠 사용자 피치 곡선 그리기 시작");
    drawPitchCurve(userPitchData, "#FF9800", [5, 5]);

    console.log("✅ 모든 곡선 그리기 완료");

    // 범례
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(width - 120, 20, 15, 3);
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "14px Arial";
    ctx.fillText("표준", width - 100, 28);

    ctx.fillStyle = "#FF9800";
    ctx.fillRect(width - 120, 40, 15, 3);
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText("사용자", width - 100, 48);
  }, [standardPitchData, userPitchData]);

  if (isAnalyzing) {
    return (
      <div className={styles.pitchContainer}>
        <div className={styles.analyzingMessage}>
          <div className={styles.loadingSpinner}>🔄</div>
          <p>피치 데이터를 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pitchContainer}>
      <div className={styles.pitchHeader}>
        <h3 className={styles.sectionTitle}>📈 Pitch Contour (음정 변화)</h3>
        <div className={styles.pitchInfo}>
          음성의 기본 주파수 변화를 시간에 따라 표시합니다
        </div>
      </div>

      <div className={styles.chartContainer}>
        <canvas
          ref={canvasRef}
          className={styles.pitchCanvas}
          width={600}
          height={300}
        />
      </div>

      <div className={styles.pitchAnalysis}>
        <div className={styles.analysisItem}>
          <span className={styles.analysisLabel}>평균 피치 (표준):</span>
          <span className={styles.analysisValue}>
            {standardPitchData?.averagePitch.toFixed(1) || 0}Hz
          </span>
        </div>
        <div className={styles.analysisItem}>
          <span className={styles.analysisLabel}>평균 피치 (사용자):</span>
          <span className={styles.analysisValue}>
            {userPitchData?.averagePitch.toFixed(1) || 0}Hz
          </span>
        </div>
        <div className={styles.analysisItem}>
          <span className={styles.analysisLabel}>피치 범위:</span>
          <span className={styles.analysisValue}>
            {userPitchData?.pitchRange.min.toFixed(1) || 0}-
            {userPitchData?.pitchRange.max.toFixed(1) || 0}Hz
          </span>
        </div>
        <div className={styles.analysisItem}>
          <span className={styles.analysisLabel}>유사도:</span>
          <span
            className={styles.analysisValue}
            style={{
              color:
                similarity > 70
                  ? "#4CAF50"
                  : similarity > 50
                  ? "#FF9800"
                  : "#F44336",
            }}
          >
            {similarity.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
