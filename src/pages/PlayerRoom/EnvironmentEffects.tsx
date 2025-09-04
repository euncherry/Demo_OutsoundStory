// src/pages/PlayerRoom/EnvironmentEffects.tsx
import React from "react";
import { motion } from "framer-motion";
import * as styles from "./PlayerRoom.css";

export function EnvironmentEffects() {
  // 파티클 생성
  const dustParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 10,
  }));

  const lightParticles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
  }));

  return (
    <>
      {/* 비네팅 효과 */}
      <div className={styles.vignette} />

      {/* 먼지 파티클 */}
      <div className={styles.particleContainer}>
        {dustParticles.map((particle) => (
          <motion.div
            key={`dust-${particle.id}`}
            className={styles.dustParticle}
            initial={{
              x: `${particle.x}vw`,
              y: -10,
              opacity: 0,
            }}
            animate={{
              y: "110vh",
              opacity: [0, 0.5, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* 빛 파티클 */}
      <div className={styles.lightContainer}>
        {lightParticles.map((particle) => (
          <motion.div
            key={`light-${particle.id}`}
            className={styles.lightParticle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 창문 빗방울 효과 */}
      <div className={styles.rainEffect}>
        {Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={`rain-${i}`}
            className={styles.raindrop}
            initial={{ y: -100 }}
            animate={{ y: "100vh" }}
            transition={{
              duration: 1 + Math.random(),
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 30 + 60}%`,
            }}
          />
        ))}
      </div>
    </>
  );
}
