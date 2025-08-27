// src/features/pronunciation/components/PitchContourTab.tsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import Pitchfinder from "pitchfinder";
import { useWavesurfer } from "@wavesurfer/react";

import { usePronunciationStore } from "@/store/pronunciationStore";
import * as styles from "./ResultsStage.css.ts";

interface PitchData {
  frequencies: (number | null)[];
  baseFrequency: number;
  averagePitch: number;
  pitchRange: { min: number; max: number };
}

export function PitchContourTab() {
  // 각 오디오 데이터
  const { recordedAudioBlob, currentContext } = usePronunciationStore();
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);

  const refContainerRef = useRef<HTMLDivElement>(null);
  const userContainerRef = useRef<HTMLDivElement>(null);

  const refCanvasRef = useRef<HTMLCanvasElement>(null);
  const userCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [pitchInfo, setPitchInfo] = useState<{
    refPitchData: PitchData;
    userPitchData: PitchData;
    similarity: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  //  audioReference WaveSurfer 초기화 - sampleRate 낮춤
  const {
    wavesurfer: refWavesurfer,
    isPlaying: isRefPlaying,
    currentTime: refCurrentTime,
  } = useWavesurfer({
    container: refContainerRef,
    height: 200,
    waveColor: "rgba(255, 200, 220, 1)",
    progressColor: "rgba(200, 255, 220, 1)",
    cursorColor: "#ddd5e9",
    cursorWidth: 2,
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
    normalize: true,
    minPxPerSec: 50,
    fillParent: true,
    autoCenter: true,
    interact: true,
    dragToSeek: true,
    hideScrollbar: false,
    audioRate: 1,
    autoplay: false,
    url:
      currentContext?.audioReference ||
      "/src/assets/audio/references/Default.wav",
    sampleRate: 11025, // 낮은 샘플레이트 설정
  });

  // recordedAudioBlob WaveSurfer 초기화 - sampleRate 낮춤
  const {
    wavesurfer: userWavesurfer,
    isPlaying: isUserPlaying,
    currentTime: userCurrentTime,
  } = useWavesurfer({
    container: userContainerRef,
    height: 200,
    waveColor: "#7db496",
    progressColor: "#383351",
    cursorColor: "#ddd5e9",
    cursorWidth: 2,
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
    normalize: true,
    minPxPerSec: 50,
    fillParent: true,
    autoCenter: true,
    interact: true,
    dragToSeek: true,
    hideScrollbar: false,
    audioRate: 1,
    autoplay: false,
    url: userAudioUrl || "/src/assets/audio/references/Default.wav",
    sampleRate: 11025, // 낮은 샘플레이트 설정
  });

  useEffect(() => {
    if (!recordedAudioBlob) {
      console.log("no recordedAudioBlob", recordedAudioBlob);
      setError("오디오 데이터를 로드할 수 없습니다.");
      return;
    }
    if (!currentContext) {
      console.log("no currentContext", currentContext);
      setError("오디오 데이터를 로드할 수 없습니다.");
      return;
    }

    // 표준 음성 로드
    if (recordedAudioBlob) {
      // Blob URL 생성
      const blobUrl = URL.createObjectURL(recordedAudioBlob);
      setUserAudioUrl(blobUrl);

      // 클린업 함수로 메모리 해제
      return () => {
        URL.revokeObjectURL(blobUrl);
      };
    }
  }, [currentContext, recordedAudioBlob]);

  // 시간 포맷팅
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  // 음정 분석 함수 - 표준 발음과 사용자 발음 모두 분석
  const analyzePitch = useCallback(async () => {
    console.log("analyzePitch");
    if (!refWavesurfer || !userWavesurfer) {
      console.error("WaveSurfer not initialized");
      setError("WaveSurfer가 초기화되지 않았습니다");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      console.log("Starting pitch analysis for both audios...");

      // 표준 발음 분석
      const refAudioBuffer = refWavesurfer.getDecodedData();
      const userAudioBuffer = userWavesurfer.getDecodedData();

      if (!refAudioBuffer || !userAudioBuffer) {
        console.error("No audio buffer available");
        setError("오디오 데이터를 로드할 수 없습니다.");
        setIsAnalyzing(false);
        return;
      }

      // 표준 발음 분석
      const refPeaks = refAudioBuffer.getChannelData(0);
      const refSampleRate = refAudioBuffer.sampleRate || 11025;
      const refAlgo = "AMDF";
      const refDetectPitch = Pitchfinder[refAlgo]({
        sampleRate: refSampleRate,
      });
      const refDuration = refPeaks.length / refSampleRate;
      const refBpm = refPeaks.length / refDuration / 60;
      const refFrequencies = Pitchfinder.frequencies(refDetectPitch, refPeaks, {
        tempo: refBpm,
        quantization: refBpm,
      });

      // 사용자 발음 분석
      const userPeaks = userAudioBuffer.getChannelData(0);
      const userSampleRate = userAudioBuffer.sampleRate || 11025;
      const userAlgo = "AMDF";
      const userDetectPitch = Pitchfinder[userAlgo]({
        sampleRate: userSampleRate,
      });
      const userDuration = userPeaks.length / userSampleRate;
      const userBpm = userPeaks.length / userDuration / 60;
      const userFrequencies = Pitchfinder.frequencies(
        userDetectPitch,
        userPeaks,
        {
          tempo: userBpm,
          quantization: userBpm,
        }
      );

      console.log("Ref frequencies:", refFrequencies.length);
      console.log("User frequencies:", userFrequencies.length);

      // 표준 발음 피치 데이터 계산
      const refValidFrequencies = refFrequencies.filter(
        (f) => f !== null && f > 0
      );
      const refFrequencyMap: { [key: number]: number } = {};
      let refMaxAmount = 0;
      let refBaseFrequency = 0;

      refFrequencies.forEach((frequency) => {
        if (!frequency) return;
        const tolerance = 10;
        const rounded = Math.round(frequency * tolerance) / tolerance;

        if (!refFrequencyMap[rounded]) refFrequencyMap[rounded] = 0;
        refFrequencyMap[rounded] += 1;

        if (refFrequencyMap[rounded] > refMaxAmount) {
          refMaxAmount = refFrequencyMap[rounded];
          refBaseFrequency = rounded;
        }
      });

      // 사용자 발음 피치 데이터 계산
      const userValidFrequencies = userFrequencies.filter(
        (f) => f !== null && f > 0
      );
      const userFrequencyMap: { [key: number]: number } = {};
      let userMaxAmount = 0;
      let userBaseFrequency = 0;

      userFrequencies.forEach((frequency) => {
        if (!frequency) return;
        const tolerance = 10;
        const rounded = Math.round(frequency * tolerance) / tolerance;

        if (!userFrequencyMap[rounded]) userFrequencyMap[rounded] = 0;
        userFrequencyMap[rounded] += 1;

        if (userFrequencyMap[rounded] > userMaxAmount) {
          userMaxAmount = userFrequencyMap[rounded];
          userBaseFrequency = rounded;
        }
      });

      if (
        refValidFrequencies.length === 0 ||
        userValidFrequencies.length === 0
      ) {
        console.warn("No valid frequencies detected");
        setError("음정을 감지할 수 없습니다.");
        setIsAnalyzing(false);
        return;
      }

      const refPitchData: PitchData = {
        frequencies: refFrequencies,
        baseFrequency: refBaseFrequency,
        averagePitch:
          refValidFrequencies.reduce((a, b) => a + b, 0) /
          refValidFrequencies.length,
        pitchRange: {
          min: Math.min(...refValidFrequencies),
          max: Math.max(...refValidFrequencies),
        },
      };

      const userPitchData: PitchData = {
        frequencies: userFrequencies,
        baseFrequency: userBaseFrequency,
        averagePitch:
          userValidFrequencies.reduce((a, b) => a + b, 0) /
          userValidFrequencies.length,
        pitchRange: {
          min: Math.min(...userValidFrequencies),
          max: Math.max(...userValidFrequencies),
        },
      };

      console.log("Ref pitch data:", refPitchData);
      console.log("User pitch data:", userPitchData);

      // 유사도 계산 (간단한 평균 피치 비교)
      const pitchDifference = Math.abs(
        refPitchData.averagePitch - userPitchData.averagePitch
      );
      const maxPitch = Math.max(
        refPitchData.averagePitch,
        userPitchData.averagePitch
      );
      const similarity = Math.max(0, 100 - (pitchDifference / maxPitch) * 100);

      setPitchInfo({ refPitchData, userPitchData, similarity });

      // 음정 그래프 그리기
      drawPitchContour(refFrequencies, refBaseFrequency, refCanvasRef);
      drawPitchContour(userFrequencies, userBaseFrequency, userCanvasRef);
    } catch (error) {
      console.error("Pitch analysis error:", error);
      setError(
        `음정 분석 오류: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    } finally {
      setIsAnalyzing(false);
    }
  }, [refWavesurfer, userWavesurfer]);

  // 음정 그래프 그리기 - WaveSurfer 예제와 동일한 스타일
  const drawPitchContour = (
    frequencies: number[],
    baseFrequency: number,
    CanvasRef: React.RefObject<HTMLCanvasElement | null>
  ) => {
    console.log("drawPitchContour", frequencies, baseFrequency, CanvasRef);
    const canvas = CanvasRef.current;
    if (!canvas) {
      console.error("Canvas ref not found");
      return;
    }

    const wrapper = canvas.parentElement;
    if (!wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Cannot get canvas context");
      return;
    }

    // 캔버스 크기 설정
    canvas.width = frequencies.length;
    canvas.height = 200;
    canvas.style.width = "100%";
    canvas.style.height = "200px";

    const pitchUpColor = "#385587";
    const pitchDownColor = "#C26351";
    const height = canvas.height;

    // 배경 클리어
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 각 주파수를 점으로 그리기
    const pointSize = 3;
    let prevY = 0;

    frequencies.forEach((frequency: number, index: number) => {
      if (!frequency) return;

      // Y 위치 계산 (주파수를 높이로 변환)
      const y = Math.round(height - (frequency / (baseFrequency * 2)) * height);

      // 색상 결정 (음정 상승/하강)
      ctx.fillStyle = y > prevY ? pitchDownColor : pitchUpColor;

      // 점 그리기
      ctx.fillRect(index, y, pointSize, pointSize);

      prevY = y;
    });

    console.log("Pitch contour drawn successfully");
  };

  // WaveSurfer 이벤트 리스너
  useEffect(() => {
    if (!refWavesurfer) {
      console.log("no refWavesurfer", refWavesurfer);
      return;
    }
    if (!userWavesurfer) {
      console.log("no userWavesurfer", userWavesurfer);
      return;
    }
    const handleReady = () => {
      console.log("WaveSurfer ready");
      analyzePitch();
    };

    const handleDecode = () => {
      console.log("Audio decoded");
      analyzePitch();
    };

    const refUnsubscribeReady = refWavesurfer.on("ready", handleReady);
    const refUnsubscribeDecode = refWavesurfer.on("decode", handleDecode);
    const userUnsubscribeReady = userWavesurfer.on("ready", handleReady);
    const userUnsubscribeDecode = userWavesurfer.on("decode", handleDecode);

    return () => {
      refUnsubscribeReady();
      refUnsubscribeDecode();
      userUnsubscribeReady();
      userUnsubscribeDecode();
    };
  }, [refWavesurfer, userWavesurfer, analyzePitch]);

  const refDuration = refWavesurfer ? refWavesurfer.getDuration() : 0;
  const userDuration = userWavesurfer ? userWavesurfer.getDuration() : 0;

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
        {/* <div className={styles.chartContainer}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100px',
              backgroundColor: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <canvas
              ref={refCanvasRef}
              className={styles.pitchCanvas}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </div>
          <p style={{ textAlign: 'center', marginTop: '8px', color: '#4CAF50' }}>
            표준 발음
          </p>
        </div> */}

        {/* Waveform Display */}
        <div
          className="waveform-container"
          style={{
            position: "relative",
            width: "100%",
            height: "calc(200px + 2rem)",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            padding: "1rem 0",
          }}
        >
          <div ref={refContainerRef} className="waveform" />
          <canvas
            ref={refCanvasRef}
            className="pitch-canvas"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10,
            }}
          />
        </div>

        {/* Pitch Contour Display */}

        {/* 내 발음 차트 */}
        {/* <div className={styles.chartContainer}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100px',
              backgroundColor: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <canvas
              ref={userCanvasRef}
              className={styles.pitchCanvas}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </div>
          <p style={{ textAlign: 'center', marginTop: '8px', color: '#FF9800' }}>
            내 발음
          </p>
        </div> */}

        <div className="waveform-container">
          <div
            ref={userContainerRef}
            className="waveform"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
      </div>

      <div className={styles.chartsContainer}>
        <div className={styles.chartContainer}>
          <p>🎼 내 발음 Pitch Contour</p>
        </div>

        <div
          className="waveform-container"
          style={{
            position: "relative",
            width: "100%",
            height: "calc(200px + 2rem)",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            padding: "1rem 0",
          }}
        >
          <div ref={userContainerRef} className="waveform" />
          <canvas
            ref={userCanvasRef}
            className="pitch-canvas"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10,
            }}
          />
        </div>
        {error && (
          <div
            style={{
              color: "#ff6b6b",
              padding: "10px",
              marginTop: "10px",
              background: "rgba(255, 107, 107, 0.1)",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          >
            ⚠️ {error}
          </div>
        )}
        {pitchInfo && (
          <div className="pitch-info">
            <span>
              Base:{" "}
              {Math.round(Math.round(pitchInfo.userPitchData.baseFrequency))}Hz
            </span>
            <span>
              Avg:{" "}
              {Math.round(Math.round(pitchInfo.userPitchData.averagePitch))}Hz
            </span>
            <span>
              Range:{" "}
              {Math.round(Math.round(pitchInfo.userPitchData.pitchRange.min))}-
              {Math.round(Math.round(pitchInfo.userPitchData.pitchRange.max))}Hz
            </span>
          </div>
        )}
      </div>

      <div className={styles.pitchAnalysis}>
        <div className={styles.analysisItem}>
          <span className={styles.analysisLabel}>평균 피치 (표준):</span>
          <span className={styles.analysisValue}>
            {pitchInfo?.refPitchData.averagePitch.toFixed(1) || 0}Hz
          </span>
        </div>
        <div className={styles.analysisItem}>
          <span className={styles.analysisLabel}>평균 피치 (사용자):</span>
          <span className={styles.analysisValue}>
            {pitchInfo?.userPitchData.averagePitch.toFixed(1) || 0}Hz
          </span>
        </div>
        <div className={styles.analysisItem}>
          <span className={styles.analysisLabel}>피치 범위:</span>
          <span className={styles.analysisValue}>
            {pitchInfo?.userPitchData.pitchRange.min.toFixed(1) || 0}-
            {pitchInfo?.userPitchData.pitchRange.max.toFixed(1) || 0}Hz
          </span>
        </div>
        <div className={styles.analysisItem}>
          <span className={styles.analysisLabel}>유사도:</span>
          <span
            className={styles.analysisValue}
            style={{
              color:
                pitchInfo && pitchInfo.similarity > 70
                  ? "#4CAF50"
                  : pitchInfo && pitchInfo.similarity > 50
                  ? "#FF9800"
                  : "#F44336",
            }}
          >
            {pitchInfo?.similarity.toFixed(1) || 0}%
          </span>
        </div>
      </div>
    </div>
  );
}
