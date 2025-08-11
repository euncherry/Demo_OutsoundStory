import { globalStyle } from '@vanilla-extract/css';
import { theme } from './theme.css';

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('html, body', {
  height: '100%',
  width: '100%',
  overflow: 'hidden',
});

globalStyle('body', {
  fontFamily:
    '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  background: theme.colors.background,
  color: theme.colors.text,
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
  backgroundColor: theme.colors.backgroundDark,
});

globalStyle('::-webkit-scrollbar-thumb', {
  backgroundColor: theme.colors.primaryDark,
  borderRadius: theme.borderRadius.sm,
});

globalStyle('::-webkit-scrollbar-thumb:hover', {
  backgroundColor: theme.colors.primary,
});
