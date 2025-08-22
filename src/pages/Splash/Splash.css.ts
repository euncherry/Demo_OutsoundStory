// src/pages/Splash/Splash.css.ts
import { style, keyframes } from '@vanilla-extract/css';
// import { theme } from '@shared/styles/theme.css';
import heartUrl from '@assets/ui/decorations/heart.png';
import { vars } from '@shared/styles/theme.css'; // vars를 import

const float = keyframes({
  '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
  '50%': { transform: 'translateY(-20px) rotate(5deg)' },
});

const heartBgBase = style({
  position: 'absolute',
  width: '5rem',
  height: '5rem',
  opacity: 0.7,
  filter: 'blur(0.5px)',
  animation: `${float} 6s ease-in-out infinite`,

  '::before': {
    content: `url(${heartUrl})`,
    position: 'absolute',
    fontSize: '3.75rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0.3)',
    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))',
    zIndex: 2,
  },

  '::after': {
    content: '""',
    position: 'absolute',
    width: '550%',
    height: '550%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // background:
    //   'radial-gradient(circle, rgba(255, 105, 180, 0.6) 0%, rgba(255, 20, 147, 0.4) 30%, rgba(255, 182, 193, 0.2) 60%, transparent 80%)',
    filter: 'blur(50px)',
    zIndex: 1,
  },
});

export const heart1 = style([
  heartBgBase,
  {
    top: '10%',
    left: '10%',
    animationDelay: '0s',
  },
]);

export const heart2 = style([
  heartBgBase,
  {
    top: '20%',
    right: '15%',
    animationDelay: '1s',
  },
]);

export const heart3 = style([
  heartBgBase,
  {
    top: '50%',
    left: '5%',
    animationDelay: '2s',
  },
]);

export const heart4 = style([
  heartBgBase,
  {
    bottom: '30%',
    right: '10%',
    animationDelay: '3s',
  },
]);

export const heart5 = style([
  heartBgBase,
  {
    bottom: '10%',
    left: '20%',
    animationDelay: '4s',
  },
]);

export const container = style({
  width: '100dvw',
  height: '100dvh',
  position: 'relative',
  overflow: 'hidden',
  backgroundImage: 'url(src/assets/backgrounds/cafe_afternoon.png)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  userSelect: 'none', // 드래그 시 텍스트 선택 방지
});

export const buttonSection = style({
  position: 'absolute',
  bottom: 0,
  left: '0',
  width: '100%',
  height: '30dvh',
  backdropFilter: 'blur(1px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 'clamp(1.5rem, 3vh, 3rem)',
  zIndex: 3,

  background: ' linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0,0,0,1) 100%)',
  pointerEvents: 'auto' /* 버튼 클릭 가능하도록 변경 */,
});

export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  width: 'auto',
  maxWidth: '90%',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

export const button = style({
  padding: '15px 40px',
  fontSize: '16px',
  fontWeight: 600,
  color: vars.colors.text,
  background: 'rgba(255, 255, 255, 0.9)',
  border: '2px solid transparent',
  borderImage: 'linear-gradient(45deg, #FFB6C1, #E6E6FA, #98E4FF, #FFB6C1)',
  backgroundClip: 'border-box',
  borderRadius: '2px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  minWidth: '150px',

  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(255, 182, 193, 0.3)',
  },

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const leftSection = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'url(/src/assets/ui/decorations/boy_team.png)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: ' bottom',
  backgroundSize: '80%',
  // clipPath는 인라인 스타일로 동적으로 변경됩니다
  zIndex: 1,
  opacity: 0.95,
  willChange: 'clip-path', // 성능 최적화
});

export const rightSection = style({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'url(/src/assets/ui/decorations/girl_team.png)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: ' bottom',
  backgroundSize: '75%',
  // clipPath는 인라인 스타일로 동적으로 변경됩니다
  zIndex: 1,
  opacity: 0.95,
  willChange: 'clip-path', // 성능 최적화
});

export const title = style({
  fontSize: 'clamp(2rem, 5vw, 4rem)',
  fontWeight: vars.fontWeight.normal,
  color: vars.colors.primary,
  position: 'absolute',
  top: '20%',
  left: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'translate(-50%, -50%)',
  zIndex: 100,
  textAlign: 'center',
  WebkitBackgroundClip: 'text',
  // WebkitTextFillColor: 'transparent',
  width: 'min(90%, 1200px)',
});

export const Logo = style({
  width: '100%',
  height: '250px', // 원하는 높이로 조정
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain', // 또는 원하는 크기로 조정
});

export const subtitle = style({
  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
  color: vars.colors.textSecondary,
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2,
  textAlign: 'center',
  width: 'min(80%, 800px)',
});
