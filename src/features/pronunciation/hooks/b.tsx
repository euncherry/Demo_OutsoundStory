// src/features/pronunciation/components/RecordingStage.tsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useAudioRecorder } from "@/features/pronunciation/hooks/useAudioRecorder";
import * as styles from "./PronunciationModal.css.ts";
import { Button } from "@/shared/components/Button";

export function RecordingStage() {
  const {
    setCurrentStage,
    setRecordedAudioBlob,
    currentContext,
    setSttTranscript,
  } = usePronunciationStore();
  const recordingWaveformRef = useRef<HTMLDivElement>(null);

  // react-speech-recognition 훅
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

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
  const [finalTranscript, setFinalTranscript] = useState<string>("");

  // 브라우저 지원 체크
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.warn("브라우저가 음성 인식을 지원하지 않습니다.");
    }
    if (!isMicrophoneAvailable) {
      console.warn("마이크를 사용할 수 없습니다.");
    }
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable]);

  // wavesurfer 초기화
  useEffect(() => {
    if (!recordingWaveformRef.current) return;

    initializeRecorder(recordingWaveformRef.current);
    setIsInitialized(true);

    return () => {
      cleanup();
      // STT 정리
      if (listening) {
        SpeechRecognition.stopListening();
      }
    };
  }, [initializeRecorder, cleanup, listening]);

  // 자동으로 녹음 & STT 시작
  useEffect(() => {
    if (isInitialized && !isRecording) {
      console.log("Attempting to start recording and STT...");

      // 녹음 시작
      startRecording().then((success) => {
        if (!success) {
          console.error("Failed to start recording automatically");
        }
      });

      // STT 시작
      if (browserSupportsSpeechRecognition) {
        resetTranscript(); // 이전 텍스트 초기화
        SpeechRecognition.startListening({
          continuous: true, // 계속 듣기
          language: "ko-KR", // 한국어 설정
        });
        console.log("🎤 STT started listening...");
      }
    }
  }, [
    isInitialized,
    startRecording,
    isRecording,
    browserSupportsSpeechRecognition,
    resetTranscript,
  ]);

  // 실시간 transcript 변경 감지 (디버깅용)
  useEffect(() => {
    if (transcript) {
      console.log("📝 실시간 STT 결과:", transcript);
    }
  }, [transcript]);

  // 녹음 완료 처리
  useEffect(() => {
    if (recordedBlob) {
      // STT 결과 저장
      setFinalTranscript(transcript);

      // 상태 업데이트
      setRecordedAudioBlob(recordedBlob);

      // 다음 단계로 이동
      setCurrentStage("analyzing");
    }
  }, [recordedBlob, transcript, setRecordedAudioBlob, setCurrentStage]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleStopRecording = () => {
    // 녹음 중지
    stopRecording();

    // STT 중지
    if (listening) {
      SpeechRecognition.stopListening();
      console.log("🔴 STT stopped");
    }

    // 최종 STT 결과 출력
    console.log("================== STT 최종 결과 ==================");
    console.log("📝 인식된 텍스트:", transcript || "(인식된 텍스트 없음)");
    console.log(
      "📖 원본 텍스트:",
      currentContext?.text || "(원본 텍스트 없음)"
    );

    //ANCHOR ✅ STT 결과를 store에 저장
    setSttTranscript(transcript || "");

    // CER 계산 (간단한 비교)
    if (transcript && currentContext?.text) {
      const similarity = calculateSimpleSimilarity(
        currentContext.text,
        transcript
      );
      console.log("✅ 텍스트 유사도:", `${(similarity * 100).toFixed(1)}%`);
    }
    console.log("==================================================");

    // 최종 transcript 저장
    setFinalTranscript(transcript);
  };

  const handlePauseResume = () => {
    // // 현재 상태를 먼저 확인하고, 반대로 동작
    // if (!isPaused) {
    //   // 현재 녹음 중 → 일시정지로 변경
    //   pauseRecording();

    //   // STT도 일시정지
    //   if (listening) {
    //     SpeechRecognition.stopListening();
    //     console.log("⏸️ STT paused");
    //   }
    // } else {
    //   // 현재 일시정지 → 재개로 변경
    //   pauseRecording();

    //   // STT도 재개
    //   if (browserSupportsSpeechRecognition) {
    //     SpeechRecognition.startListening({
    //       continuous: true,
    //       language: "ko-KR",
    //     });
    //     console.log("▶️ STT resumed");
    //   }
    // }

    // {isPaused ? "재개" : "일시정지"}

    pauseRecording();
    if (isPaused) {
      SpeechRecognition.stopListening();
      console.log("⏸️ true STT paused");
    } else {
      SpeechRecognition.stopListening();
      console.log("⏸️ false STT paused");
    }
  };

  // 간단한 텍스트 유사도 계산 함수
  const calculateSimpleSimilarity = (text1: string, text2: string): number => {
    const clean1 = text1.replace(/\s/g, "").toLowerCase();
    const clean2 = text2.replace(/\s/g, "").toLowerCase();

    let matches = 0;
    const maxLength = Math.max(clean1.length, clean2.length);
    const minLength = Math.min(clean1.length, clean2.length);

    for (let i = 0; i < minLength; i++) {
      if (clean1[i] === clean2[i]) matches++;
    }

    return maxLength > 0 ? matches / maxLength : 0;
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

        {/* STT 상태 표시 (디버깅용) */}
        {browserSupportsSpeechRecognition && (
          <div
            className={styles.sttStatus}
            style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}
          >
            <span>🎙️ STT: {listening ? "듣는 중" : "중지"}</span>
            {transcript && (
              <div
                style={{
                  marginTop: "5px",
                  padding: "5px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "4px",
                }}
              >
                인식 중: {transcript}
              </div>
            )}
          </div>
        )}

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
      </div>

      {/* 안내 메시지 */}
      <div className={styles.guideSection}>
        <p className={styles.guideText}>
          📢 마이크에 대고 명확하게 발음해주세요
        </p>
        <p className={styles.guideText}>최대 30초까지 녹음 가능합니다</p>
        {!browserSupportsSpeechRecognition && (
          <p className={styles.guideText} style={{ color: "#ff6b6b" }}>
            ⚠️ 브라우저가 음성 인식을 지원하지 않습니다
          </p>
        )}
      </div>
    </motion.div>
  );
}
