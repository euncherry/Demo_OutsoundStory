// src/store/characterStore.ts
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { usePlayerStore } from './playerStore';

// KST(UTC+9) ISO 형태 문자열 생성 (예: 2025-09-01T16:03:31.812+09:00)
const nowKSTISOString = (): string =>
  new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().replace('Z', '+09:00');

interface PlayRecord {
  npcId: string;
  playedAt: string; // ISO 문자열로 저장 (KST)
  completed: boolean;
}

interface CharacterState {
  // 상태
  selectedNPC: string | null;
  playHistory: PlayRecord[]; // NPC 플레이 기록
  unlockedNPCs: string[]; // 해금된 특별 NPC 목록
  
  // 계산된 값 (getter)
  getAvailableNPCs: () => string[];
  isNPCUnlocked: (npcId: string) => boolean;
  
  // 액션
  selectNPC: (npcId: string) => void;
  recordPlay: (npcId: string, completed?: boolean) => void;
  checkAndUnlockNPCs: () => void;
  resetCharacters: () => void;
  
  // 디버그용
  unlockAllNPCs: () => void; // 개발용: 모든 NPC 해금
}

// 기본 NPC 목록 (성별별)
const BASE_MALE_NPCS = ['hojun', 'jihoon', 'dojin', 'yohan'];
const BASE_FEMALE_NPCS = ['mihyun', 'yujin', 'chaerin', 'sunhwa'];

// 특별 NPC (조건부 해금)
const SPECIAL_MALE_NPC = 'kanghyuk'; // dojin 플레이 후 해금
const SPECIAL_FEMALE_NPC = 'gaeul'; // 아무 여성 NPC 1회 플레이 후 해금

export const useCharacterStore = create<CharacterState>()(
  devtools(
    persist(
      (set, get) => ({
        // ===== 초기 상태 =====
        selectedNPC: null,
        playHistory: [],
        unlockedNPCs: [],

        // ===== 계산된 값 (Getters) =====
        
        /**
         * 현재 플레이어 성별에 따라 사용 가능한 NPC 목록 반환
         */
        getAvailableNPCs: () => {
          const gender = usePlayerStore.getState().gender;
          const { unlockedNPCs } = get();
          
          if (!gender) return [];
          
          // 기본 NPC 목록
          let availableNPCs: string[] = [];
          
          if (gender === 'female') {
            // 여성 플레이어 → 남성 NPC
            availableNPCs = [...BASE_MALE_NPCS];
            
            // kanghyuk 해금 체크 (dojin 플레이 완료 시)
            if (unlockedNPCs.includes(SPECIAL_MALE_NPC)) {
              availableNPCs.push(SPECIAL_MALE_NPC);
            }
          } else {
            // 남성 플레이어 → 여성 NPC
            availableNPCs = [...BASE_FEMALE_NPCS];
            
            // gaeul 해금 체크 (아무 여성 NPC 1회 플레이 시)
            if (unlockedNPCs.includes(SPECIAL_FEMALE_NPC)) {
              availableNPCs.push(SPECIAL_FEMALE_NPC);
            }
          }
          
          return availableNPCs;
        },

        /**
         * 특정 NPC가 해금되었는지 확인
         */
        isNPCUnlocked: (npcId: string) => {
          const availableNPCs = get().getAvailableNPCs();
          return availableNPCs.includes(npcId);
        },

        // ===== 액션 =====
        
        /**
         * NPC 선택
         */
        selectNPC: (npcId) => {
          // 해금된 NPC만 선택 가능
          if (get().isNPCUnlocked(npcId)) {
            set({ selectedNPC: npcId });
          } else {
            console.warn(`[CharacterStore] NPC ${npcId}는 아직 해금되지 않았습니다.`);
          }
        },

        /**
         * NPC 플레이 기록 저장
         * @param npcId - 플레이한 NPC ID
         * @param completed - 스토리 완료 여부 (기본값: false)
         */
        recordPlay: (npcId, completed = false) => {
          const { playHistory } = get();
          const now = nowKSTISOString();
          
          // 같은 NPC의 같은 상태 기록이 이미 있는지 확인
          const existingIndex = playHistory.findIndex(record => 
            record.npcId === npcId && record.completed === completed
          );
          
          if (existingIndex !== -1) {
            // 기존 기록의 시간을 최신으로 갱신
            const updatedHistory = [...playHistory];
            updatedHistory[existingIndex] = {
              ...updatedHistory[existingIndex],
              playedAt: now,
            };
            
            set({ playHistory: updatedHistory });
            console.log(`⏱️ 기록 시간 갱신: ${npcId} (completed: ${completed}) -> ${now}`);
            // 해금 조건 체크는 유지
            get().checkAndUnlockNPCs();
            return;
          }
          
          // 기록이 없으면 새로 추가
          const newRecord: PlayRecord = {
            npcId,
            playedAt: now,
            completed,
          };
          
          console.log(`📝 새 기록 추가: ${npcId} (completed: ${completed})`);
          
          set({ 
            playHistory: [...playHistory, newRecord] 
          });
          
          // 해금 조건 체크
          get().checkAndUnlockNPCs();
        },

        /**
         * 해금 조건을 체크하고 새로운 NPC 해금
         */
        checkAndUnlockNPCs: () => {
          const { playHistory, unlockedNPCs } = get();
          const gender = usePlayerStore.getState().gender;
          const newUnlocks: string[] = [];
          
          if (gender === 'female') {
            // === 여성 플레이어 조건 체크 ===
            
            // kanghyuk 해금 조건: dojin을 플레이 완료
            if (!unlockedNPCs.includes(SPECIAL_MALE_NPC)) {
              const hasDojinPlayed = playHistory.some(
                record => record.npcId === 'dojin' && record.completed
              );
              
              if (hasDojinPlayed) {
                newUnlocks.push(SPECIAL_MALE_NPC);
                console.log('🎉 서강혁이 해금되었습니다!');
              }
            }
          } else if (gender === 'male') {
            // === 남성 플레이어 조건 체크 ===
            
            // gaeul 해금 조건: 아무 여성 NPC 1회 플레이
            if (!unlockedNPCs.includes(SPECIAL_FEMALE_NPC)) {
              const hasFemaleNPCPlayed = playHistory.some(
                record => BASE_FEMALE_NPCS.includes(record.npcId)
              );
              
              if (hasFemaleNPCPlayed) {
                newUnlocks.push(SPECIAL_FEMALE_NPC);
                console.log('🎉 한가을이 해금되었습니다!');
              }
            }
          }
          
          // 새로 해금된 NPC가 있으면 상태 업데이트
          if (newUnlocks.length > 0) {
            set({ 
              unlockedNPCs: [...unlockedNPCs, ...newUnlocks] 
            });
          }
        },

        /**
         * 캐릭터 상태 초기화
         */
        resetCharacters: () => {
          set({
            selectedNPC: null,
            playHistory: [],
            unlockedNPCs: [],
          });
        },

        /**
         * 개발용: 모든 NPC 즉시 해금
         */
        unlockAllNPCs: () => {
          if (process.env.NODE_ENV === 'development') {
            set({ 
              unlockedNPCs: [SPECIAL_MALE_NPC, SPECIAL_FEMALE_NPC] 
            });
            console.log('🔓 모든 NPC가 해금되었습니다 (개발 모드)');
          }
        },
      }),
      {
        name: 'character-storage',
      },
    ),
    {
      name: 'CharacterStore',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
);

// 개발자 도구용 헬퍼 (개발 환경에서만)
if (process.env.NODE_ENV === 'development') {
  // @ts-expect-error - window 객체에 커스텀 속성 추가
  window.characterStore = useCharacterStore;
  
  console.log(
    '%c[CharacterStore] Ready',
    'color: #9B59B6; font-weight: bold',
    '\n- 성별별 NPC 시스템 ✅',
    '\n- 해금 시스템 ✅',
    '\n- Console Access: window.characterStore',
    '\n- 모든 NPC 해금: window.characterStore.getState().unlockAllNPCs()',
  );
}