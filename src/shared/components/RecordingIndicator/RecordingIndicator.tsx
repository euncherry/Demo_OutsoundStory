// src/features/pronunciation/components/RecordingIndicator.tsx
import React from "react";
import { motion } from "framer-motion";
import * as styles from "./RecordingIndicator.css";

interface RecordingIndicatorProps {
  status: "ready" | "recording" | "paused" | "stopped";
  isVisible?: boolean;
}

export function RecordingIndicator({
  status,
  isVisible = true,
}: RecordingIndicatorProps) {
  if (!isVisible) return null;

  const getStatusConfig = () => {
    switch (status) {
      case "ready":
        return {
          color: "rgba(130, 130, 130, 1)",
          text: "준비",
          icon: "⭕",
          animate: false,
        };
      case "recording":
        return {
          color: "rgba(255, 67, 67, 1)",
          text: "녹음 중",
          icon: "🔴",
          animate: true,
        };
      case "paused":
        return {
          color: "rgba(255, 193, 7, 1)",
          text: "일시정지",
          icon: "⏸️",
          animate: false,
        };
      case "stopped":
        return {
          color: "rgba(76, 175, 80, 1)",
          text: "완료",
          icon: "⏹️",
          animate: false,
        };
      default:
        return {
          color: "rgba(130, 130, 130, 1)",
          text: "준비",
          icon: "⭕",
          animate: false,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      className={styles.recordingIndicator}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        borderColor: config.color,
        boxShadow: `0 0 20px ${config.color}40`,
      }}
    >
      {/* 아이콘/점 부분 */}
      <div className={styles.indicatorIcon}>
        {config.animate ? (
          <motion.div
            className={styles.recordingDot}
            style={{ backgroundColor: config.color }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ) : (
          <div className={styles.statusIcon} style={{ color: config.color }}>
            {config.icon}
          </div>
        )}
      </div>

      {/* 텍스트 부분 */}
      <span className={styles.recordingStatus} style={{ color: config.color }}>
        {config.text}
      </span>

      {/* 애니메이션 웨이브 (녹음 중일 때만) */}
      {config.animate && (
        <div className={styles.waveContainer}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.wave}
              style={{ backgroundColor: config.color }}
              animate={{
                scaleY: [1, 2, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// 간단한 버전 (작은 크기)
export function RecordingIndicatorMini({
  status,
  isVisible = true,
}: RecordingIndicatorProps) {
  if (!isVisible) return null;

  const isRecording = status === "recording";
  const isPaused = status === "paused";

  return (
    <div className={styles.recordingIndicatorMini}>
      <motion.div
        className={styles.miniDot}
        style={{
          backgroundColor: isRecording
            ? "rgba(255, 67, 67, 1)"
            : isPaused
            ? "rgba(255, 193, 7, 1)"
            : "rgba(130, 130, 130, 1)",
        }}
        animate={
          isRecording
            ? {
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }
            : {}
        }
        transition={
          isRecording
            ? {
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
        }
      />
    </div>
  );
}
