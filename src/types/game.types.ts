export type GamePhase =
  | 'splash'
  | 'setup'
  | 'room'
  | 'npcSelect'
  | 'dialogue'
  | 'analysis'
  | 'complete';

export type EmotionType = 'normal' | 'happy' | 'sad' | 'surprised' | 'angry' | 'shy';

export interface DialogueLine {
  id: string;
  speaker: 'player' | 'npc';
  text: string;
  emotion?: EmotionType;
  nextId?: string;
}

export interface Choice {
  id: string;
  text: string;
  koreanText: string;
  audioReference: string;
  nextDialogueId: string;
  affinityChange?: number;
}

export interface Scene {
  id: string;
  background: string;
  dialogues: DialogueLine[];
  choices?: Choice[];
}
