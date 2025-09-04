// src/pages/PlayerSetup/PlayerSetup.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayerStore, useGameFlowStore, useThemeStore } from "@/store";
import { Gender } from "@/types/character.types";
import { GenderSelector } from "./GenderSelector";
import { NameInput } from "./NameInput";
import * as styles from "./PlayerSetup.css";

export function PlayerSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"gender" | "name">("gender");
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

  const { setPlayerInfo } = usePlayerStore();
  const { transitionTo } = useGameFlowStore();
  const { setTheme, lockTheme } = useThemeStore();

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
    // 성별 선택 시 테마 변경
    setTheme(gender);
    lockTheme(); // 테마 잠금

    // 애니메이션 후 이름 입력으로 전환
    setTimeout(() => {
      setStep("name");
    }, 500);
  };

  const handleNameSubmit = (name: string) => {
    if (selectedGender) {
      // 플레이어 정보 저장
      setPlayerInfo({ name, gender: selectedGender });

      // 게임 페이즈 변경
      transitionTo("room");

      // PlayerRoom으로 이동
      navigate("/room");
    }
  };

  const handleBack = () => {
    if (step === "name") {
      setStep("gender");
      setSelectedGender(null);
      // 테마 리셋
      setTheme("global");
    } else {
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        ← 뒤로
      </button>

      <div className={styles.setupCard}>
        <h1 className={styles.title}>캐릭터 설정</h1>

        <AnimatePresence mode="wait">
          {step === "gender" ? (
            <motion.div
              key="gender"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <GenderSelector
                selectedGender={selectedGender}
                onSelectGender={handleGenderSelect}
              />
            </motion.div>
          ) : (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <NameInput onSubmit={handleNameSubmit} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: step === "gender" ? "50%" : "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
