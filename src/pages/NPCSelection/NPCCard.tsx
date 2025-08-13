// src/pages/NPCSelection/NPCCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { NPCData } from '@/data/npcs/npcData';
import * as styles from './NPCSelection.css.ts';

interface NPCCardProps {
  npc: NPCData;
  index: number;
  onSelect: (npcId: string) => void;
}

export function NPCCard({ npc, index, onSelect }: NPCCardProps) {
  const isKanghyuk = npc.id === 'kanghyuk';

  return (
    <motion.div
      className={`${styles.npcCard} ${isKanghyuk ? styles.mysteryCard : ''}`}
      initial={{ opacity: 0, rotateY: -180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{
        duration: 0.1,
        ease: 'easeOut',
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 50,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(npc.id)}
      style={{
        background: `linear-gradient(135deg, ${npc.themeColor}22, ${npc.themeColor}44)`,
      }}
    >
      {/* 강혁 특별 효과 */}
      {isKanghyuk && (
        <motion.div
          className={styles.glitchEffect}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* 프로필 이미지 */}
      <motion.div className={styles.imageWrapper} whileHover={{ scale: 1.1 }}>
        <img src={npc.profileImage} alt={npc.nameKo} className={styles.profileImage} />
        {isKanghyuk && <div className={styles.hologramOverlay} />}
      </motion.div>

      {/* 캐릭터 정보 */}
      <div className={styles.cardInfo}>
        <h3 className={styles.npcName}>{npc.nameKo}</h3>
        <p className={styles.npcAge}>{npc.age}세</p>
        <p className={styles.npcOccupation}>{npc.occupation}</p>
        <p className={styles.npcIntro}>{npc.introduction}</p>
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
