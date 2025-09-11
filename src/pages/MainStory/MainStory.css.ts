// src/pages/MainStory/MainStory.css
import { style } from "@vanilla-extract/css";
import { vars } from "@shared/styles/theme.css";

export const container = style({
  position: "relative",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  background: "#000",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
});

export const background = style({
  position: "absolute",
  inset: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(0.9)",
  zIndex: 0,
});

export const progressBar = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "4px",
  background: "rgba(255, 255, 255, 0.1)",
  zIndex: 200,
});

export const progressFill = style({
  height: "100%",
  background: `linear-gradient(90deg, ${vars.colors.primary}, ${vars.colors.secondary})`,
  transition: "width 0.5s ease",
});

export const characterLine = style({
  position: `absolute`,
  top: `20px`,
  right: `20px`,
  color: `${vars.colors.primaryDark}`,
  fontSize: `14px`,
  fontWeight: `500`,
  padding: "0.5rem 1rem",
  background: `rgb(0 0 0 / 15%)` /* 반투명 흰 배경 추가 */,
  backdropFilter: `blur(8px)` /* 블러 효과 */,
  borderRadius: `8px 8px 0 0` /* 상단 라운드 */,
  // borderBottom: `2px solid ${vars.colors.textTertiary}`,
  transition: `all 0.3s ease`,
  boxShadow: `0 8px 24px rgba(0, 0, 0, 0.12)`,

  display: `inline-block`,
  ":after": {
    content: "",
    position: `absolute`,
    bottom: `-2px`,
    left: `0`,
    width: `100%`,
    height: `3px`,
    background: `linear-gradient(90deg, ${vars.colors.primary}, transparent)`,
    borderRadius: `2px`,
  },
});

export const backButton = style({
  position: "absolute",
  top: vars.spacing.lg,
  left: vars.spacing.lg,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  background: "rgba(0, 0, 0, 0.5)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: vars.borderRadius.md,
  color: "white",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
  zIndex: 200,
  transition: vars.transitions.normal,

  ":hover": {
    background: "rgba(0, 0, 0, 0.7)",
    transform: "translateX(-3px)",
  },
});
