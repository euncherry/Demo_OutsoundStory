// src/pages/NPCSelection/NPCGrid.tsx
import { useRef, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { NPCCard } from "./NPCCard";
import { getAllNPCs } from "@/data/npcs/npcData";
import { useCharacterStore } from "@/store";
import * as styles from "./NPCSelection.css.ts";

interface NPCGridProps {
  onSelectNPC: (npcId: string) => void;
}

export function NPCGrid({ onSelectNPC }: NPCGridProps) {
  const { getAvailableNPCs } = useCharacterStore();
  
  // 사용 가능한 NPC ID 목록
  const availableNPCIds = useMemo(() => getAvailableNPCs(), [getAvailableNPCs]);
  
  // 전체 NPC 데이터 (성별에 맞는 데이터)
  const allNPCs = useMemo(() => getAllNPCs(), []);
  
  // 실제 표시할 NPC 목록 (해금된 것만)
  const displayNPCs = useMemo(() => {
    return allNPCs.filter(npc => availableNPCIds.includes(npc.id));
  }, [allNPCs, availableNPCIds]);
  
  // 잠긴 NPC 목록 (미해금)
  const lockedNPCs = useMemo(() => {
    return allNPCs.filter(npc => !availableNPCIds.includes(npc.id));
  }, [allNPCs, availableNPCIds]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
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
    <>
       {lockedNPCs.length > 0 && (
        <div className={styles.unlockHint}>
          <p className={styles.unlockHintText}>🔒 특별한 캐릭터가 숨겨져 있습니다. 스토리를 진행하면 해금됩니다!</p>
        </div>
      )}
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
        {/* 해금된 NPC 표시 */}
        {displayNPCs.map((npc, index) => (
          <div
            key={npc.id}
            className={styles.cardWrapper}
            onClick={() => {
              if (!isDragging) {
                onSelectNPC(npc.id);
              }
            }}
          >
            <NPCCard 
              npc={npc} 
              index={index} 
              onSelect={onSelectNPC}
              isLocked={false}
            />
          </div>
        ))}
        
        {/* 잠긴 NPC 표시 (미해금) */}
        {lockedNPCs.map((npc, index) => (
          <div
            key={npc.id}
            className={styles.cardWrapper}
            style={{ opacity: 0.5, pointerEvents: 'none' }}
          >
            <NPCCard 
              npc={npc} 
              index={displayNPCs.length + index} 
              onSelect={() => {}}
              isLocked={true}
            />
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
    </>
  );
}
