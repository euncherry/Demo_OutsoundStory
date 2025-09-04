// src/features/dialogue/components/ChoiceButtons.tsx
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@shared/components/Button";
import { Choice } from "@/types/game.types";
import * as styles from "./Dialogue.css";

interface ChoiceButtonsProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

export function ChoiceButtons({ choices, onSelect }: ChoiceButtonsProps) {
  return (
    <div className={styles.choiceWrapper}>
      <div
        className={styles.choiceContainer}
        // initial={{ opacity: 0, y: 50 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className={styles.choiceHeader}>
          <p className={styles.choicePrompt}>선택하세요</p>
        </div>

        <div className={styles.choiceList}>
          {choices.map((choice, index) => (
            <motion.div
              key={choice.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <Button
                variant="choice"
                choiceIndex={index}
                fullWidth
                onClick={() => onSelect(choice)}
              >
                {choice.text}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
