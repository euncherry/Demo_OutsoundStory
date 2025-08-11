import { style, styleVariants, keyframes, globalStyle } from '@vanilla-extract/css';

// 애니메이션 정의
const shimmer = keyframes({
  '0%': {
    transform: 'translateX(-100%) rotate(45deg)',
  },
  '100%': {
    transform: 'translateX(100%) rotate(45deg)',
  },
});

// 베이스 버튼 스타일
const buttonBase = style({
  fontSize: '16px',
  fontWeight: 600,
  borderRadius: '30px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  border: 'none',
  fontFamily: "'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

// Variant 스타일
export const buttonVariants = styleVariants({
  holographic: [
    buttonBase,
    {
      color: '#6B5B95',
      background: `linear-gradient(135deg, 
      rgba(255, 255, 255, 0.7),
      rgba(255, 192, 203, 0.3),
      rgba(230, 230, 250, 0.3))`,
      backdropFilter: 'blur(8px)',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 4px 15px rgba(255, 182, 193, 0.3)',

      ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 6px 20px rgba(255, 182, 193, 0.4)',
      },

      '::before': {
        content: '""',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: `linear-gradient(45deg, 
        transparent, 
        rgba(255, 255, 255, 0.3), 
        transparent)`,
        transform: 'rotate(45deg)',
        transition: 'all 0.5s',
        opacity: 0,
      },
    },
  ],

  'gradient-pink': [
    buttonBase,
    {
      color: '#8B7DA6',
      background: 'linear-gradient(135deg, #FFE5EC, #F3E5F5)',
      boxShadow: '0 4px 15px rgba(243, 229, 245, 0.5)',

      ':hover': {
        transform: 'translateY(-3px) scale(1.05)',
        boxShadow: '0 6px 20px rgba(255, 182, 193, 0.4)',
      },
    },
  ],

  'gradient-blue': [
    buttonBase,
    {
      color: '#8B7DA6',
      background: 'linear-gradient(135deg, #E8F5FF, #FFE5F2)',
      boxShadow: '0 4px 15px rgba(232, 245, 255, 0.5)',

      ':hover': {
        transform: 'translateY(-3px) scale(1.05)',
        boxShadow: '0 6px 20px rgba(255, 182, 193, 0.4)',
      },
    },
  ],

  'solid-lavender': [
    buttonBase,
    {
      color: '#7B68A6',
      background: '#E6E0F8',
      border: '2px solid transparent',
      boxShadow: '0 4px 12px rgba(230, 224, 248, 0.6)',

      ':hover': {
        transform: 'translateY(-3px)',
        border: '2px solid rgba(255, 255, 255, 0.8)',
      },
    },
  ],

  'solid-peach': [
    buttonBase,
    {
      color: '#B76E79',
      background: '#FFDFD3',
      border: '2px solid transparent',
      boxShadow: '0 4px 12px rgba(255, 223, 211, 0.6)',

      ':hover': {
        transform: 'translateY(-3px)',
        border: '2px solid rgba(255, 255, 255, 0.8)',
      },
    },
  ],

  'solid-mint': [
    buttonBase,
    {
      color: '#5A8B86',
      background: '#D4F1EE',
      border: '2px solid transparent',
      boxShadow: '0 4px 12px rgba(212, 241, 238, 0.6)',

      ':hover': {
        transform: 'translateY(-3px)',
        border: '2px solid rgba(255, 255, 255, 0.8)',
      },
    },
  ],

  outline: [
    buttonBase,
    {
      color: '#6B5B95',
      background: 'rgba(255, 255, 255, 0.2)',
      border: '2px solid',
      borderImage: 'linear-gradient(45deg, #FFB6C1, #E6E6FA, #98E4FF, #FFB6C1) 1',

      ':hover': {
        background: 'rgba(255, 255, 255, 0.4)',
        transform: 'translateY(-3px)',
        boxShadow: '0 6px 20px rgba(255, 182, 193, 0.3)',
      },
    },
  ],

  'game-main': [
    buttonBase,
    {
      fontSize: '18px',
      color: '#6B5B95',
      background: `linear-gradient(135deg, 
      rgba(255, 255, 255, 0.8),
      rgba(255, 230, 236, 0.6),
      rgba(243, 229, 245, 0.6))`,
      backdropFilter: 'blur(10px)',
      border: '3px solid rgba(255, 255, 255, 0.9)',
      borderRadius: '35px',
      boxShadow: `
      0 4px 15px rgba(255, 182, 193, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.8)`,

      ':hover': {
        transform: 'translateY(-4px) scale(1.05)',
        boxShadow: `
        0 8px 25px rgba(255, 182, 193, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.9)`,
      },

      '::after': {
        content: '"✨"',
        position: 'absolute',
        top: '50%',
        right: '25px',
        transform: 'translateY(-50%)',
        fontSize: '20px',
        opacity: 0,
        transition: 'all 0.3s ease',
      },
    },
  ],

  'game-sub': [
    buttonBase,
    {
      fontSize: '18px',
      // color: '#7B9B8C',
      background: `linear-gradient(135deg,
      rgba(255, 255, 255, 0.9),
        rgba(255, 250, 200, 0.6),
        rgba(255, 250, 200, 0.6),
        rgba(255, 240, 180, 0.6)
      )`,
      backdropFilter: 'blur(10px)',
      border: '3px solid rgba(255, 255, 255, 0.9)',
      borderRadius: '35px',
      boxShadow: `
      0 4px 15px rgba(152, 228, 255, 0.3),
     inset 0 1px 0 rgba(255, 255, 255, 0.8)`,

      color: '#a38d4c',

      ':hover': {
        transform: 'translateY(-4px) scale(1.05)',
        boxShadow: `
        0 8px 25px rgba(255, 182, 193, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.9)`,
      },

      '::after': {
        content: '"✨"',
        position: 'absolute',
        top: '50%',
        right: '25px',
        transform: 'translateY(-50%)',
        fontSize: '20px',
        opacity: 0,
        transition: 'all 0.3s ease',
      },
    },
  ],
});

// 사이즈 variants
export const sizeVariants = styleVariants({
  small: {
    padding: '10px 24px',
    fontSize: '14px',
    minHeight: '36px',
  },
  medium: {
    padding: '15px 40px',
    fontSize: '16px',
    minHeight: '48px',
  },
  large: {
    padding: '20px 50px',
    fontSize: '18px',
    minHeight: '60px',
  },
  custom: {
    padding: '0 20px',
  },
});

// 전체 너비 스타일
export const fullWidth = style({
  width: '100%',
});

// Hover 애니메이션 트리거
globalStyle(`${buttonVariants.holographic}:hover::before`, {
  animation: `${shimmer} 0.5s ease`,
  opacity: 1,
});

globalStyle(
  `${buttonVariants['game-main']}:hover::after, ${buttonVariants['game-sub']}:hover::after`,
  {
    opacity: 1,
    right: '30px',
  },
);
