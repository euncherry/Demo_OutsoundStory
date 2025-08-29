import React, { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { usePronunciationStore } from '@/store/pronunciationStore';
import { useScoreStore } from '@/store/scoreStore';
import * as styles from './ResultsStage.css.ts';

export function WaveformTab() {
  const { 
    currentContext,
    recordedAudioBlob,
  } = usePronunciationStore();
  const { analysisResult,waveformAnalysis } = useScoreStore();
  
  const standardWaveformRef = useRef<HTMLDivElement>(null);
  const userWaveformRef = useRef<HTMLDivElement>(null);
  
  const refWavesurferRef = useRef<WaveSurfer | null>(null);
  const userWavesurferRef = useRef<WaveSurfer | null>(null);

  // 표준 음성 WaveSurfer (그래프만)
  useEffect(() => {
    if (!standardWaveformRef.current || !currentContext) return;

    const wavesurfer = WaveSurfer.create({
      container: standardWaveformRef.current,
      height: 80,
      waveColor: '#4CAF50',
      progressColor: '#2E7D32',
      cursorColor: '#4CAF50',
      barWidth: 2,
      barRadius: 1,
      interact: true,
      url: currentContext.audioReference || '/src/assets/audio/references/Default.wav',
    });

    refWavesurferRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
    };
  }, [currentContext]);

  // 사용자 음성 WaveSurfer (그래프만)
  useEffect(() => {
    if (!userWaveformRef.current || !recordedAudioBlob) return;

    const blobUrl = URL.createObjectURL(recordedAudioBlob);
    const wavesurfer = WaveSurfer.create({
      container: userWaveformRef.current,
      height: 80,
      waveColor: '#FF9800',
      progressColor: '#F57C00',
      cursorColor: '#FF9800',
      barWidth: 2,
      barRadius: 1,
      interact: true,
      url: blobUrl,
    });

    userWavesurferRef.current = wavesurfer;

    return () => {
      URL.revokeObjectURL(blobUrl);
      wavesurfer.destroy();
    };
  }, [recordedAudioBlob]);

  const handlePlayRef = () => {
    refWavesurferRef.current?.playPause();
  };

  const handlePlayUser = () => {
    userWavesurferRef.current?.playPause();
  };
console.log("🔍🔍🔍🔍🔍🔍🔍🔍🔍 analysisResult",analysisResult)
  return (
    <div className={styles.waveformContainer}>
      <div className={styles.waveformHeader}>
        <h3 className={styles.sectionTitle}>🌊 WaveForm Comparison</h3>
        <div className={styles.waveformInfo}>
          음성의 진폭(볼륨) 패턴을 시간에 따라 비교합니다
        </div>
      </div>

      {/* 표준 파형 */}
      <div className={styles.waveSection}>
        <div className={styles.waveHeader}>
          <div className={styles.waveLabel}>
            <div className={styles.waveLegend} style={{ backgroundColor: '#4CAF50' }} />
            <span>표준 발음</span>
          </div>
          <button className={styles.wavePlayButton} onClick={handlePlayRef}>
            ▶️
          </button>
        </div>
        <div className={styles.waveformWrapper}>
          <div ref={standardWaveformRef} />
        </div>
      </div>

      {/* 사용자 파형 */}
      <div className={styles.waveSection}>
        <div className={styles.waveHeader}>
          <div className={styles.waveLabel}>
            <div className={styles.waveLegend} style={{ backgroundColor: '#FF9800' }} />
            <span>내 발음</span>
          </div>
          <button className={styles.wavePlayButton} onClick={handlePlayUser}>
            ▶️
          </button>
        </div>
        <div className={styles.waveformWrapper}>
          <div ref={userWaveformRef} />
        </div>
      </div>

      {/* Store에서 가져온 분석 결과 표시 */}
      {analysisResult && (
        <div className={styles.waveformAnalysis}>
          <div className={styles.analysisCard}>
            <div className={styles.analysisIcon}>📊</div>
            <div className={styles.analysisContent}>
              <div className={styles.analysisTitle}>NCC 상관도</div>
              <div className={styles.analysisScore}>
                {Math.round((waveformAnalysis?.nccScore || 0) * 100)}%
              </div>
            </div>
          </div>

          <div className={styles.analysisCard}>
            <div className={styles.analysisIcon}>📈</div>
            <div className={styles.analysisContent}>
              <div className={styles.analysisTitle}>RMS 패턴</div>
              <div className={styles.analysisScore}>
                {Math.round((waveformAnalysis?.rmsScore || 0) * 100)}%
              </div>
            </div>
          </div>

          <div className={styles.analysisCard}>
            <div className={styles.analysisIcon}>🎯</div>
            <div className={styles.analysisContent}>
              <div className={styles.analysisTitle}>파형 종합</div>
              <div className={styles.analysisScore}>
                {analysisResult.waveformScore}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}