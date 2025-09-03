// src/shared/components/Button/Button.css.ts
import {
  style,
  styleVariants,
  keyframes,
  globalStyle,
} from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@shared/styles/theme.css";

// 애니메이션 정의
const shimmer = keyframes({
  "0%": {
    transform: "translateX(-100%) rotate(45deg)",
  },
  "100%": {
    transform: "translateX(200%) rotate(45deg)",
  },
});

const pulse = keyframes({
  "0%, 100%": {
    transform: "scale(1)",
  },
  "50%": {
    transform: "scale(1.05)",
  },
});

// spin 애니메이션 추가
const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

// 베이스 버튼 스타일
const buttonBase = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing.sm,
  fontWeight: vars.fontWeight.semibold,
  border: `2px solid ${vars.colors.glassBorder}`,
  borderRadius: vars.borderRadius.full,
  backdropFilter: "blur(10px)",
  cursor: "pointer",
  transition: vars.transitions.normal,
  overflow: "hidden",
  outline: "none",

  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  ":focus-visible": {
    boxShadow: `0 0 0 3px ${vars.colors.primaryLight}`,
  },
});

// Shimmer 효과를 위한 pseudo element
// globalStyle(`${buttonBase}::before`, {
//   content: '""',
//   position: "absolute",
//   top: "-50%",
//   left: "-50%",
//   width: "200%",
//   height: "200%",
//   background: vars.colors.glassShine,
//   transform: "rotate(45deg)",
//   transition: "all 0.5s",
//   opacity: 0,
// });

globalStyle(`${buttonBase}:hover::before`, {
  animation: `${shimmer} 0.5s ease`,
  opacity: 1,
});

// 버튼 레시피
export const button = recipe({
  base: buttonBase,

  variants: {
    variant: {
      main: {
        color: vars.colors.text,
        background: vars.colors.buttonMain,
        boxShadow: `0 4px 15px ${vars.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.9)`,

        ":hover": {
          transform: "translateY(-3px) scale(1.05)",
          boxShadow: `0 8px 25px ${vars.colors.shadowHover}, inset 0 1px 0 rgba(255, 255, 255, 1)`,
        },
      },

      mainSolid: {
        color: vars.colors.text,
        background: vars.colors.buttonMainSolid, // 불투명 배경
        boxShadow: `0 4px 15px ${vars.colors.shadow}`,

        ":hover": {
          transform: "translateY(-3px) scale(1.05)",
          boxShadow: `0 8px 25px ${vars.colors.shadowHover}`,
          // background: vars.colors.buttonMainSolidHover, // hover 시 더 밝게
        },
      },

      sub: {
        color: vars.colors.textSecondary,
        background: vars.colors.buttonSub,
        boxShadow: `0 4px 15px ${vars.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.9)`,

        ":hover": {
          transform: "translateY(-3px) scale(1.05)",
          boxShadow: `0 8px 25px ${vars.colors.shadowHover}, inset 0 1px 0 rgba(255, 255, 255, 1)`,
        },
      },

      subSolid: {
        color: vars.colors.textSecondary,
        background: vars.colors.buttonSubSolid, // 불투명 배경
        boxShadow: `0 4px 15px ${vars.colors.shadow}`,

        ":hover": {
          transform: "translateY(-3px) scale(1.05)",
          boxShadow: `0 8px 25px ${vars.colors.shadowHover}`,
          // background: vars.colors.buttonSubSolidHover, // hover 시 더 밝게
        },
      },

      accent: {
        color: vars.colors.textAccent,
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9), ${vars.colors.accent1}, ${vars.colors.accent2})`,
        boxShadow: `0 4px 15px ${vars.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.9)`,

        ":hover": {
          transform: "translateY(-3px) scale(1.05)",
          boxShadow: `0 8px 25px ${vars.colors.shadowHover}, inset 0 1px 0 rgba(255, 255, 255, 1)`,
        },
      },

      choice: {
        width: "100%",
        textAlign: "left",
        color: vars.colors.choiceText,
        background: vars.colors.choiceBackground,
        border: `2px solid ${vars.colors.choiceBorder}`,
        paddingLeft: "45px",
        borderRadius: "25px",
        backdropFilter: "blur(8px)",

        ":hover": {
          transform: "translateX(5px)",
          background: vars.colors.choiceBackgroundHover,
          borderColor: vars.colors.choiceBorderHover,
        },
      },

      love: {
        // color: vars.colors.textTertiary,
        // background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9), ${vars.colors.accent1}, ${vars.colors.accent2})`,
        // border: `2px solid ${vars.colors.primaryLight}`,
        color: "#FF6B9D",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 107, 157, 0.2), rgba(255, 150, 180, 0.2))",
        border: "2px solid rgba(255, 107, 157, 0.4)",
        borderRadius: "50px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",

        "::after": {
          content: "❤️",
          marginLeft: "8px",
          display: "inline-block",
          animation: `${pulse} 1.5s ease-in-out infinite`,
        },
      },

      special: {
        color: vars.colors.textTertiary,
        background: vars.colors.holographic,
        border: `2px solid ${vars.colors.primaryLight}`,
        fontWeight: vars.fontWeight.bold,
        textShadow: `0 1px 3px ${vars.colors.overlay}`,

        ":hover": {
          transform: "scale(1.05)",
          boxShadow: `0 10px 30px ${vars.colors.shadowHover}`,
        },
      },

      gender: {
        flexDirection: "column",
        width: "180px",
        padding: "60px 20px",
        background: vars.colors.backgroundGlass,
        border: `3px solid ${vars.colors.glassBorder}`,

        ":hover": {
          // transform: "translateY(-5px) scale(1.05)",
          boxShadow: `0 15px 40px ${vars.colors.shadowHover}`,
        },
      },

      purple: {
        background: " rgba(230, 220, 255, 0.5)",
        color: "rgba(107, 91, 149, 0.9)",
        border: "1px solid rgba(230, 220, 255, 0.3)",
        boxShadow: "0 4px 10px rgba(230, 220, 255, 0.2)",
        borderRadius: "15px",
      },

      sunset: {
        color: vars.colors.textAccent,
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9), ${vars.colors.accent3}, ${vars.colors.warning})`,
        boxShadow: `0 4px 15px ${vars.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.9)`,

        ":hover": {
          transform: "translateY(-3px) scale(1.05)",
          boxShadow: `0 8px 25px ${vars.colors.shadowHover}, inset 0 1px 0 rgba(255, 255, 255, 1)`,
        },
      },
    },

    size: {
      small: {
        padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
        fontSize: vars.fontSize.sm,
      },
      medium: {
        padding: `${vars.spacing.md} ${vars.spacing.xl}`,
        fontSize: vars.fontSize.md,
      },
      large: {
        padding: "18px 45px",
        fontSize: vars.fontSize.lg,
      },
      xlarge: {
        padding: "20px 60px",
        fontSize: vars.fontSize.xl,
      },
      custom: {
        // custom size는 인라인 스타일로 처리
      },
    },

    fullWidth: {
      true: {
        width: "100%",
      },
    },

    loading: {
      true: {
        color: "transparent",
        pointerEvents: "none",
      },
    },
  },

  defaultVariants: {
    variant: "main",
    size: "large",
    fullWidth: false,
    loading: false,
  },
});

// Choice 버튼의 아이콘 스타일
export const choiceIcon = style({
  position: "absolute",
  left: "18px",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "20px",
});

// Gender 버튼의 아이콘 스타일
export const genderIcon = style({
  fontSize: "48px",
  marginBottom: vars.spacing.sm,
});

// Love 버튼의 하트 애니메이션
export const loveHeart = style({
  display: "inline-block",
  marginLeft: vars.spacing.sm,
  animation: `${pulse}  1.5s ease-in-out infinite`,
});

// 로딩 스피너 - spin 애니메이션 사용
export const spinner = style({
  position: "absolute",
  width: "20px",
  height: "20px",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderTopColor: "white",
  borderRadius: "50%",
  animation: `${spin} 0.6s linear infinite`, // spin keyframes 사용
});

// Gender 버튼 타입별 스타일
export const genderVariants = styleVariants({
  female: {
    color: "#d4668f",
    background: `linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.95),
      rgba(255, 200, 220, 0.3),
      rgba(230, 220, 255, 0.3)
    )`,
    border: "3px solid rgba(255, 200, 220, 0.5)",
  },
  male: {
    color: "#6b7fa6",
    background: `linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.95),
      rgba(200, 230, 255, 0.3),
      rgba(230, 220, 255, 0.3)
    )`,
    border: "3px solid rgba(200, 230, 255, 0.5)",
  },
});
