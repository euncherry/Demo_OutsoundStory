// src/data/npcs/npcData.ts

export interface NPCData {
  id: string;
  name: string;
  nameKo: string;
  age: number;
  occupation: string;
  personality: string;
  introduction: string;
  profileImage: string;
  normalFace: string;
  voiceType: string;
  themeColor: string;
  dialogueTextColor: string; // 대화 텍스트 전용 색상
}

export const npcData: Record<string, NPCData> = {
  hojun: {
    id: "hojun",
    name: "Kang hojun",
    nameKo: "강호준",
    age: 24,
    occupation: "카페 알바생 & 밴드 드러머",
    personality: "밝고 자유분방하지만 내향적",
    introduction:
      "겉보기엔 활발하지만 마음에 드는 사람 앞에서는 긴장하는 순수한 청년",
    profileImage: "/src/assets/characters/npcProfile/hojun.png",
    normalFace: "/src/assets/characters/player/female/body.png",
    voiceType: "warm",
    themeColor: "#FF9B9B",
    dialogueTextColor: "#8B2635", // 분홍 계열 진한 색상
  },
  jihoon: {
    id: "jihoon",
    name: "Song jihoon",
    nameKo: "송지훈",
    age: 22,
    occupation: "대학생 & 카페 알바생",
    personality: "세심하고 배려심 깊지만 때로는 냉정",
    introduction: "어른스럽고 든든하지만 가끔은 차가운 면도 있는 연하남",
    profileImage: "/src/assets/characters/npcProfile/jihoon.png",
    normalFace: "/src/assets/characters/male/body.png",
    voiceType: "soft",
    themeColor: "#9BB5FF",
    dialogueTextColor: "#1E3A8A", // 파랑 계열 진한 색상
  },
  dojin: {
    id: "dojin",
    name: "Seo Dojin",
    nameKo: "서도진",
    age: 27,
    occupation: "스타트업 대표",
    personality: "성공 지향적이고 과시욕이 강함",
    introduction: "성공한 사업가지만 내면의 상처를 감추고 있는 츤데레",
    profileImage: "/src/assets/characters/npcProfile/dojin.png",
    normalFace: "/src/assets/characters/male/body.png",
    voiceType: "confident",
    themeColor: "#B89BFF",
    dialogueTextColor: "#4C1D95", // 보라 계열 진한 색상
  },
  yohan: {
    id: "yohan",
    name: "Kim Yohan",
    nameKo: "김요한",
    age: 26,
    occupation: "카페 사장",
    personality: "종교적이고 착하지만 과거가 있음",
    introduction: "과거를 뒤로하고 새로운 삶을 사는 따뜻한 카페 사장",
    profileImage: "/src/assets/characters/npcProfile/yohan.png",
    normalFace: "/src/assets/characters/male/body.png",
    voiceType: "gentle",
    themeColor: "#7ed397",
    dialogueTextColor: "#14532D", // 초록 계열 진한 색상
  },
  kanghyuk: {
    id: "kanghyuk",
    name: "Seo Kanghyuk",
    nameKo: "서강혁",
    age: 27,
    occupation: "???",
    personality: "신비롭고 알 수 없는 성격",
    introduction: "도진의 쌍둥이 동생, 모든 것이 베일에 싸인 미스터리한 남자",
    profileImage: "/src/assets/characters/npcProfile/kanghyuk.png",
    normalFace: "/src/assets/characters/male/body.png",
    voiceType: "mysterious",
    themeColor: "#FF9BFF",
    dialogueTextColor: "#86198F", // 마젠타 계열 진한 색상
  },
};

export const getNPCById = (id: string): NPCData | undefined => {
  return npcData[id];
};

export const getAllNPCs = (): NPCData[] => {
  return Object.values(npcData);
};
