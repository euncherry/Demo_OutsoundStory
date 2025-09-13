// src/pages/PlayerSetup/GenderSelector.tsx
import React from "react";
import { Gender } from "@/types/character.types";
import { GenderButton } from "@shared/components/Button";
import * as styles from "./PlayerSetup.css";
import { usePlayerStore } from "@store/playerStore";

// 언어별 텍스트 정의
const texts = {
  ko: {
    title: "캐릭터 성별을 선택하세요",
    female: "여성",
    male: "남성",
  },
  en: {
    title: "Select your character's gender",
    female: "Female",
    male: "Male",
  },
};

interface GenderSelectorProps {
  selectedGender: Gender | null;
  onSelectGender: (gender: Gender) => void;
}

export function GenderSelector({
  selectedGender,
  onSelectGender,
}: GenderSelectorProps) {
  const { language } = usePlayerStore();

  // 현재 언어에 맞는 텍스트
  const t = texts[language];

  return (
    <div className={styles.genderContainer}>
      <h2 className={styles.sectionTitle}>{t.title}</h2>
      <div className={styles.genderButtons}>
        <GenderButton
          gender="female"
          onClick={() => onSelectGender("female")}
          disabled={selectedGender !== null && selectedGender !== "female"}
          label={t.female} // GenderButton에 label prop 추가
        />

        <GenderButton
          gender="male"
          onClick={() => onSelectGender("male")}
          disabled={selectedGender !== null && selectedGender !== "male"}
          label={t.male} // GenderButton에 label prop 추가
        />
      </div>
    </div>
  );
}
