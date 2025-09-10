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
import micIconLarge from "/assets/ui/decorations/micIcon.png";

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

  const [isDone, setIsDone] = useState(false);

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
    if (!isDone) return;

    initializeRecorder(recordingWaveformRef.current);
    setIsInitialized(true);

    return () => {
      cleanup();
      // STT 정리
      // SpeechRecognition.stopListening();
    };
  }, [initializeRecorder, cleanup, isDone]);

  // 녹음 시작 useEffect
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
    initializeRecorder(recordingWaveformRef.current);

    resetTranscript();
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
    setIsDone(true);

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
        {/*SECTION : recording content */}
        <div
          className={styles.recordingContent}
          style={{
            background: !isRecordingStarted
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.7),rgba(240, 235, 255, 0.3), rgba(240, 235, 255, 0.3),rgba(240, 235, 255, 0.3))"
              : `linear-gradient(135deg, rgba(255, 245, 245, 0.4),rgba(255, 223, 245, 0.5), rgba(255, 223, 245, 0.6))`,
            height: !isRecordingStarted ? "45dvh" : "60dvh",
          }}
        >
          <div
            className={styles.recordingContentGrid}
            style={{
              gridTemplateRows: isRecordingStarted
                ? "3fr 1fr 3fr 2fr 2fr"
                : "5fr 1fr 2fr",
            }}
          >
            <div
              className={styles.recordingContentReadyGridItem}
              style={{
                display: isRecordingStarted ? "flex" : "none",
              }}
            >
              <div className={styles.waveformContainer}>
                <div
                  ref={recordingWaveformRef}
                  className={styles.recordingWaveform}
                />
              </div>
            </div>
            {isRecordingStarted ? (
              <>
                {/* 두 번째 그리드 아이템 - 녹음 시간 1fr */}
                <div className={styles.recordingContentReadyGridItem}>
                  <div className={styles.timeDisplay}>
                    <span className={styles.recordingTime}>
                      ⏱️ {formatTime(recordingTime)}
                    </span>
                  </div>
                </div>

                {/* 세 번째 그리드 아이템 - 녹음 중 STT 텍스트 3fr */}
                <div className={styles.recordingContentReadyGridItem}>
                  <div className={styles.sttStatus}>
                    <div className={styles.sttHeader}>
                      <span>🎙️</span>
                      <span>STT</span>
                      <span className={styles.sttListening}>
                        {listening ? "인식 중" : "중지"}
                      </span>
                    </div>
                    {transcript && (
                      <div className={styles.sttTranscript}>{transcript}</div>
                    )}
                  </div>
                </div>

                {/* 네 번째 그리드 아이템 - 공간 1fr */}
                <div className={styles.recordingContentReadyGridItem}>
                  {/* 녹음 상태 인디케이터 */}

                  {isPaused ? (
                    <div
                      className={styles.recordingIndicator}
                      style={{ borderColor: "rgb(255 208 65)" }}
                    >
                      <motion.div
                        className={styles.recordingDot}
                        style={{ background: "rgb(255 208 65)" }}
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
                        style={{ color: "rgb(255 208 65)" }}
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

                {/* 다섯 번째 그리드 아이템 - 컨트롤 버튼 3fr */}
                <div className={styles.recordingContentReadyGridItem}>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      justifyContent: "center",
                    }}
                  >
                    <Button3D
                      variant="sub"
                      size="small"
                      onClick={handlePauseResume}
                      disabled={!isRecording && !isPaused}
                    >
                      {isPaused ? "▶️ 재개" : "⏸️ 일시정지"}
                    </Button3D>
                    <Button3D
                      variant="main"
                      size="small"
                      onClick={handleStopRecording}
                      disabled={!isRecording && !isPaused}
                    >
                      ⏹️ 녹음 완료
                    </Button3D>
                  </div>
                </div>
                {/* </div> */}
                {/* </div> */}
              </>
            ) : (
              <>
                {/* <div className={styles.recordingContent}> */}
                {/* <div className={styles.recordingContentGrid}> */}
                {/* 첫 번째 그리드 아이템 - 마이크 아이콘 3fr */}
                <div className={styles.recordingContentMicGridItem}>
                  <div className={styles.imageContainer}>
                    <img
                      src={micIconLarge}
                      alt="마이크 아이콘"
                      className={styles.scaledImage}
                    />
                  </div>
                </div>

                {/* 두 번째 그리드 아이템 - 텍스트 1fr */}
                <div className={styles.recordingContentReadyGridItem}>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "1rem",
                        fontWeight: "500",
                      }}
                    >
                      녹음을 시작하려면 버튼을 클릭하세요
                    </p>
                  </div>
                </div>

                {/* 세 번째 그리드 아이템 - 녹음 시작 버튼 */}
                <div className={styles.recordingContentReadyGridItem}>
                  <Button3D
                    variant="main"
                    size="medium"
                    onClick={handleStartRecording}
                  >
                    🔴 녹음 시작
                  </Button3D>
                </div>
                {/* </div> */}
                {/* </div> */}
              </>
            )}
          </div>
        </div>

        {/* 안내 메시지 */}
        {!isRecordingStarted && (
          <div className={modalStyles.guideSection}>
            <p className={modalStyles.guideText}>
              📢 마이크에 대고 명확하게 발음해주세요
            </p>
            <p className={modalStyles.guideText}>
              최대 30초까지 녹음 가능합니다
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
}
