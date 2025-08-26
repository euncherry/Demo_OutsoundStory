// src/features/pronunciation/components/PronunciationModal.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePronunciationStore } from '@/store/pronunciationStore';
import { PrepareStage } from './PrepareStage';
import { RecordingStage } from './RecordingStage';
import { AnalyzingStage } from './AnalyzingStage';
import { ResultsStage } from './ResultsStage';
import * as styles from './PronunciationModal.css';

interface PronunciationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: { totalScore: number; affinityChange: number }) => void;
}

export function PronunciationModal({
  isOpen,
  onClose,
  onComplete,
}: PronunciationModalProps) {
  const { currentStage, analysisResult, reset } = usePronunciationStore();

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleClose = () => {
    // 녹음 중이거나 분석 중일 때는 확인 메시지 표시
    if (currentStage === 'recording' || currentStage === 'analyzing') {
      const confirmClose = window.confirm(
        '진행 중인 작업이 있습니다. 정말 닫으시겠습니까?',
      );
      if (!confirmClose) return;
    }
    reset();
    onClose();
  };

  const handleComplete = () => {
    if (analysisResult) {
      onComplete({
        totalScore: analysisResult.totalScore,
        affinityChange: analysisResult.affinityChange,
      });
    }
    reset();
  };

  // 스테이지별 진행 상태
  const getStageProgress = () => {
    switch (currentStage) {
      case 'prepare':
        return 1;
      case 'recording':
        return 2;
      case 'analyzing':
        return 3;
      case 'results':
        return 4;
      default:
        return 0;
    }
  };

  const stageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: 'blur(10px)',
      transform: 'translate(-50%, -50%)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transform: 'translate(-50%, -50%)',

      transition: {
        // duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(5px)',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />

          {/* 모달 컨테이너 */}
          <motion.div
            className={styles.modalContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={stageVariants}
          >
            {/* 진행 상태 바 */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'rgba(230, 220, 255, 0.2)',
                borderRadius: '30px 30px 0 0',
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #d4668f, #9b7eb0, #6b7fa6)',
                  borderRadius: '2px',
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${getStageProgress() * 25}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* 스테이지 표시 */}
            <motion.div
              style={{
                position: 'absolute',
                top: '20px',
                left: '30px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '20px',
                border: '1px solid rgba(230, 220, 255, 0.3)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgba(107, 91, 149, 0.8)',
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span style={{ fontSize: '12px' }}>
                {currentStage === 'prepare' && '🎵 준비'}
                {currentStage === 'recording' && '🎙️ 녹음'}
                {currentStage === 'analyzing' && '📊 분석'}
                {currentStage === 'results' && '🏆 결과'}
              </span>
              <span style={{ fontSize: '12px', opacity: 0.6 }}>
                {getStageProgress()}/4
              </span>
            </motion.div>

            {/* 컨텐츠 영역 */}
            <AnimatePresence mode="wait">
              {currentStage === 'prepare' && (
                <motion.div
                  key="prepare"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <PrepareStage />
                </motion.div>
              )}

              {currentStage === 'recording' && (
                <motion.div
                  key="recording"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <RecordingStage />
                </motion.div>
              )}

              {currentStage === 'analyzing' && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnalyzingStage />
                </motion.div>
              )}

              {currentStage === 'results' && (
                <motion.div
                // key="results"
                // initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                // animate={{ opacity: 1, scale: 1, rotate: 0 }}
                // exit={{ opacity: 0, scale: 0.9 }}
                // transition={{
                //   duration: 0.5,
                //   type: 'spring',
                //   stiffness: 200,
                // }}
                >
                  <ResultsStage onComplete={handleComplete} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 닫기 버튼 */}
            <motion.button
              className={styles.closeButton}
              onClick={handleClose}
              whileHover={{
                scale: 1.1,
                rotate: 90,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              ✕
            </motion.button>

            {/* 장식 요소 - 왼쪽 상단 */}
            <motion.div
              style={{
                position: 'absolute',
                top: '-50px',
                left: '-50px',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255, 200, 220, 0.2), transparent)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* 장식 요소 - 오른쪽 하단 */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(230, 220, 255, 0.2), transparent)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
