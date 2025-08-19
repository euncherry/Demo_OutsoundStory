// src/features/pronunciation/components/PronunciationModal.css.ts
import { style } from "@vanilla-extract/css";
import { vars } from "@shared/styles/theme.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  zIndex: 1000,
});

export const modalContainer = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "1200px",
  height: "80vh",
  backgroundColor: vars.colors.backgroundGlass,
  backdropFilter: "blur(20px)",
  borderRadius: vars.borderRadius.xl,
  border: `2px solid ${vars.colors.glassBorder}`,
  boxShadow: `0 20px 60px ${vars.colors.shadow}`,
  zIndex: 1001,
  overflow: "hidden",
});

export const closeButton = style({
  position: "absolute",
  top: vars.spacing.lg,
  right: vars.spacing.lg,
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  border: `1px solid ${vars.colors.glassBorder}`,
  color: vars.colors.text,
  fontSize: vars.fontSize.lg,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: vars.transitions.normal,

  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transform: "scale(1.1)",
  },
});

// 스테이지 공통 스타일
export const stageContainer = style({
  width: "100%",
  height: "100%",
  padding: vars.spacing.xxl,
  display: "flex",
  flexDirection: "column",
});

export const stageHeader = style({
  textAlign: "center",
  marginBottom: vars.spacing.xl,
});

export const stageTitle = style({
  fontSize: vars.fontSize.xxl,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.text,
  marginBottom: vars.spacing.sm,
});

export const stageSubtitle = style({
  fontSize: vars.fontSize.lg,
  color: vars.colors.textSecondary,
});

// src/features/pronunciation/components/PronunciationModal.css.ts (추가)

// PrepareStage 스타일
export const textDisplay = style({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  marginBottom: vars.spacing.xl,
  textAlign: "center",
});

export const choiceText = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.medium,
  color: vars.colors.text,
  lineHeight: 1.6,
});

export const standardAudioSection = style({
  marginBottom: vars.spacing.xl,
});

export const sectionTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.semibold,
  color: vars.colors.text,
  marginBottom: vars.spacing.md,
});

export const waveformContainer = style({
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  borderRadius: vars.borderRadius.md,
  padding: vars.spacing.md,
  marginBottom: vars.spacing.md,
});

export const waveform = style({
  width: "100%",
});

export const playButton = style({
  backgroundColor: vars.colors.primary,
  color: "white",
  border: "none",
  borderRadius: vars.borderRadius.md,
  padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
  fontSize: vars.fontSize.md,
  cursor: "pointer",
  transition: vars.transitions.normal,

  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 4px 15px ${vars.colors.shadow}`,
  },
});

// RecordingStage 스타일
export const recordingSection = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: vars.spacing.xl,
});

export const recordingWaveform = style({
  width: "100%",
  backgroundColor: "rgba(200, 0, 200, 0.1)",
  borderRadius: vars.borderRadius.md,
});

export const timeDisplay = style({
  margin: `${vars.spacing.lg} 0`,
});

export const recordingTime = style({
  fontSize: vars.fontSize.xxl,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.primary,
});

export const recordingIndicator = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
  marginBottom: vars.spacing.xl,
});

export const recordingDot = style({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: "#ff4444",
});

export const recordingStatus = style({
  fontSize: vars.fontSize.md,
  color: vars.colors.textSecondary,
});

export const recordingControls = style({
  display: "flex",
  gap: vars.spacing.lg,
  justifyContent: "center",
  marginBottom: vars.spacing.xl,
});

export const pauseButton = style({
  backgroundColor: vars.colors.secondary,
  color: "white",
  border: "none",
  borderRadius: vars.borderRadius.md,
  padding: `${vars.spacing.md} ${vars.spacing.xl}`,
  fontSize: vars.fontSize.md,
  cursor: "pointer",
  transition: vars.transitions.normal,
});

export const stopButton = style({
  backgroundColor: "#ff4444",
  color: "white",
  border: "none",
  borderRadius: vars.borderRadius.md,
  padding: `${vars.spacing.md} ${vars.spacing.xl}`,
  fontSize: vars.fontSize.md,
  cursor: "pointer",
  transition: vars.transitions.normal,
});

// AnalyzingStage 스타일
export const analyzingSection = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing.xl,
});

export const progressContainer = style({
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
});

export const progressBar = style({
  width: "100%",
  height: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: vars.borderRadius.full,
  overflow: "hidden",
  marginBottom: vars.spacing.sm,
});

export const progressFill = style({
  height: "100%",
  backgroundColor: vars.colors.primary,
  borderRadius: vars.borderRadius.full,
});

export const progressText = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.text,
});

export const currentStep = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.md,
});

export const stepIcon = style({
  fontSize: vars.fontSize.xl,
});

export const stepText = style({
  fontSize: vars.fontSize.lg,
  color: vars.colors.text,
});

export const stepsList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
  width: "100%",
  maxWidth: "300px",
});

export const stepItem = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
  padding: vars.spacing.sm,
  borderRadius: vars.borderRadius.md,
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  transition: vars.transitions.normal,
});

export const stepCompleted = style({
  backgroundColor: "rgba(100, 255, 100, 0.1)",
});

export const stepNumber = style({
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor: vars.colors.primary,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.bold,
});
