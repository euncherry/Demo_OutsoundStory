// src/features/pronunciation/components/PronunciationModal/PronunciationModal.tsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePronunciationStore } from '@/store';
import { PrepareStage } from '../PrepareStage/PrepareStage.tsx';
import { RecordingStage } from '../RecordingStage/RecordingStage.tsx';
import { AnalyzingStage } from '../AnalyzingStage/AnalyzingStage.tsx';
import { ResultsStage } from '../ResultsStage/ResultsStage.tsx';
import * as styles from './PronunciationModal.css.ts';

interface PronunciationModalProps {
  text: string;
  audioReference?: string;
  onComplete: (score: number, affinityChange: number) => void;
  onClose: () => void;
}

export function PronunciationModal({
  text,
  audioReference,
  onComplete,
  onClose,
}: PronunciationModalProps) {
  const { modalStage, analysisResult, reset } = usePronunciationStore();

  // 컴포넌트 언마운트 시 스토어 리셋
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  // 분석 완료 시 처리
  useEffect(() => {
    if (analysisResult) {
      // 3초 후 자동으로 완료 처리
      const timer = setTimeout(() => {
        onComplete(analysisResult.totalScore, analysisResult.npcReaction.affinityChange);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [analysisResult, onComplete]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 닫기 버튼 */}
          <button className={styles.closeButton} onClick={handleClose}>
            ✕
          </button>

          {/* 스테이지별 컨텐츠 */}
          <AnimatePresence mode="wait">
            {modalStage === 'prepare' && (
              <PrepareStage key="prepare" text={text} audioReference={audioReference} />
            )}
            {modalStage === 'recording' && <RecordingStage key="recording" text={text} />}
            {modalStage === 'analyzing' && <AnalyzingStage key="analyzing" />}
            {modalStage === 'results' && analysisResult && (
              <ResultsStage
                key="results"
                result={analysisResult}
                onRetry={() => reset()}
                onComplete={() =>
                  onComplete(
                    analysisResult.totalScore,
                    analysisResult.npcReaction.affinityChange,
                  )
                }
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
