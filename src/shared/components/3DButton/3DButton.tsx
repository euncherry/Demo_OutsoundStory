import React from 'react';
import * as styles from './3DButton.css';
import { ButtonSize, ButtonVariant } from './3DButton.types';

interface Button3DProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  customSize?: { width?: string; height?: string; padding?: string };
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button3D({
  children,
  onClick,
  variant = 'purple',
  size = 'medium',
  customSize,
  disabled = false,
  className,
  type = 'button',
}: Button3DProps) {
  const getButtonClass = () => {
    const baseClass = styles.button3D;
    const variantClass = variant === 'purple' ? styles.purple : styles.pink;
    const sizeClass = styles[size];

    return `${baseClass} ${variantClass} ${sizeClass} ${className || ''}`.trim();
  };

  const getCustomStyle = () => {
    if (!customSize) return {};

    return {
      width: customSize.width,
      height: customSize.height,
      padding: customSize.padding,
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
