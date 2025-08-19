import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type {
  PronunciationContext,
  AudioData,
  AnalysisResult,
  ModalStage,
  AnalysisTab,
  WaveSurferInstances,
} from '@/types/pronunciation.types';

interface PronunciationState {
  // === 상태 ===
  context: PronunciationContext | null;
  modalStage: ModalStage;
  currentTab: AnalysisTab;

  // 오디오
  standardAudio: AudioData | null;
  userAudio: AudioData | null;

  // 녹음
  isRecording: boolean;
  recordingDuration: number;

  // 분석
  analysisResult: AnalysisResult | null;

  // WaveSurfer (persist 안함)
  waveSurferInstances: WaveSurferInstances;

  // === Actions ===

  // 컨텍스트
  setContext: (context: PronunciationContext) => void;
  clearContext: () => void;

  // 모달 단계
  setModalStage: (stage: ModalStage) => void;
  setCurrentTab: (tab: AnalysisTab) => void;

  // 오디오
  setStandardAudio: (audio: AudioData) => void;
  setUserAudio: (audio: AudioData) => void;

  // 녹음
  startRecording: () => void;
  stopRecording: () => void;
  updateRecordingDuration: (duration: number) => void;

  // 분석
  setAnalysisResult: (result: AnalysisResult) => void;

  // WaveSurfer
  setWaveSurferInstance: (type: 'standard' | 'user', instance: unknown) => void;

  // 리셋
  reset: () => void;
}

const initialState = {
  context: null,
  modalStage: 'prepare' as ModalStage,
  currentTab: 'spectrogram' as AnalysisTab,
  standardAudio: null,
  userAudio: null,
  isRecording: false,
  recordingDuration: 0,
  analysisResult: null,
  waveSurferInstances: {
    standard: null,
    user: null,
  },
};

export const usePronunciationStore = create<PronunciationState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        // 컨텍스트
        setContext: (context) =>
          set(
            {
              context,
              modalStage: 'prepare',
              analysisResult: null,
            },
            false,
            'pronunciation/setContext',
          ),

        clearContext: () => set({ context: null }, false, 'pronunciation/clearContext'),

        // 모달 단계
        setModalStage: (stage) =>
          set({ modalStage: stage }, false, 'pronunciation/setModalStage'),
        setCurrentTab: (tab) =>
          set({ currentTab: tab }, false, 'pronunciation/setCurrentTab'),

        // 오디오
        setStandardAudio: (audio) =>
          set({ standardAudio: audio }, false, 'pronunciation/setStandardAudio'),
        setUserAudio: (audio) =>
          set({ userAudio: audio }, false, 'pronunciation/setUserAudio'),

        // 녹음
        startRecording: () =>
          set(
            {
              isRecording: true,
              recordingDuration: 0,
            },
            false,
            'pronunciation/startRecording',
          ),

        stopRecording: () =>
          set(
            {
              isRecording: false,
            },
            false,
            'pronunciation/stopRecording',
          ),

        updateRecordingDuration: (duration) =>
          set(
            {
              recordingDuration: duration,
            },
            false,
            'pronunciation/updateRecordingDuration',
          ),

        // 분석
        setAnalysisResult: (result) =>
          set(
            {
              analysisResult: result,
              modalStage: 'results',
            },
            false,
            'pronunciation/setAnalysisResult',
          ),

        // WaveSurfer
        setWaveSurferInstance: (type, instance) =>
          set(
            (state) => ({
              waveSurferInstances: {
                ...state.waveSurferInstances,
                [type]: instance,
              },
            }),
            false,
            `pronunciation/setWaveSurferInstance/${type}`,
          ),

        // 리셋
        reset: () => set(initialState, false, 'pronunciation/reset'),
      }),
      {
        name: 'pronunciation-storage',
        partialize: (state) => ({
          context: state.context,
          modalStage: state.modalStage,
          currentTab: state.currentTab,
          analysisResult: state.analysisResult,
        }),
      },
    ),
    {
      name: 'PronunciationStore',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
);
