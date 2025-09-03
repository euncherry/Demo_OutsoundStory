import { style } from "@vanilla-extract/css";
import { vars } from "@shared/styles/theme.css";

// 기본 3D 버튼 스타일
export const button3D = style({
  border: "none",
  borderRadius: "14px",
  cursor: "pointer",
  position: "relative",
  transition: "all 0.2s ease",
  transformStyle: "preserve-3d",
  fontFamily: "inherit",
  fontWeight: 600,
  transform: "translateY(-6px)",
  userSelect: "none",
  outline: "none",

  ":hover": {
    // transform: "translateY(-3px)",
  },

  ":active": {
    transform: "translateY(0)",
  },

  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
    transform: "translateY(0)",
  },
});

// 연한 보라색 버튼
export const purple = style({
  background:
    "linear-gradient(135deg, rgba(245, 242, 255, 1), rgba(237, 232, 255, 1))",
  color: "rgba(155, 126, 176, 0.8)",
  boxShadow: `
    0 8px 0 rgba(220, 210, 240, 0.8),
    0 12px 0 rgba(220, 210, 240, 0.4),
    0 16px 25px rgba(230, 220, 255, 0.25),
    inset 0 -2px 5px rgba(220, 210, 240, 0.2),
    inset 0 1px 2px rgba(255, 255, 255, 0.9)
  `,

  ":hover": {
    // background:
    //   "linear-gradient(135deg, rgba(250, 248, 255, 1), rgba(242, 238, 255, 1))",
    // boxShadow: `
    //   0 5px 0 rgba(220, 210, 240, 0.8),
    //   0 8px 0 rgba(220, 210, 240, 0.4),
    //   0 12px 20px rgba(230, 220, 255, 0.3),
    //   inset 0 -2px 5px rgba(220, 210, 240, 0.25),
    //   inset 0 1px 2px rgba(255, 255, 255, 1)
    // `,
  },

  ":active": {
    boxShadow: `
      0 2px 0 rgba(220, 210, 240, 0.9),
      0 3px 0 rgba(220, 210, 240, 0.5),
      0 4px 10px rgba(230, 220, 255, 0.2),
      inset 0 -1px 3px rgba(220, 210, 240, 0.3),
      inset 0 1px 2px rgba(255, 255, 255, 0.8)
    `,
  },
});

// 연한 핑크색 버튼
export const pink = style({
  background:
    "linear-gradient(135deg, rgba(255, 230, 238, 1), rgba(255, 220, 232, 1))",
  color: "rgba(212, 102, 143, 0.8)",
  textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)",
  boxShadow: `
    0 8px 0 rgba(255, 200, 220, 0.6),
    0 12px 0 rgba(255, 200, 220, 0.3),
    0 16px 25px rgba(255, 200, 220, 0.2),
    inset 0 -2px 5px rgba(255, 200, 220, 0.2),
    inset 0 1px 2px rgba(255, 255, 255, 0.8)
  `,

  ":hover": {
    background:
      "linear-gradient(135deg, rgba(255, 240, 245, 1), rgba(255, 230, 238, 1))",
    boxShadow: `
      0 5px 0 rgba(255, 200, 220, 0.6),
      0 8px 0 rgba(255, 200, 220, 0.3),
      0 12px 20px rgba(255, 200, 220, 0.25),
      inset 0 -2px 5px rgba(255, 200, 220, 0.25),
      inset 0 1px 2px rgba(255, 255, 255, 0.9)
    `,
  },

  ":active": {
    boxShadow: `
      0 2px 0 rgba(255, 200, 220, 0.7),
      0 3px 0 rgba(255, 200, 220, 0.4),
      0 4px 10px rgba(255, 200, 220, 0.2),
      inset 0 -1px 3px rgba(255, 200, 220, 0.3),
      inset 0 1px 2px rgba(255, 255, 255, 0.7)
    `,
  },
});

// 진한 핑크색 버튼
export const darkpink = style({
  background: "linear-gradient(135deg, #ffc3d0, #ff8fab, #d4668f)",
  color: "white",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  boxShadow: `
    0 8px 0 rgba(212, 102, 143, 0.6),
    0 12px 0 rgba(212, 102, 143, 0.3),
    0 16px 25px rgba(212, 102, 143, 0.25),
    inset 0 -2px 5px rgba(212, 102, 143, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.4)
  `,

  ":hover": {
    background: "linear-gradient(135deg, #ffd1dc, #ffa5c3, #e67a9f)",
    boxShadow: `
      0 5px 0 rgba(212, 102, 143, 0.6),
      0 8px 0 rgba(212, 102, 143, 0.3),
      0 12px 20px rgba(212, 102, 143, 0.3),
      inset 0 -2px 5px rgba(212, 102, 143, 0.35),
      inset 0 1px 2px rgba(255, 255, 255, 0.5)
    `,
  },

  ":active": {
    boxShadow: `
      0 2px 0 rgba(212, 102, 143, 0.7),
      0 3px 0 rgba(212, 102, 143, 0.4),
      0 4px 10px rgba(212, 102, 143, 0.2),
      inset 0 -1px 3px rgba(212, 102, 143, 0.4),
      inset 0 1px 2px rgba(255, 255, 255, 0.3)
    `,
  },
});

// 크기 변형 - vars 사용
export const small = style({
  padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
  fontSize: vars.fontSize.sm,
  borderRadius: vars.borderRadius.md, // 8px
});

export const medium = style({
  padding: `${vars.spacing.md} ${vars.spacing.xl}`,
  fontSize: vars.fontSize.md,
  borderRadius: vars.borderRadius.lg, // 16px
});

export const large = style({
  padding: `${vars.spacing.lg} ${vars.spacing.xxl}`,
  fontSize: vars.fontSize.lg,
  borderRadius: vars.borderRadius.xl, // 24px
});
