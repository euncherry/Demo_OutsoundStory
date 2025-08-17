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
  themeFemaleColor: string;
  dialogueFemaleTextColor: string;
  themeMaleColor: string;
  dialogueMaleTextColor: string;
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
  themeFemaleColor: "rgba(233, 30, 99, 1)",
  dialogueFemaleTextColor: "rgba(212, 102, 143, 1)",
  themeMaleColor: "rgba(0, 120, 215, 1)",
  dialogueMaleTextColor: "rgba(107, 127, 166, 1)",
};
