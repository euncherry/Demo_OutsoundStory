// src/pages/PronunciationResults/PronunciationResults.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useScoreStore } from "@/store/scoreStore";
import { ComparisonTabs } from "./ComparisonTabs";
import { DetailAnalysis } from "./DetailAnalysis";
import { Button3D } from "@/shared/components/3DButton";
import { useDialogueFlow } from "@/features/dialogue/hooks/useDialogueFlow";
import * as styles from "./ResultsStage.css.ts";

export function PronunciationResults() {
  const navigate = useNavigate();
  const { currentContext, reset, setCurrentStage } = usePronunciationStore();
  const { analysisResult } = useScoreStore();
  const { setIsComplete } = useDialogueFlow();

  // 필수 데이터가 없으면 메인 스토리로 리다이렉트
  useEffect(() => {
    if (!analysisResult || !currentContext) {
      navigate("/story", { replace: true });
    }
  }, [analysisResult, currentContext, navigate]);

  const handleRetry = () => {
    setCurrentStage("prepare");
    navigate("/story"); // 다시 스토리 페이지로 돌아가서 모달 열기
  };

  const handleComplete = () => {
    setIsComplete(true);
    reset();
    navigate("/story"); // 스토리 완료 후 메인 스토리로 돌아감
  };

  const handleBack = () => {
    navigate("/story");
  };

  if (!analysisResult || !currentContext) return null;

  return (
    <div className={styles.resultsContainer}>
      {/* 뒤로가기 버튼 */}
      {/* <motion.button
        className={styles.backButton}
        onClick={handleBack}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        ← 뒤로가기
      </motion.button> */}

      <motion.div
        className={styles.resultsContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        {/* 헤더 */}
        <div className={styles.resultsHeader}>
          <h1 className={styles.resultsTitle}>🎯 발음 분석 결과</h1>
          <div className={styles.totalScore}>
            종합 점수: ⭐ {analysisResult.totalScore}/100
          </div>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className={styles.resultsContent}>
          <div className={styles.comparisonSection}>
            <ComparisonTabs />
          </div>
          <div className={styles.detailSection}>
            <DetailAnalysis npcId={currentContext.npcId} />
          </div>
        </div>

        {/* 하단 액션 버튼 */}
        <div className={styles.actionButtons}>
          <Button3D variant="purple" size="small" onClick={handleRetry}>
            다시하기
          </Button3D>
          <Button3D variant="pink" size="small" onClick={handleComplete}>
            완료
          </Button3D>
        </div>
      </motion.div>
    </div>
  );
}
