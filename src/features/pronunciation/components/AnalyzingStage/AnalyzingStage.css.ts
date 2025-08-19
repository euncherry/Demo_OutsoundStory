import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const container = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.xl,
  padding: vars.spacing.xxl,
});

export const loader = style({
  width: '80px',
  height: '80px',
  border: `4px solid ${vars.colors.primaryLight}`,
  borderTop: `4px solid ${vars.colors.primary}`,
  borderRadius: '50%',
  marginBottom: vars.spacing.lg,
});

export const title = style({
  fontSize: vars.fontSize.xxl,
  color: vars.colors.text,
  fontWeight: vars.fontWeight.bold,
});

export const progressContainer = style({
  width: '400px',
  height: '8px',
  background: vars.colors.backgroundGlass,
  borderRadius: vars.borderRadius.full,
  overflow: 'hidden',
  border: `1px solid ${vars.colors.glassBorder}`,
});

export const progressBar = style({
  height: '100%',
  background: `linear-gradient(90deg, ${vars.colors.primary}, ${vars.colors.secondary})`,
  borderRadius: vars.borderRadius.full,
});

export const message = style({
  fontSize: vars.fontSize.lg,
  color: vars.colors.textMuted,
  fontStyle: 'italic',
});

export const steps = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
  marginTop: vars.spacing.lg,
});

export const step = style({
  fontSize: vars.fontSize.md,
  color: vars.colors.textSecondary,
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
});
