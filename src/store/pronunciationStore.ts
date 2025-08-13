// src/store/pronunciationStore.ts

// Zustand 상태 관리 라이브러리 import
import { create } from 'zustand';
// 발음 분석 관련 타입 정의 import
import { AnalysisResult, AudioData } from '@/types/pronunciation.types';

/**
 * 발음 분석 상태 인터페이스 (히스토리 제거 버전)
 * 현재 진행 중인 발음 교정 세션만 관리
 * 과거 기록은 저장하지 않음
 */
interface PronunciationState {
  // ===== 상태 (State) =====

  /**
   * 사용자가 녹음한 오디오 데이터
   * - blob: 실제 오디오 파일 (Blob)
   * - url: 재생 가능한 URL (blob URL)
   * - duration: 녹음 길이 (초)
   */
  recordedAudio: AudioData | null;

  /**
   * 발음 분석 결과
   * - accuracy: 전체 정확도 (0~100)
   * - pitchMatch: 음높이 일치도
   * - rhythm: 리듬 정확도
   * - pronunciation: 음소별 분석
   * - feedback: AI 피드백 메시지
   * - suggestions: 개선 제안 사항
   */
  analysisResult: AnalysisResult | null;

  /**
   * 표준 발음 참조 오디오 URL
   * 선택한 대화 선택지의 네이티브 발음 파일 경로
   */
  referenceAudio: string;

  /**
   * 현재 녹음 중 여부
   * UI에서 녹음 버튼 상태 표시용
   */
  isRecording: boolean;

  /**
   * 현재 분석 중인 대화 정보
   * 발음 분석이 어떤 맥락에서 진행되는지 추적
   */
  currentContext: {
    npcId: string; // 대화 중인 NPC
    choiceId: string; // 선택한 대화 선택지
    text: string; // 실제 대화 텍스트
  } | null;

  // ===== 액션 (Actions) =====

  /**
   * 녹음된 오디오 설정
   * 녹음 완료 후 오디오 데이터 저장
   * @param audio - 녹음된 오디오 데이터 (null로 초기화 가능)
   */
  setRecordedAudio: (audio: AudioData | null) => void;

  /**
   * 분석 결과 설정
   * 발음 분석 API 응답 후 결과 저장
   * @param result - 분석 결과 데이터 (null로 초기화 가능)
   */
  setAnalysisResult: (result: AnalysisResult | null) => void;

  /**
   * 표준 발음 오디오 설정
   * 선택지 선택 시 해당 표준 발음 파일 경로 설정
   * @param url - 표준 발음 오디오 파일 URL
   */
  setReferenceAudio: (url: string) => void;

  /**
   * 녹음 상태 설정
   * 녹음 시작/종료 시 상태 업데이트
   * @param status - true: 녹음 중, false: 녹음 대기
   */
  setIsRecording: (status: boolean) => void;

  /**
   * 현재 대화 컨텍스트 설정
   * 발음 분석할 대화 정보 저장
   * @param context - NPC ID, 선택지 ID, 텍스트 정보
   */
  setCurrentContext: (
    context: { npcId: string; choiceId: string; text: string } | null,
  ) => void;

  /**
   * 발음 데이터 초기화
   * 새로운 선택지 선택 또는 다시 녹음 시 기존 데이터 클리어
   */
  resetPronunciation: () => void;

  /**
   * 전체 스토어 초기화
   * 대화 종료 또는 페이지 이동 시 모든 데이터 클리어
   */
  clearAll: () => void;
}

/**
 * 발음 분석 스토어 생성 (간소화 버전)
 * - 히스토리 기록 제거: 현재 세션만 관리
 * - persist 미사용: 오디오 데이터는 세션 단위로만 유지
 * - 실시간 발음 교정에 집중
 */
export const usePronunciationStore = create<PronunciationState>((set) => ({
  // ===== 초기 상태값 =====

  /** 녹음된 오디오 없음 */
  recordedAudio: null,

  /** 분석 결과 없음 */
  analysisResult: null,

  /** 표준 발음 파일 미설정 */
  referenceAudio: '',

  /** 녹음 대기 상태 */
  isRecording: false,

  /** 현재 대화 컨텍스트 없음 */
  currentContext: null,

  // ===== 액션 구현 =====

  /**
   * 녹음 오디오 설정 액션
   * - 녹음 완료 후 Blob 데이터와 메타정보 저장
   * - null 전달 시 기존 오디오 삭제 (재녹음 시)
   */
  setRecordedAudio: (audio) => set({ recordedAudio: audio }),

  /**
   * 분석 결과 설정 액션
   * - 백엔드 API로부터 받은 발음 분석 결과 저장
   * - 정확도, 피치, 리듬, 피드백 등 포함
   * - 히스토리에는 저장하지 않고 현재 결과만 유지
   */
  setAnalysisResult: (result) => set({ analysisResult: result }),

  /**
   * 표준 발음 설정 액션
   * - 선택한 대화 선택지의 네이티브 스피커 음성 파일 경로
   * - 사용자 녹음과 비교 분석의 기준이 됨
   */
  setReferenceAudio: (url) => set({ referenceAudio: url }),

  /**
   * 녹음 상태 토글 액션
   * - true: 마이크 활성화, 녹음 진행 중
   * - false: 녹음 종료, 대기 상태
   * - UI에서 녹음 버튼 색상/아이콘 변경에 사용
   */
  setIsRecording: (status) => set({ isRecording: status }),

  /**
   * 현재 대화 컨텍스트 설정 액션
   * - 어떤 NPC와 어떤 대화를 연습 중인지 추적
   * - 분석 결과 화면에서 컨텍스트 표시용
   */
  setCurrentContext: (context) => set({ currentContext: context }),

  /**
   * 발음 데이터 초기화 액션
   * - 새로운 선택지 선택 시 기존 녹음/분석 결과 제거
   * - 다시 녹음하기 버튼 클릭 시 호출
   * - 컨텍스트는 유지 (같은 대화 재녹음 가능)
   */
  resetPronunciation: () =>
    set({
      recordedAudio: null, // 녹음 데이터 삭제
      analysisResult: null, // 분석 결과 삭제
      referenceAudio: '', // 표준 발음 초기화
      isRecording: false, // 녹음 상태 해제
      // currentContext는 유지 - 같은 대화 재시도 가능
    }),

  /**
   * 전체 초기화 액션
   * - 대화 종료 또는 다른 NPC 선택 시
   * - 모든 발음 관련 데이터 완전 초기화
   */
  clearAll: () =>
    set({
      recordedAudio: null,
      analysisResult: null,
      referenceAudio: '',
      isRecording: false,
      currentContext: null, // 컨텍스트도 초기화
    }),
}));

/**
 * 사용 예시:
 *
 * // 컴포넌트에서 사용
 * const {
 *   isRecording,
 *   recordedAudio,
 *   analysisResult,
 *   currentContext,
 *   setRecordedAudio,
 *   setAnalysisResult,
 *   setIsRecording,
 *   setCurrentContext,
 *   resetPronunciation,
 *   clearAll
 * } = usePronunciationStore();
 *
 * // 대화 선택 시 컨텍스트 설정
 * setCurrentContext({
 *   npcId: 'hojun',
 *   choiceId: 'choice_1',
 *   text: "카페에서 같이 커피 마실래?"
 * });
 *
 * // 녹음 시작
 * setIsRecording(true);
 *
 * // 녹음 완료 후 오디오 저장
 * const audioBlob = await stopRecording();
 * setRecordedAudio({
 *   blob: audioBlob,
 *   url: URL.createObjectURL(audioBlob),
 *   duration: 3.5
 * });
 * setIsRecording(false);
 *
 * // 분석 결과 저장 (히스토리 없이 현재 결과만)
 * const result = await analyzeAudio(audioBlob);
 * setAnalysisResult(result);
 *
 * // 다시 녹음하기
 * resetPronunciation();
 *
 * // 대화 종료 시 전체 초기화
 * clearAll();
 *
 * // 선택적 구독 (성능 최적화)
 * const isRecording = usePronunciationStore(state => state.isRecording);
 * const accuracy = usePronunciationStore(state => state.analysisResult?.accuracy);
 */
