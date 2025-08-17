// src/features/dialogue/hooks/useDialogueFlow.ts
import { useState, useEffect } from "react";
import { useCharacterStore } from "@/store";

// 시나리오 import
import hojunScenario from "@/data/scenarios/hojun.json";
import jihoonScenario from "@/data/scenarios/jihoon.json";
import dojinScenario from "@/data/scenarios/dojin.json";
import yohanScenario from "@/data/scenarios/yohan.json";
import kanghyukScenario from "@/data/scenarios/kanghyuk.json";

interface Scene {
  id: string;
  type: "dialogue" | "monologue" | "narration" | "choice";
  speaker?: string;
  text: string;
  emotion?: string;
  background?: string;
  nextSceneId?: string | null;
  choices?: Choice[];
}

interface Choice {
  id: string;
  text: string;
  audioReference: string;
  nextSceneId: string | null;
  affinityChange?: number;
}

interface Scenario {
  npcId: string;
  npcName: string;
  scenes: Scene[];
}

export function useDialogueFlow() {
  const { selectedNPC } = useCharacterStore();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // 시나리오 로드
  useEffect(() => {
    if (!selectedNPC) return;

    const scenarioMap: Record<string, Scenario> = {
      hojun: hojunScenario as Scenario,
      jihoon: jihoonScenario as Scenario,
      dojin: dojinScenario as Scenario,
      yohan: yohanScenario as Scenario,
      kanghyuk: kanghyukScenario as Scenario,
    };

    const loadedScenario = scenarioMap[selectedNPC];
    if (loadedScenario) {
      setScenario(loadedScenario);
      setCurrentScene(loadedScenario.scenes[0]);
      setCurrentSceneIndex(0);
    }
  }, [selectedNPC]);

  // 다음 씬으로 이동
  const nextScene = () => {
    if (!scenario || !currentScene) return;

    // nextSceneId가 있으면 해당 씬으로 이동
    if (currentScene.nextSceneId) {
      const nextIndex = scenario.scenes.findIndex(
        (scene) => scene.id === currentScene.nextSceneId
      );

      if (nextIndex !== -1) {
        setCurrentSceneIndex(nextIndex);
        setCurrentScene(scenario.scenes[nextIndex]);
        return;
      }
    }

    // 순차적으로 다음 씬으로
    if (currentSceneIndex < scenario.scenes.length - 1) {
      const nextIndex = currentSceneIndex + 1;
      setCurrentSceneIndex(nextIndex);
      setCurrentScene(scenario.scenes[nextIndex]);
    } else {
      setIsComplete(true);
    }
  };

  // 선택지 선택
  const selectChoice = (choice: Choice) => {
    // 데모 버전: 선택 후 종료
    if (choice.nextSceneId === null) {
      setIsComplete(true);
    }
  };

  return {
    scenario,
    currentScene,
    currentSceneIndex,
    totalScenes: scenario?.scenes.length || 0,
    isComplete,
    nextScene,
    selectChoice,
  };
}
