// src/features/dialogue/components/ChoiceButtons.tsx
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@shared/components/Button";
import { Choice } from "@/types/game.types";
import * as styles from "./Dialogue.css";

interface ChoiceButtonsProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  question: string;
}

export function ChoiceButtons({
  choices,
  onSelect,
  question,
}: ChoiceButtonsProps) {
  return (
    <div className={styles.choiceWrapper}>
      <div className={styles.choiceContainer}>
        <div className={styles.choiceHeader}>
          <div className={styles.choicePrompt}>{question || "선택하세요"}</div>
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
