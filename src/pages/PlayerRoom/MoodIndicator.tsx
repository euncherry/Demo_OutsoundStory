// src/pages/PlayerRoom/MoodIndicator.tsx
import React from "react";
import { motion } from "framer-motion";
import * as styles from "./PlayerRoom.css";

export function MoodIndicator() {
  const moodLevel = 20; // 낮은 기분 상태

  return (
    <motion.div
      className={styles.moodContainer}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div className={styles.moodHeader}>
        <span className={styles.moodIcon}>😔</span>
        <span className={styles.moodLabel}>기분</span>
      </div>

      <div className={styles.moodBar}>
        <motion.div
          className={styles.moodFill}
          initial={{ width: 0 }}
          animate={{ width: `${moodLevel}%` }}
          transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
        />
      </div>

      <p className={styles.moodText}>"오늘도 무기력한 하루..."</p>

      {/* 날씨 아이콘 */}
      <div className={styles.weatherIcon}>
        🌧️ <span>흐림</span>
      </div>
    </motion.div>
  );
}
