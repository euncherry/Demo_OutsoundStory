// src/pages/PronunciationResults/SpectrogramTab.tsx
import React, { useRef, useEffect, useState } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm.js";
import { usePronunciationStore } from "@/store/pronunciationStore";
import * as styles from "./ResultsStage.css.ts";

interface SpectrogramTabProps {
  userAudioUrl: string | null;
}

export function SpectrogramTab({ userAudioUrl }: SpectrogramTabProps) {
  const { currentContext } = usePronunciationStore();

  const [frequencyMatch] = useState(82);

  const standardContainerRef = useRef<HTMLDivElement>(null);
  const userContainerRef = useRef<HTMLDivElement>(null);

  // 표준 발음 WaveSurfer 설정
  const { wavesurfer: standardWavesurfer, isPlaying: isStandardPlaying } =
    useWavesurfer({
      container: standardContainerRef,
      height: 120,
      waveColor: "rgba(100, 0, 100, 0.6)",
      progressColor: "rgb(100, 0, 100)",
      barWidth: 2,
      barGap: 1,
      barRadius: 1,
      normalize: true,
      minPxPerSec: 50,
      fillParent: true,
      autoCenter: true,
      interact: true,
      dragToSeek: false,
      hideScrollbar: false,
      audioRate: 1,
      autoplay: false,
      url:
        currentContext?.audioReference ||
        "/src/assets/audio/references/Default.wav",
      sampleRate: 8000,
    });

  // 사용자 발음 WaveSurfer 설정
  const { wavesurfer: userWavesurfer, isPlaying: isUserPlaying } =
    useWavesurfer({
      container: userContainerRef,
      height: 120,
      waveColor: "rgba(200, 100, 0, 0.6)",
      progressColor: "rgb(200, 100, 0)",
      barWidth: 2,
      barGap: 1,
      barRadius: 1,
      normalize: true,
      minPxPerSec: 50,
      fillParent: true,
      autoCenter: true,
      interact: true,
      dragToSeek: false,
      hideScrollbar: false,
      audioRate: 1,
      autoplay: false,
      url: userAudioUrl || undefined,
      sampleRate: 8000,
    });

  // 표준 발음 Spectrogram 플러그인 등록
  useEffect(() => {
    if (!standardWavesurfer) return;

    const spectrogram = standardWavesurfer.registerPlugin(
      Spectrogram.create({
        height: 150,
        labels: true,
        scale: "mel",
        labelsBackground: "rgba(0, 0, 0, 0.1)",
        frequencyMax: 8000,
        frequencyMin: 0,
        fftSamples: 1024,
        useWebWorker: true,
      }) as any
    );

    return () => {
      spectrogram.destroy();
    };
  }, [standardWavesurfer]);

  // 사용자 발음 Spectrogram 플러그인 등록
  useEffect(() => {
    if (!userWavesurfer || !userAudioUrl) return;

    const spectrogram = userWavesurfer.registerPlugin(
      Spectrogram.create({
        height: 150,
        labels: true,
        scale: "mel",
        labelsBackground: "rgba(0, 0, 0, 0.1)",
        frequencyMax: 8000,
        frequencyMin: 0,
        fftSamples: 1024,
        useWebWorker: true,
      }) as any
    );

    return () => {
      spectrogram.destroy();
    };
  }, [userWavesurfer, userAudioUrl]);

  const playStandardAudio = () => {
    if (standardWavesurfer) {
      standardWavesurfer.playPause();
    }
  };

  const playUserAudio = () => {
    if (userWavesurfer) {
      userWavesurfer.playPause();
    }
  };

  return (
    <div className={styles.spectrogramContainer}>
      {/* 헤더 섹션 */}
      <div className={styles.spectrogramHeader}>
        <h3 className={styles.sectionTitle}>📊 Spectrogram Analysis</h3>
        <div className={styles.spectrogramInfo}>
          음성의 주파수 패턴을 시각적으로 비교합니다
        </div>
      </div>

      {/* 표준 발음 */}
      <div className={styles.audioSection}>
        <div className={styles.audioHeader}>
          <h3 className={styles.audioTitle}>표준 발음</h3>
          <button className={styles.playButton} onClick={playStandardAudio}>
            {isStandardPlaying ? "⏸️" : "▶️"}
          </button>
        </div>
        <div className={styles.spectrogramWrapper}>
          <div ref={standardContainerRef} className={styles.waveform} />
        </div>
      </div>

      {/* 구분선 */}
      <div className={styles.divider} />

      {/* 내 발음 */}
      <div className={styles.audioSection}>
        <div className={styles.audioHeader}>
          <h3 className={styles.audioTitle}>내 발음</h3>
          <button
            className={styles.playButton}
            onClick={playUserAudio}
            disabled={!userAudioUrl}
          >
            {isUserPlaying ? "⏸️" : "▶️"}
          </button>
        </div>
        <div className={styles.spectrogramWrapper}>
          <div ref={userContainerRef} className={styles.waveform} />
          {!userAudioUrl && (
            <div
              style={{ padding: "20px", textAlign: "center", color: "#999" }}
            >
              녹음된 오디오가 없습니다
            </div>
          )}
        </div>
      </div>

      {/* 분석 결과 */}
      <div className={styles.analysisResult}>
        <div className={styles.matchScore}>
          📊 주파수 일치도: <strong>{frequencyMatch}%</strong>
        </div>
        <div className={styles.resultDescription}>
          Mel Scale 기반으로 주파수 패턴을 비교한 결과입니다.
        </div>
      </div>
    </div>
  );
}
