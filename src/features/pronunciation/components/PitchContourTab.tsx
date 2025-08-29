// src/features/pronunciation/components/PitchContourTab.tsx
import React, { useRef, useEffect, useState } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useScoreStore } from "@/store/scoreStore";
import * as styles from "./ResultsStage.css.ts";

interface PitchData {
  frequencies: (number | null)[];
  baseFrequency: number;
  averagePitch: number;
  pitchRange: { min: number; max: number };
}

export function PitchContourTab() {
  const { recordedAudioBlob, currentContext } = usePronunciationStore();
  const { pitchAnalysis } = useScoreStore(); // scoreStore에서 분석된 데이터 가져오기
  
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);

  const refContainerRef = useRef<HTMLDivElement>(null);
  const userContainerRef = useRef<HTMLDivElement>(null);

  const refCanvasRef = useRef<HTMLCanvasElement>(null);
  const userCanvasRef = useRef<HTMLCanvasElement>(null);

  // WaveSurfer 설정 - 표준 발음
  const {
    wavesurfer: refWavesurfer,
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
    url: currentContext?.audioReference || "/src/assets/audio/references/Default.wav",
    sampleRate: 11025,
  });

  // WaveSurfer 설정 - 사용자 발음
  const {
    wavesurfer: userWavesurfer,
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
    sampleRate: 11025,
  });

  // 사용자 오디오 URL 설정
  useEffect(() => {
    if (recordedAudioBlob) {
      const blobUrl = URL.createObjectURL(recordedAudioBlob);
      setUserAudioUrl(blobUrl);
      return () => {
        URL.revokeObjectURL(blobUrl);
      };
    }
  }, [recordedAudioBlob]);

  // 피치 콘투어 그리기 함수 (기존과 동일)
  const drawPitchContour = (
    frequencies: (number | null)[],
    baseFrequency: number,
    canvasRef: React.RefObject<HTMLCanvasElement | null>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas ref not found");
      return;
    }

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

    frequencies.forEach((frequency, index) => {
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

  // pitchAnalysis 데이터로 그래프 그리기
  useEffect(() => {
    if (!pitchAnalysis || !refWavesurfer || !userWavesurfer) return;

    const { refFrequencies, userFrequencies, refBaseFrequency, userBaseFrequency } = pitchAnalysis;

    // 표준 발음 피치 콘투어 그리기
    drawPitchContour(refFrequencies, refBaseFrequency, refCanvasRef);
    
    // 사용자 발음 피치 콘투어 그리기
    drawPitchContour(userFrequencies, userBaseFrequency, userCanvasRef);

  }, [pitchAnalysis, refWavesurfer, userWavesurfer]);

  // 분석된 데이터로 PitchData 형태 변환
  const pitchInfo = React.useMemo(() => {
    if (!pitchAnalysis) return null;

    const {
      refFrequencies,
      userFrequencies,
      refBaseFrequency,
      userBaseFrequency,
      refAveragePitch,
      userAveragePitch,
    } = pitchAnalysis;

    // 유효한 주파수만 필터링
    const refValidFreqs = refFrequencies.filter((f): f is number => f !== null && f > 0);
    const userValidFreqs = userFrequencies.filter((f): f is number => f !== null && f > 0);

    if (refValidFreqs.length === 0 || userValidFreqs.length === 0) return null;

    const refPitchData: PitchData = {
      frequencies: refFrequencies,
      baseFrequency: refBaseFrequency,
      averagePitch: refAveragePitch,
      pitchRange: {
        min: Math.min(...refValidFreqs),
        max: Math.max(...refValidFreqs),
      },
    };

    const userPitchData: PitchData = {
      frequencies: userFrequencies,
      baseFrequency: userBaseFrequency,
      averagePitch: userAveragePitch,
      pitchRange: {
        min: Math.min(...userValidFreqs),
        max: Math.max(...userValidFreqs),
      },
    };

    // 유사도 계산
    const pitchDifference = Math.abs(refAveragePitch - userAveragePitch);
    const maxPitch = Math.max(refAveragePitch, userAveragePitch);
    const similarity = Math.max(0, 100 - (pitchDifference / maxPitch) * 100);

    return { refPitchData, userPitchData, similarity };
  }, [pitchAnalysis]);

  return (
    <div className={styles.pitchContainer}>
      <div className={styles.pitchHeader}>
        <h3 className={styles.sectionTitle}>📈 Pitch Contour (음정 변화)</h3>
        <div className={styles.pitchInfo}>
          음성의 기본 주파수 변화를 시간에 따라 표시합니다
        </div>
      </div>

      <div className={styles.chartsContainer}>
        {/* 표준 발음 웨이브폼 + 피치 콘투어 */}
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
      </div>

      <div className={styles.chartsContainer}>
        <div className={styles.chartContainer}>
          <p>🎼 내 발음 Pitch Contour</p>
        </div>

        {/* 사용자 발음 웨이브폼 + 피치 콘투어 */}
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

        {/* 에러 표시 */}
        {!pitchAnalysis && (
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
            ⚠️ 피치 분석 데이터가 없습니다. 먼저 발음 분석을 진행해주세요.
          </div>
        )}

        {/* 사용자 발음 정보 표시 */}
        {pitchInfo && (
          <div className="pitch-info">
            <span>
              Base: {Math.round(pitchInfo.userPitchData.baseFrequency)}Hz
            </span>
            <span>
              Avg: {Math.round(pitchInfo.userPitchData.averagePitch)}Hz
            </span>
            <span>
              Range: {Math.round(pitchInfo.userPitchData.pitchRange.min)}-
              {Math.round(pitchInfo.userPitchData.pitchRange.max)}Hz
            </span>
          </div>
        )}
      </div>

      {/* 분석 결과 표시 */}
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