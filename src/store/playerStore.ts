// src/store/playerStore.ts

// Zustand 상태 관리 라이브러리 import
import { create } from "zustand";
// 로컬스토리지에 상태를 자동 저장하는 미들웨어
import { persist, devtools } from "zustand/middleware";
// 성별 타입 정의 import
import { Gender } from "@/types/character.types";

/**
 * 지원 언어 타입 정의
 */
export type Language = "ko" | "en";

/**
 * 플레이어 상태 인터페이스
 * 게임 내 플레이어의 모든 정보를 관리
 */
interface PlayerState {
  // ===== 상태 (State) =====

  /** 플레이어가 입력한 캐릭터 이름 */
  name: string;

  /** 플레이어가 선택한 성별 ('male' | 'female' | null) */
  gender: Gender | null;

  /** 게임 언어 설정 ('ko' | 'en') */
  language: Language;

  /** 캐릭터 생성 시간 (세이브 파일 관리용) */
  createdAt: Date | null;

  // ===== 액션 (Actions) =====

  /**
   * 플레이어 기본 정보 설정
   * PlayerSetup 페이지에서 이름과 성별 선택 완료 시 호출
   * @param info - 이름과 성별 정보
   */
  setPlayerInfo: (info: { name: string; gender: Gender }) => void;

  /**
   * 언어 설정 변경
   * @param language - 변경할 언어 ('ko' | 'en')
   */
  setLanguage: (language: Language) => void;

  /**
   * 플레이어 정보 초기화
   * 새 게임 시작 또는 로그아웃 시 호출
   */
  resetPlayer: () => void;
}

/**
 * 브라우저 언어 감지 헬퍼 함수
 * 사용자 브라우저 설정에 따라 초기 언어 결정
 */
const getDefaultLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith("ko") ? "ko" : "en";
};

/**
 * 플레이어 스토어 생성
 * - persist 미들웨어로 브라우저 로컬스토리지에 자동 저장
 * - devtools 미들웨어로 Redux DevTools 연동
 * - 게임 새로고침 후에도 플레이어 정보 유지
 */
export const usePlayerStore = create<PlayerState>()(
  devtools(
    persist(
      (set) => ({
        // ===== 초기 상태값 =====
        name: "", // 빈 문자열로 초기화
        gender: null, // 성별 미선택 상태
        language: getDefaultLanguage(), // 브라우저 언어 기반 초기값
        createdAt: null, // 캐릭터 미생성 상태

        // ===== 액션 구현 =====

        /**
         * 플레이어 정보 설정 액션
         * - 이름과 성별을 동시에 설정
         * - 생성 시간을 현재 시간으로 자동 기록
         */
        setPlayerInfo: (info) =>
          set(
            {
              name: info.name,
              gender: info.gender,
              createdAt: new Date(), // 현재 시간 자동 기록
            },
            false, // replace 옵션 (false = merge)
            "player/setPlayerInfo" // Redux DevTools에 표시될 액션 이름
          ),

        /**
         * 언어 설정 변경 액션
         * - 게임 내 모든 텍스트 언어 전환
         * - 로컬스토리지에 자동 저장되어 다음 접속 시에도 유지
         */
        setLanguage: (language) =>
          set(
            { language },
            false,
            "player/setLanguage" // Redux DevTools 액션 이름
          ),

        /**
         * 플레이어 초기화 액션
         * - 모든 플레이어 정보를 초기값으로 리셋
         * - 새 게임 시작 시 기존 데이터 클리어용
         * - 언어 설정은 유지 (사용자 선호도 존중)
         */
        resetPlayer: () =>
          set(
            (state) => ({
              name: "",
              gender: null,
              createdAt: null,
              language: state.language, // 언어 설정은 유지
            }),
            false,
            "player/resetPlayer" // Redux DevTools 액션 이름
          ),
      }),
      {
        /**
         * persist 설정
         * - name: 로컬스토리지에 저장될 키 이름
         * - 'player-storage'라는 키로 자동 저장/불러오기
         * - 브라우저 개발자도구 > Application > Local Storage에서 확인 가능
         */
        name: "player-storage",
      }
    ),
    {
      /**
       * Redux DevTools 설정
       * - name: DevTools에 표시될 스토어 이름
       * - enabled: 개발 환경에서만 활성화
       */
      name: "PlayerStore", // Redux DevTools에 표시될 이름
      enabled: process.env.NODE_ENV === "development", // 개발 환경에서만 활성화
    }
  )
);

/**
 * 개발자 도구용 헬퍼 함수들 (개발 환경에서만)
 */
if (process.env.NODE_ENV === "development") {
  // 전역 객체에 스토어 노출 (콘솔에서 접근 가능)
  // @ts-expect-error - window 객체에 커스텀 속성 추가
  window.playerStore = usePlayerStore;

  // 디버깅용 로그
  console.log(
    "%c[PlayerStore] Ready",
    "color: #FF6B9D; font-weight: bold;",
    "\n- Redux DevTools: ✅",
    "\n- LocalStorage: ✅",
    "\n- Console Access: window.playerStore",
    "\n- Default Language:",
    getDefaultLanguage()
  );
}
