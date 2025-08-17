import { createThemeContract, createTheme } from "@vanilla-extract/css";

// 공통 속성들
const commonProperties = {
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    xxl: "3rem", // 48px
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.5rem", // 24px
    xxl: "2rem", // 32px
    xxxl: "3rem", // 48px
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  borderRadius: {
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "1rem", // 16px
    xl: "1.5rem", // 24px
    full: "624.9375rem", // 9999px
  },
  transitions: {
    fast: "150ms ease-in-out",
    normal: "300ms ease-in-out",
    slow: "500ms ease-in-out",
  },
  zIndex: {
    base: "0",
    dropdown: "100",
    modal: "200",
    popover: "300",
    tooltip: "400",
    notification: "500",
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
    // Choice 버튼 전용 색상
    choiceText: null,
    choiceBackground: null,
    choiceBorder: null,
    choiceBackgroundHover: null,
    choiceBorderHover: null,
  },
  ...commonProperties,
});

// 2. 각 테마별 클래스와 값 생성
export const globalTheme = createTheme(vars, {
  colors: {
    primary: "rgba(230, 220, 255, 1)",
    primaryLight: "rgba(243, 237, 255, 1)",
    primaryDark: "rgba(212, 195, 255, 1)",
    primaryGlass:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(230, 220, 255, 0.6), rgba(255, 230, 250, 0.6))",
    secondary: "rgba(200, 255, 214, 1)",
    secondaryLight: "rgba(229, 255, 232, 1)",
    secondaryDark: "rgba(159, 232, 181, 1)",
    secondaryGlass:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(244, 255, 200, 0.6), rgba(200, 255, 214, 0.6))",
    accent1: "rgba(255, 230, 250, 1)",
    accent2: "rgba(224, 240, 255, 1)",
    accent3: "rgba(240, 255, 224, 1)",
    background:
      "linear-gradient(to bottom, rgba(255, 229, 241, 1), rgba(255, 240, 245, 1))",
    backgroundGlass: "rgba(255, 255, 255, 0.85)",
    backgroundBlur: "rgba(230, 220, 255, 0.4)",
    backgroundCard: "rgba(255, 255, 255, 0.95)",
    text: "rgba(155, 126, 174, 1)",
    textSecondary: "rgba(127, 166, 99, 1)",
    textTertiary: "rgba(107, 91, 149, 1)",
    textMuted: "rgba(199, 179, 211, 1)",
    textLight: "rgba(176, 149, 192, 1)",
    textAccent: "rgba(95, 167, 120, 1)",
    buttonMain:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(230, 220, 255, 0.6), rgba(255, 230, 250, 0.6))",
    buttonSub:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 250, 200, 0.6), rgba(255, 240, 180, 0.6))",
    buttonSilver:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9),   rgba(230, 235, 240, 0.6),rgba(200, 220, 235, 0.6),)",

    buttonHover:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(230, 220, 255, 0.7), rgba(255, 250, 200, 0.7))",
    success: "rgba(159, 232, 181, 1)",
    warning: "rgba(255, 224, 130, 1)",
    error: "rgba(255, 205, 210, 1)",
    info: "rgba(187, 222, 251, 1)",
    glassBorder: "rgba(255, 255, 255, 0.95)",
    glassShine:
      "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
    shadow: "rgba(230, 220, 255, 0.25)",
    shadowHover: "rgba(200, 255, 214, 0.35)",
    overlay: "rgba(230, 220, 255, 0.3)",
    overlayLight: "rgba(244, 255, 200, 0.3)",
    holographic:
      "linear-gradient(135deg, rgba(230, 220, 255, 0.6), rgba(244, 255, 200, 0.6), rgba(200, 255, 214, 0.6), rgba(255, 230, 250, 0.6))",
    sparkle: "rgba(240, 255, 224, 1)",
    gradient:
      "linear-gradient(135deg, rgba(230, 220, 255, 1), rgba(200, 255, 214, 1), rgba(244, 255, 200, 1), rgba(255, 230, 250, 1))",
    // Choice 버튼 색상 (female과 동일)
    choiceText: "#000",
    choiceBackground:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 230, 236, 0.4), rgba(243, 229, 245, 0.4))",
    choiceBorder: "rgba(255, 182, 193, 0.3)",
    choiceBackgroundHover:
      "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 200, 220, 0.5), rgba(243, 229, 245, 0.5))",
    choiceBorderHover: "rgba(255, 182, 193, 0.5)",
  },
  ...commonProperties,
});

export const femaleTheme = createTheme(vars, {
  colors: {
    primary: "rgba(255, 200, 220, 1)",
    primaryLight: "rgba(255, 224, 236, 1)",
    primaryDark: "rgba(255, 180, 200, 1)",
    primaryGlass:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 200, 220, 0.6), rgba(255, 180, 200, 0.6))",
    secondary: "rgba(200, 255, 220, 1)",
    secondaryLight: "rgba(224, 255, 236, 1)",
    secondaryDark: "rgba(168, 240, 200, 1)",
    secondaryGlass:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 255, 220, 0.6), rgba(180, 240, 200, 0.6))",
    accent1: "rgba(255, 224, 236, 1)",
    accent2: "rgba(212, 241, 238, 1)",
    accent3: "rgba(255, 229, 211, 1)",
    background:
      "linear-gradient(to bottom, rgba(255, 240, 245, 1), rgba(240, 255, 245, 1))",
    backgroundGlass: "rgba(255, 255, 255, 0.88)",
    backgroundBlur: "rgba(255, 200, 220, 0.5)",
    backgroundCard: "rgba(255, 255, 255, 0.96)",
    text: "rgba(212, 102, 143, 1)",
    textSecondary: "rgba(95, 167, 120, 1)",
    textTertiary: "rgba(233, 30, 99, 1)",
    textMuted: "rgba(192, 128, 160, 1)",
    textLight: "rgba(107, 91, 149, 1)",
    textAccent: "rgba(201, 112, 100, 1)",
    buttonMain:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 200, 220, 0.6),rgba(255, 200, 220, 0.6), rgba(255, 180, 200, 0.6))",
    buttonSub:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 255, 220, 0.6), rgba(212, 241, 238, 0.6))",
    buttonSilver:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9),   rgba(230, 235, 240, 0.6),rgba(200, 220, 235, 0.6),)",
    buttonHover:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 180, 200, 0.7), rgba(200, 255, 220, 0.7))",
    success: "rgba(168, 240, 200, 1)",
    warning: "rgba(255, 250, 200, 1)",
    error: "rgba(255, 180, 200, 1)",
    info: "rgba(184, 230, 211, 1)",
    glassBorder: "rgba(255, 255, 255, 0.95)",
    glassShine:
      "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
    shadow: "rgba(255, 180, 200, 0.25)",
    shadowHover: "rgba(255, 180, 200, 0.35)",
    overlay: "rgba(255, 200, 220, 0.3)",
    overlayLight: "rgba(212, 102, 143, 0.5)",
    holographic:
      "linear-gradient(135deg, rgba(255, 200, 220, 0.6), rgba(200, 255, 220, 0.6), rgba(255, 230, 236, 0.6), rgba(255, 255, 200, 0.6))",
    sparkle: "rgba(255, 253, 231, 1)",
    gradient:
      "linear-gradient(135deg, rgba(255, 200, 220, 1), rgba(200, 255, 220, 1), rgba(255, 182, 193, 1), rgba(184, 230, 211, 1), rgba(255, 218, 193, 1), rgba(244, 255, 200, 1))",
    // Choice 버튼 색상 (female)
    choiceText: "#000",
    choiceBackground:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 230, 236, 0.4), rgba(243, 229, 245, 0.4))",
    choiceBorder: "rgba(255, 182, 193, 0.3)",
    choiceBackgroundHover:
      "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 200, 220, 0.5), rgba(243, 229, 245, 0.5))",
    choiceBorderHover: "rgba(255, 182, 193, 0.5)",
  },
  ...commonProperties,
});

export const maleTheme = createTheme(vars, {
  colors: {
    primary: "rgba(200, 230, 255, 1)",
    primaryLight: "rgba(224, 242, 255, 1)",
    primaryDark: "rgba(157, 206, 255, 1)",
    primaryGlass:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 230, 255, 0.6), rgba(220, 200, 255, 0.6))",
    secondary: "rgba(180, 230, 255, 1)",
    secondaryLight: "rgba(212, 240, 255, 1)",
    secondaryDark: "rgba(127, 212, 255, 1)",
    secondaryGlass:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(180, 230, 255, 0.6), rgba(150, 200, 255, 0.6))",
    accent1: "rgba(224, 242, 255, 1)",
    accent2: "rgba(212, 240, 255, 1)",
    accent3: "rgba(255, 240, 247, 1)",
    background:
      "linear-gradient(to bottom, rgba(240, 248, 255, 1), rgba(255, 245, 237, 1))",
    backgroundGlass: "rgba(255, 255, 255, 0.88)",
    backgroundBlur: "rgba(200, 230, 255, 0.5)",
    backgroundCard: "rgba(255, 255, 255, 0.96)",
    text: "rgba(107, 127, 166, 1)",
    textSecondary: "rgba(91, 158, 190, 1)",
    textTertiary: "rgba(0, 120, 215, 1)",
    textMuted: "rgba(136, 149, 179, 1)",
    textLight: "rgba(112, 128, 144, 1)",
    textAccent: "rgba(182, 123, 142, 1)",
    buttonMain:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 230, 255, 0.6), rgba(220, 200, 255, 0.6), rgba(220, 200, 255, 0.6))",
    buttonSub:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(180, 230, 255, 0.6),rgba(180, 230, 255, 0.6), rgba(150, 200, 255, 0.6))",
    buttonSilver:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9),   rgba(230, 235, 240, 0.6),rgba(200, 220, 235, 0.6),)",
    buttonHover:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(180, 230, 255, 0.7), rgba(220, 200, 255, 0.7))",
    success: "rgba(168, 230, 207, 1)",
    warning: "rgba(255, 224, 130, 1)",
    error: "rgba(255, 165, 99, 1)",
    info: "rgba(157, 206, 255, 1)",
    glassBorder: "rgba(255, 255, 255, 0.95)",
    glassShine:
      "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
    shadow: "rgba(200, 230, 255, 0.25)",
    shadowHover: "rgba(220, 200, 255, 0.35)",
    overlay: "rgba(200, 230, 255, 0.3)",
    overlayLight: "rgba(107, 127, 166, 0.5)",
    holographic:
      "linear-gradient(135deg, rgba(200, 230, 255, 0.6), rgba(255, 224, 236, 0.6), rgba(230, 235, 240, 0.6), rgba(220, 200, 255, 0.6))",
    sparkle: "rgba(240, 248, 255, 1)",
    gradient:
      "linear-gradient(135deg, rgba(200, 230, 255, 1), rgba(180, 230, 255, 1), rgba(255, 224, 236, 1), rgba(230, 235, 239, 1), rgba(255, 200, 150, 1))",
    // Choice 버튼 색상 (male)
    // choiceText: "rgba(112, 128, 144, 1)",
    choiceText: "#000",
    choiceBackground:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(230, 235, 240, 0.4), rgba(220, 200, 255, 0.4))",
    choiceBorder: "rgba(200, 230, 255, 0.3)",
    choiceBackgroundHover:
      "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(200, 230, 255, 0.5), rgba(220, 200, 255, 0.5))",
    choiceBorderHover: "rgba(200, 230, 255, 0.5)",
  },
  ...commonProperties,
});

// theme 별칭 export (편의를 위해)
export const theme = vars;
