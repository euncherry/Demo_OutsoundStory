// src/store/gameFlowStore.ts
import { create } from 'zustand'; // Zustand 상태 관리 라이브러리
import { persist, devtools } from 'zustand/middleware'; // 상태 영구 저장을 위한 미들웨어

/**
 * 게임의 진행 단계를 정의하는 타입
 * - splash: 시작 화면
 * - setup: 플레이어 초기 설정 (성별 선택 등)
 * - room: 플레이어의 개인 공간
 * - npcSelect: NPC 선택 화면
 * - dialogue: NPC와의 대화 진행
 * - analysis: 발음 분석 화면
 * - complete: 게임 완료
 */
export type GamePhase =
  | 'splash'
  | 'setup'
  | 'room'
  | 'npcSelect'
  | 'dialogue'
  | 'analysis'
  | 'complete';

/**
 * 게임 진행 상태를 관리하는 스토어의 상태 인터페이스
 */
interface GameFlowState {
  currentPhase: GamePhase; // 현재 게임 진행 단계
  demoProgress: {
    // 데모 버전 진행 상황
    hasSelectedNPC: boolean; // NPC 선택 완료 여부
    hasCompletedDialogue: boolean; // 대화 완료 여부
    hasAnalyzedPronunciation: boolean; // 발음 분석 완료 여부
  };
  // 상태 변경 함수들
  transitionTo: (phase: GamePhase) => void; // 게임 단계 전환
  updateProgress: (key: keyof GameFlowState['demoProgress'], value: boolean) => void; // 진행 상황 업데이트
  resetDemo: () => void; // 데모 초기화
}

/**
 * 게임 진행 상태 관리 스토어
 * persist 미들웨어를 사용하여 브라우저의 localStorage에 상태를 저장
 */
export const useGameFlowStore = create<GameFlowState>()(
  devtools(
    persist(
      (set) => ({
        // 초기 상태 설정
        currentPhase: 'splash', // 시작 시 스플래시 화면으로 설정
        demoProgress: {
          // 데모 진행 상황 초기화
          hasSelectedNPC: false,
          hasCompletedDialogue: false,
          hasAnalyzedPronunciation: false,
        },

        // 게임 단계 전환 함수
        transitionTo: (phase) => set({ currentPhase: phase }),

        // 진행 상황 업데이트 함수
        // key: 업데이트할 진행 상황 항목
        // value: 설정할 값 (완료 여부)
        updateProgress: (key, value) =>
          set((state) => ({
            demoProgress: {
              ...state.demoProgress,
              [key]: value,
            },
          })),

        // 데모 초기화 함수
        // 모든 상태를 초기값으로 리셋
        resetDemo: () =>
          set({
            currentPhase: 'splash',
            demoProgress: {
              hasSelectedNPC: false,
              hasCompletedDialogue: false,
              hasAnalyzedPronunciation: false,
            },
          }),
      }),
      {
        name: 'game-flow-storage', // localStorage에 저장될 키 이름
      },
    ),
    {
      name: 'GameFlowStore',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
);
