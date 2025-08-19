// src/features/pronunciation/components/AnalyzingStage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { usePronunciationStore } from "@/store/pronunciationStore";
import * as styles from "./PronunciationModal.css.ts";

export function AnalyzingStage() {
  const {
    setCurrentStage,
    setAnalysisResult,
    recordedAudioBlob,
    currentContext,
  } = usePronunciationStore();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("음성 분석 중");

  const steps = useMemo(
    () => [
      "음성 분석 중",
      "발음 정확도 계산 중",
      "리듬 패턴 분석 중",
      "최종 점수 산출 중",
    ],
    []
  );

  useEffect(() => {
    // 가짜 분석 프로세스 시뮬레이션
    const analyzeAudio = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i]);

        // 각 단계별 진행률 업데이트
        for (let j = 0; j <= 100; j += 5) {
          const totalProgress = (i * 100 + j) / steps.length;
          setProgress(totalProgress);
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      }

      // 실제 분석 결과 생성 (임시)
      const mockResult = {
        totalScore: Math.floor(Math.random() * 30) + 70, // 70-100점
        pitchScore: Math.floor(Math.random() * 30) + 70,
        rhythmScore: Math.floor(Math.random() * 30) + 70,
        clarityScore: Math.floor(Math.random() * 30) + 70,
        affinityChange: Math.floor(Math.random() * 10) + 5, // 5-15점
      };

      setAnalysisResult(mockResult);
      setCurrentStage("results");
    };

    analyzeAudio();
  }, [setCurrentStage, setAnalysisResult, steps]);

  return (
    <motion.div
      className={styles.stageContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.stageHeader}>
        <h2 className={styles.stageTitle}>🔄 분석 중입니다...</h2>
        <p className={styles.stageSubtitle}>발음을 비교하고 있어요</p>
      </div>

      {/* 분석 진행 영역 */}
      <div className={styles.analyzingSection}>
        {/* 진행률 표시 */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className={styles.progressText}>{Math.round(progress)}%</span>
        </div>

        {/* 현재 단계 표시 */}
        <div className={styles.currentStep}>
          <motion.div
            className={styles.stepIcon}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ⚡
          </motion.div>
          <span className={styles.stepText}>{currentStep}</span>
        </div>

        {/* 분석 단계 목록 */}
        <div className={styles.stepsList}>
          {steps.map((step, index) => (
            <motion.div
              key={step}
              className={`${styles.stepItem} ${
                steps.indexOf(currentStep) >= index ? styles.stepCompleted : ""
              }`}
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: steps.indexOf(currentStep) >= index ? 1 : 0.3,
                scale: currentStep === step ? 1.05 : 1,
              }}
            >
              <div className={styles.stepNumber}>
                {steps.indexOf(currentStep) > index ? "✅" : index + 1}
              </div>
              <span>{step}</span>
            </motion.div>
          ))}
        </div>

        {/* 애니메이션 효과 */}
        <div className={styles.analyzingSection}>
          <motion.div
            className={styles.waveformAnimation}
            animate={{
              scaleX: [1, 1.2, 1],
              scaleY: [1, 0.8, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🎵
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
