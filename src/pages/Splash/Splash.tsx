// src/pages/Splash/Splash.tsx
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import * as styles from "./Splash.css";
import { useThemeStore } from "@store/themeStore";
import { useCharacterStore } from "@/store";
import logoImage from "@assets/ui/logo/logo.png"; // 메인 로고 이미지
import { Button3D } from "@shared/components/3DButton";

export function Splash() {
  const navigate = useNavigate();
  const { currentTheme, setTheme } = useThemeStore();
  const { resetCharacters } = useCharacterStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // 처음부터 시작: 모든 캐릭터 진행 기록 초기화 후 이동
  const handleStartNew = () => {
    try {
      resetCharacters();
      // persist 데이터도 제거
      localStorage.removeItem("character-storage");
    } finally {
      navigate("/player-setup");
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 100,
          width: "200px",
          height: "150px",
          zIndex: 1000,
        }}
      >
        <button className={styles.button} onClick={() => setTheme("global")}>
          Global
        </button>
        <button className={styles.button} onClick={() => setTheme("female")}>
          Female
        </button>
        <button className={styles.button} onClick={() => setTheme("male")}>
          Male
        </button>
        <p>Current: {currentTheme}</p>
      </div>

      <div className={styles.title}>
        {currentTheme === "female" ? (
          <div
            className={styles.Logo}
            style={{
              backgroundImage: `url(${logoImage})`,
            }}
          />
        ) : (
          <div
            className={styles.Logo}
            style={{
              backgroundImage: `url(${logoImage})`,
            }}
          />
        )}
      </div>

      {/* 버튼 섹션 */}
      <div className={styles.buttonSection}>
        <div className={styles.buttonContainer}>
          <Button3D
            variant="main"
            size="large"
            style={{
              padding: "3dvh 5dvw",
              fontSize: "1.2rem",
            }}
            onClick={handleStartNew}
          >
            처음부터
          </Button3D>
          <Button3D
            variant="sub"
            size="large"
            style={{
              padding: "3dvh 5dvw",
              fontSize: "1.2rem",
            }}
            onClick={() => navigate("/continue")}
          >
            이어하기
          </Button3D>
        </div>
      </div>
    </div>
  );
}
