// src/features/pronunciation/components/PronunciationModal.css
// @ts-nocheck

import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@shared/styles/theme.css";

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

export const recordingContent = style({
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.7),rgba(240, 235, 255, 0.3), rgba(240, 235, 255, 0.3),rgba(240, 235, 255, 0.3))",
  borderRadius: "1rem",
  textAlign: "center",
  height: "45dvh",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "stretch",
  border: "2px dashed rgba(230, 220, 255, 0.4)",
  transition: "all 0.3s ease",
});

export const recordingContentGrid = style({
  borderRadius: "inherit",
  textAlign: "center",
  height: "100%", // minHeight 대신 height 사용
  display: "grid",
  gridTemplateRows: "5fr 1fr 2fr", // 3:1:2 비율
  gap: "1rem",
  alignItems: "center",
  transition: "all 0.3s ease",
  padding: "1.5rem", // 전체 그리드에 패딩 추가
  boxSizing: "border-box", // 패딩 포함한 크기 계산
});

export const recordingContentReadyGridItem = style({
  width: "100%",
  height: "98%", // 명시적으로 높이 지정
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem", // 패딩 줄임
  boxSizing: "border-box",
  overflow: "hidden", // 넘치는 내용 숨김
});

export const recordingContentMicGridItem = style([
  recordingContentReadyGridItem,
  {
    // 추가 제약 조건
    maxHeight: "100%",
    position: "relative",
  },
]);

// 이미지 컨테이너 스타일
export const imageContainer = style({
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  maxHeight: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden", // 이미지가 넘치지 않도록
  boxSizing: "border-box",
  position: "relative",
});

// 이미지 스타일 (핵심!)
export const constrainedImage = style({
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto", // width를 auto로 변경
  height: "auto", // height를 auto로 변경
  objectFit: "contain", // cover 대신 contain 사용
  display: "block",
});

// 이미지가 영역을 넘지 않으면서 비율 유지
export const scaledImage = style({
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto",
  height: "auto",
  objectFit: "scale-down", // 비율 유지하면서 영역에 맞춤
  display: "block",
});

export const recordingReadyText = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  padding: "1rem",
});

export const recordingReadyBtn = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  padding: "1rem",
});

export const waveformContainer = style({
  flex: "1 1 100%",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(243, 237, 255, 0.5))",
  borderRadius: "0.9rem",
  border: "1px solid rgba(230, 220, 255, 0.3)",
  boxShadow: "inset 0 2px 4px rgba(230, 220, 255, 0.1)",
  width: "100%",
  height: "10dvh",
  minHeight: "10dvh",
  display: "flex",
  alignItems: "center",
});

export const recordingWaveform = style({
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(135deg, rgba(255, 200, 220, 0.2), rgba(255, 255, 255, 0.8))",
  borderRadius: "1rem",
  border: "1px solid rgba(255, 200, 220, 0.3)",
  //   padding: "1rem",
  boxShadow: "inset 0 2px 8px rgba(255, 200, 220, 0.1)",
});

export const timeDisplay = style({
  padding: "1rem 0",
});

export const recordingTime = style({
  fontSize: "1.5rem",
  fontWeight: vars.fontWeight.bold,
  textShadow: "0 2px 10px rgba(255, 107, 107, 0.2)",

  textAlign: "center",
  color: `rgba(212, 102, 143, 0.9)`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
});

export const sttStatus = style({
  padding: "0.5rem 1rem",
  minHeight: "5rem",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(230, 220, 255, 0.3))",
  borderRadius: "0.5rem",
  border: "1px solid rgba(230, 220, 255, 0.4)",
  boxShadow: "0 4px 12px rgba(230, 220, 255, 0.15)",
  fontSize: `0.9rem`,
  color: "rgba(107, 91, 149, 0.9)",
  fontWeight: "500",
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
  // justifyContent: `center`,
  justifyContent: `space-between`,
  gap: `0.5rem`,
});

export const sttHeader = style({
  display: `flex`,
  alignItems: `center`,
  gap: `0.5rem`,
  fontSize: `0.9rem`,
  color: `rgba(107, 91, 149, 0.9)`,
  fontWeight: `500`,
});

export const sttListening = style({
  color: `rgb(76, 175, 80)`,
});

export const sttTranscript = style({
  marginTop: `0.5rem`,
  padding: `0.5rem 0.8rem`,
  backgroundColor: `rgba(255, 255, 255, 0.7)`,
  borderRadius: `0.5rem`,
  border: `1px solid rgba(230, 220, 255, 0.3)`,
  fontSize: `0.9rem`,
  color: `rgba(107, 91, 149, 0.8)`,
  fontStyle: `italic`,
});

export const recordingIndicator = style({
  display: "flex",
  alignItems: `center`,
  justifyContent: `center`,
  gap: `0.3rem`,
  padding: `12px 20px`,
  background: `rgba(255, 255, 255, 0.7)`,
  borderRadius: `2rem`,
  border: `2px solid rgba(255, 200, 220, 0.3)`,
  width: `fit-content`,
  marginLeft: `auto`,
  marginRight: `auto`,
});

export const recordingStatus = style({
  fontSize: "1rem",
  color: vars.colors.text,
  fontWeight: vars.fontWeight.medium,
});

export const recordingDot = style({
  width: "0.9rem",
  height: "0.9rem",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #ff4444, #ff6666)",
  boxShadow: "0 0 10px rgba(255, 68, 68, 0.5)",
  animation: `${pulse} 1s ease-in-out infinite`,
});
