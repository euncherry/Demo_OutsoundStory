// src/features/pronunciation/components/AnalyzingStage.tsx
import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useScoreStore } from "@/store/scoreStore";
import { useAudioAnalysis } from "@/features/pronunciation/hooks/useAudioAnalysis";
import * as styles from "./PronunciationModal.css";
import { ANALYSIS_STEPS, AnalysisStep } from "@/types/pronunciation";

export function AnalyzingStage() {
  const steps = Object.values(ANALYSIS_STEPS) as AnalysisStep[];

  const {
    currentContext,
    recordedAudioBlob,
    setCurrentStage,
  } = usePronunciationStore();

  const { analysisProgress } = useScoreStore();

  const { runFullAnalysis } = useAudioAnalysis();

  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const hasStartedRef = useRef(false); // 분석 시작 여부를 추적

  // 함수들을 useRef로 안정화
  const setCurrentStageRef = useRef(setCurrentStage);
  const runFullAnalysisRef = useRef(runFullAnalysis);

  // 최신 함수로 업데이트
  useEffect(() => {
    setCurrentStageRef.current = setCurrentStage;
    runFullAnalysisRef.current = runFullAnalysis;
  });

  useEffect(() => {
    // console.log("🔍 분석 시작 step : ", steps);
    // 이미 분석이 시작되었거나 진행 중이면 실행하지 않음
    if (hasStartedRef.current || isAnalyzing) {
      return;
    }

    if (!currentContext || !recordedAudioBlob) {
      setError("필요한 데이터가 없습니다");
      return;
    }

    console.log("🔍 분석 시작");
    hasStartedRef.current = true; // 분석 시작 플래그 설정
    setIsAnalyzing(true);

    // ref를 통해 최신 함수 호출
    runFullAnalysisRef
      .current()
      .then(() => {
        console.log("🔍 분석 완료");
        setCurrentStage("results");
      })
      .catch((err) => {
        console.error("🔍 분석 중 오류 발생 : ", err);
        setError("분석 중 오류가 발생했습니다");
        hasStartedRef.current = false; // 오류 발생시 플래그 리셋
      })
      .finally(() => {
        setIsAnalyzing(false);
      });
  }, [currentContext, recordedAudioBlob, isAnalyzing, setCurrentStage]); // 필요한 의존성만 포함

  // 컴포넌트가 언마운트될 때 플래그 리셋
  useEffect(() => {
    return () => {
      hasStartedRef.current = false;
    };
  }, []);

  if (error) {
    return (
      <div className={styles.stageContainer}>
        //TODO : css추가
        {/* <div className={styles.errorMessage}>{error}</div> */}
        <div
          style={{
            color: "#ff6b6b",
            fontSize: "1.125rem",
            textAlign: "center",
            padding: "1rem",
            background: "rgba(255, 107, 107, 0.1)",
            borderRadius: "0.5rem",
            border: "1px solid rgba(255, 107, 107, 0.3)",
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.stageContainer}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.stageHeader}>
        <h2 className={styles.stageTitle}>🔄 분석 중입니다...</h2>
        <p className={styles.stageSubtitle}>발음을 비교하고 있어요</p>
      </div>

      {/* 실제 진행률 표시 */}
      <div className={styles.analyzingSection}>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${analysisProgress.percentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className={styles.progressText}>
            {Math.round(analysisProgress.percentage)}%
          </span>
        </div>

        {/* 현재 단계 표시 */}
        <div className={styles.currentStep}>
          <div className={styles.stepIcon}>⚡</div>
          <span className={styles.stepText}>
            {analysisProgress.currentStep}
          </span>
        </div>

        {/* 분석 단계 목록 */}
        {/* <div className={styles.stepsList}>
          {steps.map((step, index) =>
            index % 2 === 0 ? (
              <motion.div
                key={step}
                className={`${styles.stepItem} ${
                  steps.indexOf(analysisProgress.currentStep) >= index
                    ? styles.stepCompleted
                    : ""
                }`}
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity:
                    steps.indexOf(analysisProgress.currentStep) >= index
                      ? 1
                      : 0.3,
                  scale: analysisProgress.currentStep === step ? 1.05 : 1,
                }}
              >
                <div className={styles.stepNumber}>
                  {steps.indexOf(analysisProgress.currentStep) > index
                    ? "✅"
                    : index + 1}
                </div>
                <span>
                  {steps.indexOf(analysisProgress.currentStep) > index
                    ? steps[index + 1] // 다음 단계 텍스트 표시
                    : step}
                </span>
              </motion.div>
            ) : null
          )}
        </div> */}

        {/* 애니메이션 효과 */}
        <div className={styles.analyzingSection}>
          <motion.div
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
