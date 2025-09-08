// src/features/pronunciation/components/RecordingIndicator.css.ts
import { style, keyframes } from "@vanilla-extract/css";

// 애니메이션 정의
const pulse = keyframes({
  "0%, 100%": {
    transform: "scale(1)",
    opacity: 0.8,
  },
  "50%": {
    transform: "scale(1.1)",
    opacity: 1,
  },
});

const glow = keyframes({
  "0%, 100%": {
    boxShadow: "0 0 10px rgba(255, 67, 67, 0.3)",
  },
  "50%": {
    boxShadow: "0 0 25px rgba(255, 67, 67, 0.6)",
  },
});

// 메인 인디케이터 컨테이너
export const recordingIndicator = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "12px 24px",
  borderRadius: "30px",
  border: "2px solid",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  position: "relative",
  minWidth: "150px",

  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
});

// 아이콘 컨테이너
export const indicatorIcon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  position: "relative",
});

// 녹음 중 점 (애니메이션)
export const recordingDot = style({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  position: "absolute",

  "::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "inherit",
    opacity: 0.3,
    animation: `${pulse} 1.5s ease-in-out infinite`,
  },
});

// 상태 아이콘 (이모지)
export const statusIcon = style({
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// 상태 텍스트
export const recordingStatus = style({
  fontSize: "14px",
  fontWeight: "600",
  letterSpacing: "0.5px",
  transition: "color 0.3s ease",
});

// 웨이브 애니메이션 컨테이너
export const waveContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "3px",
  marginLeft: "8px",
});

// 개별 웨이브 바
export const wave = style({
  width: "3px",
  height: "16px",
  borderRadius: "3px",
  opacity: 0.7,
  transformOrigin: "center",
});

// 미니 버전 인디케이터
export const recordingIndicatorMini = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px",
});

// 미니 점
export const miniDot = style({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  position: "relative",

  "::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "inherit",
    opacity: 0.2,
  },
});

// RecordingStage에서 사용할 추가 스타일
export const recordingIndicatorWrapper = style({
  display: "flex",
  justifyContent: "center",
  margin: "20px 0",
  opacity: 1,
  transition: "opacity 0.3s ease",
});

// 녹음 시작 전 숨김 처리
export const hidden = style({
  opacity: 0,
  pointerEvents: "none",
  height: 0,
  overflow: "hidden",
  transition: "all 0.3s ease",
});

// 보이기 애니메이션
export const visible = style({
  opacity: 1,
  pointerEvents: "auto",
  height: "auto",
  transition: "all 0.3s ease",
});
