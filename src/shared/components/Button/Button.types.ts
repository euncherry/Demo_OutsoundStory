export type ButtonVariant =
  | 'holographic'
  | 'gradient-pink'
  | 'gradient-blue'
  | 'solid-lavender'
  | 'solid-peach'
  | 'solid-mint'
  | 'outline'
  | 'game-main'
  | 'game-sub';

export type ButtonSize = 'small' | 'medium' | 'large' | 'custom';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: string | number; // 커스텀 너비
  height?: string | number; // 커스텀 높이
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}
