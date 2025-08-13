// src/pages/PlayerSetup/PlayerSetup.css.ts
import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@shared/styles/theme.css';

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(0px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const container = style({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: vars.colors.background,
  padding: vars.spacing.xl,
  position: 'relative',
});

export const backButton = style({
  position: 'absolute',
  top: vars.spacing.xl,
  left: vars.spacing.xl,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  background: vars.colors.backgroundGlass,
  border: `2px solid ${vars.colors.glassBorder}`,
  borderRadius: vars.borderRadius.md,
  color: vars.colors.text,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.medium,
  cursor: 'pointer',
  backdropFilter: 'blur(10px)',
  transition: vars.transitions.normal,

  ':hover': {
    background: vars.colors.buttonHover,
    transform: 'translateX(-5px)',
  },
});

export const setupCard = style({
  width: '100%',
  maxWidth: '600px',
  background: vars.colors.backgroundGlass,
  backdropFilter: 'blur(20px)',
  border: `2px solid ${vars.colors.glassBorder}`,
  borderRadius: vars.borderRadius.xl,
  padding: vars.spacing.xxl,
  boxShadow: `0 20px 60px ${vars.colors.shadow}`,
  animation: `${fadeIn} 0.5s ease`,
});

export const title = style({
  fontSize: vars.fontSize.xxl,
  fontWeight: vars.fontWeight.bold,
  textAlign: 'center',
  marginBottom: vars.spacing.xl,
  background: `linear-gradient(135deg, ${vars.colors.primary}, ${vars.colors.secondary})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const sectionTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.semibold,
  textAlign: 'center',
  marginBottom: vars.spacing.lg,
  color: vars.colors.text,
});

export const genderContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.lg,
});

export const genderButtons = style({
  display: 'flex',
  gap: vars.spacing.xl,
  justifyContent: 'center',
});

export const selectedWrapper = style({
  position: 'relative',

  '::after': {
    content: '""',
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    right: '-10px',
    bottom: '-10px',
    border: `3px solid ${vars.colors.primary}`,
    borderRadius: vars.borderRadius.xl,
    animation: `${keyframes({
      '0%, 100%': { opacity: 0.5 },
      '50%': { opacity: 1 },
    })} 1.5s ease infinite`,
  },
});

export const nameContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.lg,
});

export const inputWrapper = style({
  width: '100%',
  maxWidth: '400px',
});

export const nameInput = style({
  width: '100%',
  // boxShadow: `0 3px 3px ${vars.colors.primaryLight}`,

  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  fontSize: vars.fontSize.lg,
  background: vars.colors.backgroundCard,
  border: `2px solid ${vars.colors.primaryLight}`,
  borderRadius: vars.borderRadius.full,
  color: vars.colors.text,
  textAlign: 'center',
  outline: 'none',
  transition: vars.transitions.normal,

  '::placeholder': {
    color: vars.colors.textMuted,
  },

  ':focus': {
    borderColor: vars.colors.primary,
    boxShadow: `0 0 0 1px ${vars.colors.primary}`,
  },
});

export const errorText = style({
  color: vars.colors.error,
  fontSize: vars.fontSize.sm,
  marginTop: vars.spacing.sm,
  textAlign: 'center',
});

export const progressBar = style({
  width: '100%',
  height: '4px',
  background: vars.colors.backgroundCard,
  borderRadius: vars.borderRadius.full,
  marginTop: vars.spacing.xl,
  overflow: 'hidden',
});

export const progressFill = style({
  height: '100%',
  background: `linear-gradient(90deg, ${vars.colors.primary}, ${vars.colors.secondary})`,
  borderRadius: vars.borderRadius.full,
  transition: 'width 0.5s ease',
});
