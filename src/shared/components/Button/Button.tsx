import React, { CSSProperties } from 'react';
import { clsx } from 'clsx';
import { ButtonProps } from './Button.types';
import { buttonVariants, sizeVariants, fullWidth } from './Button.css';

export const Button: React.FC<ButtonProps> = ({
  variant = 'holographic',
  size = 'medium',
  width,
  height,
  children,
  onClick,
  disabled = false,
  className,
  fullWidth: isFullWidth = false,
}) => {
  // 커스텀 크기 처리
  const customStyles: CSSProperties = {};

  // width 처리
  if (width) {
    customStyles.width = typeof width === 'number' ? `${width}px` : width;
  }

  // height 처리
  if (height) {
    customStyles.height = typeof height === 'number' ? `${height}px` : height;
    customStyles.minHeight = typeof height === 'number' ? `${height}px` : height;
  }

  // width나 height가 설정되면 자동으로 custom size 사용
  const actualSize = width || height ? 'custom' : size;

  return (
    <button
      className={clsx(
        buttonVariants[variant],
        sizeVariants[actualSize],
        isFullWidth && fullWidth,
        className,
      )}
      style={customStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
