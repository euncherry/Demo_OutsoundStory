// src/features/pronunciation/store/pronunciationStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PronunciationState {
  // 현재 상태
  currentStage: "prepare" | "recording" | "analyzing" | "results";

  // 컨텍스트 정보
  currentContext: {
    npcId: string;
    choiceId: string;
    text: string;
    audioReference?: string;
  } | null;

  // 오디오 데이터
  standardAudioUrl: string | null;
  recordedAudioBlob: Blob | null;

  // 분석 결과
  analysisResult: {
    totalScore: number;
    pitchScore: number;
    rhythmScore: number;
    clarityScore: number;
    affinityChange: number;
  } | null;

  // Actions
  setCurrentStage: (stage: PronunciationState["currentStage"]) => void;
  setCurrentContext: (context: PronunciationState["currentContext"]) => void;
  setStandardAudioUrl: (url: string) => void;
  setRecordedAudioBlob: (blob: Blob) => void;
  setAnalysisResult: (result: PronunciationState["analysisResult"]) => void;
  reset: () => void;
}

export const usePronunciationStore = create<PronunciationState>()(
  devtools(
    (set) => ({
      // State
      currentStage: "prepare",
      currentContext: null,
      standardAudioUrl: null,
      recordedAudioBlob: null,
      analysisResult: null,

      // Actions
      setCurrentStage: (stage) => set({ currentStage: stage }),
      setCurrentContext: (context) => set({ currentContext: context }),
      setStandardAudioUrl: (url) => set({ standardAudioUrl: url }),
      setRecordedAudioBlob: (blob) => set({ recordedAudioBlob: blob }),
      setAnalysisResult: (result) => set({ analysisResult: result }),
      reset: () =>
        set({
          currentStage: "prepare",
          currentContext: null,
          standardAudioUrl: null,
          recordedAudioBlob: null,
          analysisResult: null,
        }),
    }),
    { name: "PronunciationStore" }
  )
);
