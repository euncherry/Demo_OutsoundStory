// src/features/pronunciation/components/ResultsStage.tsx
import React from "react";
import { motion } from "framer-motion";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useScoreStore } from "@/store/scoreStore";
import { ComparisonTabs } from "./ComparisonTabs.tsx";
import { DetailAnalysis } from "./DetailAnalysis.tsx";
import * as styles from "./ResultsStage.css.ts";
import { Button3D } from "@/shared/components/3DButton";

interface ResultsStageProps {
  onComplete: () => void;
}

export function ResultsStage({ onComplete }: ResultsStageProps) {
  const { currentContext, setCurrentStage } = usePronunciationStore();

  const { analysisResult } = useScoreStore();

  const handleRetry = () => {
    setCurrentStage("prepare");
  };

  if (!analysisResult || !currentContext) return null;

  return (
    <motion.div
      className={styles.resultsContainer}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* 헤더 */}
      <div className={styles.resultsHeader}>
        <h2 className={styles.resultsTitle}>🎯 발음 분석 결과</h2>
        <div className={styles.totalScore}>
          종합 점수: ⭐ {analysisResult.totalScore}/100
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className={styles.resultsContent}>
        {/* 메인 비교 영역 (70%) */}
        <div className={styles.comparisonSection}>
          <ComparisonTabs />
        </div>

        {/* 상세 분석 영역 (30%) */}
        <div className={styles.detailSection}>
          <DetailAnalysis
            result={analysisResult}
            npcId={currentContext.npcId}
          />
        </div>
      </div>

      {/* 하단 액션 버튼 */}
      <div className={styles.actionButtons}>
        {/* <motion.button
          className={styles.retryButton}
          onClick={handleRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          다시하기
        </motion.button> */}

        <Button3D variant="purple" size="medium" onClick={handleRetry}>
          다시하기
        </Button3D>

        {/* <motion.button
          className={styles.completeButton}
          onClick={onComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          완료
        </motion.button> */}

        <Button3D variant="pink" size="medium" onClick={onComplete}>
          완료
        </Button3D>
      </div>
    </motion.div>
  );
}
