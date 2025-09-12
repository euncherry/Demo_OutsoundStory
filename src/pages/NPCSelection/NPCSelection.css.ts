// src/pages/NPCSelection/NPCSelection.css
// @ts-nocheck
import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@shared/styles/theme.css";

// 애니메이션
const scanline = keyframes({
  "0%": { transform: "translateX(-100%)" },
  "100%": { transform: "translateX(100%)" },
});

const glitch = keyframes({
  "0%": {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transform: "translate(0)",
    opacity: 0.2,
  },
  "80%": {
    clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0 95%)",
    transform: "translate(0)",
    opacity: 0.1,
  },
  "100%": {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transform: "translate(0)",
    opacity: 0,
  },
});

const shimmer = keyframes({
  "0%": { backgroundPosition: "200% center" },
  "100%": { backgroundPosition: "-200% center" },
});

// 컨테이너
export const container = style({
  position: "relative",
  width: "100vw",
  height: "auto",
  background: vars.colors.background,
});

export const backgroundGradient = style({
  position: "absolute",
  inset: 0,
  opacity: 0.5,
  zIndex: -1,
});

// 헤더
export const header = style({
  position: "relative",
  textAlign: "center",
  padding: `2rem 2rem 0rem 2rem`,
  zIndex: 10,
});

export const backButton = style({
  position: "absolute",
  left: vars.spacing.xl,
  top: "50%",
  transform: "translateY(-50%)",
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  background: vars.colors.backgroundGlass,
  border: `2px solid ${vars.colors.glassBorder}`,
  borderRadius: vars.borderRadius.md,
  color: vars.colors.text,
  cursor: "pointer",
  transition: vars.transitions.normal,

  ":hover": {
    transform: "translateY(-50%) translateX(-5px)",
    background: vars.colors.buttonHover,
  },
});

export const title = style({
  fontSize: `2.2rem`,
  fontWeight: vars.fontWeight.bold,
  background: vars.colors.gradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  marginBottom: vars.spacing.sm,
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      fontSize: "1.3rem",
    },
  },
});

export const subtitle = style({
  fontSize: vars.fontSize.lg,
  color: vars.colors.textSecondary,
  fontWeight: 200,
});

// 가로 스크롤 컨테이너
export const horizontalScrollWrapper = style({
  position: "relative",
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: `1rem 3rem 5rem 3rem`,
  overflow: "hidden",
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      padding: `1rem 1rem 1.5rem 1rem`,
    },
  },
});

export const horizontalGridContainer = style({
  display: "flex",
  gap: vars.spacing.xl,
  alignItems: "center",
  height: "auto",
  width: "100%",
  overflowX: "visible",
  padding: "3rem 3rem 2rem 3rem",
  userSelect: "none",
  "@media": {
    "screen and (max-width:  950px)  ": {
      gap: vars.spacing.lg,
      height: "auto",
      paddingLeft: "5%",
      paddingRight: "5%",
    },
  },
});

export const cardWrapper = style({
  flexShrink: 0,
  width: "20rem", // 320px = 20rem (320 ÷ 16)
  height: "26.25rem", // 420px = 26.25rem (420 ÷ 16)

  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      width: "17.5rem", // 280px
      height: "23.75rem", // 380px
    },
    "screen and (max-width: 850px)": {
      width: "18rem", // 240px - 가로 핸드폰에 적합
      height: "22rem", // 320px - 가로 핸드폰에 적합
    },
  },
});

// 스크롤 인디케이터
export const scrollIndicator = style({
  position: "absolute",
  bottom: "2.5rem",
  left: "50%",
  transform: "translateX(-50%)",
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.medium,
  padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
  background: vars.colors.backgroundGlass,
  backdropFilter: "blur(10px)",
  borderRadius: vars.borderRadius.full,
  border: `1px solid ${vars.colors.glassBorder}`,
  zIndex: 10,
});

// NPC 카드
export const npcCard = style({
  position: "relative",
  width: "100%",
  height: "100%",
  background: vars.colors.backgroundGlass,
  backdropFilter: "blur(20px)",
  border: `2px solid ${vars.colors.glassBorder}`,
  borderRadius: vars.borderRadius.xl,
  padding: vars.spacing.lg,
  cursor: "pointer",
  transition: vars.transitions.normal,
  transformStyle: "preserve-3d",
  perspective: "1000px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",

  ":hover": {
    boxShadow: `0 20px 40px ${vars.colors.shadowHover}`,
  },
});

// 잠금 오버레이
export const lockOverlay = style({
  inset: 0,
  background: "rgba(255, 255, 255, 0.22)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.borderRadius.xl,
  zIndex: 10,
});

export const lockIcon = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: vars.colors.textTertiary,
  fontWeight: vars.fontWeight.bold,
  fontSize: vars.fontSize.sm,
  wordBreak: "keep-all",
  textAlign: "center",
  padding: "1rem 2rem",
  boxSizing: "border-box",
  lineHeight: 1.5,

  "::before": {
    content: "🔒",
    fontSize: "1rem",
    paddingBottom: "0.5rem",
    // marginBottom: vars.spacing.md,
    display: "block",
  },
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      padding: "0.5rem 1rem",
    },
  },
});

// 미스터리 카드 (강혁)
export const mysteryCard = style({
  background: `linear-gradient(135deg, 
    rgba(255, 155, 255, 0.1), 
    rgba(155, 255, 255, 0.1), 
    rgba(255, 255, 155, 0.1))`,
  animation: `${shimmer} 3s linear infinite`,
  backgroundSize: "200% 100%",
});

export const glitchEffect = style({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(90deg, transparent, rgba(212, 102, 194, 1), transparent)",
  pointerEvents: "none",
  animation: `${glitch} 3s ease-in-out infinite`,
  "::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 1), transparent)",
    animation: `${scanline} 2s linear infinite`,
  },
});

export const hologramOverlay = style({
  position: "absolute",
  inset: 0,
  background: `repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(185, 255, 255, 0.1) 2px,
    rgba(247, 224, 247, 0.2) 4px
  )`,
  pointerEvents: "none",
});

// 이미지
export const imageWrapper = style({
  position: "relative",
  width: "100%",
  height: "200px",
  marginBottom: vars.spacing.md,
  overflow: "hidden",
  borderRadius: vars.borderRadius.md,
  pointerEvents: "none",
});

export const profileImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: vars.transitions.normal,
});

// 정보
export const cardInfo = style({
  textAlign: "center",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

export const npcName = style({
  fontSize: vars.fontSize.xl,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.textLight,
  marginBottom: vars.spacing.xs,
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      fontSize: "1.2rem",
    },
  },
});

export const npcAge = style({
  fontSize: vars.fontSize.sm,
  color: vars.colors.textMuted,
  marginBottom: vars.spacing.xs,
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      fontSize: "0.8rem",
    },
  },
});

export const npcOccupation = style({
  fontSize: vars.fontSize.sm,
  color: vars.colors.textLight,
  marginBottom: vars.spacing.sm,
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      fontSize: "0.8rem",
    },
  },
});

export const npcIntro = style({
  fontSize: vars.fontSize.sm,
  color: vars.colors.text,
  lineHeight: 1.6,
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      fontSize: "0.8rem",
    },
  },
});

// 호버 효과
export const hoverEffect = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
});

export const sparkles = style({
  position: "absolute",
  inset: 0,
});

export const sparkle = style({
  position: "absolute",
  fontSize: "20px",
});

// 카드 앞/뒷면. cardFront, cardBack 스타일 추가:
export const cardFront = style({
  // 효과적으로 겹침 및 회전
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  background: "transparent",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
});

export const cardBack = style({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  background: "rgba(255,255,255,0.96)",
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.15em",
  color: "#333",
  borderRadius: vars.borderRadius.xl,
});

// 카드 뒤면 해금 정보 스타일들
export const unlockInfo = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: vars.spacing.lg,
  textAlign: "center",
  width: "100%",
});

export const unlockTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.text,
  marginBottom: vars.spacing.md,
});

export const unlockHint = style({
  fontSize: vars.fontSize.md,
  color: vars.colors.textSecondary,
  marginBottom: vars.spacing.lg,
  lineHeight: 1.5,
});

export const unlockProgress = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.spacing.sm,
  width: "100%",
});

export const progressBar = style({
  width: "100%",
  height: "8px",
  background: "rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  overflow: "hidden",
  marginBottom: vars.spacing.xs,
});

export const progressFill = style({
  height: "100%",
  background: "linear-gradient(90deg, #4CAF50, #45a049)",
  borderRadius: "4px",
  transition: "width 0.5s ease",
});

export const progressText = style({
  fontSize: vars.fontSize.sm,
  color: vars.colors.textMuted,
  fontWeight: vars.fontWeight.medium,
});

// 몰래 먼저 플레이 버튼 스타일
export const secretPlayButton = style({
  fontSize: vars.fontSize.sm,
  color: "#FF6B9D",
  fontWeight: vars.fontWeight.bold,
  cursor: "pointer",
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  borderRadius: vars.borderRadius.sm,
  background: "rgba(255, 107, 157, 0.1)",
  border: "1px solid rgba(255, 107, 157, 0.3)",
  transition: "all 0.3s ease",
  textShadow: "0 0 8px rgba(255, 107, 157, 0.5)",
  position: "relative",
  overflow: "hidden",

  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 107, 157, 0.2), transparent)",
    transition: "left 0.5s ease",
  },

  ":hover": {
    background: "rgba(255, 107, 157, 0.2)",
    border: "1px solid rgba(255, 107, 157, 0.6)",
    transform: "scale(1.05)",
    textShadow: "0 0 12px rgba(255, 107, 157, 0.8)",
    boxShadow: "0 4px 12px rgba(255, 107, 157, 0.3)",
  },

  ":active": {
    transform: "scale(0.98)",
  },
});
