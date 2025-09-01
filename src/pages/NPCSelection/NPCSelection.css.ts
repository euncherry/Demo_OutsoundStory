// src/pages/NPCSelection/NPCSelection.css.ts
import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@shared/styles/theme.css';

// 애니메이션
const scanline = keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(100%)' },
});

const glitch = keyframes({
  '0%': {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transform: 'translate(0)',
    opacity: 0.2,
  },
  '80%': {
    clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0 95%)',
    transform: 'translate(0)',
    opacity: 0.1,
  },
  '100%': {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transform: 'translate(0)',
    opacity: 0,
  },
});

const shimmer = keyframes({
  '0%': { backgroundPosition: '200% center' },
  '100%': { backgroundPosition: '-200% center' },
});

// 컨테이너
export const container = style({
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  background: vars.colors.background,
});

export const backgroundGradient = style({
  position: 'absolute',
  inset: 0,
  opacity: 0.5,
  zIndex: -1,
});

// 헤더
export const header = style({
  position: 'relative',
  textAlign: 'center',
  padding: vars.spacing.xl,
  zIndex: 10,
});

export const backButton = style({
  position: 'absolute',
  left: vars.spacing.xl,
  top: '50%',
  transform: 'translateY(-50%)',
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  background: vars.colors.backgroundGlass,
  border: `2px solid ${vars.colors.glassBorder}`,
  borderRadius: vars.borderRadius.md,
  color: vars.colors.text,
  cursor: 'pointer',
  transition: vars.transitions.normal,

  ':hover': {
    transform: 'translateY(-50%) translateX(-5px)',
    background: vars.colors.buttonHover,
  },
});

export const title = style({
  fontSize: vars.fontSize.xxxl,
  fontWeight: vars.fontWeight.bold,
  background: vars.colors.gradient,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: vars.spacing.sm,
});

export const subtitle = style({
  fontSize: vars.fontSize.lg,
  color: vars.colors.textSecondary,
});

// 가로 스크롤 컨테이너
export const horizontalScrollWrapper = style({
  position: 'relative',
  width: '100%',
  height: 'calc(100vh - 200px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: `0 ${vars.spacing.xxl}`,
  overflow: 'hidden',
  '@media': {
    '(max-width: 768px)': {
      padding: `0 ${vars.spacing.lg}`,
    },
  },
});

export const horizontalGridContainer = style({
  display: 'flex',
  gap: vars.spacing.xl,
  alignItems: 'center',
  height: '450px',
  width: '100%',
  overflowX: 'visible',
  paddingLeft: '3rem',
  paddingRight: '3rem',
  userSelect: 'none',
  '@media': {
    '(max-width: 768px)': {
      gap: vars.spacing.lg,
      height: '400px',
      paddingLeft: '5%',
      paddingRight: '5%',
    },
  },
});

export const cardWrapper = style({
  flexShrink: 0,
  width: '320px',
  height: '420px',
  '@media': {
    '(max-width: 768px)': {
      width: '280px',
      height: '380px',
    },
  },
});

// 스크롤 인디케이터
export const scrollIndicator = style({
  position: 'absolute',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.medium,
  padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
  background: vars.colors.backgroundGlass,
  backdropFilter: 'blur(10px)',
  borderRadius: vars.borderRadius.full,
  border: `1px solid ${vars.colors.glassBorder}`,
  zIndex: 10,
});

// NPC 카드
export const npcCard = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  background: vars.colors.backgroundGlass,
  backdropFilter: 'blur(20px)',
  border: `2px solid ${vars.colors.glassBorder}`,
  borderRadius: vars.borderRadius.xl,
  padding: vars.spacing.lg,
  cursor: 'pointer',
  transition: vars.transitions.normal,
  transformStyle: 'preserve-3d',
  perspective: '1000px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',

  ':hover': {
    boxShadow: `0 20px 40px ${vars.colors.shadowHover}`,
  },
});

// 미스터리 카드 (강혁)
export const mysteryCard = style({
  background: `linear-gradient(135deg, 
    rgba(255, 155, 255, 0.1), 
    rgba(155, 255, 255, 0.1), 
    rgba(255, 255, 155, 0.1))`,
  animation: `${shimmer} 3s linear infinite`,
  backgroundSize: '200% 100%',
});

export const glitchEffect = style({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(90deg, transparent, rgba(212, 102, 194, 1), transparent)',
  pointerEvents: 'none',
  animation: `${glitch} 3s ease-in-out infinite`,
  '::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 1), transparent)',
    animation: `${scanline} 2s linear infinite`,
  },
});

export const hologramOverlay = style({
  position: 'absolute',
  inset: 0,
  background: `repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(185, 255, 255, 0.3) 2px,
    rgba(247, 224, 247, 0.5) 4px
  )`,
  pointerEvents: 'none',
});

// 이미지
export const imageWrapper = style({
  position: 'relative',
  width: '100%',
  height: '200px',
  marginBottom: vars.spacing.md,
  overflow: 'hidden',
  borderRadius: vars.borderRadius.md,
  pointerEvents : 'none',
});

export const profileImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: vars.transitions.normal,
});

// 정보
export const cardInfo = style({
  textAlign: 'center',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const npcName = style({
  fontSize: vars.fontSize.xl,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.textLight,
  marginBottom: vars.spacing.xs,
});

export const npcAge = style({
  fontSize: vars.fontSize.sm,
  color: vars.colors.textMuted,
  marginBottom: vars.spacing.xs,
});

export const npcOccupation = style({
  fontSize: vars.fontSize.sm,
  color: vars.colors.textLight,
  marginBottom: vars.spacing.sm,
});

export const npcIntro = style({
  fontSize: vars.fontSize.sm,
  color: vars.colors.text,
  lineHeight: 1.6,
});

// 호버 효과
export const hoverEffect = style({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
});

export const sparkles = style({
  position: 'absolute',
  inset: 0,
});

export const sparkle = style({
  position: 'absolute',
  fontSize: '20px',
});





// 카드 앞/뒷면. cardFront, cardBack 스타일 추가:
export const cardFront = style({
  // 효과적으로 겹침 및 회전
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  background: 'transparent',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
});

export const cardBack = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(255,255,255,0.96)',
  zIndex: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.15em',
  color: '#333',
  borderRadius: vars.borderRadius.xl,
});