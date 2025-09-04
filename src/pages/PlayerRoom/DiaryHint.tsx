// src/pages/PlayerRoom/DiaryHint.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as styles from "./PlayerRoom.css";

interface DiaryHintProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DiaryHint({ isOpen, setIsOpen }: DiaryHintProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [previousQuote, setPreviousQuote] = useState<string | null>(null);
  const [showPrevious, setShowPrevious] = useState(false);

  const diaryQuotes = [
    "또 하루가 그냥 지나갔다...",
    "변화가 필요한데 용기가 없어",
    "누군가와 대화하고 싶다",
  ];

  const handleClick = () => {
    if (isOpen) {
      // 현재 메시지를 이전 메시지로 저장하고 애니메이션 시작
      setPreviousQuote(diaryQuotes[currentQuoteIndex]);
      setShowPrevious(true);

      // 다음 메시지로 이동하기 전에 살짝 딜레이
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % diaryQuotes.length);
      }, 100);

      // 이전 메시지 애니메이션이 끝나면 제거
      setTimeout(() => {
        setShowPrevious(false);
      }, 1000);
    } else {
      setIsOpen(true);
    }
  };

  // 외부 클릭 핸들러
  const handleClickOutside = (e: React.MouseEvent) => {
    // 버튼이나 팝업 내부를 클릭한 경우는 무시
    if ((e.target as HTMLElement).closest(".diary-button, .diary-popup")) {
      return;
    }
    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClickOutside}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />
      <motion.button
        className={`${styles.diaryButton} diary-button`}
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {isOpen ? "📖" : "📔"}
      </motion.button>

      <AnimatePresence>
        {/* 이전 메시지 */}
        {showPrevious && previousQuote && (
          <motion.div
            className={`${styles.diaryPopup} diary-popup`}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -100 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            style={{ zIndex: 1 }}
          >
            <p className={styles.diaryQuote}>"{previousQuote}"</p>
          </motion.div>
        )}

        {/* 현재 메시지 */}
        {isOpen && (
          <motion.div
            className={`${styles.diaryPopup} diary-popup`}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0 }}
            style={{ zIndex: 0 }}
          >
            <p className={styles.diaryQuote}>
              "{diaryQuotes[currentQuoteIndex]}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
