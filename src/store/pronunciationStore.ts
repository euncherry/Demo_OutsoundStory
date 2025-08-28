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

  // STT 결과
  sttTranscript: string | null;



  // Actions
  setCurrentStage: (stage: PronunciationState["currentStage"]) => void;
  setCurrentContext: (context: PronunciationState["currentContext"]) => void;
  setRecordedAudioBlob: (blob: Blob) => void;
  setSttTranscript: (transcript: string | null) => void;
  // setAnalysisResult: (result: PronunciationState["analysisResult"]) => void;
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
      sttTranscript: null,
      analysisResult: null,

      // Actions
      setCurrentStage: (stage) => set({ currentStage: stage }),
      setCurrentContext: (context) =>
        set({
          currentContext: context,
          standardAudioUrl: context?.audioReference || null,
        }),
      setRecordedAudioBlob: (blob) => set({ recordedAudioBlob: blob }),
      setSttTranscript: (transcript) => set({ sttTranscript: transcript }),

      // setAnalysisResult: (result) => set({ analysisResult: result }),
      reset: () =>
        set({
          currentStage: "prepare",
          currentContext: null,
          standardAudioUrl: null,
          recordedAudioBlob: null,
          sttTranscript: null,
          // analysisResult: null,
        }),
    }),
    { name: "PronunciationStore" }
  )
);
