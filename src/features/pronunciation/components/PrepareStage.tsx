// src/features/pronunciation/components/PrepareStage.tsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import WaveSurfer from "wavesurfer.js";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { Button } from "@/shared/components/Button";
import * as styles from "./PronunciationModal.css";

export function PrepareStage() {
  const { currentContext, setCurrentStage } = usePronunciationStore();
  const { getAvailableDevices } = useAudioRecorder();

  const standardWaveformRef = useRef<HTMLDivElement>(null);
  const [
    standardWavesurfer,
    setStandardWavesurfer,
  ] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [hasListened, setHasListened] = useState(false);

  // 표준 음성 wavesurfer 초기화
  useEffect(() => {
    if (!standardWaveformRef.current || !currentContext) return;

    const wavesurfer = WaveSurfer.create({
      container: standardWaveformRef.current,
      waveColor: "rgb(230, 220, 255)",
      progressColor: "rgba(212, 102, 143, 0.8)",
      cursorColor: "rgba(155, 126, 174, 0.8)",
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 2,
      height: 60,
      barGap: 2,
      normalize: true,
      url:
        currentContext.audioReference || "/assets/audio/references/Default.wav",
    });

    wavesurfer.on("play", () => {
      setIsPlaying(true);
      setHasListened(true);
    });
    wavesurfer.on("pause", () => setIsPlaying(false));
    wavesurfer.on("finish", () => setIsPlaying(false));

    setStandardWavesurfer(wavesurfer);

    return () => {
      wavesurfer.destroy();
    };
  }, [currentContext]);

  // 오디오 기기 목록 로드
  useEffect(() => {
    getAvailableDevices().then(setAudioDevices);
  }, [getAvailableDevices]);

  const handlePlayStandard = () => {
    if (!standardWavesurfer) return;
    standardWavesurfer.playPause();
  };

  const handleStartRecording = () => {
    setCurrentStage("recording");
  };

  if (!currentContext) return null;

  return (
    <motion.div
      className={styles.stageContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* 헤더 */}
      <div className={styles.HeaderContainer}>
        <motion.div
          className={styles.stageHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className={styles.stageTitle}>🎙️ 발음 연습하기</h2>
          <p className={styles.stageSubtitle}>
            캐릭터에게 당신의 마음을 전달해보세요
          </p>
        </motion.div>
        {/* 선택한 텍스트 표시 */}
        <motion.div
          className={styles.textDisplay}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className={styles.choiceText}>"{currentContext.text}"</p>
        </motion.div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className={styles.settingContainer}>
        <div style={{ display: "flex", gap: "1.25rem" }}>
          {/* 왼쪽: 표준 음성 영역 */}
          <motion.div
            className={styles.standardAudioSection}
            style={{ flex: 1 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className={styles.sectionTitle}>
              <span>🔊</span>
              <span>표준 발음 듣기</span>
            </h3>
            <div className={styles.waveformContainer}>
              <div ref={standardWaveformRef} className={styles.waveform} />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                variant="purple"
                size="small"
                onClick={handlePlayStandard}
                fullWidth
                icon={isPlaying ? "⏸️" : "▶️"}
                iconPosition="left"
              >
                {isPlaying ? "일시정지" : "재생하기"}
              </Button>

              {hasListened && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 15px",
                    color: "#4caf50",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    width: "5rem",
                    wordBreak: "keep-all",
                  }}
                >
                  ✓ 청취완료
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* 오른쪽: 마이크 선택 영역 */}
          <motion.div
            className={styles.micSection}
            style={{ flex: 1 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className={styles.sectionTitle}>
              <span>🎤</span>
              <span>마이크 설정</span>
            </h3>
            <div className={styles.micContent}>
              <select
                className={styles.micSelect}
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
              >
                <option value="">기본 마이크 사용</option>
                {audioDevices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `마이크 ${device.deviceId.slice(0, 8)}`}
                  </option>
                ))}
              </select>
              <div
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.875rem",
                  color: "rgba(107, 91, 149, 0.7)",
                }}
              >
                💡 조용한 환경에서 녹음하시면 더 정확한 평가가 가능해요
              </div>
            </div>
          </motion.div>
        </div>

        {/* 안내 메시지 */}
        <motion.div
          className={styles.guideSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className={styles.guideText}>
            💖 표준 발음을 잘 들으신 후, 감정을 담아 똑같이 따라 말해보세요!
            <br />
            정확한 발음과 감정 표현이 캐릭터의 호감도를 올리는 비결이에요
          </p>
        </motion.div>
      </div>
      {/* 녹음 시작 버튼 */}

      <div className={styles.footerContainer}>
        <motion.div
          className={styles.actionSection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="love"
            size="xlarge"
            onClick={handleStartRecording}
            disabled={!hasListened}
            icon="🎙️"
            iconPosition="right"
          >
            {hasListened ? "녹음 시작하기" : "먼저 표준 발음을 들어주세요"}
          </Button>
        </motion.div>

        {/* 진행 상태 표시 */}
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: hasListened
                ? "linear-gradient(135deg, #d4668f, #9b7eb0)"
                : "rgba(230, 220, 255, 0.3)",
            }}
          />
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "rgba(230, 220, 255, 0.3)",
            }}
          />
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "rgba(230, 220, 255, 0.3)",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
