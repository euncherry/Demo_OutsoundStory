// src/shared/components/3DButton/3DButton.tsx
import React from "react";
import * as styles from "./3DButton.css";
import { ButtonSize, ButtonVariant } from "./3DButton.types";

interface Button3DProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  customSize?: { width?: string; height?: string; padding?: string };
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

export function Button3D({
  children,
  onClick,
  variant = "main",
  size = "medium",
  customSize,
  disabled = false,
  className,
  type = "button",
  style,
}: Button3DProps) {
  const getButtonClass = () => {
    const baseClass = styles.button3D;

    // variant에 따른 스타일 선택
    let variantClass = "";
    switch (variant) {
      case "main":
        variantClass = styles.main;
        break;
      case "sub":
        variantClass = styles.sub;
        break;
      case "purple":
        variantClass = styles.purple;
        break;
      case "pink":
        variantClass = styles.pink;
        break;
      case "darkpink":
        variantClass = styles.darkpink;
        break;
      case "darkpurple": // 새로 추가
        variantClass = styles.darkpurple;
        break;
      default:
        variantClass = styles.main;
    }

    const sizeClass = styles[size];

    return `${baseClass} ${variantClass} ${sizeClass} ${
      className || ""
    }`.trim();
  };

  const getCustomStyle = () => {
    const customSizeStyle = customSize
      ? {
          width: customSize.width,
          height: customSize.height,
          padding: customSize.padding,
        }
      : {};

    return {
      ...customSizeStyle,
      ...style,
    };
  };

  return (
    <button
      type={type}
      className={getButtonClass()}
      onClick={onClick}
      disabled={disabled}
      style={getCustomStyle()}
    >
      {children}
    </button>
  );
}
