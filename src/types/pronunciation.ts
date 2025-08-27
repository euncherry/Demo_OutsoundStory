// src/types/pronunciation.ts
// 분석 단계 상수
export const ANALYSIS_STEPS = {
  LOADING_AUDIO: "오디오 로딩 중",
  LOADING_COMPLETE: "오디오 로딩 완료",
  ANALYZING_WAVEFORM: "파형 분석 중",
  WAVEFORM_COMPLETE: "파형 분석 완료",
  ANALYZING_PITCH: "음정 분석 중",
  PITCH_COMPLETE: "음정 분석 완료",
  ANALYZING_SPECTRUM: "주파수 분석 중",
  SPECTRUM_COMPLETE: "주파수 분석 완료",
  CALCULATING_SCORE: "최종 점수 계산 중",
  ANALYSIS_COMPLETE: "분석 완료",
} as const;

export type AnalysisStep = typeof ANALYSIS_STEPS[keyof typeof ANALYSIS_STEPS];

// 분석 진행 상태 타입
export interface AnalysisProgress {
  currentStep: AnalysisStep;
  percentage: number;
  isComplete: boolean;
}
