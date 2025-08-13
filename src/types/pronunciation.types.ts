// src/types/pronunciation.types.ts

/**
 * 음소(Phoneme) 분석 결과
 * 개별 발음 단위별 정확도를 측정
 *
 * 음소: 언어의 최소 음성 단위 (예: /p/, /b/, /æ/ 등)
 */
export interface PhonemeAnalysis {
  /**
   * 분석된 음소 표기
   * IPA(International Phonetic Alphabet) 형식
   * 예: "æ", "ɪ", "oʊ"
   */
  phoneme: string;

  /**
   * 기대값 (표준 발음의 음소 특성값)
   * 0~100 범위의 정규화된 수치
   */
  expected: number;

  /**
   * 실제값 (사용자 발음의 음소 특성값)
   * 0~100 범위의 정규화된 수치
   */
  actual: number;

  /**
   * 해당 음소의 정확도
   * (actual/expected) * 100 계산값
   * 0~100% 범위
   */
  accuracy: number;
}

/**
 * 발음 분석 종합 결과
 * 사용자 발음을 다각도로 분석한 결과 데이터
 */
export interface AnalysisResult {
  /**
   * 전체 발음 정확도 (%)
   * 모든 평가 요소를 종합한 최종 점수
   * 0~100 범위
   */
  accuracy: number;

  /**
   * 음높이/억양 일치도 (%)
   * 표준 발음과의 피치 패턴 유사도
   * 0~100 범위
   */
  pitchMatch: number;

  /**
   * 리듬/속도 정확도 (%)
   * 발화 속도와 강세 패턴의 일치도
   * 0~100 범위
   */
  rhythm: number;

  /**
   * 개별 음소 분석 배열
   * 각 음소별 상세 분석 결과
   * 문장을 구성하는 모든 음소에 대한 분석
   */
  pronunciation: PhonemeAnalysis[];

  /**
   * 웨이브폼 데이터 배열
   * 시각화를 위한 오디오 파형 데이터
   * -1~1 범위의 정규화된 진폭 값들
   * 그래프 렌더링에 사용
   */
  waveformData: number[];

  /**
   * AI 생성 피드백 메시지
   * 사용자의 발음에 대한 종합적인 평가
   * 예: "전체적으로 좋은 발음이에요! 'r' 발음을 조금 더 명확하게 해보세요."
   */
  feedback: string;

  /**
   * 개선 제안 사항 배열
   * 구체적인 발음 개선 팁들
   * 예: ["'th' 발음 시 혀를 치아 사이에 두세요", "문장 끝의 억양을 올려보세요"]
   */
  suggestions: string[];
}

/**
 * 오디오 데이터 래퍼
 * 녹음된 오디오의 원본 데이터와 메타정보
 */
export interface AudioData {
  /**
   * 오디오 원본 데이터
   * 브라우저 MediaRecorder API로 생성된 Blob 객체
   * MIME type: 'audio/webm' 또는 'audio/wav'
   */
  blob: Blob;

  /**
   * 재생 가능한 오디오 URL
   * URL.createObjectURL(blob)로 생성
   * 오디오 플레이어에서 직접 재생 가능
   * 주의: 사용 후 URL.revokeObjectURL()로 메모리 해제 필요
   */
  url: string;

  /**
   * 녹음 시간 (초)
   * 소수점 포함 가능 (예: 3.5초)
   * 최대 녹음 시간 제한에 사용
   */
  duration: number;
}

/**
 * 대화 선택지 정보
 * 발음 연습할 대화 내용과 관련 정보
 */
export interface DialogueChoice {
  /**
   * 선택지 고유 ID
   * 예: "choice_cafe_1"
   */
  id: string;

  /**
   * 영어 대화 텍스트
   * 사용자가 발음할 문장
   * 예: "Would you like to have coffee with me?"
   */
  text: string;

  /**
   * 한국어 번역
   * UI에 표시될 번역문
   * 예: "나와 함께 커피 마실래?"
   */
  koreanText: string;

  /**
   * 표준 발음 오디오 파일 경로
   * 네이티브 스피커의 녹음 파일
   * 예: "/audio/references/choice_cafe_1.mp3"
   */
  audioReference: string;

  /**
   * 난이도 레벨
   * 1: 초급, 2: 중급, 3: 고급
   */
  difficulty?: 1 | 2 | 3;
}

/**
 * 발음 분석 요청 DTO
 * 백엔드 API로 전송할 데이터 구조
 */
export interface PronunciationAnalysisRequest {
  /**
   * 사용자 녹음 오디오 (Base64 인코딩)
   * Blob을 Base64 문자열로 변환하여 전송
   */
  userAudio: string;

  /**
   * 표준 발음 참조 ID
   * 백엔드에서 미리 저장된 표준 발음 식별자
   */
  referenceId: string;

  /**
   * 분석할 텍스트
   * 발음 정확도 계산의 기준이 되는 원문
   */
  text: string;

  /**
   * 분석 옵션 (선택사항)
   * 상세 분석 레벨, 피드백 언어 등
   */
  options?: {
    detailLevel?: 'basic' | 'detailed';
    feedbackLanguage?: 'ko' | 'en';
  };
}

/**
 * 발음 점수 등급
 * 정확도에 따른 시각적 피드백용
 */
export type PronunciationGrade =
  | 'perfect' // 95-100%
  | 'excellent' // 85-94%
  | 'good' // 70-84%
  | 'fair' // 50-69%
  | 'poor'; // 0-49%

/**
 * 발음 등급 계산 유틸리티 함수
 * @param accuracy - 정확도 점수 (0-100)
 * @returns 해당하는 등급
 */
export const getPronunciationGrade = (accuracy: number): PronunciationGrade => {
  if (accuracy >= 95) return 'perfect';
  if (accuracy >= 85) return 'excellent';
  if (accuracy >= 70) return 'good';
  if (accuracy >= 50) return 'fair';
  return 'poor';
};

/**
 * 등급별 색상 매핑
 * UI에서 시각적 피드백 제공용
 */
export const GRADE_COLORS: Record<PronunciationGrade, string> = {
  perfect: '#4CAF50', // 녹색
  excellent: '#8BC34A', // 연녹색
  good: '#FFC107', // 노란색
  fair: '#FF9800', // 주황색
  poor: '#F44336', // 빨간색
};

/**
 * 등급별 이모지 매핑
 * 친근한 피드백 제공용
 */
export const GRADE_EMOJIS: Record<PronunciationGrade, string> = {
  perfect: '🌟',
  excellent: '⭐',
  good: '👍',
  fair: '💪',
  poor: '📚',
};

/**
 * 타입 가드: AnalysisResult 유효성 검사
 * API 응답 데이터 검증용
 */
export const isValidAnalysisResult = (data: unknown): data is AnalysisResult => {
  return (
    typeof data === 'object' &&
    typeof data.accuracy === 'number' &&
    typeof data.pitchMatch === 'number' &&
    typeof data.rhythm === 'number' &&
    Array.isArray(data.pronunciation) &&
    Array.isArray(data.waveformData) &&
    typeof data.feedback === 'string' &&
    Array.isArray(data.suggestions)
  );
};
