// src/shared/components/Button/Button.types.ts

import { CSSProperties } from "react";

export type ButtonVariant =
  | "main"
  | "mainSolid"
  | "sub"
  | "subSolid"
  | "accent"
  | "choice"
  | "love"
  | "special"
  | "gender"
  | "purple"
  | "sunset";

export type ButtonSize = "small" | "medium" | "large" | "xlarge" | "custom";

export type GenderButton = "male" | "female";

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
  iconPosition?: "left" | "right";
  className?: string;
  style?: CSSProperties; // style prop 추가
  loading?: boolean;
  genderType?: GenderButton;
  choiceIndex?: number;
}

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: React.ReactNode;
  label?: string;
}
