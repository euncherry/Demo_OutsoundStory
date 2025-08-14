import { globalStyle } from '@vanilla-extract/css';
// import { theme } from './theme.css';
import { vars } from '@shared/styles/theme.css'; // vars를 import

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('html, body', {
  height: '100dvh',
  width: '100dvw',
  overflow: 'hidden',
});

globalStyle('body', {
  fontFamily:
    '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  background: vars.colors.primary,
  color: vars.colors.text,
  lineHeight: 1.6,
});

globalStyle('#root', {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

globalStyle('button', {
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  font: 'inherit',
  color: 'inherit',
});

globalStyle('input, textarea', {
  font: 'inherit',
  color: 'inherit',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('img', {
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
});

// Scrollbar styles
globalStyle('::-webkit-scrollbar', {
  width: '8px',
  height: '8px',
});

globalStyle('::-webkit-scrollbar-track', {
  backgroundColor: vars.colors.backgroundGlass,
  borderRadius: vars.borderRadius.sm,
});

globalStyle('::-webkit-scrollbar-thumb', {
  background: vars.colors.primaryLight,
  borderRadius: vars.borderRadius.sm,
});

globalStyle('::-webkit-scrollbar-thumb:hover', {
  background: vars.colors.primary,
});
