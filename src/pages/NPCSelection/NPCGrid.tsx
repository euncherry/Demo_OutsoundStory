// src/pages/NPCSelection/NPCGrid.tsx
import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { NPCCard } from "./NPCCard";
import { getAllNPCs } from "@/data/npcs/npcData";
import { usePlayerStore } from "@/store/playerStore";
//Anchor : 해금
// import { useCharacterStore } from "@/store";

import * as styles from "./NPCSelection.css";

// 언어별 텍스트 정의
const texts = {
  ko: {
    scrollHint: "← 드래그하여 더 보기 →",
  },
  en: {
    scrollHint: "← Drag to see more →",
  },
};

interface NPCGridProps {
  onSelectNPC: (npcId: string) => void;
}

export function NPCGrid({ onSelectNPC }: NPCGridProps) {
  const allNPCs = useMemo(() => getAllNPCs(), []);
  const { language } = usePlayerStore();

  // 현재 언어에 맞는 텍스트
  const t = texts[language];

  //Anchor : 해금 - 모든 NPC를 표시
  const displayNPCs = useMemo(() => {
    return allNPCs;
  }, [allNPCs]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 드래그 제약 계산
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateDragConstraints = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        setDragConstraints({
          left: -(scrollWidth - clientWidth),
          right: 0,
        });
      }
    };

    updateDragConstraints();
    window.addEventListener("resize", updateDragConstraints);

    return () => {
      window.removeEventListener("resize", updateDragConstraints);
    };
  }, [displayNPCs]); // displayNPCs 변경 시 재계산

  return (
    <div className={styles.horizontalScrollWrapper}>
      <motion.div
        ref={containerRef}
        className={styles.horizontalGridContainer}
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        dragMomentum={true}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {displayNPCs.map((npc, index) => (
          <div
            key={npc.id}
            className={styles.cardWrapper}
            onClick={() => {
              // 드래그 중이 아닐 때만 선택 가능
              if (!isDragging) {
                onSelectNPC(npc.id);
              }
            }}
          >
            <NPCCard npc={npc} index={index} onSelect={onSelectNPC} />
          </div>
        ))}
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <div className={styles.scrollIndicator}>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {t.scrollHint}
        </motion.div>
      </div>
    </div>
  );
}
