// src/pages/NPCSelection/NPCGrid.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { NPCCard } from './NPCCard';
import { getAllNPCs } from '@/data/npcs/npcData';
import * as styles from './NPCSelection.css.ts';

interface NPCGridProps {
  onSelectNPC: (npcId: string) => void;
}

export function NPCGrid({ onSelectNPC }: NPCGridProps) {
  const npcs = getAllNPCs();

  return (
    <motion.div
      className={styles.gridContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {npcs.map((npc, index) => (
        <NPCCard key={npc.id} npc={npc} index={index} onSelect={onSelectNPC} />
      ))}
    </motion.div>
  );
}
