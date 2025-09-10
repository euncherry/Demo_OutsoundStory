// src/features/pronunciation/components/PronunciationModal.css
// @ts-nocheck

import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@shared/styles/theme.css";

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
  height: "100%", // 명시적으로 높이 지정
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
