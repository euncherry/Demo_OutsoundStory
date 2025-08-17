// src/features/dialogue/components/CharacterSprite.tsx
import { useState, useEffect } from "react";
import { usePlayerStore } from "@/store";
import { getNPCById } from "@/data/npcs/npcData";
import { playerData, PlayerEmotions } from "@/data/characters/playerData";
import * as styles from "./Dialogue.css.ts";

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
  const [isVisible, setIsVisible] = useState(false);

  // 컴포넌트 마운트 시 자연스럽게 나타나기
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
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
      return {
        image: playerImage,
        themeColor: playerData.themeColor,
        name: "나",
      };
    } else if (npcId) {
      const npcData = getNPCById(npcId);
      return {
        image: `/src/assets/characters/npc/${npcId}/${emotion}.png`,
        themeColor: npcData?.themeColor || "rgba(139, 92, 246, 1)",
        name: npcData?.nameKo || npcId,
      };
    }
    return null;
  };

  const characterData = getCharacterData();
  if (!characterData) return null;

  return (
    <div
      className={styles.characterContainer}
      style={{
        left:
          position === "left" ? "40dvh" : position === "right" ? "70%" : "50%",
      }}
    >
      {/* 말하는 중 효과 */}
      {isSpeaking && (
        <div
          className={styles.speakingGlow}
          style={{
            background: `radial-gradient(circle, ${characterData.themeColor}80 0%, transparent 70%)`,
          }}
        />
      )}

      {/* 캐릭터 이미지 */}
      <img
        src={characterData.image}
        alt={`${characterData.name} ${emotion}`}
        className={styles.characterFull}
        style={{
          opacity: 1,
          filter: isSpeaking ? "brightness(1)" : "brightness(0.6)",
        }}
      />
    </div>
  );
}
