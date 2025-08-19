// src/features/pronunciation/components/DetailAnalysis.tsx
import React from "react";
import { getNPCById } from "@/data/npcs/npcData.ts";
import * as styles from "./ResultsStage.css.ts";

interface AnalysisResult {
  totalScore: number;
  pitchScore: number;
  rhythmScore: number;
  clarityScore: number;
  affinityChange: number;
}

interface DetailAnalysisProps {
  result: AnalysisResult;
  npcId: string;
}

export function DetailAnalysis({ result, npcId }: DetailAnalysisProps) {
  const npcData = getNPCById(npcId);

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
            <span className={styles.scoreValue}>{result.pitchScore}%</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={getProgressBarStyle(result.pitchScore)}
            />
          </div>
        </div>

        {/* 리듬 정확도 */}
        <div className={styles.scoreItem}>
          <div className={styles.scoreLabel}>
            <span>리듬 정확도</span>
            <span className={styles.scoreValue}>{result.rhythmScore}%</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={getProgressBarStyle(result.rhythmScore)}
            />
          </div>
        </div>

        {/* 발음 명료도 */}
        <div className={styles.scoreItem}>
          <div className={styles.scoreLabel}>
            <span>발음 명료도</span>
            <span className={styles.scoreValue}>{result.clarityScore}%</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={getProgressBarStyle(result.clarityScore)}
            />
          </div>
        </div>
      </div>

      {/* 💝 호감도 & NPC 반응 */}
      <div className={styles.feedbackSection}>
        <div className={styles.affinityChange}>
          <div className={styles.affinityIcon}>💝</div>
          <div className={styles.affinityText}>
            <span>호감도 변화</span>
            <span className={styles.affinityValue}>
              +{result.affinityChange} 포인트!
            </span>
          </div>
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
            "{getNPCReaction(npcId, result.totalScore)}"
          </div>
        </div>

        {/* 추가 피드백 */}
        <div className={styles.additionalFeedback}>
          <div className={styles.feedbackItem}>
            <span className={styles.feedbackIcon}>🎯</span>
            <span className={styles.feedbackText}>
              {result.totalScore >= 90
                ? "완벽해요!"
                : result.totalScore >= 80
                ? "정말 잘했어요!"
                : result.totalScore >= 70
                ? "좋아요!"
                : result.totalScore >= 60
                ? "괜찮아요!"
                : "다시 도전해보세요!"}
            </span>
          </div>

          <div className={styles.feedbackItem}>
            <span className={styles.feedbackIcon}>💡</span>
            <span className={styles.feedbackText}>
              {result.pitchScore < 70
                ? "음정에 더 집중해보세요"
                : result.rhythmScore < 70
                ? "리듬감을 살려보세요"
                : result.clarityScore < 70
                ? "더 명확하게 발음해보세요"
                : "완벽한 발음이에요!"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
