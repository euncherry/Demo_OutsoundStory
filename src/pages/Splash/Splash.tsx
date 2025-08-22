// src/pages/Splash/Splash.tsx
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import * as styles from './Splash.css.ts';
import { Button } from '../../shared/components/Button';
import { useThemeStore } from '@store/themeStore';
import logoImage from '@assets/ui/decorations/Logo.png'; // 메인 로고 이미지

export function Splash() {
  const navigate = useNavigate();
  const { currentTheme, setTheme } = useThemeStore();
  const [splitPosition, setSplitPosition] = useState(50); // 중앙 분할선 위치 (%)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // 터치 시작 (모바일)
  const handleTouchStart = () => {
    setIsDragging(true);
  };

  // 드래그 중
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const percentage = (x / containerRect.width) * 100;

    // 10%에서 90% 사이로 제한
    setSplitPosition(Math.min(90, Math.max(10, percentage)));
  };

  // 터치 이동 (모바일)
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const touch = e.touches[0];
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - containerRect.left;
    const percentage = (x / containerRect.width) * 100;

    setSplitPosition(Math.min(90, Math.max(10, percentage)));
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 터치 종료 (모바일)
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // 이벤트 리스너 등록/해제
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging]);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* <div className={styles.heart1} />
      <div className={styles.heart2} />
      <div className={styles.heart3} />
      <div className={styles.heart4} />
      <div className={styles.heart5} /> */}

      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 100,
          width: '200px',
          height: '150px',
          zIndex: 1000,
        }}
      >
        <button className={styles.button} onClick={() => setTheme('global')}>
          Global
        </button>
        <button className={styles.button} onClick={() => setTheme('female')}>
          Female
        </button>
        <button className={styles.button} onClick={() => setTheme('male')}>
          Male
        </button>
        <p>Current: {currentTheme}</p>
      </div>

      <div className={styles.title}>
        <div
          className={styles.Logo}
          style={{
            backgroundImage: `url(${logoImage})`,
          }}
        />{' '}
      </div>

      {/* 버튼 섹션 */}
      <div className={styles.buttonSection}>
        <div className={styles.buttonContainer}>
          <Button
            variant="mainSolid"
            size="large"
            onClick={() => navigate('/player-setup')}
          >
            처음부터
          </Button>
          <Button
            variant="subSolid"
            size="large"
            onClick={() => navigate('/continue')}
            // disabled
          >
            이어하기
          </Button>
        </div>
      </div>

      {/* 좌측 이미지 섹션 */}
      <div
        className={styles.leftSection}
        style={{
          clipPath: `polygon(0 0, ${splitPosition}% 0, ${splitPosition}% 100%, 0 100%)`,
          transition: isDragging ? 'none' : 'all 0.5s ease',
        }}
      />

      {/* 우측 이미지 섹션 */}
      <div
        className={styles.rightSection}
        style={{
          clipPath: `polygon(${splitPosition}% 0, 100% 0, 100% 100%, ${splitPosition}% 100%)`,
          transition: isDragging ? 'none' : 'all 0.5s ease',
        }}
      />

      {/* 드래그 핸들 */}
      <div
        style={{
          position: 'absolute',
          left: `${splitPosition}%`,
          top: 0,
          bottom: 0,
          width: '4px',
          background:
            'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 182, 193, 0.8))',
          cursor: 'col-resize',
          zIndex: 5,
          transition: isDragging ? 'none' : 'all 0.5s ease',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* 드래그 아이콘 */}
        <div
          style={{
            position: 'absolute',
            top: '75%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              color: '#666',
              userSelect: 'none',
            }}
          >
            ⇔
          </span>
        </div>
      </div>
    </div>
  );
}
