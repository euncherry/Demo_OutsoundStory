// src/features/pronunciation/components/PrepareStage.tsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import WaveSurfer from "wavesurfer.js";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import * as styles from "./PronunciationModal.css.ts";

export function PrepareStage() {
  const { currentContext, setCurrentStage } = usePronunciationStore();
  const { getAvailableDevices } = useAudioRecorder();

  const standardWaveformRef = useRef<HTMLDivElement>(null);
  const [
    standardWavesurfer,
    setStandardWavesurfer,
  ] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");

  // 표준 음성 wavesurfer 초기화
  useEffect(() => {
    if (!standardWaveformRef.current || !currentContext) return;

    const wavesurfer = WaveSurfer.create({
      container: standardWaveformRef.current,
      waveColor: "rgba(100, 0, 100, 0.6)",
      progressColor: "rgb(100, 0, 100)",
      height: 60,
      url:
        currentContext.audioReference ||
        "/src/assets/audio/references/Default.wav",
    });

    wavesurfer.on("play", () => setIsPlaying(true));
    wavesurfer.on("pause", () => setIsPlaying(false));
    wavesurfer.on("finish", () => setIsPlaying(false));

    setStandardWavesurfer(wavesurfer);

    return () => {
      wavesurfer.destroy();
    };
  }, [currentContext]);

  // 오디오 기기 목록 로드
  useEffect(() => {
    getAvailableDevices().then(setAudioDevices);
  }, [getAvailableDevices]);

  const handlePlayStandard = () => {
    if (!standardWavesurfer) return;
    standardWavesurfer.playPause();
  };

  const handleStartRecording = () => {
    setCurrentStage("recording");
  };

  if (!currentContext) return null;

  return (
    <motion.div
      className={styles.stageContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.stageHeader}>
        <h2 className={styles.stageTitle}>🎙️ 발음 연습하기</h2>
        <p className={styles.stageSubtitle}>표준 발음을 먼저 들어보세요</p>
      </div>

      {/* 선택한 텍스트 표시 */}
      <div className={styles.textDisplay}>
        <p className={styles.choiceText}>"{currentContext.text}"</p>
      </div>

      {/* 표준 음성 재생 영역 */}
      <div className={styles.standardAudioSection}>
        <h3 className={styles.sectionTitle}>🔊 표준 발음</h3>
        <div className={styles.waveformContainer}>
          <div ref={standardWaveformRef} className={styles.waveform} />
        </div>
        <button className={styles.playButton} onClick={handlePlayStandard}>
          {isPlaying ? "⏸️ 일시정지" : "▶️ 재생"}
        </button>
      </div>

      {/* 마이크 선택 */}
      <div className={styles.micSection}>
        <h3 className={styles.sectionTitle}>🎤 마이크 선택</h3>
        <select
          className={styles.micSelect}
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
        >
          <option value="">기본 마이크</option>
          {audioDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `마이크 ${device.deviceId.slice(0, 8)}`}
            </option>
          ))}
        </select>
      </div>

      {/* 안내 메시지 */}
      <div className={styles.guideSection}>
        <p className={styles.guideText}>
          💡 표준 발음을 잘 들으신 후, 똑같이 따라 말해보세요!
        </p>
      </div>

      {/* 녹음 시작 버튼 */}
      <div className={styles.actionSection}>
        <motion.button
          className={styles.startRecordButton}
          onClick={handleStartRecording}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎙️ 녹음 시작하기
        </motion.button>
      </div>
    </motion.div>
  );
}
