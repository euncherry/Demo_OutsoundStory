import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWavesurfer } from '@wavesurfer/react';
import { usePronunciationStore } from '@/store';
import { Button } from '@/shared/components/Button';
import * as styles from './PrepareStage.css';

interface PrepareStageProps {
  text: string;
  audioReference?: string;
}

export function PrepareStage({ text, audioReference }: PrepareStageProps) {
  const { setModalStage, setStandardAudio } = usePronunciationStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // WaveSurfer 설정 (표준 음성용)
  const { wavesurfer, isReady } = useWavesurfer({
    container: containerRef,
    url: audioReference,
    height: 80,
    waveColor: '#B89BFF',
    progressColor: '#9575CD',
    barWidth: 3,
    barGap: 2,
    barRadius: 3,
  });

  const handlePlayPause = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const handleStartRecording = () => {
    // 표준 음성 데이터 저장 (나중에 비교용)
    if (audioReference) {
      fetch(audioReference)
        .then((res) => res.blob())
        .then((blob) => {
          setStandardAudio({
            blob,
            url: audioReference,
            duration: wavesurfer?.getDuration() || 0,
          });
        });
    }

    setModalStage('recording');
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>🎙️ 발음 연습하기</h2>
      </div>

      <div className={styles.content}>
        {/* 텍스트 표시 */}
        <div className={styles.textBox}>
          <p className={styles.label}>연습할 문장</p>
          <p className={styles.text}>{text}</p>
        </div>

        {/* 표준 음성 플레이어 */}
        {audioReference && (
          <div className={styles.audioSection}>
            <p className={styles.label}>🔊 표준 발음 듣기</p>
            <div className={styles.waveformContainer}>
              <div ref={containerRef} className={styles.waveform} />
            </div>
            <Button variant="sub" onClick={handlePlayPause} disabled={!isReady}>
              {isPlaying ? '⏸️ 일시정지' : '▶️ 재생'}
            </Button>
          </div>
        )}

        {/* 팁 메시지 */}
        <div className={styles.tip}>💡 표준 발음을 먼저 들어보고 따라해보세요!</div>

        {/* 시작 버튼 */}
        <div className={styles.actions}>
          <Button variant="main" size="large" onClick={handleStartRecording}>
            🎙️ 녹음 시작하기
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
