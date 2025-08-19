import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

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
  maxWidth: '600px',
  textAlign: 'center',
  border: `1px solid ${vars.colors.glassBorder}`,
});

export const label = style({
  fontSize: vars.fontSize.sm,
  color: vars.colors.textMuted,
  marginBottom: vars.spacing.sm,
});

export const text = style({
  fontSize: vars.fontSize.xl,
  color: vars.colors.text,
  fontWeight: vars.fontWeight.medium,
  lineHeight: 1.6,
});

export const audioSection = style({
  width: '100%',
  maxWidth: '600px',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
  alignItems: 'center',
});

export const waveformContainer = style({
  width: '100%',
  background: 'rgba(255, 255, 255, 0.5)',
  borderRadius: vars.borderRadius.md,
  padding: vars.spacing.sm,
  border: `1px solid ${vars.colors.glassBorder}`,
});

export const waveform = style({
  width: '100%',
});

export const tip = style({
  background: vars.colors.info,
  color: vars.colors.text,
  padding: vars.spacing.md,
  borderRadius: vars.borderRadius.md,
  fontSize: vars.fontSize.md,
  maxWidth: '600px',
  textAlign: 'center',
});

export const actions = style({
  marginTop: vars.spacing.xl,
});
