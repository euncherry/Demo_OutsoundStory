// src/features/pronunciation/components/WaveformTab.tsx
import React, { useRef, useEffect, useState } from "react";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useWavesurfer } from "@/features/pronunciation/hooks/useWavesurfer.ts";
import * as styles from "./ResultsStage.css.ts";

export function WaveformTab() {
  const { currentContext, recordedAudioBlob } = usePronunciationStore();
  const standardWaveformRef = useRef<HTMLDivElement>(null);
  const userWaveformRef = useRef<HTMLDivElement>(null);

  const {
    createWavesurfer: createStandardWS,
    loadAudio: loadStandardAudio,
    playPause: playStandardAudio,
    destroy: destroyStandard,
    isPlaying: isStandardPlaying,
  } = useWavesurfer();

  const {
    createWavesurfer: createUserWS,
    loadAudio: loadUserAudio,
    playPause: playUserAudio,
    destroy: destroyUser,
    isPlaying: isUserPlaying,
  } = useWavesurfer();

  const [amplitudeMatch, setAmplitudeMatch] = useState(88);

  // 표준 음성 wavesurfer
  useEffect(() => {
    if (!standardWaveformRef.current || !currentContext) return;

    const wavesurfer = createStandardWS(standardWaveformRef.current, {
      height: 80,
      waveColor: "#4CAF50",
      progressColor: "#2E7D32",
      cursorColor: "#4CAF50",
      barWidth: 2,
      barRadius: 1,
      responsive: true,
    });

    loadStandardAudio(
      currentContext.audioReference ||
        "/src/assets/audio/references/Default.wav"
    );

    return destroyStandard;
  }, [currentContext]);

  // 사용자 음성 wavesurfer
  useEffect(() => {
    if (!userWaveformRef.current || !recordedAudioBlob) return;

    const wavesurfer = createUserWS(userWaveformRef.current, {
      height: 80,
      waveColor: "#FF9800",
      progressColor: "#F57C00",
      cursorColor: "#FF9800",
      barWidth: 2,
      barRadius: 1,
      responsive: true,
    });

    loadUserAudio(recordedAudioBlob);

    return destroyUser;
  }, [recordedAudioBlob]);

  return (
    <div className={styles.waveformContainer}>
      <div className={styles.waveformHeader}>
        <h3 className={styles.sectionTitle}>🌊 WaveForm Comparison</h3>
        <div className={styles.waveformInfo}>
          음성의 진폭(볼륨) 패턴을 시간에 따라 비교합니다
        </div>
      </div>

      {/* 표준 파형 */}
      <div className={styles.waveSection}>
        <div className={styles.waveHeader}>
          <div className={styles.waveLabel}>
            <div
              className={styles.waveLegend}
              style={{ backgroundColor: "#4CAF50" }}
            />
            <span>표준 발음</span>
          </div>
          <button className={styles.wavePlayButton} onClick={playStandardAudio}>
            {isStandardPlaying ? "⏸️" : "▶️"}
          </button>
        </div>
        <div className={styles.waveformWrapper}>
          <div ref={standardWaveformRef} />
        </div>
      </div>

      {/* 사용자 파형 */}
      <div className={styles.waveSection}>
        <div className={styles.waveHeader}>
          <div className={styles.waveLabel}>
            <div
              className={styles.waveLegend}
              style={{ backgroundColor: "#FF9800" }}
            />
            <span>내 발음</span>
          </div>
          <button className={styles.wavePlayButton} onClick={playUserAudio}>
            {isUserPlaying ? "⏸️" : "▶️"}
          </button>
        </div>
        <div className={styles.waveformWrapper}>
          <div ref={userWaveformRef} />
        </div>
      </div>

      {/* 분석 결과 */}
      <div className={styles.waveformAnalysis}>
        <div className={styles.analysisCard}>
          <div className={styles.analysisIcon}>📈</div>
          <div className={styles.analysisContent}>
            <div className={styles.analysisTitle}>진폭 유사도</div>
            <div className={styles.analysisScore}>{amplitudeMatch}%</div>
          </div>
        </div>

        <div className={styles.analysisCard}>
          <div className={styles.analysisIcon}>⏱️</div>
          <div className={styles.analysisContent}>
            <div className={styles.analysisTitle}>타이밍 일치도</div>
            <div className={styles.analysisScore}>92%</div>
          </div>
        </div>

        <div className={styles.analysisCard}>
          <div className={styles.analysisIcon}>🎯</div>
          <div className={styles.analysisContent}>
            <div className={styles.analysisTitle}>전체 정확도</div>
            <div className={styles.analysisScore}>85%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
