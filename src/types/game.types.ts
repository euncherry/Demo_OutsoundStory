// src/types/game.types.ts

export type GamePhase =
  | "splash"
  | "setup"
  | "room"
  | "npcSelect"
  | "dialogue"
  | "analysis"
  | "complete";

export type EmotionType =
  | "normal"
  | "happy"
  | "sad"
  | "surprised"
  | "angry"
  | "shy"
  | "wink"
  | "blank"
  | "worried";

export interface DialogueLine {
  id: string;
  speaker: "player" | "npc";
  text: string;
  emotion?: EmotionType;
  nextId?: string;
}

export interface Choice {
  id: string;
  text: string;
  nextSceneId: string | null;
  audioReference: string;
  affinityChange?: number;
}

export interface SceneCharacter {
  characterType: "player" | "npc";
  npcId?: string; // npc일 때만 사용
  position: "left" | "center" | "right";
  emotion?: string;
}

export interface Scene {
  id: string;
  type: "dialogue" | "monologue" | "narration" | "choice";
  speaker?: string; // 'player' 또는 npcId
  text: string;
  background?: string;
  characters?: SceneCharacter[];
  nextSceneId?: string | null;
  choices?: Choice[];
  // 기존 호환성을 위한 필드들
  dialogues?: DialogueLine[];
}
