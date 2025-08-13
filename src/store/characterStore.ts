// src/store/characterStore.ts
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface CharacterState {
  availableNPCs: string[];
  selectedNPC: string | null;
  selectNPC: (npcId: string) => void;
  resetCharacters: () => void;
}

export const useCharacterStore = create<CharacterState>()(
  devtools(
    persist(
      (set) => ({
        availableNPCs: ['hojun', 'jihoon', 'dojin', 'yohan', 'kanghyuk'],
        selectedNPC: null,

        selectNPC: (npcId) => set({ selectedNPC: npcId }),

        resetCharacters: () =>
          set({
            selectedNPC: null,
          }),
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
