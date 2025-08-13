// src/pages/PlayerRoom/MenuButtons.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@shared/components/Button';
import * as styles from './PlayerRoom.css.ts';

export function MenuButtons() {
  const navigate = useNavigate();

  const handleStartEpisode = () => {
    navigate('/select-npc');
  };

  return (
    <motion.div
      className={styles.menuContainer}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <Button
        variant="special"
        size="xlarge"
        onClick={handleStartEpisode}
        icon="✨"
        iconPosition="right"
      >
        에피소드 시작
      </Button>
    </motion.div>
  );
}
