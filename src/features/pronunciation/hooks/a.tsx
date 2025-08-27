// src/features/pronunciation/components/RecordingStage.tsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useAudioRecorder } from "@/features/pronunciation/hooks/useAudioRecorder";
import * as styles from "./PronunciationModal.css.ts";
import { Button } from "@/shared/components/Button";

export function RecordingStage() {
  const { setCurrentStage, setRecordedAudioBlob } = usePronunciationStore();
  const recordingWaveformRef = useRef<HTMLDivElement>(null);

  const {
    initializeRecorder,
    startRecording,
    stopRecording,
    pauseRecording,
    cleanup,
    isRecording,
    isPaused,
    recordingTime,
    recordedBlob,
  } = useAudioRecorder();

  const [isInitialized, setIsInitialized] = useState(false);

  // wavesurfer 초기화
  useEffect(() => {
    if (!recordingWaveformRef.current) return;

    initializeRecorder(recordingWaveformRef.current);
    setIsInitialized(true);

    return cleanup;
  }, [initializeRecorder, cleanup]);

  // 자동으로 녹음 시작
  useEffect(() => {
    if (isInitialized && !isRecording) {
      console.log("Attempting to start recording...");
      startRecording().then((success) => {
        if (!success) {
          console.error("Failed to start recording automatically");
        }
      });
    }
  }, [isInitialized, startRecording, isRecording]);

  // 녹음 완료 처리
  useEffect(() => {
    if (recordedBlob) {
      setRecordedAudioBlob(recordedBlob);
      setCurrentStage("analyzing");
    }
  }, [recordedBlob, setRecordedAudioBlob, setCurrentStage]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handlePauseResume = () => {
    pauseRecording();
  };

  return (
    <motion.div
      className={styles.stageContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.stageHeader}>
        <h2 className={styles.stageTitle}>
          {isPaused ? "⏸️ 녹음 일시정지" : "🔴 녹음 중..."}
        </h2>
        <p className={styles.stageSubtitle}>자연스럽게 따라 말해보세요</p>
      </div>

      {/* 실시간 파형 표시 */}
      <div className={styles.recordingSection}>
        <div className={styles.waveformContainer}>
          <div
            ref={recordingWaveformRef}
            className={styles.recordingWaveform}
          />
        </div>

        {/* 녹음 시간 표시 */}
        <div className={styles.timeDisplay}>
          <span className={styles.recordingTime}>
            ⏱️ {formatTime(recordingTime)}
          </span>
        </div>

        {/* 녹음 상태 인디케이터 */}

        {isPaused ? (
          <div
            className={styles.recordingIndicator}
            style={{ borderColor: "rgba(255, 224, 130, 1)" }}
          >
            <motion.div
              className={styles.recordingDot}
              animate={{
                scale: isPaused ? 1 : [1, 1.2, 1],
                opacity: isPaused ? 0.5 : [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: isPaused ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
            <span
              className={styles.recordingStatus}
              style={{ color: "rgba(255, 224, 130, 1)" }}
            >
              일시정지됨
            </span>
          </div>
        ) : (
          <div className={styles.recordingIndicator}>
            <motion.div
              className={styles.recordingDot}
              animate={{
                scale: isPaused ? 1 : [1, 1.2, 1],
                opacity: isPaused ? 0.5 : [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: isPaused ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
            <span className={styles.recordingStatus}>녹음 중</span>
          </div>
        )}
      </div>

      {/* 컨트롤 버튼들 */}
      <div className={styles.recordingControls}>
        {/* <motion.button
          className={styles.pauseButton}
          onClick={handlePauseResume}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPaused ? '▶️ 재개' : '⏸️ 일시정지'}
        </motion.button> */}

        <Button
          variant="sub"
          size="small"
          onClick={handlePauseResume}
          className={styles.pauseButton}
          fullWidth
          icon={!isPaused ? "⏸️" : "▶️"}
          iconPosition="left"
        >
          {!isPaused ? "일시정지" : "재개"}
        </Button>

        <Button
          variant="main"
          size="small"
          onClick={handleStopRecording}
          className={styles.stopButton}
          fullWidth
          icon={"⏹️"}
          iconPosition="left"
        >
          녹음 완료
        </Button>
        {/* 
        <motion.button
          className={styles.stopButton}
          onClick={handleStopRecording}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ⏹️ 녹음 완료
        </motion.button> */}
      </div>

      {/* 안내 메시지 */}
      <div className={styles.guideSection}>
        <p className={styles.guideText}>
          📢 마이크에 대고 명확하게 발음해주세요
        </p>
        <p className={styles.guideText}>최대 30초까지 녹음 가능합니다</p>
      </div>
    </motion.div>
  );
}
