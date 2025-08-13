// src/shared/components/Button/Button.types.ts

export type ButtonVariant =
  | 'main'
  | 'sub'
  | 'accent'
  | 'choice'
  | 'love'
  | 'special'
  | 'gender'
  | 'silver'
  | 'sunset';

export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge' | 'custom';

export type GenderButton = 'male' | 'female';

export interface CustomSize {
  width?: string | number;
  height?: string | number;
  padding?: string;
}

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  customSize?: CustomSize; // custom 사이즈일 때 사용
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  loading?: boolean;
  genderType?: GenderButton;
  choiceIndex?: number;
}

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactNode;
  label?: string;
}
