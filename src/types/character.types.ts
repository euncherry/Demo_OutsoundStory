import { DialogueLine } from './game.types';

export type Gender = 'male' | 'female';
export type FeedbackStyle =
  | 'encouraging'
  | 'strict'
  | 'playful'
  | 'professional'
  | 'mysterious';

export interface SpriteSet {
  normal: string;
  happy: string;
  sad: string;
  surprised: string;
  angry?: string;
  shy?: string;
}

export interface NPCCharacter {
  id: string;
  name: string;
  gender: Gender;
  profileImage: string;
  sprites: SpriteSet;
  personality: string;
  voiceType: string;
  introduction: string;
  demoDialogue: DialogueLine[];
  pronunciationStrictness: 1 | 2 | 3 | 4 | 5;
  feedbackStyle: FeedbackStyle;
}

export interface PlayerInfo {
  name: string;
  gender: Gender;
  avatar?: string;
  createdAt: Date;
}
