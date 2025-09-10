// @ts-nocheck
import { globalStyle } from "@vanilla-extract/css";
// import { theme } from './theme.css';
import { vars } from "@shared/styles/theme.css"; // vars를 import

globalStyle("*", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
});

globalStyle("html", {
  height: "100dvh",
  width: "100dvw",
  overflowY: "auto",
  overflowX: "hidden",
});
globalStyle(" body", {
  height: "103dvh",
  width: "100dvw",
});

globalStyle("body", {
  fontFamily:
    '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  background: "rgba(230, 220, 255, 1)",
  color: "rgba(155, 126, 174, 1)",
  lineHeight: 1.6,
});

globalStyle("#root", {
  height: "103dvh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
});

globalStyle("button", {
  cursor: "pointer",
  border: "none",
  backgroundColor: "transparent",
  font: "inherit",
  color: "inherit",
});

globalStyle("input, textarea", {
  font: "inherit",
  color: "inherit",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("img", {
  maxWidth: "100%",
  height: "auto",
  display: "block",
});

// Scrollbar styles
globalStyle("::-webkit-scrollbar", {
  width: "8px",
  height: "8px",
});

globalStyle("::-webkit-scrollbar-track", {
  backgroundColor: vars.colors.backgroundGlass,
  borderRadius: vars.borderRadius.sm,
});

globalStyle("::-webkit-scrollbar-thumb", {
  background: vars.colors.primaryLight,
  borderRadius: vars.borderRadius.sm,
});

globalStyle("::-webkit-scrollbar-thumb:hover", {
  background: vars.colors.primary,
});
