// src/types/dialogue.types.ts
import { Choice as GameChoice, Scene as GameScene } from "./game.types";

export interface SceneCharacter {
  characterType: "player" | "npc"; // ✅ 새로운 필드
  npcId?: string; // npc일 때만 사용
  position: "left" | "center" | "right";
  emotion: string;
}

// 기존 Scene을 확장하여 새로운 필드들 추가
export interface ExtendedScene extends Omit<GameScene, "dialogues"> {
  type: "dialogue" | "monologue" | "narration" | "choice";
  speaker?: string; // 'player' 또는 npcId
  text: string;
  nextSceneId?: string | null;
  characters?: SceneCharacter[]; // 화면에 표시될 모든 캐릭터
  emotion?: string; // 기존 호환성을 위해 유지
}

// 기존 Choice 타입을 re-export
export type { Choice } from "./game.types";
