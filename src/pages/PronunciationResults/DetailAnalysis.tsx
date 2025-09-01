// src/features/pronunciation/components/DetailAnalysis.tsx
import React from "react";
import { getNPCById } from "@/data/npcs/npcData.ts";
import { useScoreStore } from "@/store/scoreStore";
import * as styles from "./ResultsStage.css.ts";

interface DetailAnalysisProps {
  result?: unknown; // analysisResult 타입 (선택적)
  npcId: string;
}

export function DetailAnalysis({ npcId }: DetailAnalysisProps) {
  const npcData = getNPCById(npcId);
  const { analysisResult } = useScoreStore();

  // analysisResult가 없으면 로딩 상태 표시
  if (!analysisResult) {
    return (
      <div className={styles.detailPanel}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>⏳</div>
          <p>분석 결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // NPC별 반응 메시지 (하드코딩)
  const getNPCReaction = (npcId: string, score: number) => {
    const reactions: Record<string, Record<string, string>> = {
      hojun: {
        high: "와! 발음이 정말 좋아요! 😊",
        medium: "발음이 꽤 괜찮네요~ ㅎㅎ",
        low: "아직 연습이 더 필요할 것 같아요!",
      },
      jihoon: {
        high: "발음이 매우 정확하시네요. 대단해요.",
        medium: "나쁘지 않아요. 조금만 더 노력하면 될 것 같아요.",
        low: "아직 부족한 부분이 있어요. 천천히 연습해보세요.",
      },
      dojin: {
        high: "이 정도면 비즈니스 미팅에서도 당당할 수 있겠어.",
        medium: "나쁘지 않지만, 완벽을 추구해야지.",
        low: "이런 발음으로는... 더 연습이 필요해.",
      },
      yohan: {
        high: "정말 잘하셨어요. 하나님께서 주신 재능이에요.",
        medium: "꾸준히 연습하면 더 좋아질 거예요.",
        low: "괜찮아요. 천천히 함께 연습해봐요.",
      },
      kanghyuk: {
        high: "...예상보다 뛰어나네. 흥미롭다.",
        medium: "그럭저럭... 나쁘지 않아.",
        low: "...더 노력이 필요할 것 같은데?",
      },
    };

    const level = score >= 85 ? "high" : score >= 70 ? "medium" : "low";
    return reactions[npcId]?.[level] || "좋은 발음이었어요!";
  };

  const getProgressBarStyle = (score: number) => ({
    background: `linear-gradient(90deg, 
      ${npcData?.themeColor || "#8B5CF6"} 0%, 
      ${npcData?.themeColor || "#8B5CF6"}80 ${score}%, 
      rgba(255,255,255,0.2) ${score}%)`,
  });

  return (
    <div className={styles.detailPanel}>
      {/* 📊 세부 분석 */}
      <div className={styles.scoreSection}>
        <h3 className={styles.detailTitle}>📊 세부 분석</h3>

        {/* 음정 정확도 */}
        <div className={styles.scoreItem}>
          <div className={styles.scoreLabel}>
            <span>음정 정확도</span>
            <span className={styles.scoreValue}>
              {analysisResult?.pitchScore
                ? `${analysisResult?.pitchScore}%`
                : "측정 불가"}
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={getProgressBarStyle(analysisResult?.pitchScore || 0)}
            />
          </div>
        </div>

        {/* 파형 정확도 */}
        <div className={styles.scoreItem}>
          <div className={styles.scoreLabel}>
            <span>파형 정확도</span>
            <span className={styles.scoreValue}>
              {analysisResult?.waveformScore
                ? `${analysisResult?.waveformScore}%`
                : "측정 불가"}
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={getProgressBarStyle(analysisResult?.waveformScore || 0)}
            />
          </div>
        </div>

        {/* 발음 명료도 */}
        <div className={styles.scoreItem}>
          <div className={styles.scoreLabel}>
            <span>발음 명료도</span>
            <span className={styles.scoreValue}>
              {analysisResult?.cerScore
                ? `${analysisResult?.cerScore}%`
                : "측정 불가"}
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={getProgressBarStyle(analysisResult?.cerScore || 0)}
            />
          </div>
        </div>
      </div>

      {/* 💝 호감도 & NPC 반응 */}

      <div className={styles.feedbackSection}>
        {/* <div className={styles.affinityChange}>
          <div className={styles.affinityIcon}>💝</div>
          <div className={styles.affinityText}>
            <span>호감도 변화</span>
            <span className={styles.affinityValue}>
              +{Math.round((analysisResult?.totalScore || 0) / 10)} 포인트!
            </span>
          </div>
        </div> */}
        <div className={styles.imageWrapper}>
          <img
            src={npcData?.profileImage}
            alt={npcData?.nameKo}
            className={styles.profileImage}
          />
        </div>

        <div className={styles.npcReaction}>
          <div className={styles.reactionHeader}>
            <span className={styles.reactionIcon}>🎭</span>
            <span className={styles.reactionLabel}>
              {npcData?.nameKo}의 반응
            </span>
          </div>
          <div
            className={styles.reactionText}
            style={{ color: npcData?.themeColor || "#8B5CF6" }}
          >
            "{getNPCReaction(npcId, analysisResult?.totalScore || 0)}"
          </div>
        </div>

        {/* 간단한 피드백 */}
        <div className={styles.feedbackSection}>
          <div className={styles.npcReaction}>
            <div className={styles.reactionHeader}>
              <span className={styles.reactionIcon}>🎯</span>
              <span className={styles.reactionLabel}>전체 평가</span>
            </div>
            <div className={styles.reactionText}>
              {analysisResult.feedback.map((feedback, index) => (
                <div key={index}>{feedback}</div>
              ))}

              {/* {analysisResult?.totalScore >= 90
                ? "완벽해요!"
                : analysisResult?.totalScore >= 80
                ? "정말 잘했어요!"
                : analysisResult?.totalScore >= 70
                ? "좋아요!"
                : analysisResult?.totalScore >= 60
                ? "괜찮아요!"
                : "다시 도전해보세요!"} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
