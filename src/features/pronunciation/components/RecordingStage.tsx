// src/features/pronunciation/components/RecordingStage.tsx
import React, { useRef, useEffect, useState, useCallback } from "react";
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

  // 🔥 정리 실행 여부를 추적하는 ref (중복 실행 방지)
  const isCleaningUpRef = useRef(false);

  const {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    cleanup: cleanupSTT,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechToText();

  const {
    initializeRecorder,
    startRecording,
    stopRecording,
    pauseRecording,
    cleanup,
    stopAllMediaTracks,
    isRecording,
    isPaused,
    recordingTime,
    recordedBlob,
  } = useAudioRecorder();

  const [isRecordingStarted, setIsRecordingStarted] = useState(false);

  // 🔥 안전한 정리 함수 - 의존성 없이 안정적으로 구현
  const performCleanup = useCallback(() => {
    // 중복 실행 방지
    if (isCleaningUpRef.current) {
      console.log("⚠️ 이미 정리 중입니다.");
      return;
    }

    isCleaningUpRef.current = true;
    console.log("🧹 리소스 정리 시작...");

    try {
      // 1. STT 정리 (안전하게)
      try {
        if (cleanupSTT) {
          cleanupSTT();
        }
      } catch (error) {
        console.warn("STT 정리 중 오류:", error);
      }

      // 2. 마이크 스트림 해제 (안전하게)
      try {
        stopAllMediaTracks();
      } catch (error) {
        console.warn("MediaStream 정리 중 오류:", error);
      }

      // 3. 오디오 녹음 정리 (안전하게)
      try {
        cleanup();
      } catch (error) {
        console.warn("오디오 정리 중 오류:", error);
      }

      // 4. 컴포넌트 상태 초기화
      setIsRecordingStarted(false);

      console.log("✅ 리소스 정리 완료");
    } catch (error) {
      console.error("정리 중 예상치 못한 오류:", error);
    } finally {
      // 정리 플래그 해제
      setTimeout(() => {
        isCleaningUpRef.current = false;
      }, 100);
    }
  }, []); // 🔥 의존성 없음 - 안정적인 참조

  // 브라우저 지원 체크
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.warn("브라우저가 음성 인식을 지원하지 않습니다.");
    }
    if (!isMicrophoneAvailable) {
      console.warn("마이크를 사용할 수 없습니다.");
    }
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable]);

  // 🔥 컴포넌트 언마운트 시 정리 - 더 간단하고 안전하게
  useEffect(() => {
    return () => {
      console.log("🗑️ RecordingStage 언마운트");
      // 정리 플래그가 설정되지 않은 경우에만 실행
      if (!isCleaningUpRef.current) {
        performCleanup();
      }
    };
  }, []); // 🔥 빈 의존성 배열

  // 🔥 간소화된 녹음 시작 함수
  const handleStartRecording = async () => {
    console.log("🎬 녹음 시작 준비");

    if (!recordingWaveformRef.current) {
      console.error("❌ Waveform container가 없습니다");
      return;
    }

    try {
      // 1. 기존 리소스 정리
      resetTranscript();

      // 2. WaveSurfer 초기화
      console.log("📊 WaveSurfer 초기화 중...");
      const { recordPlugin } = initializeRecorder(recordingWaveformRef.current);

      if (!recordPlugin) {
        console.error("❌ RecordPlugin 초기화 실패");
        return;
      }

      // 3. 녹음 시작
      console.log("🎤 녹음 시작 중...");
      const success = await startRecording();

      if (success) {
        // 4. STT 시작
        console.log("🗣️ STT 시작 중...");
        startListening();

        // 5. 상태 업데이트
        setIsRecordingStarted(true);
        console.log("✅ 녹음 및 STT 시작 완료");
      } else {
        console.error("❌ 녹음 시작 실패");
        performCleanup();
      }
    } catch (error) {
      console.error("❌ 녹음 시작 중 오류:", error);
      performCleanup();
    }
  };

  // 🔥 녹음 완료 처리 - 간소화
  useEffect(() => {
    if (recordedBlob && !isCleaningUpRef.current) {
      console.log("🎯 녹음 완료 - 데이터 저장");

      // Store에 데이터 저장
      setRecordedAudioBlob(recordedBlob);

      // 🔥 정리를 비동기로 처리하여 상태 업데이트와 분리
      const timer = setTimeout(() => {
        performCleanup();
        // 다음 단계로 이동
        setCurrentStage("analyzing");
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [recordedBlob, setRecordedAudioBlob, setCurrentStage, performCleanup]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleStopRecording = () => {
    console.log("⏹️ 녹음 중지 요청");

    // STT 먼저 중지 및 결과 저장
    if (listening) {
      stopListening();
      console.log("🔴 STT stopped");
    }

    // 최종 STT 결과 저장
    console.log("================== STT 최종 결과 ==================");
    console.log("📝 인식된 텍스트:", transcript || "(인식된 텍스트 없음)");
    console.log(
      "📖 원본 텍스트:",
      currentContext?.text || "(원본 텍스트 없음)"
    );

    // ✅ STT 결과를 store에 저장
    setSttTranscript(transcript || "");

    // CER 계산
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

    // 🔥 녹음 중지
    stopRecording();
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

  // 🔥 일시정지 - 명확한 동작
  const handlePause = () => {
    pauseRecording(); // 녹음 일시정지
    if (listening) {
      stopListening(); // STT 확실히 중지
    }
  };

  // 🔥 재개 - 명확한 동작
  const handleResume = () => {
    pauseRecording(); // 녹음 재개 (토글)
    if (!listening) {
      startListening(); // STT 확실히 시작
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

        {/* 녹음 컨텐츠 */}
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
                {/* 녹음 시간 */}
                <div className={styles.recordingContentReadyGridItem}>
                  <div className={styles.timeDisplay}>
                    <span className={styles.recordingTime}>
                      ⏱️ {formatTime(recordingTime)}
                    </span>
                  </div>
                </div>

                {/* STT 텍스트 */}
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

                {/* 녹음 상태 인디케이터 */}
                <div className={styles.recordingContentReadyGridItem}>
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

                {/* 컨트롤 버튼 */}
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
                      onClick={isPaused ? handleResume : handlePause}
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
              </>
            ) : (
              <>
                {/* 마이크 아이콘 */}
                <div className={styles.recordingContentMicGridItem}>
                  <div className={styles.imageContainer}>
                    <img
                      src={micIconLarge}
                      alt="마이크 아이콘"
                      className={styles.scaledImage}
                    />
                  </div>
                </div>

                {/* 안내 텍스트 */}
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

                {/* 녹음 시작 버튼 */}
                <div className={styles.recordingContentReadyGridItem}>
                  <Button3D
                    variant="main"
                    size="medium"
                    onClick={handleStartRecording}
                  >
                    🔴 녹음 시작
                  </Button3D>
                </div>
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
