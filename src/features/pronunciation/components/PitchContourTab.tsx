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
  const standardCanvasRef = useRef<HTMLCanvasElement>(null);
  const userCanvasRef = useRef<HTMLCanvasElement>(null);
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

  // 표준 피치 캔버스 그리기
  useEffect(() => {
    if (!standardCanvasRef.current || !standardPitchData) return;

    console.log("🟢 표준 피치 캔버스 그리기 시작");
    const canvas = standardCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawPitchChart(ctx, canvas, standardPitchData, "#4CAF50", "표준 발음");
  }, [standardPitchData]);

  // 사용자 피치 캔버스 그리기
  useEffect(() => {
    if (!userCanvasRef.current || !userPitchData) return;

    console.log("🟠 사용자 피치 캔버스 그리기 시작");
    const canvas = userCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawPitchChart(ctx, canvas, userPitchData, "#FF9800", "내 발음");
  }, [userPitchData]);

  // 피치 차트 그리기 공통 함수 (점으로만 표시)
  const drawPitchChart = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    pitchData: PitchData,
    color: string,
    label: string
  ) => {
    console.log(`🎨 ${label} 차트 그리기 시작`);

    // 캔버스 크기 설정
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // 배경 그리기
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);

    // 유효한 피치만 추출
    const validPitches = pitchData.frequencies.filter(
      (f) => f !== null
    ) as number[];

    console.log(`📊 ${label} 데이터:`, {
      validPitches: validPitches.length,
      totalPitches: pitchData.frequencies.length,
      averagePitch: pitchData.averagePitch,
      minPitch: Math.min(...validPitches),
      maxPitch: Math.max(...validPitches),
      sampleFreqs: pitchData.frequencies.slice(0, 5),
    });

    if (validPitches.length === 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`${label} 데이터 없음`, width / 2, height / 2);
      return;
    }

    const originalMinPitch = Math.min(...validPitches);
    const originalMaxPitch = Math.max(...validPitches);
    const originalRange = originalMaxPitch - originalMinPitch || 100;

    // Y축 범위를 더 넓게 설정 (위아래로 20% 여백 추가)
    const rangePadding = originalRange * 0.2;
    const minPitch = originalMinPitch - rangePadding;
    const maxPitch = originalMaxPitch + rangePadding;
    const pitchRange = maxPitch - minPitch;

    console.log(`📊 ${label} 피치 범위:`, {
      originalMinPitch,
      originalMaxPitch,
      originalRange,
      minPitch: minPitch.toFixed(1),
      maxPitch: maxPitch.toFixed(1),
      pitchRange: pitchRange.toFixed(1),
    });

    // 격자 그리기
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;

    // 수평선 (주파수)
    for (let i = 0; i <= 4; i++) {
      const freq = minPitch + (pitchRange / 4) * i;
      const y = height - (i / 4) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      // 주파수 레이블
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "12px Arial";
      ctx.textAlign = "left";
      ctx.fillText(`${Math.round(freq)}Hz`, 5, y - 5);
    }

    // 수직선 (시간)
    const maxTime = pitchData.timestamps[pitchData.timestamps.length - 1] || 1;
    for (let i = 0; i <= 4; i++) {
      const x = (width / 4) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();

      // 시간 레이블
      const time = (maxTime / 4) * i;
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`${time.toFixed(1)}s`, x, height - 5);
    }

    // Y값이 변할 때만 점 그리기 (선으로 연결하지 않음)
    ctx.fillStyle = color;
    const dotRadius = 4; // 점의 크기

    let drawnPoints = 0;
    let lastY: number | null = null;
    const minYChange = 2; // 최소 2픽셀 변화가 있어야 점 추가

    console.log(`🎯 ${label} Y값 변화 감지 시작 (최소 변화: ${minYChange}px)`);

    pitchData.frequencies.forEach((pitch, i) => {
      if (pitch === null) return;

      const x = (pitchData.timestamps[i] / maxTime) * width;
      const y = height - ((pitch - minPitch) / pitchRange) * height;

      // 첫 번째 점이거나 Y값에 충분한 변화가 있을 때만 그리기
      const shouldDraw = lastY === null || Math.abs(y - lastY) >= minYChange;

      if (shouldDraw) {
        if (drawnPoints < 5) {
          console.log(
            `${label} 변화점 ${drawnPoints}: pitch=${pitch.toFixed(
              1
            )}Hz, y=${y.toFixed(1)}px, 변화=${
              lastY ? Math.abs(y - lastY).toFixed(1) : "첫점"
            }px`
          );
        }

        // 원형 점 그리기
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
        ctx.fill();

        lastY = y;
        drawnPoints++;
      }
    });

    console.log(`✅ ${label} 점 그리기 완료: ${drawnPoints}개 점`);

    // 제목
    ctx.fillStyle = color;
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, width / 2, 25);
  };

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

      <div className={styles.chartsContainer}>
        {/* 표준 발음 차트 */}
        <div className={styles.chartContainer}>
          <canvas
            ref={standardCanvasRef}
            className={styles.pitchCanvas}
            width={600}
            height={250}
          />
        </div>

        {/* 내 발음 차트 */}
        <div className={styles.chartContainer}>
          <canvas
            ref={userCanvasRef}
            className={styles.pitchCanvas}
            width={600}
            height={250}
          />
        </div>
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
