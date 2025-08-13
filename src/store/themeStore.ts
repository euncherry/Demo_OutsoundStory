import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { ThemeType } from '@/types/theme.types';

interface ThemeState {
  currentTheme: ThemeType;
  isThemeLocked: boolean; // 성별 선택 후 테마 고정
  setTheme: (theme: ThemeType) => void;
  lockTheme: () => void;
  resetTheme: () => void;
}

/**
 * 테마 스토어
 * Redux DevTools에서 확인 가능
 * Chrome 확장 프로그램: Redux DevTools Extension 필요
 */
export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        // ===== State =====
        currentTheme: 'global',
        isThemeLocked: false,

        // ===== Actions =====
        setTheme: (theme) =>
          set(
            (state) => {
              if (state.isThemeLocked) {
                console.warn('Theme is locked after gender selection');
                return state;
              }
              return { currentTheme: theme };
            },
            false, // replace 옵션
            'setTheme', // Redux DevTools에 표시될 액션 이름
          ),

        lockTheme: () => set({ isThemeLocked: false }, false, 'lockTheme'),

        unlockTheme: () => set({ isThemeLocked: false }, false, 'unlockTheme'),

        resetTheme: () =>
          set(
            {
              currentTheme: 'global',
              isThemeLocked: false,
            },
            false,
            'resetTheme',
          ),
      }),
      {
        name: 'theme-storage', // localStorage key
      },
    ),
    {
      name: 'ThemeStore', // Redux DevTools에 표시될 스토어 이름
      enabled: process.env.NODE_ENV === 'development', // 개발 환경에서만 활성화
    },
  ),
);
