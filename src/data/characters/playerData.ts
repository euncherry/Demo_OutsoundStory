// src/data/characters/playerData.ts
export interface PlayerEmotions {
  normal: string;
  happy: string;
  sad: string;
  surprised: string;
  angry: string;
  shy: string;
  determined: string;
}

export interface PlayerData {
  id: "player";
  emotions: {
    female: PlayerEmotions;
    male: PlayerEmotions;
  };
  themeColor : {
    female: string;
    male: string;
  }
  dialogueTextColor : {
    female: string;
    male: string;
  }
}

export const playerData: PlayerData = {
  id: "player",
  emotions: {
    female: {
      normal: "/src/assets/characters/player/female/normal.png",
      happy: "/src/assets/characters/player/female/happy.png",
      sad: "/src/assets/characters/player/female/sad.png",
      surprised: "/src/assets/characters/player/female/surprised.png",
      angry: "/src/assets/characters/player/female/angry.png",
      shy: "/src/assets/characters/player/female/shy.png",
      determined: "/src/assets/characters/player/female/determined.png",
    },
    male: {
      normal: "/src/assets/characters/player/male/normal.png",
      happy: "/src/assets/characters/player/male/happy.png",
      sad: "/src/assets/characters/player/male/sad.png",
      surprised: "/src/assets/characters/player/male/surprised.png",
      angry: "/src/assets/characters/player/male/angry.png",
      shy: "/src/assets/characters/player/male/shy.png",
      determined: "/src/assets/characters/player/male/determined.png",
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
