// src/data/npcs/npcData.ts
import { usePlayerStore } from "@/store";

export interface NPCData {
  id: string;
  name: string;
  nameKo: string;
  age: number | string;
  occupation: string;
  personality: string;
  introduction: string;
  profileImage: string;
  voiceType: string;
  themeColor: string;
  dialogueTextColor: string; // 대화 텍스트 전용 색상
  emotions: {
    normal?: string;
    happy?: string;
    sad?: string;
    surprised?: string;
    angry?: string;
    worried?: string;
    shy?: string;
    blank?: string;
    serious?: string;
    wink?: string;
    shy2?: string;
  };
}

// 유틸리티 함수들
const getNPCImagePath = (id: string, type: string, gender: "male" | "female") =>
  `/src/assets/characters/npc/${gender}/${id}/${type}.png`;

const getNPCProfileImagePath = (id: string, gender: "male" | "female") =>
  `/src/assets/characters/npcProfile/${gender}/${id}.png`;

const getNPCEmotions = (id: string, gender: "male" | "female") => ({
  normal: getNPCImagePath(id, "normal", gender),
  happy: getNPCImagePath(id, "happy", gender),
  sad: getNPCImagePath(id, "sad", gender),
  surprised: getNPCImagePath(id, "surprised", gender),
  angry: getNPCImagePath(id, "angry", gender),
  worried: getNPCImagePath(id, "worried", gender),
  shy: getNPCImagePath(id, "shy", gender),
  blank: getNPCImagePath(id, "blank", gender),
  serious: getNPCImagePath(id, "serious", gender),
  wink: getNPCImagePath(id, "wink", gender),
  shy2: getNPCImagePath(id, "shy2", gender),
});

// 남성 플레이어를 위한 여성 NPC 데이터
const femaleNpcData: Record<string, NPCData> = {
  mihyun: {
    id: "mihyun",
    name: "Lee Mihyun",
    nameKo: "이미현",
    age: 24,
    occupation: "도서관 사서 & 댄서",
    personality: "차분하고 지적이지만 숨겨진 열정이 있음",
    introduction: "낮에는 조용한 사서, 밤에는 자유로운 댄서의 이중생활",
    profileImage: getNPCProfileImagePath("mihyun", "female"),
    emotions: getNPCEmotions("mihyun", "female"),
    voiceType: "bright",
    themeColor: "#FFB6C1",
    dialogueTextColor: "#C63B72",
  },
  yujin: {
    id: "yujin",
    name: "Park Yujin",
    nameKo: "유진",
    age: 23,
    occupation: "PC방 알바생 & 쇼핑몰 모델",
    personality: "정의감 넘치고 활발하지만 거친 면도 있음",
    introduction: "약자를 지키는 정의로운 격투 실력의 소유자",
    profileImage: getNPCProfileImagePath("yujin", "female"),
    emotions: getNPCEmotions("yujin", "female"),
    voiceType: "soft",
    themeColor: "#E6B3FF",
    dialogueTextColor: "#8B4B9B",
  },
  chaerin: {
    id: "chaerin",
    name: "Park Chaerin",
    nameKo: "박채린",
    age: 24,
    occupation: "미용사",
    personality: "밝고 긍정적이며 덤벙대지만 실력은 확실함",
    introduction: "긍정 에너지가 넘치는 재능있는 미용사",
    profileImage: getNPCProfileImagePath("chaerin", "female"),
    emotions: getNPCEmotions("chaerin", "female"),
    voiceType: "mature",
    themeColor: "#FFD700",
    dialogueTextColor: "#D4A017",
  },
  sunhwa: {
    id: "sunhwa",
    name: "Han sunhwa",
    nameKo: "한선화",
    age: 27,
    occupation: "요가 강사",
    personality: "활발하고 매력적이지만 헌신적인 면도 있음",
    introduction: "밝은 에너지로 사람들을 이끄는 요가 강사",
    profileImage: getNPCProfileImagePath("sunhwa", "female"),
    emotions: getNPCEmotions("sunhwa", "female"),
    voiceType: "gentle",
    themeColor: "#98FB98",
    dialogueTextColor: "#2E7D32",
  },
  gaeul: {
    id: "gaeul",
    name: "Han Gaeul",
    nameKo: "한가을",
    age: 22,
    occupation: "대학생 & 카페 아르바이트",
    personality: "밝고 활발하며 호기심이 많음",
    introduction: "청춘의 에너지가 넘치는 대학생",
    profileImage: getNPCProfileImagePath("gaeul", "female"),
    emotions: getNPCEmotions("gaeul", "female"),
    voiceType: "mysterious",
    themeColor: "#DDA0DD",
    dialogueTextColor: "#8B008B",
  },
};

// 여성 플레이어를 위한 남성 NPC 데이터
const maleNpcData: Record<string, NPCData> = {
  hojun: {
    id: "hojun",
    name: "Kang Hojun",
    nameKo: "강호준",
    age: 24,
    occupation: "카페 알바생 & 밴드 드러머",
    personality: "밝고 자유분방하지만 내향적",
    introduction:
      "겉보기엔 활발하지만 마음에 드는 사람 앞에서는 긴장하는 순수한 청년",
    profileImage: getNPCProfileImagePath("hojun", "male"),
    emotions: getNPCEmotions("hojun", "male"),
    voiceType: "warm",
    themeColor: "#FF9B9B",
    dialogueTextColor: "#8B2635",
  },
  jihoon: {
    id: "jihoon",
    name: "Song Jihoon",
    nameKo: "송지훈",
    age: 22,
    occupation: "대학생 & 카페 알바생",
    personality: "세심하고 배려심 깊지만 때로는 냉정",
    introduction: "어른스럽고 든든하지만 가끔은 차가운 면도 있는 연하남",
    profileImage: getNPCProfileImagePath("jihoon", "male"),
    emotions: getNPCEmotions("jihoon", "male"),
    voiceType: "soft",
    themeColor: "#9BB5FF",
    dialogueTextColor: "#1E3A8A",
  },
  dojin: {
    id: "dojin",
    name: "Seo Dojin",
    nameKo: "서도진",
    age: 27,
    occupation: "스타트업 대표",
    personality: "성공 지향적이고 과시욕이 강함",
    introduction: "성공한 사업가지만 내면의 상처를 감추고 있는 츤데레",
    profileImage: getNPCProfileImagePath("dojin", "male"),
    emotions: getNPCEmotions("dojin", "male"),
    voiceType: "confident",
    themeColor: "#B89BFF",
    dialogueTextColor: "#4C1D95",
  },
  yohan: {
    id: "yohan",
    name: "Kim Yohan",
    nameKo: "김요한",
    age: 26,
    occupation: "카페 사장",
    personality: "종교적이고 착하지만 과거가 있음",
    introduction: "과거를 뒤로하고 새로운 삶을 사는 따뜻한 카페 사장",
    profileImage: getNPCProfileImagePath("yohan", "male"),
    emotions: getNPCEmotions("yohan", "male"),
    voiceType: "gentle",
    themeColor: "#7ed397",
    dialogueTextColor: "#14532D",
  },
  kanghyuk: {
    id: "kanghyuk",
    name: "Seo Kanghyuk",
    nameKo: "서강혁",
    age: "??",
    occupation: "???",
    personality: "신비롭고 알 수 없는 성격",
    introduction: "도진의 ???",
    profileImage: getNPCProfileImagePath("kanghyuk", "male"),
    emotions: getNPCEmotions("kanghyuk", "male"),
    voiceType: "mysterious",
    themeColor: "#FF9BFF",
    dialogueTextColor: "#86198F",
  },
};

// 현재 플레이어의 성별에 따라 적절한 NPC 데이터 반환
const getCurrentNpcData = (): Record<string, NPCData> => {
  const gender = usePlayerStore.getState().gender;

  // 플레이어가 여성이면 남성 NPC, 남성이면 여성 NPC
  return gender === "female" ? maleNpcData : femaleNpcData;
};

// ID로 NPC 조회
export const getNPCById = (id: string): NPCData | undefined => {
  const npcData = getCurrentNpcData();
  return npcData[id];
};

// 모든 NPC 목록 조회
export const getAllNPCs = (): NPCData[] => {
  const npcData = getCurrentNpcData();
  return Object.values(npcData);
};

// 특정 성별의 NPC 데이터 직접 조회 (필요시 사용)
export const getMaleNPCs = (): NPCData[] => {
  return Object.values(maleNpcData);
};

export const getFemaleNPCs = (): NPCData[] => {
  return Object.values(femaleNpcData);
};

// 디버깅용: 현재 사용 중인 NPC 데이터 세트 확인
export const getCurrentNpcDataSet = (): "male" | "female" => {
  const gender = usePlayerStore.getState().gender;
  return gender === "female" ? "male" : "female";
};

// 기존 호환성을 위한 export (deprecated - 추후 제거 예정)
export const npcData = getCurrentNpcData();
