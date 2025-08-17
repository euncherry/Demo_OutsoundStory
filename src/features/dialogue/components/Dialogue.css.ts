// src/features/dialogue/components/Dialogue.css.ts
import {
  style,
  // keyframes
} from "@vanilla-extract/css";
import { vars } from "@shared/styles/theme.css";

// const fadeIn = keyframes({
//   from: { opacity: 0 },
//   to: { opacity: 1 },
// });

// 전체 화면 래퍼
export const dialogueWrapper = style({
  display: "flex",
  width: "100vw",
  height: "auto",
  pointerEvents: "none",
  zIndex: 100,
  flexDirection: "column",

  justifyContent: "flex-end",
  alignItems: "center",
});

// 대화 컨테이너
export const dialogueContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  width: "100dvw",
  minHeight: "20rem",
  maxHeight: "15rem",
  cursor: "pointer",
  pointerEvents: "auto",
  marginBottom: "5dvw",
});

// 대화 박스
export const dialogueBox = style({
  width: "65dvw",
  height: "auto",
  minHeight: "10rem",
  maxHeight: "15rem",
  background: vars.colors.backgroundGlass,
  backdropFilter: "blur(20px)",
  border: `2px solid ${vars.colors.glassBorder}`,
  borderRadius: vars.borderRadius.xl,
  padding: vars.spacing.lg,
  boxShadow: `0 10px 40px ${vars.colors.shadow}`,
});

// 화자 이름 (동적 색상 적용)
export const speakerName = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.bold,
  marginBottom: vars.spacing.sm,
  // color는 인라인 스타일로 동적 적용
});

// 대화 텍스트 (동적 색상 적용)
export const dialogueText = style({
  fontSize: vars.fontSize.md,
  lineHeight: 1.8,
  wordWrap: "break-word",
  wordBreak: "break-word",
  whiteSpace: "pre-wrap",
  overflowWrap: "break-word",
  // color는 인라인 스타일로 동적 적용
});

// 독백 박스
export const monologueBox = style({
  background: "rgba(0, 0, 0, 0.6)",
  backdropFilter: "blur(10px)",
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  textAlign: "center",
});

export const monologueText = style({
  fontSize: vars.fontSize.md,
  fontStyle: "italic",
  color: vars.colors.text,
  opacity: 0.9,
});

// 나레이션 박스
export const narrationBox = style({
  width: "100dvw",
  background:
    "linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7), transparent)",
  padding: `${vars.spacing.xl} ${vars.spacing.xxl}`,
  textAlign: "center",
});

export const narrationText = style({
  fontSize: vars.fontSize.lg,
  color: vars.colors.text,
  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
});

// 다음 표시기 (동적 색상 적용)
export const nextIndicator = style({
  position: "absolute",
  bottom: vars.spacing.sm,
  right: vars.spacing.lg,
  fontSize: vars.fontSize.sm,
  // color는 인라인 스타일로 동적 적용
});

// 캐릭터 컨테이너
export const characterContainer = style({
  position: "absolute",
  bottom: "-35dvh",
  transform: "translateX(-50%) !important", // 👈 !important 추가
  width: "60dvw",
  height: "120dvh",
  zIndex: 50,
});

// 말하는 중 효과 (동적 색상 적용)
export const speakingGlow = style({
  position: "absolute",
  inset: "-20px",
  filter: "blur(20px)",
  opacity: 0.5,
  zIndex: -1,
  // background는 인라인 스타일로 동적 적용
});

// ✅ 새로운 통합 캐릭터 스타일
export const characterFull = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "contain",
  // 깜빡거림 방지
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  transform: "translateZ(0)",
  WebkitTransform: "translateZ(0)",
  willChange: "filter, opacity",
  // 자연스러운 등장/퇴장 효과
  transition: "opacity 0.5s ease-in-out, filter 0.3s ease",
});

// 선택지 래퍼
export const choiceWrapper = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  pointerEvents: "none",
  zIndex: 100,
});

// 선택지 컨테이너
export const choiceContainer = style({
  position: "absolute",
  bottom: "100px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "80%",
  maxWidth: "800px",
  pointerEvents: "auto",
});

export const choiceHeader = style({
  textAlign: "center",
  marginBottom: vars.spacing.xl,
});

export const choicePrompt = style({
  fontSize: vars.fontSize.xl,
  color: vars.colors.text,
  fontWeight: vars.fontWeight.semibold,
  textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
});

export const choiceList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
});
