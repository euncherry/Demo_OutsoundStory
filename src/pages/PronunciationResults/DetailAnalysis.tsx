// src/features/pronunciation/components/DetailAnalysis.tsx
import React from "react";
import { getNPCById } from "@/data/npcs/npcData.ts";
import { useScoreStore } from "@/store/scoreStore";
import * as styles from "./ResultsStage.css";

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
        high: "발음이 매우 정확해요. \n 정말 대단해요.",
        medium: "나쁘지 않아요. \n  조금만 더 노력하면 될 것 같아요.",
        low: "아직 부족한 부분이 있어요. \n  천천히 연습해보세요.",
      },
      dojin: {
        high: "이 정도면 비즈니스 미팅에서도 당당할 수 있겠어.",
        medium: "나쁘지 않지만, \n  완벽을 추구해야지.",
        low: "이런 발음으로는... 더 연습이 필요해.",
      },
      yohan: {
        high: "정말 잘하셨어요.  \n 하나님께서 주신 재능이에요.",
        medium: "꾸준히 연습하면 더 좋아질 거예요.",
        low: "괜찮아요. \n  천천히 함께 연습해봐요.",
      },
      kanghyuk: {
        high: "...예상보다 뛰어나네. \n  흥미롭다.",
        medium: "그럭저럭... 나쁘지 않아.",
        low: "...더 노력이 필요할 것 같은데?",
      },
      chaerin: {
        high: "헐! 발음 완전 대박 좋아요!\n  역시 내 눈은 정확했어!",
        medium: "음~ 나쁘지 않은데?\n  이 정도면 뭐, 봐줄 만하네!",
        low: "아앗... 아직 좀 아쉬운데?\n  나랑 연습 더 해야겠다!",
      },
      gaeul: {
        high: "우와! 발음 정말 최고예요! \n 저도 이렇게 발음하고 싶어요! ",
        medium:
          "오! 발음 괜찮은데요? \n 조금만 더 노력하면 완벽해질 것 같아요! ",
        low: "음... 아직 좀 아쉬워요! \n 그래도 괜찮아요 ㅎㅎ",
      },
      mihyun: {
        high: "정말 정확한 발음이네요... \n 대단해요. 놀랐어요.",
        medium: "나쁘지 않아요. \n 조금만 더 다듬으면 완벽해질 것 같아요.",
        low:
          "아직... 조금 부족한 부분이 보이네요.\n  연습이 더 필요할 것 같아요.",
      },
      sunhwa: {
        high: "어머~ 오빠 발음 완전 끝내주네? \n 내가 감동했잖아!",
        medium: "나쁘지 않은데? \n 이 정도면 뭐, 평타는 치네!",
        low: "아직 부족한데? \n 더 연습해서 나한테 점수 따야지!",
      },
      yujin: {
        high: "이야~ 발음 짱인데? \n 역시 내 안목은 틀리지 않았어!",
        medium: " 뭐, 이 정도면 봐줄 만하네.\n 더 열심히 해봐!",
        low: "아직 갈 길이 멀다! \n 다음엔 더 확실하게 해봐. 알았지?",
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
          </div>

          <div className={styles.reactionText}>
            {analysisResult.feedback[0] || "리듬을 더 정확하게 해보세요"}
          </div>
        </div>

        {/* 파형 정확도 */}
        <div className={styles.scoreItem}>
          <div className={styles.scoreLabel}>
            <span>파형 정확도</span>
          </div>
          <div className={styles.reactionText}>
            {analysisResult.feedback[1] || "음정을 확인해 보세요"}
          </div>
        </div>

        {/* 발음 명료도 */}
        <div className={styles.scoreItem}>
          <div className={styles.scoreLabel}>
            <span>발음 명료도</span>
          </div>
          <div className={styles.reactionText}>
            {analysisResult.feedback[2] || "발음을 더 명확하게 해보세요"}
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
            style={{
              color: npcData?.themeColor || "#8B5CF6",
              whiteSpace: "pre-line",
            }}
          >
            {getNPCReaction(npcId, analysisResult?.totalScore || 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
