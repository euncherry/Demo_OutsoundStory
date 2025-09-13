// src/features/dialogue/components/CharacterSprite.tsx
import { useEffect } from "react";
import { usePlayerStore } from "@/store";
import { getNPCById } from "@/data/npcs/npcData";
import { playerData, PlayerEmotions } from "@/data/characters/playerData";
import * as styles from "./Dialogue.css";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";

interface CharacterSpriteProps {
  characterType: "player" | "npc";
  npcId?: string;
  emotion?: string;
  position?: "left" | "center" | "right";
  isSpeaking?: boolean;
}

export function CharacterSprite({
  characterType,
  npcId,
  emotion = "normal",
  position = "center",
  isSpeaking = false,
}: CharacterSpriteProps) {
  const { gender } = usePlayerStore();
  const { currentTheme } = useThemeStore();
  // 컴포넌트 마운트 시 자연스럽게 나타나기
  useEffect(() => {
    const timer = setTimeout(() => {
      // 자연스러운 등장 효과를 위한 타이머
    }, 50); // 약간의 딜레이로 더 자연스럽게

    return () => clearTimeout(timer);
  }, []);

  // ✅ 캐릭터 이미지와 데이터 결정
  const getCharacterData = () => {
    if (characterType === "player") {
      const playerImage =
        playerData.emotions[gender as keyof typeof playerData.emotions]?.[
          emotion as keyof PlayerEmotions
        ] ||
        playerData.emotions[gender as keyof typeof playerData.emotions]?.normal;

      console.log("playerImage ==> ", playerImage);
      return {
        image: playerImage,
        themeColor: playerData.themeColor[gender || "female"],
        name: "나",
      };
    } else if (npcId) {
      const npcData = getNPCById(npcId);
      if (!npcData) return null;

      // npcData에서 감정에 맞는 이미지 가져오기
      const npcImage =
        npcData.emotions[emotion as keyof typeof npcData.emotions] ||
        npcData.emotions.normal;

      return {
        image: npcImage,
        themeColor: npcData.themeColor,
        name: npcData.id,
      };
    }
    return null;
  };

  const characterData = getCharacterData();
  if (!characterData) return null;

  return (
    <>
      {currentTheme === "male" ? (
        <div
          className={styles.malePlayercharacterContainer}
          style={{
            left:
              position === "left"
                ? "30%"
                : position === "right"
                ? "70%"
                : "50%",
          }}
        >
          {/* 캐릭터 이미지 - 페이드 인/아웃 효과 추가 */}
          <AnimatePresence>
            <motion.img
              key={emotion}
              src={characterData.image}
              alt={`${characterData.name} ${emotion}`}
              className={styles.characterFull}
              layoutId={`${characterData.name}-face`} // 공통 layoutId
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                opacity: 1,
                filter: isSpeaking ? "brightness(1)" : "brightness(0.6)",
              }}
            />
          </AnimatePresence>
        </div>
      ) : (
        <div
          className={styles.characterContainer}
          style={{
            left:
              position === "left"
                ? "30%"
                : position === "right"
                ? "70%"
                : "50%",
          }}
        >
          {/* 캐릭터 이미지 - 페이드 인/아웃 효과 추가 */}
          <AnimatePresence>
            <motion.img
              key={emotion}
              src={characterData.image}
              alt={`${characterData.name} ${emotion}`}
              className={styles.characterFull}
              layoutId={`${characterData.name}-face`} // 공통 layoutId
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                opacity: 1,
                filter: isSpeaking ? "brightness(1)" : "brightness(0.6)",
              }}
            />
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
