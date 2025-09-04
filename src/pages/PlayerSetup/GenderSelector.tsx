// src/pages/PlayerSetup/GenderSelector.tsx
import React from "react";
import { Gender } from "@/types/character.types";
import { GenderButton } from "@shared/components/Button";
import * as styles from "./PlayerSetup.css";

interface GenderSelectorProps {
  selectedGender: Gender | null;
  onSelectGender: (gender: Gender) => void;
}

export function GenderSelector({
  selectedGender,
  onSelectGender,
}: GenderSelectorProps) {
  return (
    <div className={styles.genderContainer}>
      <h2 className={styles.sectionTitle}>캐릭터 성별을 선택하세요</h2>
      <div className={styles.genderButtons}>
        <GenderButton
          gender="female"
          onClick={() => onSelectGender("female")}
          disabled={selectedGender !== null && selectedGender !== "female"}
        />

        <GenderButton
          gender="male"
          onClick={() => onSelectGender("male")}
          disabled={selectedGender !== null && selectedGender !== "male"}
        />
      </div>
    </div>
  );
}
