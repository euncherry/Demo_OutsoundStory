import { AnalysisResult, AudioData } from '@/types/pronunciation.types';
// import { getNPCById } from '@/data/npcs/npcData';

/**
 * 간단한 오디오 분석 함수
 * 실제로는 더 복잡한 알고리즘을 사용해야 합니다
 */
export async function analyzeAudio(
  standardAudio: AudioData,
  userAudio: AudioData,
  npcId: string,
): Promise<AnalysisResult> {
  // 랜덤 점수 생성 (실제로는 복잡한 분석 필요)
  // 피치, 리듬, 클리어니스 점수 생성
  // TODO: 실제 분석 로직 구현
  const pitchScore = Math.floor(Math.random() * 30) + 70;
  const rhythmScore = Math.floor(Math.random() * 30) + 70;
  const clarityScore = Math.floor(Math.random() * 30) + 70;

  const totalScore = Math.floor((pitchScore + rhythmScore + clarityScore) / 3);

  // NPC 반응 생성
  const npcReaction = generateNPCReaction(npcId, totalScore);

  return {
    totalScore,
    scores: {
      pitch: pitchScore,
      rhythm: rhythmScore,
      clarity: clarityScore,
    },
    npcReaction,
  };
}

/**
 * NPC 반응 생성
 */
function generateNPCReaction(npcId: string, score: number) {
  let emotion: string;
  let message: string;
  let affinityChange: number;

  if (score >= 90) {
    emotion = 'happy';
    affinityChange = 10;
    message = getExcellentMessage(npcId);
  } else if (score >= 80) {
    emotion = 'happy';
    affinityChange = 8;
    message = getGoodMessage(npcId);
  } else if (score >= 70) {
    emotion = 'normal';
    affinityChange = 5;
    message = getFairMessage(npcId);
  } else {
    emotion = 'normal';
    affinityChange = 3;
    message = getPoorMessage(npcId);
  }

  return { emotion, message, affinityChange };
}

// NPC별 메시지
function getExcellentMessage(npcId: string): string {
  const messages: Record<string, string> = {
    hojun: '와! 발음이 정말 완벽해요! 😊',
    jihoon: '훌륭하네요. 정말 인상적이에요.',
    dojin: '흠... 나쁘지 않네. 아니, 꽤 좋아.',
    yohan: '정말 잘하시네요! 축복받은 목소리예요.',
    kanghyuk: '...예상보다 훨씬 좋은데?',
  };
  return messages[npcId] || '완벽해요!';
}

function getGoodMessage(npcId: string): string {
  const messages: Record<string, string> = {
    hojun: '발음이 정말 좋으세요! 조금만 더 연습하면 완벽할 것 같아요!',
    jihoon: '좋네요. 노력한 게 보여요.',
    dojin: '뭐, 이 정도면 괜찮은 편이지.',
    yohan: '좋아요! 조금만 더 힘내면 될 것 같아요.',
    kanghyuk: '...나쁘지 않아.',
  };
  return messages[npcId] || '잘하셨어요!';
}

function getFairMessage(npcId: string): string {
  const messages: Record<string, string> = {
    hojun: '괜찮아요! 다시 한 번 해볼까요?',
    jihoon: '조금 더 연습이 필요할 것 같네요.',
    dojin: '이게 최선이야? 다시 해봐.',
    yohan: '괜찮아요, 천천히 다시 해보세요.',
    kanghyuk: '...더 잘할 수 있을 것 같은데.',
  };
  return messages[npcId] || '괜찮아요!';
}

function getPoorMessage(npcId: string): string {
  const messages: Record<string, string> = {
    hojun: '어... 긴장하셨나봐요! 다시 해볼까요?',
    jihoon: '음... 좀 더 집중해서 다시 해보세요.',
    dojin: '이건 좀... 다시 하는 게 좋겠어.',
    yohan: '괜찮아요, 실수는 누구나 해요. 다시 해보세요.',
    kanghyuk: '....',
  };
  return messages[npcId] || '다시 도전해보세요!';
}
