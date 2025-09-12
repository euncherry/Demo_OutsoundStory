// src/features/pronunciation/components/ResultsStage.css
// @ts-nocheck

import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@shared/styles/theme.css";

// ===== PronunciationResults 페이지 전용 body 스타일 =====
globalStyle("body.pronunciation-results", {
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgb(238 233 252))",
  minHeight: "100vh",
  margin: 0,
  padding: 0,

  "@media": {
    "screen and (max-width:  950px)  ": {
      background:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgb(245 240 255))",
    },
    "screen and (max-width: 480px)": {
      background:
        "linear-gradient(135deg, rgba(255, 255, 255, 1), rgb(250 245 255))",
    },
  },
});

// ===== PronunciationResults.tsx에서 사용되는 주요 스타일들 =====
export const resultsContainer = style({
  width: "100dvw",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgb(238 233 252))",
  // "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 235, 255, 0.9))",
});

export const resultsHeader = style({
  height: "auto",
  minHeight: "20dvh",
  padding: "1.2rem",
  textAlign: "center",
  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.3), transparent)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      height: "auto",
      minHeight: "40dvh",
      padding: "1rem 0.8rem",
    },
  },
});

export const resultsTitle = style({
  fontSize: "1.4rem",
  fontWeight: "700",
  color: vars.colors.text,
  marginBottom: "0.8rem",
  width: "100%",
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      // display: "none",
    },
  },
});

export const resultsHeaderContent = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

export const totalScore = style({
  fontSize: "2.2rem",
  color: "#ff8fab",
  fontWeight: "700",
  width: "48%",
  textShadow: "0 2px 10px rgba(212, 102, 143, 0.2)",
});

export const sentenceComparison = style({
  display: "flex",
  gap: "4%", // 48% + 48% + 4% = 100%
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "stretch",
  padding: "0 20px",
  width: "100%",
});

export const sentenceItem = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%", // 각각 48% 너비
  padding: "0.5rem",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(243, 237, 255, 0.4))",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.9)",
  boxShadow:
    "0 4px 15px rgba(230, 220, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)",

  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      padding: "0.3rem",
    },
  },
});

export const sentenceText = style({
  fontSize: "1rem",
  lineHeight: "1.6",
  color: "#6b5b95",
  fontWeight: "500",
  // padding: "8px 0",
  display: "flex",
  alignItems: "center",
  minHeight: "1.5em",
  wordBreak: "break-word",

  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      // minHeight: "1.2em",
      minHeight: "1em",
      fontSize: "0.85rem",
      overflowX: "scroll",
    },
  },
});

export const sentenceLabel = style({
  display: `flex`,
  height: "80%",
  marginRight: "0.3rem",
  justifyContent: "center",
  alignItems: `center`,
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#9b7eb0",
  padding: "0.2rem 0.6rem ",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 230, 250, 0.6))",
  borderRadius: "1.2rem",
  border: "1px solid rgba(212, 102, 143, 0.2)",
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      fontSize: "0.7rem",
    },
  },
});

export const resultsContent = style({
  flex: 1,
  display: "flex",
  justifyContent: "space-between",
  overflowY: "auto",
  gap: vars.spacing.lg,
  padding: vars.spacing.lg,
  contain: "layout", // ✅ 렌더링 최적화
  "@media": {
    "screen and (max-width:  950px)  ": {
      flexDirection: "column",
      padding: "0.8rem",
      gap: "1rem",
      overflowY: "visible",
    },
  },
});

export const comparisonSection = style({
  flex: "0 0 65%",
  minWidth: "50dvw",

  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 250, 250, 0.85))",
  borderRadius: "20px",
  overflow: "visible", // ✅ hidden 대신 visible
  position: "relative", // ✅ positioning context 명확히
  border: "1px solid rgba(255, 255, 255, 0.95)",
  boxShadow:
    "0 10px 30px rgba(230, 220, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
  "@media": {
    "screen and (max-width:  950px)  ": {
      flex: "0",
    },
  },
});

export const detailSection = style({
  flex: "0 0 30%",
  height: "auto",
  overflowY: "auto",
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(243, 237, 255, 0.85))",
  border: "1px solid rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  boxShadow:
    "0 10px 30px rgba(230, 220, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)",

  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px) ": {
      flex: "0",
      height: "auto",
      overflowY: "visible",
    },
  },
});

export const actionButtons = style({
  display: "flex",
  height: "8dvh",
  minHeight: "10dvh",
  height: "auto",
  justifyContent: "center",
  gap: vars.spacing.lg,
  padding: vars.spacing.md,
  borderTop: `1px solid ${vars.colors.glassBorder}`,
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px) ": {
      height: "auto",
      minHeight: "15dvh",
    },
  },
});

// ===== 기타 컴포넌트 스타일들 =====
// 탭 관련 스타일
export const tabsContainer = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const tabsHeader = style({
  display: "flex",
  position: "relative", // ✅ static → relative로 변경
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 250, 250, 0.7))",
  borderRadius: "15px 15px 0 0",
  backdropFilter: "blur(10px)",
  boxShadow: `rgba(0, 0, 0, 0.07) 0px 3px 4px 0px`,
  // 추가 안정성을 위한 속성들
  transform: "translateZ(0)", // ✅ GPU 가속 활성화
  willChange: "transform", // ✅ 브라우저 최적화 힌트
  isolation: "isolate", // ✅ 새로운 stacking context 생성
});

export const tabButton = style({
  flex: 1,
  padding: "12px 20px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  transition: "all 0.3s ease",
  color: "rgba(107, 91, 149, 0.9)",
  fontSize: "15px",
  fontWeight: "500",
  borderRadius: "10px",
  position: "relative",
  zIndex: 2,
  boxSizing: "border-box",
});

export const tabButtonActive = style({
  color: "white",
  fontWeight: "600",
  textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
});

export const tabIndicator = style({
  position: "absolute",
  // top: "5px",
  // left: "5px",
  width: "calc(33.33% - 3.33px)",
  height: "calc(100% )",
  background: "linear-gradient(135deg, #d4668f, #ff8fab)",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(212, 102, 143, 0.2)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  zIndex: 1,
});

export const tabIcon = style({
  fontSize: vars.fontSize.lg,
});

export const tabLabel = style({
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.medium,
});

export const tabContent = style({
  flex: 1,
  padding: vars.spacing.lg,
  overflow: "auto",
});

// 상세 분석 패널 스타일
export const detailPanel = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  // gap: vars.spacing.xl,
  height: "100%",
  "@media": {
    "screen and (max-width:  950px)  ": {
      flexDirection: "column",
      gap: "2dvh",
    },
  },
});

export const scoreSection = style({
  flex: 1,
});

export const detailTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.text,
  marginBottom: vars.spacing.lg,
});

export const scoreItem = style({
  marginBottom: vars.spacing.md,
  "@media": {
    "screen and (max-width:  950px)  ": {
      background: `linear-gradient(135deg, rgba(200, 255, 214, 0.3),rgba(243, 237, 255, 0.35), rgba(255, 255, 255, 0.8) )`,
      borderRadius: `12px`,
      borderLeft: `5px solid rgba(200, 255, 214, 1)`,
      padding: "0.5rem",
    },
  },
});

// linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(243, 237, 255, 0.85))

export const scoreLabel = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: vars.spacing.sm,
  fontSize: vars.fontSize.md,
  // color: vars.colors.text,
  color: vars.colors.textTertiary,
  fontWeight: vars.fontWeight.bold,
});

export const scoreValue = style({
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.text,
});

export const progressBar = style({
  height: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: vars.borderRadius.full,
  overflow: "hidden",
});

export const progressFill = style({
  height: "100%",
  borderRadius: vars.borderRadius.full,
  transition: "width 1s ease",
});

export const feedbackSection = style({
  display: "flex",
  flexDirection: "column",
  // gap: vars.spacing.md,
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      flexDirection: "row",
      height: "69dvh",
      minHeight: "40dvh",
      background:
        "linear-gradient(135deg, rgba(255, 224, 236, 0.3), rgba(255, 255, 255, 0.8))",
      borderRadius: `12px`,
      border: `1px solid rgba(255, 224, 236, 0.5)`,
    },
  },
});

export const affinityChange = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
  padding: vars.spacing.md,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: vars.borderRadius.md,
});

export const affinityIcon = style({
  fontSize: vars.fontSize.xl,
});

export const affinityText = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
});

export const affinityValue = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.bold,
  color: "#4CAF50",
});

export const npcReaction = style({
  padding: vars.spacing.md,
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: vars.borderRadius.md,
});

export const reactionHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
  marginBottom: vars.spacing.sm,
});

export const reactionIcon = style({
  fontSize: vars.fontSize.lg,
});

export const reactionLabel = style({
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.textTertiary,
});

export const reactionText = style({
  fontSize: vars.fontSize.md,
  fontStyle: "italic",
  lineHeight: 1.5,
});

// 추가 스타일들...
export const spectrogramContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
  height: "100%",
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      height: "auto",
      gap: "0",
    },
  },
});

export const audioSection = style({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: vars.borderRadius.md,
  padding: vars.spacing.md,
});

export const audioHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: vars.spacing.sm,
});

export const audioTitle = style({
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.semibold,
  color: vars.colors.text,
});

export const playButton = style({
  backgroundColor: vars.colors.primary,
  color: "white",
  border: "none",
  borderRadius: vars.borderRadius.sm,
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  cursor: "pointer",
});

export const spectrogramWrapper = style({
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(243, 237, 255, 0.5))",
  borderRadius: vars.borderRadius.sm,
  // overflow: "hidden",
  border: "1px solid rgba(230, 220, 255, 0.3)",
});

export const waveform = style({
  width: "100%",
});

export const divider = style({
  height: "1px",
  backgroundColor: vars.colors.glassBorder,
  margin: `${vars.spacing.sm} 0`,
});

export const analysisResult = style({
  textAlign: "center",
  padding: vars.spacing.md,
  borderRadius: vars.borderRadius.md,
  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 230, 250, 0.3))`,
});

export const matchScore = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.semibold,
  color: "#9b7eb0",
  marginBottom: vars.spacing.sm,
});

export const resultDescription = style({
  fontSize: vars.fontSize.sm,
  color: "rgba(107, 91, 149, 0.7)",
  whiteSpace: "pre-line",
});

export const loadingContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "300px",
  fontSize: vars.fontSize.lg,
  color: vars.colors.textSecondary,
});

export const loadingSpinner = style({
  fontSize: "24px",
  marginBottom: vars.spacing.md,
  animation: "spin 1s linear infinite",
});

export const waveformsContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
  marginBottom: vars.spacing.lg,
});

export const waveformSection = style({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: vars.borderRadius.md,
  padding: vars.spacing.md,
});

export const waveformTitle = style({
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.semibold,
  color: vars.colors.text,
  marginBottom: vars.spacing.sm,
});

// src/features/pronunciation/components/ResultsStage.css에 추가
// export const loadingContainer = style({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   height: "300px",
//   gap: vars.spacing.md,
// });

export const spinner = style({
  fontSize: "2rem",
  animation: "spin 1s linear infinite",
});

export const errorContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "300px",
  color: vars.colors.error,
});

export const analysisGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: vars.spacing.lg,
});

export const analysisColumn = style({
  // h4 스타일은 별도로 정의
});

export const analysisColumnH4 = style({
  color: vars.colors.text,
  fontWeight: vars.fontWeight.semibold,
});

export const similarityScore = style({
  fontWeight: vars.fontWeight.bold,
  fontSize: vars.fontSize.lg,
});

// PitchContourTab 전용 스타일
export const pitchContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
  height: "600px",
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      height: "auto",
    },
  },
});

export const pitchHeader = style({
  textAlign: "center",
  marginBottom: vars.spacing.md,
});

export const pitchInfo = style({
  fontSize: vars.fontSize.sm,
  color: "rgba(107, 91, 149, 0.7)",
  marginTop: vars.spacing.xs,
});

export const chartsContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
  marginBottom: vars.spacing.lg,
});

export const chartContainer = style({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: vars.borderRadius.md,
  padding: vars.spacing.md,
});

export const pitchCanvas = style({
  width: "100%",
  height: "250px",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  borderRadius: vars.borderRadius.sm,
});

export const pitchAnalysis = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
});

export const analyzingMessage = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "300px",
  gap: vars.spacing.md,
});

// WaveformTab 전용 스타일들 추가
export const waveformContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
});

export const waveformHeader = style({
  textAlign: "center",
  padding: vars.spacing.lg,
  background:
    "linear-gradient(135deg, rgba(255, 253, 231, 0.3), rgba(255, 255, 255, 0.6))",
  borderRadius: vars.borderRadius.lg,
  border: "1px solid rgba(255, 253, 231, 0.5)",
});

export const sectionTitle = style({
  fontSize: vars.fontSize.xl,
  fontWeight: vars.fontWeight.semibold,
  background: "linear-gradient(135deg, #9b7eb0, #d4668f)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: vars.spacing.sm,
});

export const waveformInfo = style({
  fontSize: vars.fontSize.sm,
  color: "rgba(107, 91, 149, 0.7)",
  marginTop: vars.spacing.xs,
});

export const waveSection = style({
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(230, 220, 255, 0.2))",
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  border: "1px solid rgba(255, 255, 255, 0.9)",
});

export const waveHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: vars.spacing.md,
});

export const waveLabel = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.medium,
  color: "#d4668f",
});

export const waveLegend = style({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  animation: "legendPulse 2s ease-in-out infinite",
});

export const wavePlayButton = style({
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.semibold,
  border: "none",
  borderRadius: vars.borderRadius.md,
  cursor: "pointer",
  transition: "all 0.2s ease",
  background:
    "linear-gradient(135deg, rgba(245, 242, 255, 1), rgba(237, 232, 255, 1))",
  color: "rgba(155, 126, 176, 0.8)",
  boxShadow:
    "0 6px 0 rgba(220, 210, 240, 0.8), 0 10px 0 rgba(220, 210, 240, 0.4), 0 14px 20px rgba(230, 220, 255, 0.25), inset 0 -2px 5px rgba(220, 210, 240, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.9)",
  transform: "translateY(-4px)",

  ":hover": {
    transform: "translateY(-2px)",
    boxShadow:
      "0 4px 0 rgba(220, 210, 240, 0.8), 0 7px 0 rgba(220, 210, 240, 0.4), 0 10px 15px rgba(230, 220, 255, 0.3), inset 0 -2px 5px rgba(220, 210, 240, 0.25), inset 0 1px 2px rgba(255, 255, 255, 1)",
  },

  ":active": {
    transform: "translateY(0)",
    boxShadow:
      "0 2px 0 rgba(220, 210, 240, 0.9), 0 3px 0 rgba(220, 210, 240, 0.5), 0 4px 10px rgba(230, 220, 255, 0.2), inset 0 -1px 3px rgba(220, 210, 240, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.8)",
  },
});

export const waveformWrapper = style({
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(243, 237, 255, 0.5))",
  borderRadius: vars.borderRadius.sm,
  padding: vars.spacing.lg,
  border: "1px solid rgba(230, 220, 255, 0.3)",
  position: "relative",
  // overflow: "hidden",
});

export const waveformAnalysis = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: vars.spacing.md,
  marginTop: vars.spacing.lg,
});

export const analysisCard = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
  padding: vars.spacing.md,
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 230, 250, 0.4))",
  borderRadius: vars.borderRadius.md,
  border: "1px solid rgba(255, 255, 255, 0.95)",
  boxShadow: "0 2px 10px rgba(230, 220, 255, 0.1)",
  transition: "all 0.3s ease",
  position: "relative",

  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(230, 220, 255, 0.2)",
  },
});

export const analysisIcon = style({
  fontSize: vars.fontSize.xl,
  animation: "float 3s ease-in-out infinite",
});

export const analysisContent = style({
  flex: 1,
});

export const analysisTitle = style({
  fontSize: vars.fontSize.sm,
  color: "rgba(107, 91, 149, 0.6)",
  marginBottom: vars.spacing.xs,
});

export const analysisScore = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.bold,
  background: "linear-gradient(135deg, #9b7eb0, #d4668f)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

// CSS 애니메이션을 위한 전역 스타일 (실제로는 별도 CSS 파일이나 전역 스타일 시스템 사용 권장)
// 이 부분은 컴포넌트에서 직접 처리하는 것이 좋습니다

// PitchContourTab 추가 스타일들
export const pitchChart = style({
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(243, 237, 255, 0.3))",
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  border: "1px solid rgba(255, 255, 255, 0.9)",
});

export const pitchAnalysisGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: vars.spacing.md,
  padding: vars.spacing.lg,
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 230, 250, 0.3))",
  borderRadius: vars.borderRadius.lg,
  border: "1px solid rgba(255, 255, 255, 0.9)",
});

export const pitchItem = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: vars.spacing.sm,
  background: "rgba(255, 255, 255, 0.5)",
  borderRadius: vars.borderRadius.sm,
});

export const pitchLabel = style({
  fontSize: vars.fontSize.sm,
  color: "rgba(107, 91, 149, 0.7)",
});

export const pitchValue = style({
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.bold,
  background: "linear-gradient(135deg, #d4668f, #9b7eb0)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

export const analysisItem = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: vars.spacing.sm,
  background: "rgba(255, 255, 255, 0.5)",
  borderRadius: vars.borderRadius.sm,
  marginBottom: vars.spacing.sm,
});

export const analysisLabel = style({
  fontSize: vars.fontSize.sm,
  color: "rgba(107, 91, 149, 0.7)",
});

export const analysisValue = style({
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.bold,
  background: "linear-gradient(135deg, #d4668f, #9b7eb0)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

export const pitchWaveformContainer = style({
  position: "relative",
  width: "100%",
  height: "calc(200px + 2rem)",
  borderRadius: "10px",
  // overflow: "hidden",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  padding: "1rem 0",
});

export const pitchWaveform = style({
  width: "100%",
});

export const pitchCanvasOverlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 10,
});

export const pitchInfoDisplay = style({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: vars.spacing.md,
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: vars.borderRadius.md,
  marginTop: vars.spacing.md,
  fontSize: vars.fontSize.sm,
  color: "rgba(107, 91, 149, 0.8)",
});

export const errorMessage = style({
  color: "#ff6b6b",
  padding: vars.spacing.sm,
  marginTop: vars.spacing.sm,
  background: "rgba(255, 107, 107, 0.1)",
  borderRadius: vars.borderRadius.sm,
  fontSize: vars.fontSize.sm,
});

// SpectrogramTab 전용 스타일들
export const spectrogramHeader = style({
  textAlign: "center",
  padding: vars.spacing.lg,
  background:
    "linear-gradient(135deg, rgba(255, 253, 231, 0.3), rgba(255, 255, 255, 0.6))",
  borderRadius: vars.borderRadius.lg,
  border: "1px solid rgba(255, 253, 231, 0.5)",
  // 🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px)  ": {
      padding: "0.8rem",
    },
  },
});

export const spectrogramInfo = style({
  fontSize: vars.fontSize.sm,
  color: "rgba(107, 91, 149, 0.7)",
  marginTop: vars.spacing.xs,
});

// 추가

export const backButton = style({
  position: "absolute",
  top: vars.spacing.xl,
  left: vars.spacing.xl,
  background: "rgba(255, 255, 255, 0.9)",
  border: "none",
  borderRadius: vars.borderRadius.lg,
  padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.semibold,
  cursor: "pointer",
  zIndex: 10,
});

export const imageWrapper = style({
  position: "relative",
  width: "100%",
  height: "100%",
  marginBottom: vars.spacing.md,
  overflow: "hidden",
  borderRadius: vars.borderRadius.md,
  pointerEvents: "none",
  //🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px) ": {
      width: "50%",
    },
  },
});

export const profileImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  backgroundPosition: "top" /* 또는 left top */,
  transition: vars.transitions.normal,
  //🔥 모바일 반응형
  "@media": {
    "screen and (max-width:  950px) ": {
      transform: `scale(0.8)`,
    },
  },
});
