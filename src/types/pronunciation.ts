// src/types/pronunciation.ts
// 분석 단계 상수
export const ANALYSIS_STEPS = {
  LOADING_AUDIO: "오디오 로딩 중",
  LOADING_COMPLETE: "오디오 로딩 완료",
  TRIMMING_SILENCE: "묵음 구간 제거 중",        // 새로 추가
  SILENCE_TRIMMED: "묵음 구간 제거 완료",      // 새로 추가
  ANALYZING_WAVEFORM: "파형 분석 중",
  WAVEFORM_COMPLETE: "파형 분석 완료",
  ANALYZING_PITCH: "음정 분석 중",
  PITCH_COMPLETE: "음정 분석 완료",
  ANALYZING_SPECTRUM: "주파수 분석 중",
  SPECTRUM_COMPLETE: "주파수 분석 완료",
  ANALYZING_CER: "텍스트 정확도 분석 중",
  CER_COMPLETE: "텍스트 정확도 분석 완료",
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

//ANCHOR ============= CER (Character Error Rate) =============
export interface CERConfig {
  tau: number;    // dead zone threshold (default: 0.05)
  alpha: number;  // penalty strength (default: 3.0)
  gamma: number;  // curve sensitivity (default: 0.9)
}

export const CER_PRESETS = {
  strict: { tau: 0.01, alpha: 4.0, gamma: 0.8 },    // 엄격한 평가
  default: { tau: 0.05, alpha: 3.0, gamma: 0.9 },   // 권장 설정
  lenient: { tau: 0.1, alpha: 2.0, gamma: 1.0 },    // 관대한 평가
  practice: { tau: 0.15, alpha: 1.5, gamma: 1.2 }   // 연습 모드
};

//ANCHOR ============= VAD (Voice Activity Detection) =============
export interface VADConfig {
  energyThreshold: number;      // 에너지 임계값
  minVoiceDuration: number;     // 최소 음성 지속 시간 (초)
  maxSilenceDuration: number;   // 최대 묵음 지속 시간 (초)
  sampleRate: number;           // 샘플링 레이트
  windowSize: number;           // 윈도우 크기
  marginSeconds: number;        // 여백 시간 (초)
}

export interface VADResult {
  trimmedData: Float32Array;    // 정리된 오디오 데이터
  startIndex: number;           // 시작 인덱스
  endIndex: number;             // 끝 인덱스
  originalLength: number;       // 원본 길이
  trimmedLength: number;        // 정리된 길이
  silenceRatio: number;         // 제거된 묵음 비율
}

export interface VADAnalysis {
  refVADResult: VADResult;
  userVADResult: VADResult;
  silenceRemoved: {
    ref: number;
    user: number;
  };
}