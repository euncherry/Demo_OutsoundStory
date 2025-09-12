# 반응형 스타일 시스템 가이드

## 개요

이 프로젝트는 체계적인 반응형 디자인 시스템을 제공합니다. 모든 반응형 스타일은 일관된 브레이크포인트와 헬퍼 함수를 사용합니다.

## 브레이크포인트

```typescript
// theme.css.ts에서 정의된 브레이크포인트
breakpoints: {
  mobile: "480px",      // 모바일
  tablet: "768px",      // 태블릿
  laptop: "1024px",     // 노트북
  desktop: "1280px",    // 데스크톱
  wide: "1536px",       // 와이드 스크린
}
```

## 사용법

### 1. 기본 미디어 쿼리 사용

```typescript
import { media } from "@/shared/styles/responsive.css";

export const myStyle = style({
  fontSize: "16px",
  "@media": {
    [media.mobile]: {
      fontSize: "14px",
    },
    [media.tablet]: {
      fontSize: "15px",
    },
    [media.laptopAndUp]: {
      fontSize: "18px",
    },
  },
});
```

### 2. createResponsiveStyle 헬퍼 사용

```typescript
import { createResponsiveStyle } from "@/shared/styles/responsive.css";

export const myStyle = style(
  createResponsiveStyle(
    {
      fontSize: "16px",
      padding: "1rem",
    },
    {
      mobile: {
        fontSize: "14px",
        padding: "0.5rem",
      },
      tablet: {
        fontSize: "15px",
        padding: "0.8rem",
      },
      laptopAndUp: {
        fontSize: "18px",
        padding: "1.2rem",
      },
    }
  )
);
```

### 3. 미리 정의된 반응형 컴포넌트 사용

```typescript
import { grid, flex, textSize, spacing } from "@/shared/styles/responsive.css";

// 반응형 그리드
export const myGrid = style(grid.auto); // 모바일: 1열, 태블릿: 2열, 데스크톱: 3열

// 반응형 플렉스
export const myFlex = style(flex.columnToRow); // 모바일: 세로, 태블릿 이상: 가로

// 반응형 텍스트
export const myHeading = style(textSize.heading); // 모바일에서 작게, 데스크톱에서 크게

// 반응형 패딩
export const myContainer = style(spacing.responsive); // 모바일에서 작게, 데스크톱에서 크게
```

## 미디어 쿼리 옵션

### 기본 브레이크포인트

- `media.mobile` - 480px 이하
- `media.tablet` - 480px ~ 767px
- `media.laptop` - 768px ~ 1023px
- `media.desktop` - 1024px ~ 1279px
- `media.wide` - 1280px 이상

### 편의 조합

- `media.mobileAndTablet` - 767px 이하 (모바일 + 태블릿)
- `media.tabletAndUp` - 768px 이상 (태블릿 + 노트북 + 데스크톱)
- `media.laptopAndUp` - 1024px 이상 (노트북 + 데스크톱)

### 특정 브레이크포인트 이상

- `media.mobileUp` - 480px 이상
- `media.tabletUp` - 768px 이상
- `media.desktopUp` - 1280px 이상

## 실제 사용 예시

### 기존 코드 (하드코딩된 미디어 쿼리)

```typescript
export const oldStyle = style({
  fontSize: "16px",
  "@media": {
    "screen and (max-width:  950px)  ": {
      fontSize: "14px",
    },
    "screen and (max-width: 480px)": {
      fontSize: "12px",
    },
  },
});
```

### 새로운 코드 (체계적인 반응형 시스템)

```typescript
export const newStyle = style(
  createResponsiveStyle(
    {
      fontSize: "16px",
    },
    {
      mobileAndTablet: {
        fontSize: "14px",
      },
      mobile: {
        fontSize: "12px",
      },
    }
  )
);
```

## 장점

1. **일관성**: 모든 컴포넌트가 동일한 브레이크포인트를 사용
2. **유지보수성**: 브레이크포인트 변경 시 한 곳에서만 수정
3. **가독성**: 의미있는 이름으로 미디어 쿼리 표현
4. **재사용성**: 미리 정의된 반응형 컴포넌트 활용
5. **타입 안전성**: TypeScript로 타입 체크

## 마이그레이션 가이드

기존 코드를 새로운 시스템으로 마이그레이션할 때:

1. `@media` 객체의 하드코딩된 쿼리를 `media` 객체의 속성으로 교체
2. `createResponsiveStyle` 헬퍼를 사용하여 코드 간소화
3. 반복되는 패턴은 미리 정의된 컴포넌트로 교체

## 주의사항

- 브레이크포인트는 모바일 우선(mobile-first) 방식으로 설계됨
- `mobileAndTablet`는 767px 이하를 의미 (기존 950px 대신)
- 모든 반응형 스타일은 `responsive.css.ts`에서 import하여 사용
