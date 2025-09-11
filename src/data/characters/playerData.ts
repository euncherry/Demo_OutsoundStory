// src/data/characters/playerData.ts
export interface PlayerEmotions {
  normal: string;
  happy: string;
  sad: string;
  surprised?: string;
  angry: string;
  shy: string;
  determined?: string;
  melancholy?: string;
}

export interface PlayerData {
  id: "player";
  emotions: {
    female: PlayerEmotions;
    male: PlayerEmotions;
  };
  themeColor: {
    female: string;
    male: string;
  };
  dialogueTextColor: {
    female: string;
    male: string;
  };
}

export const playerData: PlayerData = {
  id: "player",
  emotions: {
    female: {
      normal: "/assets/characters/player/female/normal.png",
      happy: "/assets/characters/player/female/happy.png",
      sad: "/assets/characters/player/female/sad.png",
      surprised: "/assets/characters/player/female/surprised.png",
      angry: "/assets/characters/player/female/angry.png",
      shy: "/assets/characters/player/female/shy.png",
      melancholy: "/assets/characters/player/female/melancholy.png",
    },
    male: {
      normal: "/assets/characters/player/male/normal.png",
      happy: "/assets/characters/player/male/happy.png",
      sad: "/assets/characters/player/male/sad.png",
      surprised: "/assets/characters/player/male/surprised.png",
      angry: "/assets/characters/player/male/angry.png",
      shy: "/assets/characters/player/male/shy.png",
      determined: "/assets/characters/player/male/determined.png",
    },
  },
  themeColor: {
    female: "rgba(233, 30, 99, 1)",
    male: "rgba(91, 158, 190, 1)",
    // male: "rgba(0, 120, 215, 1)",
  },
  dialogueTextColor: {
    female: "rgba(212, 102, 143, 1)",
    male: "rgb(30, 58, 138)",
    // rgb(30, 58, 138)
  },
};
