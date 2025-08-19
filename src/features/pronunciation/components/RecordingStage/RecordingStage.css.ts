import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

const pulse = keyframes({
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.05)' },
  '100%': { transform: 'scale(1)' },
});

export const container = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const header = style({
  textAlign: 'center',
  marginBottom: vars.spacing.xl,
});

export const title = style({
  fontSize: vars.fontSize.xxl,
  color: vars.colors.text,
  fontWeight: vars.fontWeight.bold,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.sm,
});

export const content = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.lg,
  alignItems: 'center',
  justifyContent: 'center',
});

export const textBox = style({
  background: vars.colors.primaryGlass,
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.xl,
  width: '100%',
  maxWidth: '700px',
  textAlign: 'center',
  border: `1px solid ${vars.colors.glassBorder}`,
});

export const text = style({
  fontSize: vars.fontSize.xl,
  color: vars.colors.text,
  fontWeight: vars.fontWeight.medium,
  lineHeight: 1.8,
});

export const waveformContainer = style({
  width: '100%',
  maxWidth: '700px',
  height: '120px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.md,
  border: `2px solid ${vars.colors.glassBorder}`,
  position: 'relative',
  overflow: 'hidden',
});

export const waveform = style({
  width: '100%',
  height: '100%',
});

export const recordingIndicator = style({
  position: 'absolute',
  top: vars.spacing.sm,
  right: vars.spacing.sm,
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: '#FF4444',
  boxShadow: '0 0 10px rgba(255, 68, 68, 0.5)',
});

export const timer = style({
  fontSize: vars.fontSize.xl,
  color: vars.colors.text,
  fontWeight: vars.fontWeight.semibold,
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  background: vars.colors.backgroundGlass,
  borderRadius: vars.borderRadius.full,
  border: `1px solid ${vars.colors.glassBorder}`,
});

export const actions = style({
  display: 'flex',
  gap: vars.spacing.md,
});

export const tip = style({
  background: vars.colors.info,
  color: vars.colors.text,
  padding: vars.spacing.md,
  borderRadius: vars.borderRadius.md,
  fontSize: vars.fontSize.md,
  maxWidth: '600px',
  textAlign: 'center',
  animation: `${pulse} 2s ease-in-out infinite`,
});
