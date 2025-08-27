// src/features/pronunciation/components/PronunciationModal.css.ts
import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@shared/styles/theme.css";

// 애니메이션 정의
const float = keyframes({
  "0%, 100%": {
    transform: "translateY(0px)",
  },
  "50%": {
    transform: "translateY(-10px)",
  },
});

const shimmer = keyframes({
  "0%": {
    backgroundPosition: "-200% center",
  },
  "100%": {
    backgroundPosition: "200% center",
  },
});

const pulse = keyframes({
  "0%, 100%": {
    opacity: 1,
    transform: "scale(1)",
  },
  "50%": {
    opacity: 0.8,
    transform: "scale(1.05)",
  },
});

const slideUp = keyframes({
  "0%": {
    transform: "translateY(100%)",
    opacity: 0,
  },
  "100%": {
    transform: "translateY(0)",
    opacity: 1,
  },
});

// 오버레이 스타일
export const overlay = style({
  position: "fixed",
  inset: 0,
  background:
    "linear-gradient(135deg, rgba(230, 220, 255, 0.4), rgba(255, 200, 220, 0.4), rgba(200, 230, 255, 0.4))",
  backdropFilter: "blur(8px)",
  zIndex: 1000,
});

// 모달 컨테이너
export const modalContainer = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "88dvw",
  height: "90dvh",
  // maxHeight: '700px',
  background:
    "linear-gradient(135deg, rgb(242, 242, 255),rgba(240, 235, 255, 1))",
  backdropFilter: "blur(1.25rem) saturate(180%)",
  borderRadius: "30px",
  border: "2px solid rgba(255, 255, 255, 0.8)",
  padding: "1.25rem 3.75rem",
  boxShadow: `
    0 10px 30px rgba(255, 200, 220, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 1),
    inset 0 -1px 0 rgba(255, 255, 255, 0.5)
  `,
  zIndex: 1001,
  // overflow: 'hidden',
  overflowY: "auto",
});

// 닫기 버튼
export const closeButton = style({
  position: "absolute",
  top: "1.5625rem",
  right: "1.5625rem",
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 230, 250, 0.7))",
  border: "2px solid rgba(255, 255, 255, 0.9)",
  color: vars.colors.textTertiary,
  fontSize: "1.25rem",
  fontWeight: vars.fontWeight.bold,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: vars.transitions.normal,
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 15px rgba(230, 220, 255, 0.2)",

  ":hover": {
    transform: "scale(1.1) rotate(90deg)",
    background:
      "linear-gradient(135deg, rgba(255, 200, 220, 0.9), rgba(255, 230, 250, 0.9))",
    boxShadow: "0 6px 1.25rem rgba(255, 200, 220, 0.3)",
  },

  ":active": {
    transform: "scale(0.95)",
  },
});

// 스테이지 공통 스타일
export const stageContainer = style({
  width: "100%",
  height: "100%",
  padding: "3.125rem",
  display: "flex",
  gap: "1rem",
  flexDirection: "column",
  boxSizing: "border-box",
  // animation: `${slideUp} 0.5s ease-out`,
});

export const stageHeader = style({
  textAlign: "center",
  position: "relative",
});

export const stageTitle = style({
  fontSize: "2rem",
  fontWeight: vars.fontWeight.bold,
  background: "linear-gradient(135deg, #9b7eb0, #d4668f, #6b7fa6)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  paddingBottom: "0.5rem",
  // animation: `${float} 3s ease-in-out infinite`,
});

export const stageSubtitle = style({
  fontSize: "1.125rem",
  color: "rgba(107, 91, 149, 0.7)",
  opacity: 0.8,
});

// PrepareStage 스타일
export const textDisplay = style({
  // background : 'rgb(230 220 255)',
  background:
    "linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(230, 220, 255, 0.6), rgba(230, 220, 255, 0.6))",
  boxShadow:
    "0 8px 1.25rem rgba(230, 220, 255, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.8)",
  borderRadius: "1.25rem",
  padding: "1.5625rem 35px",
  // marginBottom: "30px",
  textAlign: "center",
  backdropFilter: "blur(10px)",
  position: "relative",
  overflow: "hidden",
  fontStyle: "italic",

  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-200%",
    width: "200%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
    animation: `${shimmer} 3s infinite`,
  },
});

export const choiceText = style({
  fontSize: "1.25rem",
  fontWeight: vars.fontWeight.semibold,
  color: "rgba(107, 91, 149, 0.9)",
  lineHeight: 1.8,
  position: "relative",
  zIndex: 1,
});

export const HeaderContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  flex: "1 1 0%",
});

export const settingContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  flex: "2 1 0%",
});

export const footerContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",
  justifyContent: "flex-end",
  flex: "1 1 0%",
});

export const standardAudioSection = style({
  // marginBottom: "30px",
  padding: "1.5625rem",
  height: "15rem",
  background: "rgba(255, 255, 255, 0.7)",
  boxShadow:
    "0 10px 1.5625rem rgba(230, 220, 255, 0.15), inset 0 1px 3px rgba(255, 255, 255, 0.8)",
  borderRadius: "1.25rem",
  justifyContent: "space-between",
  display: "flex",
  flexDirection: "column",
});

export const sectionTitle = style({
  fontSize: "1.25rem",
  fontWeight: vars.fontWeight.semibold,
  color: "rgba(107, 91, 149, 0.9)",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

export const waveformContainer = style({
  flex: "0 0 5rem",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(243, 237, 255, 0.5))",
  borderRadius: "0.9rem",
  padding: "0.9rem",
  border: "1px solid rgba(230, 220, 255, 0.3)",
  boxShadow: "inset 0 2px 4px rgba(230, 220, 255, 0.1)",
  minHeight: "5rem",
  width: "100%",
  display: "flex",
  alignItems: "center",
});

export const waveform = style({
  width: "100%",
  filter: "hue-rotate(280deg) saturate(0.8)",
});

export const playButton = style({
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(230, 220, 255, 0.7), rgba(255, 230, 250, 0.7))",
  color: vars.colors.text,
  border: "2px solid rgba(255, 255, 255, 0.95)",
  borderRadius: "1.5625rem",
  padding: "12px 30px",
  fontSize: "16px",
  fontWeight: vars.fontWeight.semibold,
  cursor: "pointer",
  transition: vars.transitions.normal,
  backdropFilter: "blur(10px)",
  boxShadow: `
    0 4px 15px rgba(230, 220, 255, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.9)
  `,

  ":hover": {
    transform: "translateY(-2px) scale(1.05)",
    boxShadow: `
      0 8px 1.5625rem rgba(230, 220, 255, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 1)
    `,
  },

  ":active": {
    transform: "translateY(0) scale(0.98)",
  },
});

// 마이크 선택 영역
export const micSection = style({
  // marginBottom: "30px",
  padding: "1.5625rem",
  height: "15rem",
  background: "rgba(255, 255, 255, 0.7)",
  boxShadow:
    "0 10px 1.5625rem rgba(230, 220, 255, 0.15), inset 0 1px 3px rgba(255, 255, 255, 0.8)",
  borderRadius: "1.25rem",
});

export const micContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
  minHeight: "5rem",
  width: "100%",
  alignItems: "center",
  padding: "0.9rem",
});

export const micSelect = style({
  width: "100%",
  padding: "12px 20px",
  borderRadius: "15px",
  border: "2px solid rgba(230, 220, 255, 0.3)",
  background: "rgba(255, 255, 255, 0.9)",
  color: "rgba(107, 91, 149, 0.9)",
  fontSize: "16px",
  cursor: "pointer",
  transition: vars.transitions.normal,
  outline: "none",

  ":focus": {
    borderColor: vars.colors.primary,
    boxShadow: "0 0 0 3px rgba(230, 220, 255, 0.2)",
  },

  ":hover": {
    borderColor: vars.colors.primaryLight,
  },
});

// 가이드 섹션
export const guideSection = style({
  background:
    "linear-gradient(135deg, rgba(255, 230, 250, 0.2), rgba(230, 220, 255, 0.2))",
  borderRadius: "1.25rem",
  padding: "1.25rem",
  // marginBottom: "30px",
  textAlign: "center",
  border: "1px solid rgba(255, 200, 220, 0.5)",
  // height: "15rem",
});

export const guideText = style({
  color: "rgba(107, 91, 149, 0.8)",
  fontSize: "1rem",
  lineHeight: "1.5rem",
});

// 액션 섹션
export const actionSection = style({
  display: "flex",
  justifyContent: "center",
  gap: "1.25rem",
  // marginTop: "auto",
});

export const startRecordButton = style({
  background: vars.colors.holographic,
  color: "white",
  border: "2px solid rgba(255, 255, 255, 0.9)",
  borderRadius: "30px",
  padding: "15px 45px",
  fontSize: "18px",
  fontWeight: vars.fontWeight.bold,
  cursor: "pointer",
  transition: vars.transitions.normal,
  boxShadow: `
    0 8px 1.5625rem rgba(230, 220, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.5)
  `,
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  animation: `${pulse} 2s ease-in-out infinite`,

  ":hover": {
    transform: "scale(1.05)",
    boxShadow: `
      0 12px 35px rgba(230, 220, 255, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.7)
    `,
  },

  ":active": {
    transform: "scale(0.98)",
  },
});

// RecordingStage 스타일
export const recordingSection = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "30px",
  padding: "30px",
  background:
    "linear-gradient(135deg, rgba(255, 200, 220, 0.1), rgba(255, 255, 255, 0.6))",
  borderRadius: "20px",
  border: "1px solid rgba(255, 200, 220, 0.3)",
});

export const recordingWaveform = style({
  width: "100%",

  height: "120px",
  background:
    "linear-gradient(135deg, rgba(255, 200, 220, 0.2), rgba(255, 255, 255, 0.8))",
  borderRadius: "15px",
  border: "1px solid rgba(255, 200, 220, 0.3)",
  padding: "20px",
  boxShadow: "inset 0 2px 8px rgba(255, 200, 220, 0.1)",
});

export const timeDisplay = style({
  margin: "1.5625rem 0",
});

export const recordingTime = style({
  fontSize: "48px",
  fontWeight: vars.fontWeight.bold,
  background: "linear-gradient(135deg, #ff6b6b, #ff8787, #ffa8a8)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 2px 10px rgba(255, 107, 107, 0.2)",
});

export const recordingIndicator = style({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "30px",
  padding: "10px 20px",
  background: "rgba(255, 255, 255, 0.8)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 107, 107, 0.3)",
});

export const recordingDot = style({
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #ff4444, #ff6666)",
  boxShadow: "0 0 10px rgba(255, 68, 68, 0.5)",
  animation: `${pulse} 1s ease-in-out infinite`,
});

export const recordingStatus = style({
  fontSize: "16px",
  color: vars.colors.text,
  fontWeight: vars.fontWeight.medium,
});

export const recordingControls = style({
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  marginBottom: "30px",
});

export const pauseButton = style({
  // background:
  //   'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(200, 255, 214, 0.7))',
  // color: vars.colors.text,
  // border: '2px solid rgba(200, 255, 214, 0.5)',
  // borderRadius: '25px',
  // padding: '12px 35px',
  // fontSize: '16px',
  // fontWeight: vars.fontWeight.semibold,
  // cursor: 'pointer',
  // transition: vars.transitions.normal,
  // boxShadow: '0 4px 15px rgba(200, 255, 214, 0.25)',
  width: "auto",

  ":hover": {
    transform: "translateY(-2px) scale(1.05)",
    boxShadow: "0 8px 1.5625rem rgba(200, 255, 214, 0.35)",
  },
});

export const stopButton = style({
  // background: 'linear-gradient(135deg, #ff6b6b, #ff8787)',
  // width: 'auto',

  // color: 'white',
  // border: '2px solid rgba(255, 255, 255, 0.5)',
  // borderRadius: '25px',
  // padding: '12px 35px',
  // fontSize: '16px',
  // fontWeight: vars.fontWeight.semibold,
  // cursor: 'pointer',
  // transition: vars.transitions.normal,
  // boxShadow: '0 4px 15px rgba(255, 107, 107, 0.25)',

  ":hover": {
    transform: "translateY(-2px) scale(1.05)",
    boxShadow: "0 8px 1.5625rem rgba(255, 107, 107, 0.35)",
  },
});

// AnalyzingStage 스타일
export const analyzingSection = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "30px",
});

export const progressContainer = style({
  width: "100%",
  maxWidth: "500px",
  textAlign: "center",
  padding: "30px",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(230, 220, 255, 0.3))",
  borderRadius: "20px",
  border: "1px solid rgba(230, 220, 255, 0.4)",
});

export const progressBar = style({
  width: "100%",
  height: "12px",
  background: "rgba(255, 255, 255, 0.5)",
  borderRadius: "10px",
  overflow: "hidden",
  marginBottom: "15px",
  border: "1px solid rgba(230, 220, 255, 0.3)",
});

export const progressFill = style({
  height: "100%",
  background: "linear-gradient(90deg, #d4668f, #9b7eb0, #6b7fa6)",
  borderRadius: "10px",
  transition: "width 0.3s ease",
  boxShadow: "0 2px 8px rgba(212, 102, 143, 0.3)",
});

export const progressText = style({
  fontSize: "20px",
  fontWeight: vars.fontWeight.bold,
  background: "linear-gradient(135deg, #9b7eb0, #d4668f)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

export const currentStep = style({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "20px",
  background: "rgba(255, 255, 255, 0.8)",
  borderRadius: "20px",
  border: "1px solid rgba(230, 220, 255, 0.3)",
});

export const stepIcon = style({
  fontSize: "28px",
  // animation: `${float} 2s ease-in-out infinite`,
});

export const stepText = style({
  fontSize: "18px",
  color: vars.colors.text,
  fontWeight: vars.fontWeight.medium,
});

export const stepsList = style({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "100%",
  maxWidth: "400px",
});

export const stepItem = style({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 20px",
  borderRadius: "15px",
  background: "rgba(255, 255, 255, 0.6)",
  border: "1px solid rgba(230, 220, 255, 0.2)",
  transition: vars.transitions.normal,
});

export const stepCompleted = style({
  background:
    "linear-gradient(135deg, rgba(200, 255, 214, 0.3), rgba(255, 255, 255, 0.8))",
  borderColor: "rgba(200, 255, 214, 0.5)",
});

export const stepNumber = style({
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #9b7eb0, #d4668f)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  fontWeight: vars.fontWeight.bold,
  boxShadow: "0 2px 8px rgba(155, 126, 174, 0.3)",
});
