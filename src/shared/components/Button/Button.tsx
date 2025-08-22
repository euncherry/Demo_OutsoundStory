// src/shared/components/Button/Button.tsx

import React, { CSSProperties } from 'react';
import { clsx } from 'clsx';
import { ButtonProps, CustomSize } from './Button.types';
import { useThemeStore } from '@/store/themeStore';
import * as styles from './Button.css';

const CHOICE_ICON = '💭'; // 통일된 아이콘
const LOVE_HEARTS = {
  global: '💜',
  female: '❤️',
  male: '💙',
};

// 크기 값을 CSS 값으로 변환하는 헬퍼 함수
const formatSizeValue = (value: string | number | undefined): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
};

// CustomSize를 CSSProperties로 변환하는 헬퍼 함수
const getCustomSizeStyles = (customSize?: CustomSize): CSSProperties => {
  if (!customSize) return {};

  return {
    width: formatSizeValue(customSize.width),
    height: formatSizeValue(customSize.height),
    padding: customSize.padding,
  };
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'main',
  size = 'large',
  customSize,
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className,
  style, // style prop 추가
  loading = false,
  genderType,
  choiceIndex = 0,
}) => {
  const { currentTheme } = useThemeStore();

  // Choice 버튼용 아이콘 (통일된 아이콘)
  const choiceIcon = variant === 'choice' ? CHOICE_ICON : null;

  // Love 버튼용 하트 선택 (테마에 따라)
  const loveHeart = variant === 'love' ? LOVE_HEARTS.global : null; // 테마 스토어와 연동 필요

  // Gender 버튼 스타일 적용
  const genderClass =
    variant === 'gender' && genderType ? styles.genderVariants[genderType] : '';

  // Custom 사이즈 스타일
  const customSizeStyles = size === 'custom' ? getCustomSizeStyles(customSize) : {};

  // customSize 스타일과 전달받은 style을 합침
  const combinedStyles = { ...customSizeStyles, ...style };

  return (
    <button
      className={clsx(
        styles.button({
          variant,
          size,
          fullWidth,
          loading,
        }),
        genderClass,
        className,
      )}
      style={combinedStyles} // 합쳐진 스타일 적용
      onClick={onClick}
      disabled={disabled || loading}
    >
      {/* Choice 버튼 아이콘 */}
      {choiceIcon && <span className={styles.choiceIcon}>{choiceIcon}</span>}

      {/* Gender 버튼 아이콘 */}
      {variant === 'gender' && icon && <span className={styles.genderIcon}>{icon}</span>}

      {/* 일반 아이콘 (왼쪽) */}
      {icon && iconPosition === 'left' && variant !== 'gender' && <span>{icon}</span>}

      {/* 메인 콘텐츠 */}
      <span>{children}</span>

      {/* 일반 아이콘 (오른쪽) */}
      {icon && iconPosition === 'right' && variant !== 'gender' && <span>{icon}</span>}

      {/* Love 버튼 하트 */}
      {loveHeart && <span className={styles.loveHeart}>{loveHeart}</span>}

      {/* 로딩 스피너 */}
      {loading && <span className={styles.spinner} />}
    </button>
  );
};

// 특수 버튼 컴포넌트들
export const GenderButton: React.FC<{
  gender: 'male' | 'female';
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  style?: CSSProperties; // style prop 추가
}> = ({ gender, onClick, disabled, selected, style }) => {
  const icon = gender === 'female' ? '👩' : '👨';
  const text = gender === 'female' ? '여성 캐릭터' : '남성 캐릭터';

  return (
    <Button
      variant="gender"
      genderType={gender}
      icon={icon}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={selected ? styles.genderVariants[gender] : undefined}
    >
      {text}
    </Button>
  );
};

export const ChoiceButton: React.FC<{
  text: string;
  index?: number;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties; // style prop 추가
}> = ({ text, index = 0, onClick, disabled, style }) => {
  return (
    <Button
      variant="choice"
      choiceIndex={index}
      fullWidth
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {text}
    </Button>
  );
};

export const LoveButton: React.FC<{
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties; // style prop 추가
}> = ({ text, onClick, disabled, style }) => {
  return (
    <Button variant="love" onClick={onClick} disabled={disabled} style={style}>
      {text}
    </Button>
  );
};

export const StartButton: React.FC<{
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties; // style prop 추가
}> = ({ onClick, disabled, style }) => {
  return (
    <Button
      variant="special"
      size="xlarge"
      icon="✨"
      iconPosition="right"
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      게임 시작하기
    </Button>
  );
};

// 커스텀 사이즈 버튼 예시 컴포넌트
export const CustomButton: React.FC<{
  width?: string | number;
  height?: string | number;
  padding?: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonProps['variant'];
  style?: CSSProperties; // style prop 추가
}> = ({ width, height, padding, children, onClick, variant = 'main', style }) => {
  return (
    <Button
      variant={variant}
      size="custom"
      customSize={{ width, height, padding }}
      onClick={onClick}
      style={style}
    >
      {children}
    </Button>
  );
};
