// src/pages/PlayerSetup/NameInput.tsx
import React, { useState } from "react";
import { Button } from "@shared/components/Button";
import * as styles from "./PlayerSetup.css";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery"; // 또는 "@/hooks"
import { useThemeStore } from "@store/themeStore";

interface NameInputProps {
  onSubmit: (name: string) => void;
  initialName?: string;
}

export function NameInput({ onSubmit, initialName = "" }: NameInputProps) {
  const { currentTheme } = useThemeStore();

  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");
  const isMobile = useMediaQuery("(max-width: 950px)");
  const handleSubmit = () => {
    if (name.trim().length > 10) {
      setError("이름은 10자 이하로 입력해주세요");
      return;
    }
    // 이름이 비어있으면 placeholder 값인 '길동'을 사용
    if (currentTheme === "male") {
      onSubmit(name.trim() || "광수");
    } else {
      onSubmit(name.trim() || "옥순");
    }
  };

  return (
    <div className={styles.nameContainer}>
      <h2 className={styles.sectionTitle}>이름을 입력하세요</h2>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder={currentTheme === "male" ? "광수" : "옥순"}
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
          게임 시작하기
        </Button>
      ) : (
        <Button variant="main" size="large" onClick={handleSubmit}>
          게임 시작하기
        </Button>
      )}
    </div>
  );
}
