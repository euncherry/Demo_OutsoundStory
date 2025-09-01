// src/features/dialogue/components/DialogueBox.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayerStore } from "@/store";
import { getNPCById } from "@/data/npcs/npcData";
import { playerData } from "@/data/characters/playerData";
import * as styles from "./Dialogue.css.ts";

interface DialogueBoxProps {
  type: "dialogue" | "monologue" | "narration";
  speaker?: string;
  text: string;
  onNext?: () => void;
}

export function DialogueBox({ type, speaker, text, onNext }: DialogueBoxProps) {
  const { name, gender } = usePlayerStore();

  const getSpeakerName = () => {
    if (!speaker) return "";

    const nameMap: Record<string, string> = {
      player: name || "나",
      hojun: "호준",
      jihoon: "지훈",
      dojin: "도진",
      yohan: "요한",
      kanghyuk: "강혁",
      ex_girlfriend: "민서",
    };

    return nameMap[speaker] || speaker;
  };

  // 캐릭터 테마 색상 가져오기
  const getCharacterThemeColors = () => {
    if (!speaker || speaker === "player") {
      // 플레이어 색상을 playerData에서 가져오기
      return {
        speakerColor:
          gender === "male"
            ? playerData.themeColor.male
            : playerData.themeColor.female,
        textColor:
          gender === "male"
            ? playerData.dialogueTextColor.male
            : playerData.dialogueTextColor.female,
        indicatorColor:
          gender === "male"
            ? playerData.themeColor.male
            : playerData.themeColor.female,
      };
    }

    const npcData = getNPCById(speaker);
    if (!npcData) {
      return {
        speakerColor: "#8B5CF6",
        textColor: "#E5E7EB",
        indicatorColor: "#9CA3AF",
      };
    }

    // NPC 데이터에서 전용 텍스트 색상 사용
    const themeColor = npcData.themeColor;
    const textColor = npcData.dialogueTextColor;
    return {
      speakerColor: themeColor,
      textColor: textColor, // NPC별 전용 텍스트 색상
      indicatorColor: themeColor, // 같은 테마 색상
    };
  };

  const themeColors = getCharacterThemeColors();

  return (
    <div className={styles.dialogueWrapper}>
      <motion.div
        className={styles.dialogueContainer}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        onClick={onNext}
      >
        <AnimatePresence mode="wait">
          {type === "narration" ? (
            // 나레이션 (중앙 표시)
            <motion.div
              className={styles.narrationBox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className={styles.narrationText}>{text}</p>
            </motion.div>
          ) : type === "monologue" ? (
            // 독백 (이탤릭체, 괄호)
            <motion.div
              className={styles.monologueBox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className={styles.monologueText}>{text}</p>
            </motion.div>
          ) : (
            // 대화 (말풍선)
            <motion.div
              className={styles.dialogueBox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {speaker && (
                <div
                  className={styles.speakerName}
                  style={{ color: themeColors.speakerColor }}
                >
                  {getSpeakerName()}
                </div>
              )}
              <p
                className={styles.dialogueText}
                style={{ color: themeColors.textColor }}
              >
                {text}
              </p>

              {/* 다음 표시 */}
              <motion.div
                className={styles.nextIndicator}
                style={{ color: themeColors.indicatorColor }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ▼
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
