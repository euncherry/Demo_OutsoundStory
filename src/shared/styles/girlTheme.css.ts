import { createGlobalTheme } from '@vanilla-extract/css';

// 공통 속성들 (모든 테마에서 공유)
const commonProperties = {
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
  zIndex: {
    base: '0',
    dropdown: '100',
    modal: '200',
    popover: '300',
    tooltip: '400',
    notification: '500',
  },
};

// 🌈 글로벌 버전 - 성별 선택 전 공통 테마
export const globalTheme = createGlobalTheme(':root', {
  colors: {
    // Primary - 라일락 메인
    primary: '#E6DCFF',
    primaryLight: '#F3EDFF',
    primaryDark: '#D4C3FF',
    primaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(230, 220, 255, 0.6), rgba(255, 230, 250, 0.6))',

    // Secondary - 레몬 민트 서브
    secondary: '#C8FFD6',
    secondaryLight: '#E5FFE8',
    secondaryDark: '#9FE8B5',
    secondaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(244, 255, 200, 0.6), rgba(200, 255, 214, 0.6))',

    // Accent colors
    accent1: '#FFE6FA', // 페일 핑크
    accent2: '#E0F0FF', // 페일 블루
    accent3: '#F0FFE0', // 페일 그린

    // Background
    background: 'linear-gradient(to bottom, #FFE5F1, #FFF0F5)',
    backgroundGlass: 'rgba(255, 255, 255, 0.85)',
    backgroundBlur: 'rgba(230, 220, 255, 0.4)',
    backgroundCard: 'rgba(255, 255, 255, 0.95)',

    // Text colors
    text: '#9B7EAE', // 라일락 텍스트
    textSecondary: '#7FA663', // 레몬 민트 텍스트
    textMuted: '#C7B3D3',
    textLight: '#B095C0',
    textAccent: '#5FA778', // 민트 그린 액센트

    // UI Elements
    buttonMain:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(230, 220, 255, 0.6), rgba(255, 230, 250, 0.6))',
    buttonSub:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 250, 200, 0.6), rgba(255, 240, 180, 0.6))',
    buttonHover:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(230, 220, 255, 0.7), rgba(255, 250, 200, 0.7))',

    // Interactive colors
    success: '#9FE8B5', // 민트 그린
    warning: '#FFE082',
    error: '#FFCDD2',
    info: '#BBDEFB',

    // Glass effects
    glassBorder: 'rgba(255, 255, 255, 0.95)',
    glassShine:
      'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.5), transparent)',

    // Shadows & Overlays
    shadow: 'rgba(230, 220, 255, 0.25)',
    shadowHover: 'rgba(200, 255, 214, 0.35)',
    overlay: 'rgba(230, 220, 255, 0.3)',
    overlayLight: 'rgba(244, 255, 200, 0.3)',

    // Special
    holographic:
      'linear-gradient(135deg, rgba(230, 220, 255, 0.4), rgba(244, 255, 200, 0.4), rgba(200, 255, 214, 0.4), rgba(255, 230, 250, 0.4))',
    sparkle: '#F0FFE0',
    gradient: 'linear-gradient(135deg, #E6DCFF, #C8FFD6, #F4FFC8, #FFE6FA)',
  },
  ...commonProperties,
});

// 💕 여성향 버전 - 여자 NPC와의 연애
export const femaleNPCTheme = createGlobalTheme(':root', {
  colors: {
    // Primary - 체리블로썸 메인
    primary: '#FFC8DC',
    primaryLight: '#FFE0EC',
    primaryDark: '#FFB4C8',
    primaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 200, 220, 0.6), rgba(255, 180, 200, 0.6))',

    // Secondary - 민트그린 서브
    secondary: '#C8FFDC',
    secondaryLight: '#E0FFEC',
    secondaryDark: '#A8F0C8',
    secondaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 255, 220, 0.6), rgba(180, 240, 200, 0.6))',

    // Tertiary - 핑크 라벤더 포인트
    tertiary: '#FFB6C1',
    tertiaryLight: '#FFE5EC',
    tertiaryDark: '#F3A5B7',
    tertiaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 230, 236, 0.6), rgba(243, 229, 245, 0.6))',

    // Additional colors
    quaternary: '#B8E6D3', // 민트 블루
    quinary: '#FFDAC1', // 피치 코랄
    senary: '#F4FFC8', // 레몬 민트

    // Accent colors palette
    accent1: '#FFE0EC', // 체리블로썸 라이트
    accent2: '#D4F1EE', // 민트 블루 라이트
    accent3: '#FFE5D3', // 피치 코랄 라이트
    accent4: '#E6E0F8', // 라벤더
    accent5: '#E5FFE8', // 레몬 민트 라이트

    // Background
    background: 'linear-gradient(to bottom, #FFF0F5, #F0FFF5)',
    backgroundGlass: 'rgba(255, 255, 255, 0.88)',
    backgroundBlur: 'rgba(255, 200, 220, 0.5)',
    backgroundCard: 'rgba(255, 255, 255, 0.96)',

    // Text colors
    text: '#D4668F', // 체리 핑크 텍스트
    textSecondary: '#5FA778', // 민트그린 텍스트
    textMuted: '#C080A0',
    textLight: '#6B5B95', // 라벤더 퍼플
    textAccent: '#C97064', // 피치 코랄

    // UI Elements
    buttonMain:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 200, 220, 0.6), rgba(255, 180, 200, 0.6))',
    buttonSub:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 255, 220, 0.6), rgba(212, 241, 238, 0.6))',
    buttonAccent:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 218, 193, 0.6), rgba(244, 255, 200, 0.6))',
    buttonSilver:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(230, 235, 240, 0.6), rgba(200, 220, 235, 0.6))',
    buttonHover:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 180, 200, 0.7), rgba(200, 255, 220, 0.7))',

    // Interactive colors
    success: '#A8F0C8', // 민트그린
    warning: '#FFFAC8', // 레몬
    error: '#FFB4C8', // 체리
    info: '#B8E6D3', // 민트블루
    love: '#FF6B9D', // 러브 핑크 (호감도)

    // Glass effects
    glassBorder: 'rgba(255, 255, 255, 0.95)',
    glassShine:
      'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.6), transparent)',

    // Shadows & Overlays
    shadow: 'rgba(255, 180, 200, 0.25)',
    shadowHover: 'rgba(255, 180, 200, 0.35)',
    overlay: 'rgba(255, 200, 220, 0.3)',
    overlayDark: 'rgba(212, 102, 143, 0.5)',

    // Special effects
    holographic:
      'linear-gradient(135deg, rgba(255, 200, 220, 0.4), rgba(200, 255, 220, 0.4), rgba(255, 230, 236, 0.4), rgba(244, 255, 200, 0.4))',
    sparkle: '#FFFDE7',
    gradient:
      'linear-gradient(135deg, #FFC8DC, #C8FFDC, #FFB6C1, #B8E6D3, #FFDAC1, #F4FFC8)',
  },
  ...commonProperties,
});

// 💎 남성향 버전 - 남자 NPC와의 연애
export const maleNPCTheme = createGlobalTheme(':root', {
  colors: {
    // Primary - 스카이 퍼플 메인
    primary: '#C8E6FF',
    primaryLight: '#E0F2FF',
    primaryDark: '#9DCEFF',
    primaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 230, 255, 0.6), rgba(220, 200, 255, 0.6))',

    // Secondary - 오션 블루 서브
    secondary: '#B4E6FF',
    secondaryLight: '#D4F0FF',
    secondaryDark: '#7FD4FF',
    secondaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(180, 230, 255, 0.6), rgba(150, 200, 255, 0.6))',

    // Tertiary - 핑크 옐로우 포인트
    tertiary: '#FFE0EC',
    tertiaryLight: '#FFF0F7',
    tertiaryDark: '#FFC0D9',
    tertiaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 224, 236, 0.6), rgba(255, 245, 200, 0.6))',

    // Additional colors
    quaternary: '#E6EBEF', // 실버블루
    quinary: '#FFC896', // 선셋 오렌지
    senary: '#DCC8FF', // 스카이 퍼플 (더 진한)

    // Accent colors palette
    accent1: '#E0F2FF', // 스카이 라이트
    accent2: '#D4F0FF', // 오션 라이트
    accent3: '#FFF0F7', // 핑크 옐로우 라이트
    accent4: '#F0F4F7', // 실버 라이트
    accent5: '#FFE0C3', // 선셋 라이트

    // Background
    background: 'linear-gradient(to bottom, #F0F8FF, #FFF5ED)',
    backgroundGlass: 'rgba(255, 255, 255, 0.88)',
    backgroundBlur: 'rgba(200, 230, 255, 0.5)',
    backgroundCard: 'rgba(255, 255, 255, 0.96)',

    // Text colors
    text: '#6B7FA6', // 스카이 퍼플 텍스트
    textSecondary: '#5B9EBE', // 오션블루 텍스트
    textMuted: '#8895B3',
    textLight: '#708090', // 실버블루
    textAccent: '#B67B8E', // 핑크 옐로우 텍스트

    // UI Elements
    buttonMain:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 230, 255, 0.6), rgba(220, 200, 255, 0.6))',
    buttonSub:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(180, 230, 255, 0.6), rgba(150, 200, 255, 0.6))',
    buttonAccent:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 224, 236, 0.6), rgba(255, 245, 200, 0.6))',
    buttonSilver:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(230, 235, 240, 0.6), rgba(200, 220, 235, 0.6))',
    buttonSunset:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 200, 150, 0.6), rgba(255, 150, 180, 0.6))',
    buttonHover:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(180, 230, 255, 0.7), rgba(220, 200, 255, 0.7))',

    // Interactive colors
    success: '#A8E6CF', // 세이지 그린
    warning: '#FFE082', // 골든 옐로우
    error: '#FFA563', // 선셋 다크
    info: '#9DCEFF', // 스카이
    love: '#7FD4FF', // 딥 스카이 (호감도)

    // Glass effects
    glassBorder: 'rgba(255, 255, 255, 0.95)',
    glassShine:
      'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.6), transparent)',

    // Shadows & Overlays
    shadow: 'rgba(200, 230, 255, 0.25)',
    shadowHover: 'rgba(220, 200, 255, 0.35)',
    overlay: 'rgba(200, 230, 255, 0.3)',
    overlayDark: 'rgba(107, 127, 166, 0.5)',

    // Special effects
    holographic:
      'linear-gradient(135deg, rgba(200, 230, 255, 0.4), rgba(255, 224, 236, 0.4), rgba(230, 235, 240, 0.4), rgba(220, 200, 255, 0.4))',
    sparkle: '#F0F8FF',
    gradient: 'linear-gradient(135deg, #C8E6FF, #B4E6FF, #FFE0EC, #E6EBEF, #FFC896)',
  },
  ...commonProperties,
});

// 테마 선택 헬퍼 함수
export const getThemeByType = (type: 'global' | 'female' | 'male' = 'global') => {
  switch (type) {
    case 'female':
      return femaleNPCTheme;
    case 'male':
      return maleNPCTheme;
    default:
      return globalTheme;
  }
};

// 기본 테마 (글로벌 버전)
export const theme = globalTheme;
