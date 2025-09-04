// src/features/story/hooks/useStoryProgress.ts
import { useCharacterStore } from "@/store";

/**
 * 스토리 진행 관리 훅
 * NPC 플레이 기록과 해금을 처리합니다
 */
export function useStoryProgress() {
  const { selectedNPC, recordPlay } = useCharacterStore();

  /**
   * 스토리 시작 시 호출
   */
  const onStoryStart = () => {
    if (selectedNPC) {
      console.log(`📖 ${selectedNPC} 스토리 시작`);
      // 항상 기록 시도 -> store에서 중복이면 시간만 갱신
      recordPlay(selectedNPC, false);
    }
  };

  /**
   * 스토리 완료 시 호출
   */
  const onStoryComplete = () => {
    if (selectedNPC) {
      console.log(`✅ ${selectedNPC} 스토리 완료`);
      // 항상 기록 시도 -> store에서 중복이면 시간만 갱신
      recordPlay(selectedNPC, true);
    }
  };

  /**
   * 특정 챕터나 엔딩 도달 시 호출
   */
  const onReachMilestone = (milestone: string) => {
    console.log(`🎯 도달: ${milestone}`);

    // 특별한 마일스톤에 따른 처리
    if (milestone === "dojin_true_ending" && selectedNPC === "dojin") {
      // 도진 트루 엔딩 도달 시 강혁 해금
      recordPlay("dojin", true);
      console.log("🎉 도진 트루 엔딩으로 강혁 해금 조건 달성!");
    }

    // 가을 해금 조건 체크 (여성 NPC 플레이 완료)
    if (milestone === "female_npc_complete" && selectedNPC) {
      // 여성 NPC 플레이 완료 시 가을 해금
      recordPlay(selectedNPC, true);
      console.log("🎉 여성 NPC 플레이 완료로 가을 해금 조건 달성!");
    }
  };

  return {
    onStoryStart,
    onStoryComplete,
    onReachMilestone,
  };
}
