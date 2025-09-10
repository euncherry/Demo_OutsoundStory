// src/pages/test/hooks/useSpeechToText.js
import { useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const useSpeechToText = (options) => {
  // 🔥 정리 상태 추적용 ref
  const isCleaningUpRef = useRef(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const startListening = () => {
    console.log("🎤 STT 시작 중...");
    return SpeechRecognition.startListening({
      continuous: true,
      language: "ko-KR",
      ...options,
    });
  };

  const stopListening = () => {
    console.log("🔴 STT 중지 중...");
    SpeechRecognition.stopListening();
  };

  // 🔥 안전한 정리 함수 - 중복 실행 방지
  const cleanup = () => {
    // 중복 실행 방지
    if (isCleaningUpRef.current) {
      console.log("⚠️ STT 이미 정리 중입니다.");
      return;
    }

    isCleaningUpRef.current = true;
    console.log("🧹 STT 리소스 정리 중...");

    try {
      // 1. STT 중지 (안전하게)
      try {
        SpeechRecognition.stopListening();
        console.log("🔴 STT 강제 중지됨");
      } catch (error) {
        console.warn("STT 중지 중 오류:", error);
      }

      // 2. transcript 초기화 (안전하게)
      try {
        resetTranscript();
        console.log("📝 STT transcript 초기화됨");
      } catch (error) {
        console.warn("transcript 초기화 중 오류:", error);
      }

      // 3. SpeechRecognition 완전 중단 (안전하게)
      try {
        SpeechRecognition.abortListening();
        console.log("🚫 STT 강제 중단됨");
      } catch (error) {
        console.warn("STT 강제 중단 중 오류 (정상적일 수 있음):", error);
      }

      console.log("✅ STT 리소스 정리 완료");
    } catch (error) {
      console.error("STT 정리 중 예상치 못한 오류:", error);
    } finally {
      // 🔥 플래그 해제 (지연 처리)
      setTimeout(() => {
        isCleaningUpRef.current = false;
      }, 100);
    }
  };

  // 🔥 강제 중단 함수 (비상시 사용) - 안전하게 개선
  const forceStop = () => {
    if (isCleaningUpRef.current) {
      console.log("⚠️ 이미 정리 중이므로 forceStop 건너뜀");
      return;
    }

    console.log("🚨 STT 강제 중단 실행");
    try {
      SpeechRecognition.abortListening();
      resetTranscript();
      console.log("✅ STT 강제 중단 완료");
    } catch (error) {
      console.warn("STT 강제 중단 실패:", error);
    }
  };

  return {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    cleanup,
    forceStop,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  };
};

export default useSpeechToText;
