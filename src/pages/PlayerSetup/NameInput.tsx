// src/pages/PlayerSetup/NameInput.tsx
import React, { useState } from "react";
import { Button } from "@shared/components/Button";
import * as styles from "./PlayerSetup.css";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { useThemeStore } from "@store/themeStore";
import { usePlayerStore } from "@store/playerStore";

// 언어별 텍스트 정의
const texts = {
  ko: {
    title: "이름을 입력하세요",
    placeholder: {
      male: "광수",
      female: "옥순",
    },
    error: "이름은 10자 이하로 입력해주세요",
    startButton: "게임 시작하기",
  },
  en: {
    title: "Enter your name",
    placeholder: {
      male: "John",
      female: "Jane",
    },
    error: "Name must be 10 characters or less",
    startButton: "Start Game",
  },
};

interface NameInputProps {
  onSubmit: (name: string) => void;
  initialName?: string;
}

export function NameInput({ onSubmit, initialName = "" }: NameInputProps) {
  const { currentTheme } = useThemeStore();
  const { language } = usePlayerStore();

  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");
  const isMobile = useMediaQuery("(max-width: 950px)");

  // 현재 언어에 맞는 텍스트
  const t = texts[language];

  const handleSubmit = () => {
    if (name.trim().length > 10) {
      setError(t.error);
      return;
    }

    // 이름이 비어있으면 placeholder 값 사용
    const defaultName =
      currentTheme === "male" ? t.placeholder.male : t.placeholder.female;

    onSubmit(name.trim() || defaultName);
  };

  return (
    <div className={styles.nameContainer}>
      <h2 className={styles.sectionTitle}>{t.title}</h2>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder={
            currentTheme === "male" ? t.placeholder.male : t.placeholder.female
          }
          className={styles.nameInput}
          maxLength={10}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
      {isMobile ? (
        <Button variant="main" size="medium" onClick={handleSubmit}>
          {t.startButton}
        </Button>
      ) : (
        <Button variant="main" size="large" onClick={handleSubmit}>
          {t.startButton}
        </Button>
      )}
    </div>
  );
}
