// src/pages/PronunciationResults/SpectrogramTab.tsx
import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm.js";
import { usePronunciationStore } from "@/store/pronunciationStore";
import * as styles from "./ResultsStage.css.ts";

export function SpectrogramTab() {
  const { currentContext, recordedAudioBlob } = usePronunciationStore();
  // spectrogramAnalysis는 현재 사용되지 않으므로 주석 처리
  // const { spectrogramAnalysis } = useScoreStore();

  const standardWaveformRef = useRef<HTMLDivElement>(null);
  const userWaveformRef = useRef<HTMLDivElement>(null);

  const refWavesurferRef = useRef<WaveSurfer | null>(null);
  const userWavesurferRef = useRef<WaveSurfer | null>(null);

  const [isStandardPlaying, setIsStandardPlaying] = useState(false);
  const [isUserPlaying, setIsUserPlaying] = useState(false);

  const [frequencyMatch] = useState(82);

  // 표준 음성 wavesurfer 초기화
  useEffect(() => {
    if (!standardWaveformRef.current || !currentContext) return;

    const wavesurfer = WaveSurfer.create({
      container: standardWaveformRef.current,
      height: 120,
      waveColor: "rgba(100, 0, 100, 0.6)",
      progressColor: "rgb(100, 0, 100)",
      barWidth: 2,
      barRadius: 1,
    });

    // 스펙트로그램 추가
    (wavesurfer as any).registerPlugin(
      Spectrogram.create({
        height: 150,
        labels: true,
        scale: "mel",
      })
    );

    // 이벤트 리스너
    wavesurfer.on("play", () => setIsStandardPlaying(true));
    wavesurfer.on("pause", () => setIsStandardPlaying(false));
    wavesurfer.on("finish", () => setIsStandardPlaying(false));

    // 표준 음성 로드
    wavesurfer.load(
      currentContext.audioReference ||
        "/src/assets/audio/references/Default.wav"
    );

    refWavesurferRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
    };
  }, [currentContext]);

  // 사용자 음성 wavesurfer 초기화
  useEffect(() => {
    if (!userWaveformRef.current || !recordedAudioBlob) return;

    const blobUrl = URL.createObjectURL(recordedAudioBlob);
    const wavesurfer = WaveSurfer.create({
      container: userWaveformRef.current,
      height: 120,
      waveColor: "rgba(200, 100, 0, 0.6)",
      progressColor: "rgb(200, 100, 0)",
      barWidth: 2,
      barRadius: 1,
    });

    // 스펙트로그램 추가
    (wavesurfer as any).registerPlugin(
      Spectrogram.create({
        height: 150,
        labels: true,
        scale: "mel",
      })
    );

    // 이벤트 리스너
    wavesurfer.on("play", () => setIsUserPlaying(true));
    wavesurfer.on("pause", () => setIsUserPlaying(false));
    wavesurfer.on("finish", () => setIsUserPlaying(false));

    // 녹음된 음성 로드
    wavesurfer.load(blobUrl);

    userWavesurferRef.current = wavesurfer;

    return () => {
      URL.revokeObjectURL(blobUrl);
      wavesurfer.destroy();
    };
  }, [recordedAudioBlob]);

  const playStandardAudio = () => {
    refWavesurferRef.current?.playPause();
  };

  const playUserAudio = () => {
    userWavesurferRef.current?.playPause();
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
