// src/pages/PlayerSetup/PlayerSetup.css
// @ts-nocheck
import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@shared/styles/theme.css";

const fadeIn = keyframes({
  from: { opacity: 0, transform: "translateY(0px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const container = style({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: vars.colors.background,
  padding: vars.spacing.xl,
  position: "relative",
});

export const backButton = style({
  position: "absolute",
  top: vars.spacing.xl,
  left: vars.spacing.xl,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  background: vars.colors.backgroundGlass,
  border: `2px solid ${vars.colors.glassBorder}`,
  borderRadius: vars.borderRadius.md,
  color: vars.colors.text,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  backdropFilter: "blur(10px)",
  transition: vars.transitions.normal,
  zIndex: 1000,

  ":hover": {
    background: vars.colors.buttonHover,
    transform: "translateX(-5px)",
  },
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width: 950px)": {
      top: "1rem",
      left: "0.5rem",
    },
  },
});

export const setupCard = style({
  width: "100%",
  maxWidth: "37.5rem", // 600px = 37.5rem (600 ÷ 16)
  padding: "2rem 1rem 0rem 1rem",
  // background: vars.colors.backgroundGlass,
  backdropFilter: "blur(20px)",
  // border: `2px solid ${vars.colors.glassBorder}`,
  borderRadius: vars.borderRadius.xl,
  boxShadow: `0 10px 20px ${vars.colors.shadow}`,
  animation: `${fadeIn} 0.5s ease`,
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width: 950px)": {
      padding: "1rem 1rem 0rem 1rem",
      width: "70dvw",
    },
  },
  transition: `all 0.3s ease`,
});

export const title = style({
  fontSize: vars.fontSize.xxl,
  fontWeight: vars.fontWeight.bold,
  textAlign: "center",
  paddingBottom: "1rem",
  // background: `linear-gradient(135deg, ${vars.colors.text}, ${vars.colors.secondaryDark})`,
  background: vars.colors.primaryDark,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width: 950px)": {
      fontSize: "1.3rem",
      paddingBottom: "0.5rem",
    },
  },
});

export const sectionTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.semibold,
  textAlign: "center",
  color: vars.colors.text,
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width: 950px)": {
      fontSize: "1rem",
    },
  },
});

export const genderContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.spacing.lg,
});

export const genderButtons = style({
  display: "flex",
  gap: vars.spacing.xl,
  justifyContent: "center",
});

export const selectedWrapper = style({
  position: "relative",

  "::after": {
    content: '""',
    position: "absolute",
    // top: "-10px",
    // left: "-10px",
    // right: "-10px",
    // bottom: "-10px",
    background: vars.colors.buttonMain,
    borderRadius: vars.borderRadius.full,
    // border: `3px solid ${vars.colors.primary}`,
    animation: `${keyframes({
      from: { opacity: 1 }, // 시작: 반투명
      to: { opacity: 0 }, // 끝: 완전 투명
    })} 1.5s ease-out forwards`,
  },
});

export const nameContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.spacing.lg,
  width: "100%",
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width: 950px)": {
      gap: "1rem",
    },
  },
});

export const inputWrapper = style({
  width: "100%",
  maxWidth: "400px",
});

export const nameInput = style({
  width: "100%",
  // boxShadow: `0 3px 3px ${vars.colors.primaryLight}`,

  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  fontSize: vars.fontSize.lg,
  background: vars.colors.backgroundCard,
  border: `2px solid ${vars.colors.primaryLight}`,
  borderRadius: vars.borderRadius.full,
  color: vars.colors.text,
  textAlign: "center",
  outline: "none",
  transition: vars.transitions.normal,

  "::placeholder": {
    color: vars.colors.textMuted,
  },

  ":focus": {
    borderColor: vars.colors.primary,
    boxShadow: `0 0 0 1px ${vars.colors.primary}`,
  },
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width: 950px)": {
      padding: "0.5rem 1rem",
    },
  },
});

export const errorText = style({
  color: vars.colors.error,
  fontSize: vars.fontSize.sm,
  marginTop: vars.spacing.sm,
  textAlign: "center",
});

export const progressBar = style({
  width: "100%",
  height: "4px",
  background: vars.colors.backgroundCard,
  borderRadius: vars.borderRadius.full,
  marginTop: "2rem",
  overflow: "hidden",
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width: 950px)": {
      marginTop: "1rem",
    },
  },
});

export const progressFill = style({
  height: "100%",
  background: `linear-gradient(90deg, ${vars.colors.primary}, ${vars.colors.secondary})`,
  borderRadius: vars.borderRadius.full,
  transition: "width 0.5s ease",
});
