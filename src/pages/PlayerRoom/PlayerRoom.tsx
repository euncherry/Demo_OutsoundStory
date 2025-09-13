// src/pages/PlayerRoom/PlayerRoom.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePlayerStore, useGameFlowStore } from "@/store";
import { PlayerAvatar } from "./PlayerAvatar";
import { MoodIndicator } from "./MoodIndicator";
import { EnvironmentEffects } from "./EnvironmentEffects";
import { MenuButtons } from "./MenuButtons";
import { DiaryHint } from "./DiaryHint";
import * as styles from "./PlayerRoom.css";
import { useNavigate } from "react-router-dom";

// 언어별 텍스트 정의
const texts = {
  ko: {
    menuButton: "메뉴화면",
    roomTitle: (name: string) => `${name}의 방`,
    backIcon: "↩️",
  },
  en: {
    menuButton: "Main Menu",
    roomTitle: (name: string) => `${name}'s Room`,
    backIcon: "↩️",
  },
};

export function PlayerRoom() {
  const { name, language } = usePlayerStore();
  const { transitionTo } = useGameFlowStore();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // 현재 언어에 맞는 텍스트
  const t = texts[language];

  useEffect(() => {
    transitionTo("room");
  }, [transitionTo]);

  const handleHomeButton = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      {/* 환경 효과 (파티클, 비네팅 등) */}
      <EnvironmentEffects />

      {/* 메인 콘텐츠 */}
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className={styles.comboContainer}
        >
          <button className={styles.comboBtn} onClick={handleHomeButton}>
            <span>{t.backIcon}</span>
            <span>{t.menuButton}</span>
          </button>
        </motion.div>

        {/* 플레이어 이름 */}
        <motion.h1
          className={styles.playerName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {t.roomTitle(name)}
        </motion.h1>

        {/* 플레이어 아바타 (중앙) */}
        <PlayerAvatar />

        {/* 기분 표시기 (왼쪽) */}
        <MoodIndicator />

        {/* 일기장 힌트 (오른쪽) */}
        <DiaryHint isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* 메뉴 버튼들 (하단) */}
        <MenuButtons />
      </div>
    </div>
  );
}
