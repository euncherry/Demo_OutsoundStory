import type WaveSurfer from 'wavesurfer.js';

/**
 * 모달 단계
 */
export type ModalStage = 'prepare' | 'recording' | 'analyzing' | 'results';

/**
 * 분석 탭 (결과 화면용)
 */
export type AnalysisTab = 'spectrogram' | 'pitch' | 'waveform';

/**
 * 발음 컨텍스트 (현재 선택지 정보)
 */
export interface PronunciationContext {
  npcId: string;
  choiceId: string;
  text: string;
  audioReference: string;
}

/**
 * 오디오 데이터
 */
export interface AudioData {
  blob: Blob;
  url: string;
  duration: number;
}

/**
 * 분석 결과 (핵심만)
 */
export interface AnalysisResult {
  // 점수 (0-100)
  totalScore: number;
  scores: {
    pitch: number; // 음정 정확도
    rhythm: number; // 리듬 정확도
    clarity: number; // 발음 명료도
  };

  // NPC 반응
  npcReaction: {
    emotion: string;
    message: string;
    affinityChange: number;
  };
}

/**
 * WaveSurfer 인스턴스
 */
export interface WaveSurferInstances {
  standard: WaveSurfer | null;
  user: WaveSurfer | null;
}
