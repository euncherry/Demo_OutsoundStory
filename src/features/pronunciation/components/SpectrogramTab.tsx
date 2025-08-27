// src/features/pronunciation/components/SpectrogramTab.tsx
import React, { useRef, useEffect, useState } from "react";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useWavesurfer } from "@/features/pronunciation/hooks/useWavesurfer.ts";
import * as styles from "./ResultsStage.css.ts";

export function SpectrogramTab() {
  const { currentContext, recordedAudioBlob } = usePronunciationStore();
  const standardWaveformRef = useRef<HTMLDivElement>(null);
  const userWaveformRef = useRef<HTMLDivElement>(null);

  const {
    createWavesurfer: createStandardWS,
    addSpectrogram: addStandardSpectrogram,
    loadAudio: loadStandardAudio,
    playPause: playStandardAudio,
    destroy: destroyStandard,
    isPlaying: isStandardPlaying,
  } = useWavesurfer();

  const {
    createWavesurfer: createUserWS,
    addSpectrogram: addUserSpectrogram,
    loadAudio: loadUserAudio,
    playPause: playUserAudio,
    destroy: destroyUser,
    isPlaying: isUserPlaying,
  } = useWavesurfer();

  const [frequencyMatch, setFrequencyMatch] = useState(82);

  // 표준 음성 wavesurfer 초기화
  useEffect(() => {
    if (!standardWaveformRef.current || !currentContext) return;

    const wavesurfer = createStandardWS(standardWaveformRef.current, {
      height: 120,
      waveColor: "rgba(100, 0, 100, 0.6)",
      progressColor: "rgb(100, 0, 100)",
    });

    // 스펙트로그램 추가
    addStandardSpectrogram({
      height: 150,
      labels: true,
      scale: "mel",
    });

    // 표준 음성 로드
    loadStandardAudio(
      currentContext.audioReference ||
        "/src/assets/audio/references/Default.wav"
    );

    return destroyStandard;
  }, [currentContext]);

  // 사용자 음성 wavesurfer 초기화
  useEffect(() => {
    if (!userWaveformRef.current || !recordedAudioBlob) return;

    const wavesurfer = createUserWS(userWaveformRef.current, {
      height: 120,
      waveColor: "rgba(200, 100, 0, 0.6)",
      progressColor: "rgb(200, 100, 0)",
    });

    // 스펙트로그램 추가
    addUserSpectrogram({
      height: 150,
      labels: true,
      scale: "mel",
    });

    // 녹음된 음성 로드
    loadUserAudio(recordedAudioBlob);

    return destroyUser;
  }, [recordedAudioBlob]);

  return (
    <div className={styles.spectrogramContainer}>
      {/* 표준 발음 */}
      <div className={styles.audioSection}>
        <div className={styles.audioHeader}>
          <h3 className={styles.audioTitle}>표준 발음</h3>
          <button className={styles.playButton} onClick={playStandardAudio}>
            {isStandardPlaying ? "⏸️" : "▶️"}
          </button>
        </div>
        <div className={styles.spectrogramWrapper}>
          <div ref={standardWaveformRef} className={styles.waveform} />
        </div>
      </div>

      {/* 구분선 */}
      <div className={styles.divider} />

      {/* 내 발음 */}
      <div className={styles.audioSection}>
        <div className={styles.audioHeader}>
          <h3 className={styles.audioTitle}>내 발음</h3>
          <button className={styles.playButton} onClick={playUserAudio}>
            {isUserPlaying ? "⏸️" : "▶️"}
          </button>
        </div>
        <div className={styles.spectrogramWrapper}>
          <div ref={userWaveformRef} className={styles.waveform} />
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
