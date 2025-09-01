// src/utils/debug/characterDebug.ts
import { useCharacterStore } from '@/store';

/**
 * 개발 환경에서 캐릭터 해금 테스트
 */
export const debugCharacterUnlock = {
  // 도진 플레이 완료 시뮬레이션 (강혁 해금)
  simulateDojinComplete: () => {
    const store = useCharacterStore.getState();
    store.recordPlay('dojin', true);
    console.log('✅ 도진 플레이 완료 시뮬레이션');
  },

  // 여성 NPC 플레이 시뮬레이션 (가을 해금)
  simulateFemaleNPCPlay: () => {
    const store = useCharacterStore.getState();
    store.recordPlay('mihyun', false);
    console.log('✅ 이미현 플레이 시뮬레이션');
  },

  // 모든 NPC 해금
  unlockAll: () => {
    const store = useCharacterStore.getState();
    store.unlockAllNPCs();
  },

  // 상태 확인
  checkStatus: () => {
    const store = useCharacterStore.getState();
    console.log('📊 현재 상태:', {
      availableNPCs: store.getAvailableNPCs(),
      unlockedNPCs: store.unlockedNPCs,
      playHistory: store.playHistory,
    });
  },

  // 초기화
  reset: () => {
    const store = useCharacterStore.getState();
    store.resetCharacters();
    console.log('🔄 캐릭터 스토어 초기화 완료');
  },
};

// 개발 환경에서 전역 접근 가능하도록 설정
if (process.env.NODE_ENV === 'development') {
  // @ts-expect-error
  window.debugCharacter = debugCharacterUnlock;
  console.log('💡 디버그 명령어: window.debugCharacter');
}
