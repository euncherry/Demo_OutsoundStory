import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useWavesurfer } from '@wavesurfer/react';
import { usePronunciationStore } from '@/store';
import { useAudioRecorder } from '@/features/pronunciation/hooks/useAudioRecorder.ts';
import { Button } from '@/shared/components/Button';
import * as styles from './RecordingStage.css';

interface RecordingStageProps {
  text: string;
}

export function RecordingStage({ text }: RecordingStageProps) {
  const { setModalStage, setUserAudio } = usePronunciationStore();
  const { startRecording, stopRecording, isRecording, audioBlob } = useAudioRecorder();
  const [timer, setTimer] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 실시간 파형 시각화
  const { wavesurfer } = useWavesurfer({
    container: containerRef,
    height: 100,
    waveColor: '#FF9B9B',
    progressColor: '#FF6B6B',
    interact: false,
  });

  // 타이머
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // 녹음 완료 처리
  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setUserAudio({
        blob: audioBlob,
        url,
        duration: timer,
      });

      // 분석 단계로 이동
      setTimeout(() => {
        setModalStage('analyzing');
      }, 500);
    }
  }, [audioBlob, timer, setUserAudio, setModalStage]);

  const handleStartStop = async () => {
    if (!isRecording) {
      await startRecording(wavesurfer);
      setTimer(0);
    } else {
      await stopRecording();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{isRecording ? '🔴 녹음 중...' : '⏸️ 녹음 준비'}</h2>
      </div>

      <div className={styles.content}>
        {/* 텍스트 표시 */}
        <div className={styles.textBox}>
          <p className={styles.text}>{text}</p>
        </div>

        {/* 파형 시각화 */}
        <div className={styles.waveformContainer}>
          <div ref={containerRef} className={styles.waveform} />
          {isRecording && (
            <motion.div
              className={styles.recordingIndicator}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>

        {/* 타이머 */}
        <div className={styles.timer}>⏱️ {formatTime(timer)} / 00:10</div>

        {/* 컨트롤 버튼 */}
        <div className={styles.actions}>
          <Button
            variant={isRecording ? 'sub' : 'main'}
            size="large"
            onClick={handleStartStop}
          >
            {isRecording ? '⏹️ 녹음 완료' : '🎙️ 녹음 시작'}
          </Button>
        </div>

        {/* 팁 */}
        {isRecording && (
          <motion.div
            className={styles.tip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            💡 천천히, 또박또박 발음해주세요
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
