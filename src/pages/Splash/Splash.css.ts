import { style, keyframes } from '@vanilla-extract/css';
import { theme } from '@shared/styles/theme.css';
import heartUrl from '@assets/ui/decorations/heart.png';

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
    // width: '2rem', // 크기 조절
    // height: '2rem', // 크기 조절
    position: 'absolute',
    fontSize: '3.75rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0.3)',
    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))',
    zIndex: 2, // 이모지를 앞으로
  },

  // 분홍색 배경 효과 추가
  '::after': {
    content: '""',
    position: 'absolute',
    width: '550%',
    height: '550%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background:
      'radial-gradient(circle, rgba(255, 105, 180, 0.6) 0%, rgba(255, 20, 147, 0.4) 30%, rgba(255, 182, 193, 0.2) 60%, transparent 80%)',

    filter: 'blur(15px)',
    zIndex: 1, // 배경을 뒤로
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
  width: '100%',
  height: '100dvh',
  position: 'relative',
  overflow: 'hidden',
  // background: 'linear-gradient(to bottom, #ffc0cb, #ffb6c1)',
});

export const buttonSection = style({
  position: 'static',
  top: 0,
  left: 0,
  width: 'clamp(15rem, 20vw, 25rem)',
  height: '100%',
  background: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(1px)',
  boxShadow: '0 0.5rem 2rem rgba(255, 182, 193, 0.1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  padding: 'clamp(1rem, 2vh, 2rem)',
});

export const buttonContainer = style({
  display: 'grid',
  gap: '1rem',
  width: 'clamp(10rem, 90%, 15rem)',
});

export const button = style({
  padding: '15px 40px',
  fontSize: '16px',
  fontWeight: 600,
  color: '#9B89B3',
  background: 'rgba(255, 255, 255, 0.2)',
  border: '2px solid transparent',
  borderImage: 'linear-gradient(45deg, #FFB6C1, #E6E6FA, #98E4FF, #FFB6C1)',
  backgroundClip: 'border-box',
  borderRadius: '2px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  width: '100%',

  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(255, 182, 193, 0.3)',
  },

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    // ':hover': {
    //   transform: 'none',
    //   boxShadow: 'none',
    //   backgroundColor: 'rgba(255, 255, 255, 0.2)',
    // },
  },
});

export const leftSection = style({
  position: 'absolute',
  top: 0,
  left: 'clamp(15rem, 20vw, 25rem)',
  width: '80%',
  height: '100%',
  backgroundImage: 'url(/src/assets/ui/decorations/boy_team.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  clipPath: 'polygon(0 0, clamp(20%, 30%, 40%) 0, clamp(60%, 70%, 80%) 100%, 0 100%)',
  zIndex: 1,
  opacity: 0.9,
  transition: 'all 0.5s ease',

  ':hover': {
    opacity: 1,
    clipPath: 'polygon(0 0, 60% 0, 90% 100%, 0 100%)', // hover시 영역 확장
    zIndex: 2, // 앞으로 나오도록
    backgroundColor: ' #ffeef4',
  },
});

export const rightSection = style({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '80%',
  height: '100%',
  backgroundImage: 'url(/src/assets/ui/decorations/girl_team.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  clipPath:
    'polygon(calc(100% - clamp(65%, 69.5%, 75%)) 0, 100% 0, 100% 100%, calc(100% - clamp(25%, 29.5%, 35%)) 100%)',
  zIndex: 1,
  opacity: 0.9,
  transition: 'all 0.5s ease',

  ':hover': {
    opacity: 1,
    clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 40% 100%)', // hover시 영역 확장
    zIndex: 2, // 앞으로 나오도록
    backgroundColor: ' #ffeef4',
    // backgroundColor: ' #ffc0cb',
  },

  '@media': {
    '(max-width: 768px)': {
      clipPath:
        'polygon(calc(33.33% - 3rem) 0, 100% 0, 100% 100%, calc(33.33% + 0.125rem) 100%)',
    },
  },
});

export const title = style({
  fontSize: 'clamp(2rem, 5vw, 4rem)',
  fontWeight: theme.fontWeight.bold,
  color: theme.colors.text,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2,
  textAlign: 'center',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  background: `linear-gradient(45deg, ${theme.colors.text}, ${theme.colors.textSecondary})`,
  width: 'min(90%, 1200px)',
});

export const subtitle = style({
  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
  color: theme.colors.text,
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2,
  textAlign: 'center',
  width: 'min(80%, 800px)',
});
