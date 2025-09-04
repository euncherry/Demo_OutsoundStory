// src/pages/PlayerRoom/PlayerRoom.css
import { style, keyframes, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

// 컨테이너
export const container = style({
  position: "relative",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  backgroundColor: "#000000",
  backgroundImage: "url(/assets/backgrounds/dirtyRoom.png)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",

  ":before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(180deg, rgba(26, 26, 46, 0.5) 0%, rgba(15, 15, 30, 0.5) 100%)",
    pointerEvents: "none", // 마우스 이벤트가 뒤의 요소들에 전달되도록
    zIndex: 0,
  },
});

// 비네팅 효과
export const vignette = style({
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.8) 100%)",
  pointerEvents: "none",
  zIndex: 10,
});

// 파티클 컨테이너
export const particleContainer = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 5,
});

export const dustParticle = style({
  position: "absolute",
  width: "2px",
  height: "2px",
  background: "rgba(255, 255, 255, 0.3)",
  borderRadius: "50%",
});

export const lightContainer = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 6,
});

export const lightParticle = style({
  position: "absolute",
  width: "4px",
  height: "4px",
  background:
    "radial-gradient(circle, rgba(255, 255, 200, 0.8) 0%, transparent 70%)",
  borderRadius: "50%",
});

// 빗방울 효과
export const rainEffect = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 7,
});

export const raindrop = style({
  position: "absolute",
  width: "2px",
  height: "15px",
  background: "linear-gradient(transparent, rgba(200, 200, 255, 0.8))",
  backdropFilter: "blur(2px)",
});

// 콘텐츠
export const content = style({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 20,
});

// 플레이어 이름
export const playerName = style({
  position: "absolute",
  top: "10%",
  left: "50px",

  fontSize: vars.fontSize.xxl,
  color: "rgba(255, 255, 255, 0.7)",
  fontWeight: vars.fontWeight.bold,
  textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
});

// 아바타 관련
export const avatarContainer = style({
  position: "relative",
  width: "95dvh", // 300px
  height: "-30dvh", // 400px
  bottom: "-30dvh",
});

export const avatarWrapper = style({
  position: "relative",
  width: "100%",
  height: "100%",
});

// 이미지 컨테이너 추가
export const imageContainer = style({
  position: "relative",
  width: "100%",
  height: "100%",
});

// avatarBody 수정
export const avatarBody = style({
  position: "relative", // absolute → relative
  width: "100%",
  height: "100%",
  objectFit: "contain",
  filter: "brightness(0.9) saturate(0.8)",
});

// avatarFace 수정
export const avatarFace = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: "0",
  objectFit: "contain",
  zIndex: 1,
});

// avatarShadow 수정
export const avatarShadow = style({
  position: "absolute",
  bottom: "-0.625rem", // -10px
  left: "50%",
  transform: "translateX(-50%)",
  width: "60%",
  height: "1.25rem", // 20px
  background:
    "radial-gradient(ellipse, rgba(0, 0, 0, 0.3) 0%, transparent 70%)",
  filter: "blur(0.5rem)", // 8px
  zIndex: -1,
});

// 기분 표시기
export const moodContainer = style({
  position: "absolute",
  left: "50px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(10px)",
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  border: "1px solid rgba(255, 255, 255, 0.1)",
});

export const moodHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
  marginBottom: vars.spacing.md,
});

export const moodIcon = style({
  fontSize: "24px",
});

export const moodLabel = style({
  color: "rgba(255, 255, 255, 0.7)",
  fontSize: vars.fontSize.md,
});

export const moodBar = style({
  width: "150px",
  height: "8px",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: vars.borderRadius.full,
  overflow: "hidden",
});

export const moodFill = style({
  height: "100%",
  background: "linear-gradient(90deg, #5a5a7a, #7a7a9a)",
  borderRadius: vars.borderRadius.full,
});

export const moodText = style({
  marginTop: vars.spacing.md,
  color: "rgba(255, 255, 255, 0.5)",
  fontSize: vars.fontSize.sm,
  fontStyle: "italic",
});

export const weatherIcon = style({
  marginTop: vars.spacing.md,
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.xs,
  color: "rgba(255, 255, 255, 0.5)",
  fontSize: vars.fontSize.sm,
});

// 일기장
export const diaryButton = style({
  position: "absolute",
  right: "50px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "60px",
  height: "60px",
  fontSize: "30px",
  background: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: vars.borderRadius.full,
  cursor: "pointer",
  transition: vars.transitions.normal,
});

export const diaryPopup = style({
  position: "absolute",
  right: "130px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0, 0, 0, 0.8)",
  backdropFilter: "blur(20px)",
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  maxWidth: "200px",
});

export const diaryQuote = style({
  color: "rgba(255, 255, 255, 0.7)",
  fontSize: vars.fontSize.sm,
  fontStyle: "italic",
  lineHeight: 1.6,
});

// 메뉴 버튼
export const menuContainer = style({
  position: "absolute",
  bottom: "10%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.spacing.lg,
});

export const subMenuButtons = style({
  display: "flex",
  gap: vars.spacing.md,
});
