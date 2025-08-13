import { createThemeContract, createTheme } from '@vanilla-extract/css';

// 공통 속성들
const commonProperties = {
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    xxl: '3rem', // 48px
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.5rem', // 24px
    xxl: '2rem', // 32px
    xxxl: '3rem', // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  borderRadius: {
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '1rem', // 16px
    xl: '1.5rem', // 24px
    full: '624.9375rem', // 9999px
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

// 1. 테마 Contract 정의 (CSS 변수 구조)
export const vars = createThemeContract({
  colors: {
    primary: null,
    primaryLight: null,
    primaryDark: null,
    primaryGlass: null,
    secondary: null,
    secondaryLight: null,
    secondaryDark: null,
    secondaryGlass: null,
    accent1: null,
    accent2: null,
    accent3: null,
    background: null,
    backgroundGlass: null,
    backgroundBlur: null,
    backgroundCard: null,
    text: null,
    textSecondary: null,
    textTertiary: null,
    textMuted: null,
    textLight: null,
    textAccent: null,
    buttonMain: null,
    buttonSub: null,
    buttonSilver: null,
    buttonHover: null,
    success: null,
    warning: null,
    error: null,
    info: null,
    glassBorder: null,
    glassShine: null,
    shadow: null,
    shadowHover: null,
    overlay: null,
    overlayLight: null,
    holographic: null,
    sparkle: null,
    gradient: null,
  },
  ...commonProperties,
});

// 2. 각 테마별 클래스와 값 생성
export const globalTheme = createTheme(vars, {
  colors: {
    primary: '#E6DCFF',
    primaryLight: '#F3EDFF',
    primaryDark: '#D4C3FF',
    primaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(230, 220, 255, 0.6), rgba(255, 230, 250, 0.6))',
    secondary: '#C8FFD6',
    secondaryLight: '#E5FFE8',
    secondaryDark: '#9FE8B5',
    secondaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(244, 255, 200, 0.6), rgba(200, 255, 214, 0.6))',
    accent1: '#FFE6FA',
    accent2: '#E0F0FF',
    accent3: '#F0FFE0',
    background: 'linear-gradient(to bottom, #FFE5F1, #FFF0F5)',
    backgroundGlass: 'rgba(255, 255, 255, 0.85)',
    backgroundBlur: 'rgba(230, 220, 255, 0.4)',
    backgroundCard: 'rgba(255, 255, 255, 0.95)',
    text: '#9b7eae',
    textSecondary: '#7FA663',
    textTertiary: '#6B5B95',
    textMuted: '#C7B3D3',
    textLight: '#B095C0',
    textAccent: '#5FA778',
    buttonMain:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(230, 220, 255, 0.6), rgba(255, 230, 250, 0.6))',
    buttonSub:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 250, 200, 0.6), rgba(255, 240, 180, 0.6))',
    buttonSilver:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9),   rgba(230, 235, 240, 0.6),rgba(200, 220, 235, 0.6),)',

    buttonHover:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(230, 220, 255, 0.7), rgba(255, 250, 200, 0.7))',
    success: '#9FE8B5',
    warning: '#FFE082',
    error: '#FFCDD2',
    info: '#BBDEFB',
    glassBorder: 'rgba(255, 255, 255, 0.95)',
    glassShine:
      'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
    shadow: 'rgba(230, 220, 255, 0.25)',
    shadowHover: 'rgba(200, 255, 214, 0.35)',
    overlay: 'rgba(230, 220, 255, 0.3)',
    overlayLight: 'rgba(244, 255, 200, 0.3)',
    holographic:
      'linear-gradient(135deg, rgba(230, 220, 255, 0.6), rgba(244, 255, 200, 0.6), rgba(200, 255, 214, 0.6), rgba(255, 230, 250, 0.6))',
    sparkle: '#F0FFE0',
    gradient: 'linear-gradient(135deg, #E6DCFF, #C8FFD6, #F4FFC8, #FFE6FA)',
  },
  ...commonProperties,
});

export const femaleTheme = createTheme(vars, {
  colors: {
    primary: '#FFC8DC',
    primaryLight: '#FFE0EC',
    primaryDark: '#FFB4C8',
    primaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 200, 220, 0.6), rgba(255, 180, 200, 0.6))',
    secondary: '#C8FFDC',
    secondaryLight: '#E0FFEC',
    secondaryDark: '#A8F0C8',
    secondaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 255, 220, 0.6), rgba(180, 240, 200, 0.6))',
    accent1: '#FFE0EC',
    accent2: '#D4F1EE',
    accent3: '#FFE5D3',
    background: 'linear-gradient(to bottom, #FFF0F5, #F0FFF5)',
    backgroundGlass: 'rgba(255, 255, 255, 0.88)',
    backgroundBlur: 'rgba(255, 200, 220, 0.5)',
    backgroundCard: 'rgba(255, 255, 255, 0.96)',
    text: '#D4668F',
    textSecondary: '#5FA778',
    textTertiary: 'rgb(233, 30, 99)',
    textMuted: '#C080A0',
    textLight: '#6B5B95',
    textAccent: '#C97064',
    buttonMain:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 200, 220, 0.6),rgba(255, 200, 220, 0.6), rgba(255, 180, 200, 0.6))',
    buttonSub:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 255, 220, 0.6), rgba(212, 241, 238, 0.6))',
    buttonSilver:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9),   rgba(230, 235, 240, 0.6),rgba(200, 220, 235, 0.6),)',
    buttonHover:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 180, 200, 0.7), rgba(200, 255, 220, 0.7))',
    success: '#A8F0C8',
    warning: '#FFFAC8',
    error: '#FFB4C8',
    info: '#B8E6D3',
    glassBorder: 'rgba(255, 255, 255, 0.95)',
    glassShine:
      'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
    shadow: 'rgba(255, 180, 200, 0.25)',
    shadowHover: 'rgba(255, 180, 200, 0.35)',
    overlay: 'rgba(255, 200, 220, 0.3)',
    overlayLight: 'rgba(212, 102, 143, 0.5)',
    holographic:
      'linear-gradient(135deg, rgba(255, 200, 220, 0.6), rgba(200, 255, 220, 0.6), rgba(255, 230, 236, 0.6), rgba(264, 255, 200, 0.6))',
    sparkle: '#FFFDE7',
    gradient:
      'linear-gradient(135deg, #FFC8DC, #C8FFDC, #FFB6C1, #B8E6D3, #FFDAC1, #F4FFC8)',
  },
  ...commonProperties,
});

export const maleTheme = createTheme(vars, {
  colors: {
    primary: '#C8E6FF',
    primaryLight: '#E0F2FF',
    primaryDark: '#9DCEFF',
    primaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 230, 255, 0.6), rgba(220, 200, 255, 0.6))',
    secondary: '#B4E6FF',
    secondaryLight: '#D4F0FF',
    secondaryDark: '#7FD4FF',
    secondaryGlass:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(180, 230, 255, 0.6), rgba(150, 200, 255, 0.6))',
    accent1: '#E0F2FF',
    accent2: '#D4F0FF',
    accent3: '#FFF0F7',
    background: 'linear-gradient(to bottom, #F0F8FF, #FFF5ED)',
    backgroundGlass: 'rgba(255, 255, 255, 0.88)',
    backgroundBlur: 'rgba(200, 230, 255, 0.5)',
    backgroundCard: 'rgba(255, 255, 255, 0.96)',
    text: '#6B7FA6',
    textSecondary: '#5B9EBE',
    textTertiary: '#0078d7',
    textMuted: '#8895B3',
    textLight: '#708090',
    textAccent: '#B67B8E',
    buttonMain:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 230, 255, 0.6), rgba(220, 200, 255, 0.6), rgba(220, 200, 255, 0.6))',
    buttonSub:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(180, 230, 255, 0.6),rgba(180, 230, 255, 0.6), rgba(150, 200, 255, 0.6))',
    buttonSilver:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9),   rgba(230, 235, 240, 0.6),rgba(200, 220, 235, 0.6),)',
    buttonHover:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(180, 230, 255, 0.7), rgba(220, 200, 255, 0.7))',
    success: '#A8E6CF',
    warning: '#FFE082',
    error: '#FFA563',
    info: '#9DCEFF',
    glassBorder: 'rgba(255, 255, 255, 0.95)',
    glassShine:
      'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
    shadow: 'rgba(200, 230, 255, 0.25)',
    shadowHover: 'rgba(220, 200, 255, 0.35)',
    overlay: 'rgba(200, 230, 255, 0.3)',
    overlayLight: 'rgba(107, 127, 166, 0.5)',
    holographic:
      'linear-gradient(135deg, rgba(200, 230, 255, 0.6), rgba(255, 224, 236, 0.6), rgba(230, 235, 240, 0.6), rgba(220, 200, 255, 0.6))',
    sparkle: '#F0F8FF',
    gradient: 'linear-gradient(135deg, #C8E6FF, #B4E6FF, #FFE0EC, #E6EBEF, #FFC896)',
  },
  ...commonProperties,
});

// theme 별칭 export (편의를 위해)
export const theme = vars;
