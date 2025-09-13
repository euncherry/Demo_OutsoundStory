// src/pages/NPCSelection/NPCCard.tsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { NPCData } from "@/data/npcs/npcData";
import { usePlayerStore } from "@/store/playerStore";
import * as styles from "./NPCSelection.css";

// 언어별 UI 텍스트
const texts = {
  ko: {
    age: "세",
    unlockHints: {
      kanghyuk: "서도진의 스토리를 완료하면 해금됩니다",
      gaeul: "다른 캐릭터를 먼저 만나보세요",
      default: "조건을 달성하면 해금됩니다",
    },
    secretPlay: "몰래 먼저 플레이",
  },
  en: {
    age: " years old",
    unlockHints: {
      kanghyuk: "Complete Seo Dojin's story to unlock",
      gaeul: "Meet other characters first",
      default: "Complete conditions to unlock",
    },
    secretPlay: "Play secretly",
  },
};

interface NPCCardProps {
  npc: NPCData;
  onSelect: (npcId: string) => void;
  index: number;
  //Anchor : 해금
  // isLocked?: boolean; // 잠금 상태
}

export function NPCCard({
  npc,
  onSelect,
  index,
}: //Anchor : 해금
// isLocked = false,
NPCCardProps) {
  const { language } = usePlayerStore();
  const t = texts[language];

  // 현재 언어에 맞는 NPC 텍스트 데이터
  const npcText = npc[language];

  const isKanghyuk = useMemo(() => npc.id === "kanghyuk", [npc.id]);
  const isGaeul = useMemo(() => npc.id === "gaeul", [npc.id]);
  const isSpecialNPC = useMemo(() => isKanghyuk || isGaeul, [
    isKanghyuk,
    isGaeul,
  ]);

  const [isSpecialClick, setIsSpecialClick] = useState(true);

  // 잠금 해제 조건 메시지
  const getUnlockHint = () => {
    if (npc.id === "kanghyuk") {
      return t.unlockHints.kanghyuk;
    }
    if (npc.id === "gaeul") {
      return t.unlockHints.gaeul;
    }
    return t.unlockHints.default;
  };

  const handleClick = (e: React.MouseEvent) => {
    // 이벤트 버블링 방지
    e.stopPropagation();

    console.log("dfjhkalefklanelfalwsnkef", npc.id);
    if (isKanghyuk || isGaeul) {
      return setIsSpecialClick(!isSpecialClick);
    }
    onSelect(npc.id);
  };

  const handleSecretClick = (e: React.MouseEvent) => {
    // 이벤트 버블링 방지
    e.stopPropagation();

    console.log("dfjhkalefklanelfalwsnkef secret", npc.id);
    onSelect(npc.id);
  };

  return (
    <motion.div
      className={`${styles.npcCard} ${isSpecialNPC ? styles.mysteryCard : ""}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.1,
        delay: 0,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      style={{
        background: `linear-gradient(135deg, ${npc.themeColor}22, ${npc.themeColor}44)`,
      }}
    >
      {/* 강혁/가을 특별 효과 */}
      {isSpecialNPC && (
        <motion.div
          className={styles.glitchEffect}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />
      )}

      {/* 프로필 이미지 */}
      <div className={styles.imageWrapper}>
        <img
          src={npc.profileImage}
          alt={npcText.name}
          className={styles.profileImage}
        />
        {isSpecialNPC && <div className={styles.hologramOverlay} />}
      </div>

      {/* 캐릭터 정보 */}
      <div className={styles.cardInfo}>
        <h3 className={styles.npcName}>{npcText.name}</h3>
        <motion.div
          key={`${npc.id}-${index}`}
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {isKanghyuk || isGaeul ? (
            <motion.div
              key={`${npc.id}-${isSpecialClick ? "special" : "normal"}`}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
              exit={{ opacity: 0, y: -30, rotateX: 10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {isSpecialClick ? (
                <motion.div
                  className={styles.lockOverlay}
                  initial={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  animate={{ backgroundColor: "rgba(255, 255, 255, 0.22)" }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={styles.lockIcon}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "tween",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    {getUnlockHint()}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  className={styles.lockOverlay}
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={styles.lockIcon}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className={styles.npcOccupation}>{npcText.occupation}</p>
                    <p
                      className={styles.secretPlayButton}
                      onClick={handleSecretClick}
                    >
                      {t.secretPlay}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20, x: -10 }}
              animate={{
                opacity: 1,
                y: 0,
                x: 0,
                transition: {
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                },
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.p
                className={styles.npcAge}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {npc.age}
                {language === "ko" ? "세" : t.age}
              </motion.p>
              <motion.p
                className={styles.npcOccupation}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {npcText.occupation}
              </motion.p>
              <motion.p
                className={styles.npcIntro}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {npcText.introduction}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* 호버 시 나타나는 이펙트 */}
      <motion.div
        className={styles.hoverEffect}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div className={styles.sparkles}>
          {Array.from({ length: 5 }, (_, i) => (
            <motion.span
              key={i}
              className={styles.sparkle}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 2) * 20}%`,
              }}
            >
              ✨
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
