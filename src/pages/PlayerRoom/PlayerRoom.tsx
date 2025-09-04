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

export function PlayerRoom() {
  const { name } = usePlayerStore();
  const { transitionTo } = useGameFlowStore();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    transitionTo("room");
  }, [transitionTo]);

  return (
    <div className={styles.container}>
      {/* 환경 효과 (파티클, 비네팅 등) */}
      <EnvironmentEffects />

      {/* 메인 콘텐츠 */}
      <div className={styles.content}>
        {/* 플레이어 이름 */}
        <motion.h1
          className={styles.playerName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {name}의 방
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
