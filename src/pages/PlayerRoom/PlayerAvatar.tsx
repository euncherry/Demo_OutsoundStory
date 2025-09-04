// src/pages/PlayerRoom/PlayerAvatar.tsx

import { motion } from "framer-motion";
import { usePlayerStore } from "@/store";
import * as styles from "./PlayerRoom.css";

import { playerData } from "@/data/characters/playerData";

const playerAssets = {
  //todo : faces 플레이어 데이터에서 가져오기
  male: {
    body: playerData.emotions.male.normal,
    faces: playerData.emotions.male.normal,
  },
  female: {
    body: playerData.emotions.female.normal,
    faces: playerData.emotions.female.normal,
  },
};

export function PlayerAvatar() {
  const { gender } = usePlayerStore();

  if (!gender) return null;

  const bodyImage = playerAssets[gender].body;
  const faceImage = playerAssets[gender].faces;

  return (
    <motion.div
      className={styles.avatarContainer}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* 호흡 애니메이션 - 전체 wrapper */}
      <motion.div
        className={styles.avatarWrapper}
        animate={{
          scale: [1, 1.005, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "center bottom", // 아래 중앙 기준으로 스케일
        }}
      >
        {/* 미세한 흔들림 - 내부 wrapper */}
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
          animate={
            {
              // rotate: [-0.5, 0.5, -0.5],
            }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* 이미지 컨테이너 */}
          <div className={styles.imageContainer}>
            <img
              src={bodyImage}
              alt="Player Body"
              className={styles.avatarBody}
            />
            <img
              src={faceImage}
              alt="Player Face"
              className={styles.avatarFace}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* 그림자는 애니메이션 밖에 */}
      <div className={styles.avatarShadow} />
    </motion.div>
  );
}
