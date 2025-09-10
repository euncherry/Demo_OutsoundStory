// src/features/pronunciation/components/RecordingStage.tsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useAudioRecorder } from "@/features/pronunciation/hooks/useAudioRecorder";
import * as modalStyles from "./PronunciationModal.css";
import * as styles from "./RecordingStage.css";
import { Button3D } from "@/shared/components/3DButton";
import { Button } from "@/shared/components/Button";
import useSpeechToText from "@/pages/test/hooks/useSpeechToText";
import micIconLarge from "@/assets/ui/decorations/micIcon.png";

export function RecordingStage() {
  const {
    setCurrentStage,
    setRecordedAudioBlob,
    currentContext,
    setSttTranscript,
  } = usePronunciationStore();
  const recordingWaveformRef = useRef<HTMLDivElement>(null);

  const {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechToText();

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

  const [isRecordingStarted, setIsRecordingStarted] = useState(false);

  // 브라우저 지원 체크
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.warn("브라우저가 음성 인식을 지원하지 않습니다.");
    }
    if (!isMicrophoneAvailable) {
      console.warn("마이크를 사용할 수 없습니다.");
    }
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable]);

  // wavesurfer 초기화 STT 정리
  useEffect(() => {
    if (!recordingWaveformRef.current) return;

    initializeRecorder(recordingWaveformRef.current);
    setIsInitialized(true);

    return () => {
      cleanup();
      // STT 정리
      // SpeechRecognition.stopListening();
    };
  }, [initializeRecorder, cleanup]);

  // 자동으로 녹음 시작
  useEffect(() => {
    if (!isRecordingStarted || isRecording || !isInitialized) return;
    console.log("[useEffect] isRecordingStarted", isRecordingStarted);
    if (isInitialized && !isRecording && isRecordingStarted) {
      console.log("[useEffect] Attempting to start recording...");
      console.log("[useEffect] isInitialized", isInitialized);
      console.log("[useEffect] isRecording", isRecording);
      startRecording().then((success) => {
        if (!success) {
          console.error("[useEffect] Failed to start recording automatically");
        }
      });
    }
  }, [
    isInitialized,
    startRecording,
    browserSupportsSpeechRecognition,
    isRecording,
    resetTranscript,
    isRecordingStarted,
  ]);

  const handleStartRecording = () => {
    setIsRecordingStarted(true);
    startListening();

    startRecording().then((success) => {
      if (!success) {
        console.error("[useEffect] Failed to start recording automatically");
      }
    });
  };

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

    // STT 중지
    if (listening) {
      // SpeechRecognition.stopListening();
      stopListening();
      console.log("🔴 STT stopped");
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
      console.log(
        "✅ 텍스트 유사도(simple):",
        `${(similarity * 100).toFixed(1)}%`
      );
    }
    console.log("==================================================");
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

  const handlePauseResume = () => {
    pauseRecording();
    if (listening) {
      stopListening();
      console.log("🔴 STT stopped");
    } else {
      startListening();
      console.log("▶️ STT started");
    }
  };

  return (
    <>
      <motion.div
        className={modalStyles.stageContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className={modalStyles.stageHeader}>
          <h2 className={modalStyles.stageTitle}>
            {!isRecordingStarted
              ? "발음 녹음하기"
              : isPaused
              ? "녹음 일시정지"
              : "녹음 중..."}
          </h2>
          <p className={modalStyles.stageSubtitle}>
            {!isRecordingStarted
              ? "준비가 되면 녹음 버튼을 눌러주세요."
              : "자연스럽게 따라 말해보세요"}
          </p>
        </div>
        {/* 선택한 텍스트 표시 */}
        <motion.div
          className={modalStyles.textDisplay}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className={modalStyles.choiceText}>"{currentContext?.text}"</p>
        </motion.div>
        {/* recording content */}
        <div className={styles.recordingContent}>
          {isRecordingStarted ? (
            <>
              <p>녹음 중...</p>
              <div className={styles.recordingContentGrid}>
                <div className={styles.recordingContentReadyGridItem}>
                  <img
                    src={micIconLarge}
                    alt="설명"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className={styles.recordingContentReadyGridItem}>
                  <p>녹음 중...</p>
                </div>
                <div className={styles.recordingContentReadyGridItem}>
                  <p>녹음 중...</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>녹음 중...</p>
              <div className={styles.recordingContentGrid}>
                <div className={styles.recordingContentReadyGridItem}>
                  <img
                    src={micIconLarge}
                    alt="설명"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className={styles.recordingContentReadyGridItem}>
                  <p>녹음 중...</p>
                </div>
                <div className={styles.recordingContentReadyGridItem}>
                  <p>녹음 중...</p>
                </div>
              </div>
            </>
          )}
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
            //TODO : css추가 sttStatus
            <div
              style={{
                padding: "0.5rem 1rem",
                marginBottom: "0.5rem",
                minHeight: "7rem",
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(230, 220, 255, 0.3))",
                borderRadius: "0.5rem",
                border: "1px solid rgba(230, 220, 255, 0.4)",
                boxShadow: "0 4px 12px rgba(230, 220, 255, 0.15)",
                fontSize: "14px",
                color: "rgba(107, 91, 149, 0.9)",
                fontWeight: "500",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                🎙️ STT: {listening ? "듣는 중" : "중지"}
              </span>
              {transcript && (
                <div
                  style={{
                    marginTop: "8px",
                    padding: "8px 12px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "8px",
                    border: "1px solid rgba(230, 220, 255, 0.3)",
                    fontSize: "13px",
                    color: "rgba(107, 91, 149, 0.8)",
                    fontStyle: "italic",
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
          {!isRecordingStarted ? (
            <Button3D
              variant="main"
              size="medium"
              onClick={handleStartRecording}
            >
              🔴 녹음 시작
            </Button3D>
          ) : (
            <>
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
            </>
          )}
        </div>
        {/* 안내 메시지 */}
        <div className={styles.guideSection}>
          <p className={styles.guideText}>
            📢 마이크에 대고 명확하게 발음해주세요
          </p>
          <p className={styles.guideText}>최대 30초까지 녹음 가능합니다</p>
        </div>
        {/*  */}
      </motion.div>
      <>
        {/* 음성 인식 데모 섹션 */}
        {/* <div className="speech-demo-container">
          <h3>음성 인식 테스트</h3>
          <p>아래 버튼을 누르고 마이크에 대고 말해보세요.</p>
          <div className="transcript-box">
            <textarea
              className="transcript-textarea"
              value={transcript}
              readOnly
              placeholder="음성 인식 결과가 여기에 표시됩니다..."
            />
            {listening && <div className="listening-indicator"></div>}
          </div>
          <div className="button-group">
            <button
              onClick={listening ? stopListening : startListening}
              className={`speech-button ${listening ? "stop" : "start"}`}
            >
              {listening ? "음성인식 중지" : "음성인식 시작"}
            </button>
            <button onClick={resetTranscript} className="speech-button reset">
              초기화
            </button>
          </div>
        </div> */}
      </>
    </>
  );
}
