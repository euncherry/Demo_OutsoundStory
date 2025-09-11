// src/pages/NPCSelection/NPCSelection.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCharacterStore, useGameFlowStore } from "@/store";
import { useScoreStore } from "@/store/scoreStore";
import { NPCGrid } from "./NPCGrid";
import * as styles from "./NPCSelection.css";

export function NPCSelection() {
  const navigate = useNavigate();
  const { selectNPC } = useCharacterStore();
  const { transitionTo, updateProgress } = useGameFlowStore();
  const { reset: resetScore } = useScoreStore();

  const handleSelectNPC = (npcId: string) => {
    // NPC 선택 저장
    selectNPC(npcId);

    resetScore();

    // 진행 상태 업데이트
    updateProgress("hasSelectedNPC", true);
    transitionTo("dialogue");

    // MainStory로 이동
    setTimeout(() => {
      navigate("/story");
    }, 500);
  };

  const handleBack = () => {
    navigate("/room");
  };

  return (
    <div className={styles.container}>
      {/* 배경 애니메이션 */}
      <motion.div className={styles.backgroundGradient} />

      {/* 헤더 */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <button className={styles.backButton} onClick={handleBack}>
          ← 뒤로
        </button>
        <h1 className={styles.title}>캐릭터를 선택하세요</h1>
        <p className={styles.subtitle}>당신의 운명적인 만남이 시작됩니다</p>
      </motion.div>

      {/* NPC 그리드 */}
      <NPCGrid onSelectNPC={handleSelectNPC} />
    </div>
  );
}
