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
