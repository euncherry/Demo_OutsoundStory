// src/features/pronunciation/components/PronunciationModal.tsx (수정)
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { PrepareStage } from "./PrepareStage";
import { RecordingStage } from "./RecordingStage";
import { AnalyzingStage } from "./AnalyzingStage";
import { ResultsStage } from "./ResultsStage";
import * as styles from "./PronunciationModal.css.ts";

interface PronunciationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: { totalScore: number; affinityChange: number }) => void; // ✅ 수정
}

export function PronunciationModal({
  isOpen,
  onClose,
  onComplete,
}: PronunciationModalProps) {
  const { currentStage, analysisResult, reset } = usePronunciationStore();

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleComplete = () => {
    // ✅ 분석 결과를 함께 전달
    if (analysisResult) {
      onComplete({
        totalScore: analysisResult.totalScore,
        affinityChange: analysisResult.affinityChange,
      });
    }
    reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* 모달 컨테이너 */}
          <motion.div
            className={styles.modalContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transform: "translate(-50%, -50%)",
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {currentStage === "prepare" && <PrepareStage key="prepare" />}
              {currentStage === "recording" && (
                <RecordingStage key="recording" />
              )}
              {currentStage === "analyzing" && (
                <AnalyzingStage key="analyzing" />
              )}
              {currentStage === "results" && (
                <ResultsStage key="results" onComplete={handleComplete} />
              )}
            </AnimatePresence>

            {/* 닫기 버튼 */}
            <button className={styles.closeButton} onClick={handleClose}>
              ✕
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
