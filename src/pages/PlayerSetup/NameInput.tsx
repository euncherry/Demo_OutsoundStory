// src/pages/PlayerSetup/NameInput.tsx
import React, { useState } from 'react';
import { Button } from '@shared/components/Button';
import * as styles from './PlayerSetup.css.ts';

interface NameInputProps {
  onSubmit: (name: string) => void;
  initialName?: string;
}

export function NameInput({ onSubmit, initialName = '' }: NameInputProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (name.trim().length > 10) {
      setError('이름은 10자 이하로 입력해주세요');
      return;
    }
    // 이름이 비어있으면 placeholder 값인 '길동'을 사용
    onSubmit(name.trim() || '명윤');
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
            setError('');
          }}
          placeholder="명윤"
          className={styles.nameInput}
          maxLength={10}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
      <Button variant="main" size="large" onClick={handleSubmit}>
        게임 시작하기
      </Button>
    </div>
  );
}
