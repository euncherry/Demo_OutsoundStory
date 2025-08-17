// src/pages/NPCSelection/NPCGrid.tsx
import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { NPCCard } from "./NPCCard";
import { getAllNPCs } from "@/data/npcs/npcData";
import * as styles from "./NPCSelection.css.ts";

interface NPCGridProps {
  onSelectNPC: (npcId: string) => void;
}

export function NPCGrid({ onSelectNPC }: NPCGridProps) {
  // NPCs 데이터를 메모이제이션하여 불필요한 재렌더링 방지
  const npcs = useMemo(() => getAllNPCs(), []);
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

        // 드래그 가능한 범위 설정
        setDragConstraints({
          left: -(scrollWidth - clientWidth),
          right: 0,
        });
      }
    };

    // 컴포넌트 마운트 시 실행
    updateDragConstraints();

    // 윈도우 리사이즈 시 재계산
    window.addEventListener("resize", updateDragConstraints);

    return () => {
      window.removeEventListener("resize", updateDragConstraints);
    };
  }, []); // 빈 의존성 배열로 마운트 시에만 실행

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
        {npcs.map((npc, index) => (
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
          ← 드래그하여 더 보기 →
        </motion.div>
      </div>
    </div>
  );
}
