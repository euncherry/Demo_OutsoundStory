export type ThemeType = 'global' | 'female' | 'male';

export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryGlass: string;

  // Secondary colors
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  secondaryGlass: string;

  // Additional theme-specific colors
  tertiary?: string;
  tertiaryLight?: string;
  tertiaryDark?: string;
  tertiaryGlass?: string;
  quaternary?: string;
  quinary?: string;
  senary?: string;

  // Accent colors
  accent1: string;
  accent2: string;
  accent3: string;
  accent4?: string;
  accent5?: string;

  // Background
  background: string;
  backgroundGlass: string;
  backgroundBlur: string;
  backgroundCard: string;

  // Text colors
  text: string;
  textSecondary: string;
  textMuted: string;
  textLight: string;
  textAccent: string;

  // UI Elements
  buttonMain: string;
  buttonSub: string;
  buttonHover: string;
  buttonAccent?: string;
  buttonSilver?: string;
  buttonSunset?: string;

  // Interactive colors
  success: string;
  warning: string;
  error: string;
  info: string;
  love?: string;

  // Glass effects
  glassBorder: string;
  glassShine: string;

  // Shadows & Overlays
  shadow: string;
  shadowHover: string;
  overlay: string;
  overlayLight?: string;
  overlayDark?: string;

  // Special effects
  holographic: string;
  sparkle: string;
  gradient: string;
}

export interface ThemeTokens {
  colors: ThemeColors;
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
  zIndex: {
    base: string;
    dropdown: string;
    modal: string;
    popover: string;
    tooltip: string;
    notification: string;
  };
}
