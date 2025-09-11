import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface PronunciationState {
  currentStage: "prepare" | "recording" | "analyzing" | "results";
  currentContext: {
    npcId: string;
    choiceId: string;
    text: string;
    audioReference?: string;
  } | null;

  standardAudioUrl: string | null;
  recordedAudioBlob: Blob | null; // 실제 사용 X, runtime용
  recordedAudioUrl: string | null; // 실제 사용 X, runtime용
  recordedAudioBase64: string | null; // 새로 추가: persist 저장용
  sttTranscript: string | null;

  setCurrentStage: (stage: PronunciationState["currentStage"]) => void;
  setCurrentContext: (context: PronunciationState["currentContext"]) => void;
  setRecordedAudioBlob: (blob: Blob) => void;
  setRecordedAudioBase64: (base64: string) => void;
  setSttTranscript: (transcript: string | null) => void;
  cleanupRecordedAudioUrl: () => void;
  reset: () => void;
}

export const usePronunciationStore = create<PronunciationState>()(
  devtools(
    persist(
      (set, get) => ({
        currentStage: "prepare",
        currentContext: null,
        standardAudioUrl: null,
        recordedAudioBlob: null,
        recordedAudioUrl: null,
        recordedAudioBase64: null,
        sttTranscript: null,
        analysisResult: null,

        setCurrentStage: (stage) => set({ currentStage: stage }),
        setCurrentContext: (context) =>
          set({
            currentContext: context,
            standardAudioUrl: context?.audioReference || null,
          }),

        // Blob => base64 변환하는 함수
        setRecordedAudioBlob: (blob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;
            set({
              recordedAudioBlob: blob,
              recordedAudioUrl: URL.createObjectURL(blob),
              recordedAudioBase64: base64,
            });
          };
          reader.readAsDataURL(blob); // base64 encode
        },
        setRecordedAudioBase64: (base64: string) =>
          set({ recordedAudioBase64: base64 }),

        setSttTranscript: (transcript) => set({ sttTranscript: transcript }),

        cleanupRecordedAudioUrl: () => {
          const state = get();
          if (state.recordedAudioUrl) {
            URL.revokeObjectURL(state.recordedAudioUrl);
            set({ recordedAudioUrl: null });
          }
        },

        reset: () => {
          const state = get();
          if (state.recordedAudioUrl) {
            URL.revokeObjectURL(state.recordedAudioUrl);
          }
          set({
            currentStage: "prepare",
            currentContext: null,
            standardAudioUrl: null,
            recordedAudioBlob: null,
            recordedAudioUrl: null,
            recordedAudioBase64: null,
            sttTranscript: null,
          });
        },
      }),
      {
        name: "PronunciationStore",
        partialize: (state) => ({
          currentContext: state.currentContext,
          currentStage: state.currentStage,
          standardAudioUrl: state.standardAudioUrl,
          recordedAudioBase64: state.recordedAudioBase64, // persist 대상 변경!
          sttTranscript: state.sttTranscript,
        }),
      }
    ),
    { name: "PronunciationStore" }
  )
);
