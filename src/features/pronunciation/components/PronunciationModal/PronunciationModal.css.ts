import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: vars.zIndex.modal,
});

export const modal = style({
  background: vars.colors.backgroundCard,
  borderRadius: vars.borderRadius.xl,
  width: '90%',
  maxWidth: '1200px',
  height: '80vh',
  maxHeight: '800px',
  padding: vars.spacing.xl,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: `0 20px 60px ${vars.colors.shadow}`,
  border: `2px solid ${vars.colors.glassBorder}`,
  backdropFilter: 'blur(10px)',
});

export const closeButton = style({
  position: 'absolute',
  top: vars.spacing.md,
  right: vars.spacing.md,
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: 'none',
  background: vars.colors.buttonMain,
  color: vars.colors.text,
  fontSize: '20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: vars.transitions.normal,
  zIndex: 10,

  ':hover': {
    background: vars.colors.buttonHover,
    transform: 'scale(1.1)',
  },
});
