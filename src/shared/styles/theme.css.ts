import { createGlobalTheme } from '@vanilla-extract/css';

export const theme = createGlobalTheme(':root', {
  colors: {
    // Primary colors
    primary: '#FF6B9D',
    primaryLight: '#FF9EC7',
    primaryDark: '#E63770',

    // Secondary colors
    secondary: '#C66FBC',
    secondaryLight: '#E4A5D9',
    secondaryDark: '#9B4A96',

    // Background colors
    background: 'linear-gradient(to bottom, #FFE5F1, #FFF0F5)',
    backgroundLight: '#252547',
    backgroundDark: '#0F0F1E',

    // Text colors
    text: '#FFFFFF',
    textSecondary: '#B8B8CC',
    textMuted: '#7A7A8E',

    // UI colors
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

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
});
