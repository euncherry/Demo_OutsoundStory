// src/features/pronunciation/components/PronunciationModal.tsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useScoreStore } from "@/store/scoreStore";
import { useDialogueFlow } from "@/features/dialogue/hooks/useDialogueFlow";
import { PrepareStage } from "./PrepareStage";
import { RecordingStage } from "./RecordingStage";
import { AnalyzingStage } from "./AnalyzingStage";
import { ResultsStage } from "./ResultsStage";
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
  const { currentStage, reset } = usePronunciationStore();
  const { analysisResult } = useScoreStore();
  const { setIsComplete } = useDialogueFlow();

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const handleClose = () => {
    // 녹음 중이거나 분석 중일 때는 확인 메시지 표시
    if (currentStage === "recording" || currentStage === "analyzing") {
      const confirmClose = window.confirm(
        "진행 중인 작업이 있습니다. 정말 닫으시겠습니까?"
      );
      if (!confirmClose) return;
    }
    if(currentStage === "results") {
      setIsComplete(true);
    }
    reset();
    onClose();
  };

  const handleComplete = () => {
    // 발음 분석 완료 시 스토리도 완료로 설정
    setIsComplete(true);
    
    if (analysisResult) {
      onComplete({
        totalScore: analysisResult.totalScore,
        //TODO : 최종 매력 계산 로직 추가 필요
        affinityChange: 0,
        // affinityChange: analysisResult.affinityChange,
      });
    }
    reset();
  };

  // 스테이지별 진행 상태
  const getStageProgress = () => {
    switch (currentStage) {
      case "prepare":
        return 1;
      case "recording":
        return 2;
      case "analyzing":
        return 3;
      case "results":
        return 4;
      default:
        return 0;
    }
  };

  const stageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
      transform: "translate(-50%, -50%)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transform: "translate(-50%, -50%)",

      transition: {
        // duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(5px)",
      transition: {
        duration: 0.3,
      },
    },
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
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />

          {/* 모달 컨테이너 */}
          <motion.div
            className={styles.modalContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={stageVariants}
          >
            {/* 진행 상태 바 */}
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "rgba(230, 220, 255, 0.2)",
                borderRadius: "30px 30px 0 0",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #d4668f, #9b7eb0, #6b7fa6)",
                  borderRadius: "2px",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${getStageProgress() * 25}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </motion.div>

            {/* 스테이지 표시 */}
            <motion.div
              style={{
                position: "absolute",
                top: "20px",
                left: "30px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
                padding: "8px 16px",
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "20px",
                border: "1px solid rgba(230, 220, 255, 0.3)",
                fontSize: "14px",
                fontWeight: 600,
                color: "rgba(107, 91, 149, 0.8)",
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span style={{ fontSize: "12px" }}>
                {currentStage === "prepare" && "🎵 준비"}
                {currentStage === "recording" && "🎙️ 녹음"}
                {currentStage === "analyzing" && "📊 분석"}
                {currentStage === "results" && "🏆 결과"}
              </span>
              <span style={{ fontSize: "12px", opacity: 0.6 }}>
                {getStageProgress()}/4
              </span>
            </motion.div>

            {/* 컨텐츠 영역 */}
            <AnimatePresence mode="wait">
              {currentStage === "prepare" && (
                <motion.div
                  key="prepare"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  style={{ height: "100%", width: "100%" }}
                >
                  <PrepareStage />
                </motion.div>
              )}

              {currentStage === "recording" && (
                <motion.div
                  key="recording"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  style={{ height: "100%", width: "100%" }}
                >
                  <RecordingStage />
                </motion.div>
              )}

              {currentStage === "analyzing" && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{ height: "100%", width: "100%" }}
                >
                  <AnalyzingStage />
                </motion.div>
              )}

              {currentStage === "results" && (
                <motion.div
                // key="results"
                // initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                // animate={{ opacity: 1, scale: 1, rotate: 0 }}
                // exit={{ opacity: 0, scale: 0.9 }}
                // transition={{
                //   duration: 0.5,
                //   type: 'spring',
                //   stiffness: 200,
                // }}
                >
                  <ResultsStage onComplete={handleComplete} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 닫기 버튼 */}
            <motion.button
              className={styles.closeButton}
              onClick={handleClose}
              whileHover={{
                scale: 1.1,
                rotate: 90,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              ✕
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
