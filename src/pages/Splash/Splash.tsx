// src/pages/Splash/Splash.tsx
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import * as styles from "./Splash.css";
import { usePlayerStore } from "@store/playerStore";
import { useCharacterStore } from "@/store";
import logoImage from "@assets/ui/logo/logo.png"; // 메인 로고 이미지
import { Button3D } from "@shared/components/3DButton";

// 언어별 텍스트 정의
const texts = {
  ko: {
    newGame: "처음부터",
    continue: "이어하기",
    language: "언어",
    korean: "한국어",
    english: "English",
    current: "현재",
  },
  en: {
    newGame: "New Game",
    continue: "Continue",
    language: "Language",
    korean: "한국어",
    english: "English",
    current: "Current",
  },
};

export function Splash() {
  const navigate = useNavigate();
  const { language, setLanguage } = usePlayerStore();
  const { resetCharacters } = useCharacterStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // 현재 언어에 맞는 텍스트 가져오기
  const t = texts[language];

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

  // 언어 토글 함수 (옵션 1: 토글 방식)
  const toggleLanguage = () => {
    setLanguage(language === "ko" ? "en" : "ko");
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {/* 언어 선택 섹션 */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          flexDirection: "column",
          gap: "0.625rem",
          zIndex: 1000,
          alignItems: "flex-end",
        }}
      >
        <div className={styles.slideSwitch}>
          <div
            className={`${styles.slideTrack} ${
              language === "en" ? styles.slideTrackEnglish : ""
            }`}
          />
          <div
            className={`${styles.slideLabel} ${
              language === "ko" ? styles.slideLabelActive : ""
            }`}
            onClick={() => setLanguage("ko")}
          >
            KO
          </div>
          <div
            className={`${styles.slideLabel} ${
              language === "en" ? styles.slideLabelActive : ""
            }`}
            onClick={() => setLanguage("en")}
          >
            EN
          </div>
        </div>

        {/* 현재 언어 표시 (옵션) */}
        <p
          style={{
            fontSize: "0.75rem",
            color: "#666",
            margin: 0,
          }}
        >
          {language === "ko" ? `언어 : ${t.korean}` : "language : 🇺🇸"}
        </p>
      </div>

      {/* 로고 섹션 */}
      <div className={styles.title}>
        <div
          className={styles.Logo}
          style={{
            backgroundImage: `url(${logoImage})`,
          }}
        />
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
            {t.newGame}
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
            {t.continue}
          </Button3D>
        </div>
      </div>
    </div>
  );
}
