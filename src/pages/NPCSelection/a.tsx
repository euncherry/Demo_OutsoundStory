// src/pages/NPCSelection/NPCCard.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NPCData } from '@/data/npcs/npcData';
import * as styles from './NPCSelection.css.ts';

interface NPCCardProps {
  npc: NPCData;
  index: number;
  onSelect: (npcId: string) => void;
  isLocked?: boolean;
}

export function NPCCard({ npc, onSelect, isLocked = false }: NPCCardProps) {
  const isSpecialCharacter = npc.id === 'kanghyuk' || npc.id === 'gaeul';
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked) {
      // 잠긴 카드는 플립 효과만 적용
      setIsFlipped(!isFlipped);
    } else {
      onSelect(npc.id);
    }
  };

  // 잠금 해제 조건 메시지
  const getUnlockHint = () => {
    if (npc.id === 'kanghyuk') {
      return "서도진의 스토리를 완료하면 해금됩니다";
    }
    if (npc.id === 'gaeul') {
      return "다른 캐릭터를 먼저 만나보세요";
    }
    return "조건을 달성하면 해금됩니다";
  };

  return (
    <div style={{ perspective: '1000px', width: '100%', height: '100%' }}>
      <motion.div
        className={`${styles.npcCard} ${isSpecialCharacter ? styles.mysteryCard : ''}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          rotateY: isFlipped ? 180 : 0
        }}
        transition={{
          duration: 0.6,
          delay: 0,
          ease: 'easeOut',
        }}
        whileHover={!isLocked ? {
          scale: 1.05,
          y: -10,
        } : {}}
        whileTap={!isLocked ? { scale: 0.98 } : {}}
        onClick={handleClick}
        style={{
          background: `linear-gradient(135deg, ${npc.themeColor}22, ${npc.themeColor}44)`,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* 앞면 */}
        <motion.div
          style={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            inset: 0,
            opacity: isFlipped ? 0 : 1,
          }}
        >
          {/* 특별 캐릭터 효과 */}
          {isSpecialCharacter && (
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
          <motion.div 
            className={styles.imageWrapper} 
            whileHover={!isLocked ? { scale: 1.1 } : {}}
            style={{ filter: isLocked ? 'brightness(0.3) blur(2px)' : 'none' }}
          >
            <img 
              src={isLocked ? '/src/assets/ui/mystery-silhouette.png' : npc.profileImage} 
              alt={npc.nameKo} 
              className={styles.profileImage} 
            />
            {isSpecialCharacter && <div className={styles.hologramOverlay} />}
          </motion.div>

          {/* 캐릭터 정보 */}
          <div className={styles.cardInfo} style={{ opacity: isLocked ? 0.5 : 1 }}>
            <h3 className={styles.npcName}>
              {isLocked ? '???' : npc.nameKo}
            </h3>
            <p className={styles.npcAge}>
              {isLocked ? '??세' : `${npc.age}세`}
            </p>
            <p className={styles.npcOccupation}>
              {isLocked ? '???' : npc.occupation}
            </p>
            <p className={styles.npcIntro}>
              {isLocked ? '아직 만날 수 없는 인물입니다' : npc.introduction}
            </p>
          </div>

          {/* 호버 시 나타나는 이펙트 (잠금 해제 시만) */}
          {!isLocked && (
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
          )}
        </motion.div>

        {/* 뒷면 */}
        <motion.div
          style={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            inset: 0,
            transform: 'rotateY(180deg)',
            opacity: isFlipped ? 1 : 0,
          }}
        >
          <div className={styles.lockOverlay}>
            <motion.div
              className={styles.lockIcon}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🔒
            </motion.div>
            <p className={styles.lockHint}>{getUnlockHint()}</p>
            
            {/* 다시 뒤집기 힌트 */}
            <motion.div
              style={{
                marginTop: '20px',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
                textAlign: 'center',
              }}
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              다시 터치하여 돌아가기
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}