// src/pages/PlayerRoom/MoodIndicator.tsx
import React from "react";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/store/playerStore";
import * as styles from "./PlayerRoom.css";

// 언어별 텍스트 정의
const texts = {
  ko: {
    mood: "기분",
    moodText: "오늘도 무기력한 하루...",
    weather: "흐림",
  },
  en: {
    mood: "Mood",
    moodText: "Another lethargic day...",
    weather: "Cloudy",
  },
};

export function MoodIndicator() {
  const { language } = usePlayerStore();
  const moodLevel = 20; // 낮은 기분 상태

  // 현재 언어에 맞는 텍스트
  const t = texts[language];

  return (
    <motion.div
      className={styles.moodContainer}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div className={styles.moodHeader}>
        <span className={styles.moodIcon}>😔</span>
        <span className={styles.moodLabel}>{t.mood}</span>
      </div>

      <div className={styles.moodBar}>
        <motion.div
          className={styles.moodFill}
          initial={{ width: 0 }}
          animate={{ width: `${moodLevel}%` }}
          transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
        />
      </div>

      <p className={styles.moodText}>"{t.moodText}"</p>

      {/* 날씨 아이콘 */}
      <div className={styles.weatherIcon}>
        🌧️ <span>{t.weather}</span>
      </div>
    </motion.div>
  );
}
