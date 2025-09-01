// PronunciationModal.tsx에서 results stage 제거
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 추가
import { motion, AnimatePresence } from "framer-motion";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useScoreStore } from "@/store/scoreStore";
import { useDialogueFlow } from "@/features/dialogue/hooks/useDialogueFlow";
import { PrepareStage } from "./PrepareStage";
import { RecordingStage } from "./RecordingStage";
import { AnalyzingStage } from "./AnalyzingStage";
// ResultsStage import 제거
import * as styles from "./PronunciationModal.css";

interface PronunciationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: { totalScore: number; affinityChange: number }) => void;
}

export function PronunciationModal({
  isOpen,
  onClose,
  onComplete,
}: PronunciationModalProps) {
  const navigate = useNavigate(); // 추가
  const { currentStage, reset } = usePronunciationStore();
  const { analysisResult } = useScoreStore();
  const { setIsComplete } = useDialogueFlow();

  // 분석 완료 시 결과 페이지로 이동
  useEffect(() => {
    if (currentStage === "results" && analysisResult) {
      navigate("/pronunciation-results");
      onClose(); // 모달 닫기
    }
  }, [currentStage, analysisResult, navigate, onClose]);
  const handleClose = () => {
    // 녹음 중이거나 분석 중일 때는 확인 메시지 표시
    if (currentStage === "recording" || currentStage === "analyzing") {
      const confirmClose = window.confirm(
        "진행 중인 작업이 있습니다. 정말 닫으시겠습니까?"
      );
      if (!confirmClose) return;
    }
    if (currentStage === "results") {
      setIsComplete(true);
    }
    reset();
    onClose();
  };

  // const handleComplete = () => {
  //   // 발음 분석 완료 시 스토리도 완료로 설정
  //   setIsComplete(true);

  //   if (analysisResult) {
  //     // 발음 분석 완료 시 스토리도 완료로 설정
  //     setIsComplete(true);
  //     onComplete({
  //       totalScore: analysisResult.totalScore,
  //       //TODO : 최종 매력 계산 로직 추가 필요
  //       affinityChange: 0,
  //       // affinityChange: analysisResult.affinityChange,
  //     });
  //   }
  //   reset();
  // };

  const getStageProgress = () => {
    switch (currentStage) {
      case "prepare":
        return 1;
      case "recording":
        return 2;
      case "analyzing":
        return 3;
      case "results": // 이제 사용되지 않지만 호환성을 위해 유지
        return 4;
      default:
        return 0;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />

          <motion.div className={styles.modalContainer}>
            {/* 진행 상태 바 - results stage 제외하고 3단계로 변경 */}
            <motion.div
              style={{
                // ... 스타일
                width: `${getStageProgress() * 33.33}%`, // 3단계로 변경
              }}
            />

            {/* 컨텐츠 영역 - ResultsStage 제거 */}
            <AnimatePresence mode="wait">
              {currentStage === "prepare" && (
                <motion.div key="prepare">
                  <PrepareStage />
                </motion.div>
              )}

              {currentStage === "recording" && (
                <motion.div key="recording">
                  <RecordingStage />
                </motion.div>
              )}

              {currentStage === "analyzing" && (
                <motion.div key="analyzing">
                  <AnalyzingStage />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button className={styles.closeButton} onClick={handleClose}>
              ✕
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
