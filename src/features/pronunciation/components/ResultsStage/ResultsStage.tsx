import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWavesurfer } from '@wavesurfer/react';
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import { usePronunciationStore, useCharacterStore } from '@/store';
import { getNPCById } from '@/data/npcs/npcData';
import { Button } from '@/shared/components/Button';
import type { AnalysisResult, AnalysisTab } from '@/types/pronunciation.types';
import * as styles from './ResultsStage.css.ts';

interface ResultsStageProps {
  result: AnalysisResult;
  onRetry: () => void;
  onComplete: () => void;
}

export function ResultsStage({ result, onRetry, onComplete }: ResultsStageProps) {
  const [activeTab, setActiveTab] = useState<AnalysisTab>('waveform');
  const { standardAudio, userAudio } = usePronunciationStore();
  const { selectedNPC } = useCharacterStore();
  const npcData = getNPCById(selectedNPC!);

  // 동기화된 재생 상태
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* 헤더 - 종합 점수 */}
      <div className={styles.header}>
        <h2 className={styles.title}>🎯 발음 분석 결과</h2>
        <ScoreDisplay score={result.totalScore} />
      </div>

      <div className={styles.mainContent}>
        {/* 왼쪽: 비교 영역 */}
        <div className={styles.comparisonArea}>
          {/* 탭 선택 */}
          <div className={styles.tabs}>
            {(['waveform', 'spectrogram', 'pitch'] as const).map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'waveform' && '🌊 파형'}
                {tab === 'spectrogram' && '📊 스펙트로그램'}
                {tab === 'pitch' && '🎵 음정'}
              </button>
            ))}
          </div>

          {/* 탭 컨텐츠 */}
          <AnimatePresence mode="wait">
            {activeTab === 'waveform' && (
              <WaveformComparison
                key="waveform"
                standardAudio={standardAudio!}
                userAudio={userAudio!}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
              />
            )}
            {activeTab === 'spectrogram' && (
              <SpectrogramComparison
                key="spectrogram"
                standardAudio={standardAudio!}
                userAudio={userAudio!}
              />
            )}
            {activeTab === 'pitch' && (
              <PitchComparison
                key="pitch"
                standardAudio={standardAudio!}
                userAudio={userAudio!}
              />
            )}
          </AnimatePresence>
        </div>

        {/* 오른쪽: 상세 분석 */}
        <div className={styles.analysisArea}>
          {/* 세부 점수 */}
          <DetailedScores scores={result.scores} />

          {/* NPC 반응 */}
          <NPCReaction npcData={npcData!} reaction={result.npcReaction} />

          {/* 호감도 변화 */}
          <AffinityChange change={result.npcReaction.affinityChange} />
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className={styles.actions}>
        <Button variant="sub" onClick={onRetry}>
          🔄 다시하기
        </Button>
        <Button variant="main" onClick={onComplete}>
          ✅ 완료
        </Button>
      </div>
    </motion.div>
  );
}

// 파형 비교 컴포넌트
function WaveformComparison({
  standardAudio,
  userAudio,
  isPlaying,
  onPlayPause,
}: {
  standardAudio: any;
  userAudio: any;
  isPlaying: boolean;
  onPlayPause: () => void;
}) {
  const standardRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const [standardWS, setStandardWS] = useState<WaveSurfer | null>(null);
  const [userWS, setUserWS] = useState<WaveSurfer | null>(null);

  useEffect(() => {
    if (!standardRef.current || !userRef.current) return;

    // 표준 음성 WaveSurfer
    const ws1 = WaveSurfer.create({
      container: standardRef.current,
      waveColor: '#B89BFF',
      progressColor: '#9575CD',
      height: 100,
      normalize: true,
      barWidth: 3,
      barGap: 2,
      barRadius: 3,
      plugins: [
        Timeline.create({
          height: 20,
          timeInterval: 0.5,
          primaryLabelInterval: 1,
        }),
      ],
    });

    // 사용자 음성 WaveSurfer
    const ws2 = WaveSurfer.create({
      container: userRef.current,
      waveColor: '#FF9B9B',
      progressColor: '#FF6B6B',
      height: 100,
      normalize: true,
      barWidth: 3,
      barGap: 2,
      barRadius: 3,
      plugins: [
        Timeline.create({
          height: 20,
          timeInterval: 0.5,
          primaryLabelInterval: 1,
        }),
      ],
    });

    ws1.loadBlob(standardAudio.blob);
    ws2.loadBlob(userAudio.blob);

    setStandardWS(ws1);
    setUserWS(ws2);

    // 동기화
    ws1.on('play', () => ws2.play());
    ws1.on('pause', () => ws2.pause());
    ws1.on('seeking', (progress) => ws2.seekTo(progress));

    return () => {
      ws1.destroy();
      ws2.destroy();
    };
  }, [standardAudio, userAudio]);

  // 재생/일시정지 제어
  useEffect(() => {
    if (standardWS) {
      if (isPlaying) {
        standardWS.play();
      } else {
        standardWS.pause();
      }
    }
  }, [isPlaying, standardWS]);

  return (
    <motion.div
      className={styles.comparisonContent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.waveformBox}>
        <label className={styles.waveformLabel}>표준 발음</label>
        <div ref={standardRef} className={styles.waveform} />
      </div>

      <div className={styles.waveformBox}>
        <label className={styles.waveformLabel}>내 발음</label>
        <div ref={userRef} className={styles.waveform} />
      </div>

      <div className={styles.playControls}>
        <Button variant="sub" onClick={onPlayPause}>
          {isPlaying ? '⏸️ 일시정지' : '▶️ 재생'}
        </Button>
      </div>

      <div className={styles.similarity}>
        📈 파형 유사도: <span className={styles.similarityValue}>88%</span>
      </div>
    </motion.div>
  );
}

// 스펙트로그램 비교 컴포넌트
function SpectrogramComparison({
  standardAudio,
  userAudio,
}: {
  standardAudio: any;
  userAudio: any;
}) {
  const standardRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!standardRef.current || !userRef.current) return;

    // 표준 음성 스펙트로그램
    const ws1 = WaveSurfer.create({
      container: standardRef.current,
      waveColor: 'transparent',
      progressColor: 'rgba(255, 255, 255, 0.3)',
      height: 0,
      plugins: [
        Spectrogram.create({
          labels: true,
          height: 150,
          scale: 'mel',
          frequencyMax: 8000,
          labelsColor: '#9575CD',
        }),
      ],
    });

    // 사용자 음성 스펙트로그램
    const ws2 = WaveSurfer.create({
      container: userRef.current,
      waveColor: 'transparent',
      progressColor: 'rgba(255, 255, 255, 0.3)',
      height: 0,
      plugins: [
        Spectrogram.create({
          labels: true,
          height: 150,
          scale: 'mel',
          frequencyMax: 8000,
          labelsColor: '#FF6B6B',
        }),
      ],
    });

    ws1.loadBlob(standardAudio.blob);
    ws2.loadBlob(userAudio.blob);

    return () => {
      ws1.destroy();
      ws2.destroy();
    };
  }, [standardAudio, userAudio]);

  return (
    <motion.div
      className={styles.comparisonContent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.spectrogramBox}>
        <label className={styles.waveformLabel}>표준 발음 (Mel Scale)</label>
        <div ref={standardRef} className={styles.spectrogram} />
      </div>

      <div className={styles.spectrogramBox}>
        <label className={styles.waveformLabel}>내 발음 (Mel Scale)</label>
        <div ref={userRef} className={styles.spectrogram} />
      </div>

      <div className={styles.similarity}>
        📊 주파수 일치도: <span className={styles.similarityValue}>82%</span>
      </div>
    </motion.div>
  );
}

// 음정 비교 컴포넌트 (Canvas로 그리기)
function PitchComparison({
  standardAudio,
  userAudio,
}: {
  standardAudio: any;
  userAudio: any;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;

    // Canvas 크기 설정
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // 배경
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 그리드
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = (canvas.height / 10) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // 더미 데이터로 음정 곡선 그리기
    const drawPitchCurve = (data: number[], color: string, isDashed = false) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      if (isDashed) {
        ctx.setLineDash([5, 5]);
      } else {
        ctx.setLineDash([]);
      }

      ctx.beginPath();
      data.forEach((value, index) => {
        const x = (canvas.width / data.length) * index;
        const y = canvas.height - value * canvas.height;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    };

    // 더미 음정 데이터
    const standardPitch = Array.from(
      { length: 50 },
      (_, i) => 0.5 + Math.sin(i * 0.2) * 0.3 + Math.random() * 0.05,
    );
    const userPitch = Array.from(
      { length: 50 },
      (_, i) => 0.5 + Math.sin(i * 0.2 + 0.5) * 0.25 + Math.random() * 0.08,
    );

    drawPitchCurve(standardPitch, '#B89BFF', false);
    drawPitchCurve(userPitch, '#FF9B9B', true);

    // 범례
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#B89BFF';
    ctx.fillText('── 표준', 20, 30);
    ctx.fillStyle = '#FF9B9B';
    ctx.fillText('--- 사용자', 100, 30);
  }, [standardAudio, userAudio]);

  return (
    <motion.div
      className={styles.comparisonContent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.pitchContainer}>
        <div className={styles.pitchLabel}>Pitch Contour (음정 변화)</div>
        <canvas ref={canvasRef} className={styles.pitchCanvas} />
        <div className={styles.pitchAxis}>
          <span>0s</span>
          <span>2s</span>
          <span>4s</span>
        </div>
      </div>

      <div className={styles.similarity}>
        🎵 음정 정확도: <span className={styles.similarityValue}>85%</span>
      </div>
    </motion.div>
  );
}

// 점수 애니메이션 컴포넌트
function ScoreDisplay({ score }: { score: number }) {
  return (
    <motion.div
      className={styles.scoreDisplay}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', damping: 10 }}
    >
      <motion.div
        className={styles.scoreCircle}
        style={{
          background: `conic-gradient(
            ${score >= 90 ? '#4CAF50' : score >= 70 ? '#FFC107' : '#FF5722'} ${
            score * 3.6
          }deg, 
            rgba(255, 255, 255, 0.1) ${score * 3.6}deg
          )`,
        }}
      >
        <div className={styles.scoreInner}>
          <motion.span
            className={styles.scoreNumber}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className={styles.scoreMax}>/ 100</span>
        </div>
      </motion.div>

      {score >= 90 && (
        <motion.div
          className={styles.scoreEmoji}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          🌟
        </motion.div>
      )}
    </motion.div>
  );
}

// 세부 점수 컴포넌트
function DetailedScores({ scores }: { scores: AnalysisResult['scores'] }) {
  const items = [
    { label: '음정 정확도', value: scores.pitch, icon: '🎵', color: '#B89BFF' },
    { label: '리듬 정확도', value: scores.rhythm, icon: '🥁', color: '#FF9B9B' },
    { label: '발음 명료도', value: scores.clarity, icon: '💬', color: '#9BB5FF' },
  ];

  return (
    <div className={styles.detailedScores}>
      <h3 className={styles.sectionTitle}>📊 세부 분석</h3>
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          className={styles.scoreItem}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className={styles.scoreItemHeader}>
            <span className={styles.scoreIcon}>{item.icon}</span>
            <span className={styles.scoreLabel}>{item.label}</span>
            <span className={styles.scoreValue}>{item.value}%</span>
          </div>
          <div className={styles.scoreBar}>
            <motion.div
              className={styles.scoreBarFill}
              style={{ background: item.color }}
              initial={{ width: 0 }}
              animate={{ width: `${item.value}%` }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// NPC 반응 컴포넌트
function NPCReaction({
  npcData,
  reaction,
}: {
  npcData: any;
  reaction: AnalysisResult['npcReaction'];
}) {
  return (
    <motion.div
      className={styles.npcReaction}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <h3 className={styles.sectionTitle}>🎭 {npcData.nameKo}의 반응</h3>

      <div className={styles.npcMessage}>
        <motion.img
          src={`/src/assets/characters/npc/${npcData.id}/${reaction.emotion}.png`}
          alt={npcData.nameKo}
          className={styles.npcImage}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        />

        <motion.div
          className={styles.speechBubble}
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.95), ${npcData.themeColor}20)`,
            borderColor: npcData.themeColor,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          <p style={{ color: npcData.dialogueTextColor }}>{reaction.message}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// 호감도 변화 컴포넌트
function AffinityChange({ change }: { change: number }) {
  return (
    <motion.div
      className={styles.affinityChange}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <h3 className={styles.sectionTitle}>💝 호감도 변화</h3>

      <div className={styles.affinityValue}>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
        >
          {change > 0 ? '+' : ''}
          {change}
        </motion.span>

        <motion.div
          className={styles.hearts}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {Array.from({ length: Math.min(change, 5) }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1 }}
            >
              ❤️
            </motion.span>
          ))}
        </motion.div>
      </div>

      <p className={styles.affinityText}>
        {change >= 8
          ? '완벽한 발음이에요!'
          : change >= 5
          ? '좋은 인상을 남겼어요!'
          : '조금 더 노력해보세요!'}
      </p>
    </motion.div>
  );
}
