// src/store/scoreStore.ts
import { create } from "zustand"; // Zustand 상태 관리 라이브러리
import { persist, devtools } from "zustand/middleware"; // 상태 영구 저장을 위한 미들웨어
import {
  AnalysisProgress,
  AnalysisStep,
  ANALYSIS_STEPS,
  VADAnalysis,
} from "@/types/pronunciation";

// 분석 데이터 타입 정의
interface WaveformAnalysis {
  refPCMData: Float32Array | null;
  userPCMData: Float32Array | null;
  refPeaks: number[][] | null;
  userPeaks: number[][] | null;
  nccScore: number;
  rmsScore: number;
  segmentScores: number[];
}

interface PitchAnalysis {
  refFrequencies: (number | null)[];
  userFrequencies: (number | null)[];
  refBaseFrequency: number;
  userBaseFrequency: number;
  refAveragePitch: number;
  userAveragePitch: number;
  patternMatchScore: number;
}

interface SpectrogramAnalysis {
  refSpectrogramData: unknown; // Spectrogram plugin의 내부 데이터
  userSpectrogramData: unknown;
  frequencyBandScores: number[];
  mfccScore: number;
}

interface CERAnalysis {
  accuracy: number;
  errors: number;
  hasSTTResult: boolean;
}

interface AnalysisResult {
  totalScore: number;
  waveformScore: number;
  pitchScore: number;
  spectrogramScore: number;
  cerScore: number;
  feedback: string[];
}

/**
 * 발음 분석 결과 및 점수를 관리하는 스토어의 상태 인터페이스
 */
interface ScoreState {
  // 분석 데이터
  waveformAnalysis: WaveformAnalysis | null;
  pitchAnalysis: PitchAnalysis | null;
  spectrogramAnalysis: SpectrogramAnalysis | null;
  cerAnalysis: CERAnalysis | null;
  vadAnalysis: VADAnalysis | null; // 새로 추가

  // 분석 진행 상태
  analysisProgress: AnalysisProgress;

  // 최종 분석 결과
  analysisResult: AnalysisResult | null;

  // 분석 데이터 Actions
  setWaveformAnalysis: (analysis: WaveformAnalysis | null) => void;
  setPitchAnalysis: (analysis: PitchAnalysis | null) => void;
  setSpectrogramAnalysis: (analysis: SpectrogramAnalysis | null) => void;
  setCERAnalysis: (analysis: CERAnalysis | null) => void;
  setVADAnalysis: (analysis: VADAnalysis | null) => void; // 새로 추가
  updateAnalysisProgress: (step: AnalysisStep, percentage: number) => void;
  setAnalysisResult: (result: ScoreState["analysisResult"]) => void;

  reset: () => void;
}

/**
 * 발음 분석 결과 및 점수 상태 관리 스토어
 * persist 미들웨어를 사용하여 브라우저의 localStorage에 상태를 저장
 */
export const useScoreStore = create<ScoreState>()(
  devtools(
    persist(
      (set) => ({
        // 초기 상태 설정
        waveformAnalysis: null,
        pitchAnalysis: null,
        spectrogramAnalysis: null,
        cerAnalysis: null,
        vadAnalysis: null, // 새로 추가

        analysisProgress: {
          currentStep: ANALYSIS_STEPS.LOADING_AUDIO,
          percentage: 0,
          isComplete: false,
        },
        analysisResult: null,

        setWaveformAnalysis: (analysis) => set({ waveformAnalysis: analysis }),
        setPitchAnalysis: (analysis) => set({ pitchAnalysis: analysis }),
        setSpectrogramAnalysis: (analysis) =>
          set({ spectrogramAnalysis: analysis }),
        setCERAnalysis: (analysis) => set({ cerAnalysis: analysis }),
        setVADAnalysis: (analysis) => set({ vadAnalysis: analysis }), // 새로 추가

        updateAnalysisProgress: (step, percentage) =>
          set({
            analysisProgress: {
              currentStep: step,
              percentage: Math.min(100, Math.max(0, percentage)), // 0-100 범위 보장
              isComplete: percentage >= 100, // >= 사용 (100 초과값 방어)
            },
          }),

        setAnalysisResult: (result) => set({ analysisResult: result }),

        reset: () =>
          set({
            waveformAnalysis: null,
            pitchAnalysis: null,
            spectrogramAnalysis: null,
            cerAnalysis: null,
            vadAnalysis: null, // 새로 추가
            analysisProgress: {
              currentStep: ANALYSIS_STEPS.LOADING_AUDIO,
              percentage: 0,
              isComplete: false,
            },
            analysisResult: null,
          }),
      }),
      {
        name: "score-storage", // localStorage에 저장될 키 이름
      }
    ),
    {
      name: "ScoreStore",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);
