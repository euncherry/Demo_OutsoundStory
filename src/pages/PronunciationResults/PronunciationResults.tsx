// src/pages/PronunciationResults/PronunciationResults.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useScoreStore } from "@/store/scoreStore";
import { ComparisonTabs } from "./ComparisonTabs";
import { DetailAnalysis } from "./DetailAnalysis";
import { Button3D } from "@/shared/components/3DButton";
import { useDialogueFlow } from "@/features/dialogue/hooks/useDialogueFlow";
import * as styles from "./ResultsStage.css";

export function PronunciationResults() {
  const navigate = useNavigate();
  const {
    currentContext,
    reset,
    setCurrentStage,
    recordedAudioBase64,
  } = usePronunciationStore();
  const { analysisResult } = useScoreStore();
  const { setIsComplete } = useDialogueFlow();

  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  function base64ToBlob(base64: string): Blob {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "audio/wav";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  }
  // 중앙에서 오디오 URL 관리
  useEffect(() => {
    if (!recordedAudioBase64) return;

    if (recordedAudioBase64) {
      const blob = base64ToBlob(recordedAudioBase64);
      const url = URL.createObjectURL(blob);
      setUserAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [recordedAudioBase64]);

  // 점수 카운트 애니메이션
  useEffect(() => {
    if (!analysisResult) return;

    const targetScore = analysisResult.totalScore;
    const duration = 2000; // 2초
    const startTime = Date.now();

    const animateScore = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic 이징 함수
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentScore = Math.round(targetScore * easeOutCubic);

      setAnimatedScore(currentScore);

      if (progress < 1) {
        requestAnimationFrame(animateScore);
      }
    };

    // 약간의 지연 후 애니메이션 시작
    const timer = setTimeout(() => {
      requestAnimationFrame(animateScore);
    }, 500);

    return () => clearTimeout(timer);
  }, [analysisResult]);

  // 필수 데이터가 없으면 메인 스토리로 리다이렉트
  useEffect(() => {
    if (!analysisResult || !currentContext) {
      navigate("/story", { replace: true });
    }
  }, [analysisResult, currentContext, navigate]);

  const handleRetry = () => {
    navigate("/story"); // 다시 스토리 페이지로 돌아가서 모달 열기
    setCurrentStage("prepare");
    reset();
  };

  const handleComplete = () => {
    setIsComplete(true);
    reset();
    navigate("/story"); // 스토리 완료 후 메인 스토리로 돌아감
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
          <h1 className={styles.resultsTitle}>🏆 발음 연습 결과</h1>
          <div className={styles.totalScore}>종합 점수: {animatedScore}점</div>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className={styles.resultsContent}>
          <div className={styles.comparisonSection}>
            <ComparisonTabs userAudioUrl={userAudioUrl} />
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
