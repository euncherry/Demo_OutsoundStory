import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePronunciationStore } from '@/store';
import { analyzeAudio } from '@/features/pronunciation/utils/audioAnalysis.ts';
import * as styles from './AnalyzingStage.css.ts';

export function AnalyzingStage() {
  const { standardAudio, userAudio, setAnalysisResult, context } =
    usePronunciationStore();

  useEffect(() => {
    const performAnalysis = async () => {
      // 시뮬레이션을 위한 딜레이 (실제로는 분석 시간)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('error', standardAudio, userAudio, context!.npcId);
      // 실제 분석 로직 (간단한 버전)
      const result = await analyzeAudio(standardAudio!, userAudio!, context!.npcId);

      setAnalysisResult(result);
    };

    if (standardAudio && userAudio) {
      performAnalysis();
    }
  }, [standardAudio, userAudio, context, setAnalysisResult]);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.content}>
        <motion.div
          className={styles.loader}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />

        <h2 className={styles.title}>🔄 분석 중입니다...</h2>

        <div className={styles.progressContainer}>
          <motion.div
            className={styles.progressBar}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </div>

        <p className={styles.message}>💭 발음을 비교하고 있어요</p>

        <div className={styles.steps}>
          <motion.div
            className={styles.step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ✓ 음성 데이터 수집 완료
          </motion.div>
          <motion.div
            className={styles.step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ⚡ 주파수 분석 중...
          </motion.div>
          <motion.div
            className={styles.step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            📊 점수 계산 중...
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
