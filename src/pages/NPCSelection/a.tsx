// src/pages/NPCSelection/NPCCard.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { NPCData } from "@/data/npcs/npcData";
import * as styles from "./NPCSelection.css";

interface NPCCardProps {
  npc: NPCData;
  index: number;
  onSelect: (npcId: string) => void;
  isLocked?: boolean; // 잠금 상태
}

export function NPCCard({
  npc,
  index,
  onSelect,
  isLocked = false,
}: NPCCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const isKanghyuk = npc.id === "kanghyuk";

  const handleClick = (e: React.MouseEvent) => {
    // 이벤트 버블링 방지
    e.stopPropagation();
    if (isKanghyuk && isLocked) {
      setIsFlipped((f) => !f); // Flip 카드
    } else if (!isLocked) {
      onSelect(npc.id);
    }
  };

  // 잠금 해제 조건 메시지
  const getUnlockHint = () => {
    if (npc.id === "kanghyuk") {
      return "서도진의 스토리를 완료하면 해금됩니다";
    }
    if (npc.id === "hyejin") {
      return "다른 캐릭터를 먼저 만나보세요";
    }
    return "조건을 달성하면 해금됩니다";
  };

  return (
    <div className={styles.cardWrapper}>
      <motion.div
        className={`${styles.npcCard} ${isKanghyuk ? styles.mysteryCard : ""}`}
        onClick={handleClick}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{ duration: 0.6 }}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
          }}
        >
          {/* 앞면 */}
          <div
            className={styles.cardFront}
            style={{
              backfaceVisibility: "hidden",
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
            }}
          >
            {/* 프로필 이미지 및 정보 */}
            <div className={styles.imageWrapper}>
              {/* 여기에 이미지 삽입 */}
              <img
                className={styles.profileImage}
                src={npc.profileImage}
                alt={npc.nameKo}
                draggable={false}
              />
              {/* 강혁일 때 특수 효과 */}
              {isKanghyuk && <div className={styles.glitchEffect} />}
              {isKanghyuk && <div className={styles.hologramOverlay} />}
              <div className={styles.sparkles}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={styles.sparkle}>
                    ✨
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.cardInfo}>
              <div className={styles.npcName}>{npc.nameKo}</div>
              <div className={styles.npcAge}>{npc.age}세</div>
              <div className={styles.npcOccupation}>{npc.occupation}</div>
              <div className={styles.npcIntro}>{npc.introduction}</div>
            </div>
          </div>
          {/* 뒷면 */}
          <div
            className={styles.cardBack}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.15em",
              background: "rgba(255,255,255,0.96)",
              color: "#333",
            }}
          >
            {getUnlockHint()}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );

  // return (
  //   <motion.div
  //     className={`${styles.npcCard} ${isKanghyuk ? styles.mysteryCard : ''}`}
  //     initial={{ opacity: 0, scale: 0.8 }}
  //     animate={{ opacity: 1, scale: 1 }}
  //     transition={{
  //       duration: 0.1,
  //       delay: 0,
  //       ease: 'easeOut',
  //     }}
  //     whileHover={{
  //       scale: 1.05,
  //       y: -10,
  //     }}
  //     whileTap={{ scale: 0.98 }}
  //     onClick={handleClick}
  //     style={{
  //       background: `linear-gradient(135deg, ${npc.themeColor}22, ${npc.themeColor}44)`,
  //     }}
  //   >
  //     {/* 강혁 특별 효과 */}
  //     {isKanghyuk && (
  //       <motion.div
  //         className={styles.glitchEffect}
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1 }}
  //         transition={{
  //           duration: 0.5,
  //           ease: 'easeInOut',
  //         }}
  //       />
  //     )}

  //     {/* 프로필 이미지 */}
  //     <div className={styles.imageWrapper} >
  //       <img src={npc.profileImage} alt={npc.nameKo} className={styles.profileImage} />
  //       {isKanghyuk && <div className={styles.hologramOverlay} />}
  //     </div>

  //     {/* 캐릭터 정보 */}
  //     <div className={styles.cardInfo}>
  //       <h3 className={styles.npcName}>{npc.nameKo}</h3>
  //       <p className={styles.npcAge}>{npc.age}세</p>
  //       <p className={styles.npcOccupation}>{npc.occupation}</p>
  //       <p className={styles.npcIntro}>{npc.introduction}</p>
  //     </div>

  //     {/* 호버 시 나타나는 이펙트 */}
  //     <motion.div
  //       className={styles.hoverEffect}
  //       initial={{ opacity: 0 }}
  //       whileHover={{ opacity: 1 }}
  //     >
  //       <div className={styles.sparkles}>
  //         {Array.from({ length: 5 }, (_, i) => (
  //           <motion.span
  //             key={i}
  //             className={styles.sparkle}
  //             animate={{
  //               scale: [0, 1, 0],
  //               opacity: [0, 1, 0],
  //             }}
  //             transition={{
  //               duration: 1,
  //               delay: i * 0.2,
  //               repeat: Infinity,
  //               repeatDelay: 2,
  //             }}
  //             style={{
  //               left: `${20 + i * 15}%`,
  //               top: `${10 + (i % 2) * 20}%`,
  //             }}
  //           >
  //             ✨
  //           </motion.span>
  //         ))}
  //       </div>
  //     </motion.div>
  //   </motion.div>
  // );
}
