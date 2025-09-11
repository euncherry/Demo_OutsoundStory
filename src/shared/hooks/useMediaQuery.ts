// src/shared/hooks/useMediaQuery.ts
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  // 1. 미디어 쿼리 매칭 상태를 저장할 state
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // 2. 미디어 쿼리 객체 생성
    const media = window.matchMedia(query);

    // 3. 초기값 설정 (현재 화면 크기 체크)
    setMatches(media.matches);

    // 4. 화면 크기 변경 리스너 함수
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 5. 이벤트 리스너 등록
    media.addEventListener("change", listener);

    // 6. 클린업 함수 (컴포넌트 언마운트 시 리스너 제거)
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
