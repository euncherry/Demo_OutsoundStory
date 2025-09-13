// src/pages/PlayerRoom/MenuButtons.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@shared/components/Button";
import { usePlayerStore } from "@/store/playerStore";
import * as styles from "./PlayerRoom.css";

// 언어별 텍스트 정의
const texts = {
  ko: {
    startEpisode: "에피소드 시작",
  },
  en: {
    startEpisode: "Start Episode",
  },
};

export function MenuButtons() {
  const navigate = useNavigate();
  const { language } = usePlayerStore();

  // 현재 언어에 맞는 텍스트
  const t = texts[language];

  const handleStartEpisode = () => {
    navigate("/select-npc");
  };

  return (
    <motion.div
      className={styles.menuContainer}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <Button
        variant="special"
        size="xlarge"
        onClick={handleStartEpisode}
        icon="✨"
        iconPosition="right"
        style={{
          fontSize: "1.3rem",
          padding: "1.2rem 2.5rem",
        }}
      >
        {t.startEpisode}
      </Button>
    </motion.div>
  );
}
