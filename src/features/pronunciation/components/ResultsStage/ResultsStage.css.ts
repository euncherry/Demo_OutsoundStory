import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

const shimmer = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

const float = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-10px)' },
});

export const container = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.lg,
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `0 ${vars.spacing.xl}`,
  borderBottom: `1px solid ${vars.colors.glassBorder}`,
  paddingBottom: vars.spacing.lg,
});

export const title = style({
  fontSize: vars.fontSize.xxl,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.text,
});

export const scoreDisplay = style({
  position: 'relative',
});

export const scoreCircle = style({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxShadow: `0 0 30px ${vars.colors.shadow}`,
});

export const scoreInner = style({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  background: vars.colors.backgroundCard,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const scoreNumber = style({
  fontSize: '36px',
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.text,
});

export const scoreMax = style({
  fontSize: vars.fontSize.sm,
  color: vars.colors.textMuted,
});

export const scoreEmoji = style({
  position: 'absolute',
  top: '-10px',
  right: '-10px',
  fontSize: '30px',
});

export const mainContent = style({
  flex: 1,
  display: 'flex',
  gap: vars.spacing.xl,
  padding: `0 ${vars.spacing.xl}`,
  overflow: 'hidden',
});

export const comparisonArea = style({
  flex: '0 0 70%',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.lg,
});

export const tabs = style({
  display: 'flex',
  gap: vars.spacing.sm,
  borderBottom: `2px solid ${vars.colors.glassBorder}`,
  paddingBottom: vars.spacing.sm,
});

export const tab = style({
  padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
  background: 'transparent',
  border: 'none',
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.md,
  cursor: 'pointer',
  transition: vars.transitions.fast,
  borderRadius: `${vars.borderRadius.md} ${vars.borderRadius.md} 0 0`,

  ':hover': {
    background: vars.colors.backgroundGlass,
    color: vars.colors.text,
  },
});

export const tabActive = style({
  background: vars.colors.primaryGlass,
  color: vars.colors.text,
  fontWeight: vars.fontWeight.semibold,
});

export const comparisonContent = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.lg,
  padding: vars.spacing.lg,
  background: vars.colors.backgroundGlass,
  borderRadius: vars.borderRadius.lg,
  border: `1px solid ${vars.colors.glassBorder}`,
});

export const waveformBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
});

export const waveformLabel = style({
  fontSize: vars.fontSize.sm,
  color: vars.colors.textMuted,
  fontWeight: vars.fontWeight.medium,
});

export const waveform = style({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: vars.borderRadius.md,
  padding: vars.spacing.sm,
});

export const spectrogramBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
});

export const spectrogram = style({
  background: 'rgba(0, 0, 0, 0.3)',
  borderRadius: vars.borderRadius.md,
  padding: vars.spacing.sm,
});

export const pitchContainer = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
});

export const pitchLabel = style({
  fontSize: vars.fontSize.md,
  color: vars.colors.text,
  fontWeight: vars.fontWeight.semibold,
});

export const pitchCanvas = style({
  width: '100%',
  height: '300px',
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: vars.borderRadius.md,
  border: `1px solid ${vars.colors.glassBorder}`,
});

export const pitchAxis = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: `0 ${vars.spacing.md}`,
  fontSize: vars.fontSize.xs,
  color: vars.colors.textMuted,
});

export const playControls = style({
  display: 'flex',
  justifyContent: 'center',
  gap: vars.spacing.md,
});

export const similarity = style({
  textAlign: 'center',
  fontSize: vars.fontSize.lg,
  color: vars.colors.text,
  padding: vars.spacing.md,
  background: vars.colors.primaryGlass,
  borderRadius: vars.borderRadius.md,
});

export const similarityValue = style({
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.primary,
  marginLeft: vars.spacing.sm,
});

export const analysisArea = style({
  flex: '0 0 30%',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.lg,
  overflowY: 'auto',
});

export const sectionTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.semibold,
  color: vars.colors.text,
  marginBottom: vars.spacing.md,
});

export const detailedScores = style({
  background: vars.colors.backgroundGlass,
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  border: `1px solid ${vars.colors.glassBorder}`,
});

export const scoreItem = style({
  marginBottom: vars.spacing.md,
});

export const scoreItemHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  marginBottom: vars.spacing.xs,
});

export const scoreIcon = style({
  fontSize: '20px',
});

export const scoreLabel = style({
  flex: 1,
  fontSize: vars.fontSize.sm,
  color: vars.colors.textMuted,
});

export const scoreValue = style({
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.semibold,
  color: vars.colors.text,
});

export const scoreBar = style({
  height: '8px',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: vars.borderRadius.full,
  overflow: 'hidden',
});

export const scoreBarFill = style({
  height: '100%',
  borderRadius: vars.borderRadius.full,
  transition: 'width 1s ease-out',
});

export const npcReaction = style({
  background: vars.colors.backgroundGlass,
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  border: `1px solid ${vars.colors.glassBorder}`,
});

export const npcMessage = style({
  display: 'flex',
  gap: vars.spacing.md,
  alignItems: 'center',
});

export const npcImage = style({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: `3px solid ${vars.colors.glassBorder}`,
});

export const speechBubble = style({
  flex: 1,
  padding: vars.spacing.md,
  borderRadius: vars.borderRadius.lg,
  border: '2px solid',
  position: 'relative',
  fontSize: vars.fontSize.md,
  lineHeight: 1.6,

  '::before': {
    content: '""',
    position: 'absolute',
    left: '-10px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '0',
    height: '0',
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderRight: '10px solid currentColor',
  },
});

export const affinityChange = style({
  background: `linear-gradient(135deg, ${vars.colors.accent1}40, ${vars.colors.accent2}40)`,
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  border: `1px solid ${vars.colors.glassBorder}`,
  textAlign: 'center',
});

export const affinityValue = style({
  fontSize: '48px',
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.text,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.md,
});

export const hearts = style({
  display: 'flex',
  gap: '4px',
  fontSize: '24px',
});

export const affinityText = style({
  marginTop: vars.spacing.md,
  fontSize: vars.fontSize.md,
  color: vars.colors.textMuted,
});

export const actions = style({
  display: 'flex',
  justifyContent: 'center',
  gap: vars.spacing.lg,
  padding: vars.spacing.xl,
  borderTop: `1px solid ${vars.colors.glassBorder}`,
});
