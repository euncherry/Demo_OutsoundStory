// src/pages/MainStory/MainStory.tsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGameFlowStore, useCharacterStore } from "@/store";
import { usePronunciationStore } from "@/store/pronunciationStore";
import { useDialogueFlow } from "@features/dialogue/hooks/useDialogueFlow";
import { useStoryProgress } from "@/features/story/hooks/useStoryProgress";
import { DialogueBox } from "@features/dialogue/components/DialogueBox";
import { CharacterSprite } from "@features/dialogue/components/CharacterSprite";
import { ChoiceButtons } from "@features/dialogue/components/ChoiceButtons";
import { Scene, SceneCharacter, Choice } from "@/types/dialogue.types";
import { PronunciationModal } from "@/features/pronunciation/components/PronunciationModal";
import * as styles from "./MainStory.css";

export function MainStory() {
  const navigate = useNavigate();
  const { updateProgress } = useGameFlowStore();
  const { setCurrentContext, setCurrentStage } = usePronunciationStore();
  const { selectedNPC } = useCharacterStore();
  const { onStoryStart, onStoryComplete } = useStoryProgress();

  const {
    scenario,
    currentScene,
    currentSceneIndex,
    totalScenes,
    isComplete,
    nextScene,
    selectChoice,
  } = useDialogueFlow();

  const [showPronunciation, setShowPronunciation] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const startedRef = useRef(false);

  // 스토리 시작 시 한 번만 호출 (StrictMode 대응)
  useEffect(() => {
    if (startedRef.current) return;
    if (!selectedNPC) return;
    onStoryStart();
    startedRef.current = true;
    console.log(`🚀 ${selectedNPC} 스토리 시작됨`);
  }, [selectedNPC, onStoryStart]);

  // 대화 완료 처리 - 발음 분석 완료 시에만 처리
  useEffect(() => {
    if (isComplete && !hasCompleted) {
      console.log("isComplete", isComplete);
      console.log("hasCompleted", hasCompleted);
      // 스토리 완료 시 한 번만 호출
      onStoryComplete();
      setHasCompleted(true);
      console.log(`🏁 ${selectedNPC} 스토리 완료됨`);

      updateProgress("hasCompletedDialogue", true);
      // PlayerRoom으로 이동
      setTimeout(() => {
        navigate("/room");
      }, 1000);
    }
  }, [
    isComplete,
    navigate,
    updateProgress,
    onStoryComplete,
    hasCompleted,
    selectedNPC,
  ]);

  // 선택지 선택 처리
  const handleChoiceSelect = (choice: Choice) => {
    console.log("선택지 선택 ", choice);
    // 발음 컨텍스트 설정
    setCurrentContext({
      npcId: selectedNPC!,
      choiceId: choice.id,
      text: choice.text,
      audioReference: choice.audioReference,
    });

    setCurrentStage("prepare");
    // 발음 분석 모달 열기
    setShowPronunciation(true);

    // useDialogueFlow의 Choice 타입에 맞게 변환
    const dialogueChoice = {
      id: choice.id,
      text: choice.text,
      audioReference: choice.audioReference,
      affinityChange: choice.affinityChange,
      nextSceneId: choice.nextSceneId,
    };

    // 선택 처리
    selectChoice(dialogueChoice);
  };

  // ✅ 현재 씬의 캐릭터들 렌더링
  const renderCharacters = () => {
    // 타입 가드를 사용하여 안전하게 캐스팅
    if (!currentScene || typeof currentScene !== "object") {
      return null;
    }

    const sceneWithCharacters = (currentScene as unknown) as Scene;
    if (!sceneWithCharacters?.characters) {
      return null;
    }

    return sceneWithCharacters.characters.map(
      (character: SceneCharacter, index: number) => (
        <CharacterSprite
          key={`${character.characterType}-${
            character.npcId || "player"
          }-${index}`}
          characterType={character.characterType}
          npcId={character.npcId}
          emotion={character.emotion}
          position={character.position}
          isSpeaking={
            (character.characterType === "player" &&
              sceneWithCharacters.speaker === "player") ||
            (character.characterType === "npc" &&
              sceneWithCharacters.speaker === character.npcId)
          }
        />
      )
    );
  };

  // 배경 이미지 결정
  const backgroundImage =
    currentScene?.background || "/assets/backgrounds/default.png";

  if (!scenario || !currentScene) {
    return <div>Loading...</div>;
  }

  // 발음 분석 완료
  const handlePronunciationComplete = (result: {
    totalScore: number;
    affinityChange: number;
  }) => {
    // 점수와 호감도 처리
    console.log(
      "발음 점수:",
      result.totalScore,
      "호감도 변화:",
      result.affinityChange
    );

    // 게임 진행 상태 업데이트
    updateProgress("hasAnalyzedPronunciation", true);

    // 모달 닫고 PlayerRoom으로
    setShowPronunciation(false);
    setTimeout(() => {
      navigate("/room");
    }, 1000);
  };

  return (
    <div className={styles.container}>
      {/* 배경 이미지 */}
      <motion.div
        className={styles.background}
        key={backgroundImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* 상단 진행 바 */}
      <div className={styles.progressBar}>
        <motion.div
          className={styles.progressFill}
          initial={{ width: 0 }}
          animate={{
            width: `${((currentSceneIndex + 1) / totalScenes) * 100}%`,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* ✅ 새로운 캐릭터 렌더링 시스템 */}
      {renderCharacters()}

      {/* ✅ 기존 방식도 호환성을 위해 유지 (characters 배열이 없는 경우) */}
      {!((currentScene as unknown) as Scene).characters &&
        currentScene.type === "dialogue" &&
        currentScene.speaker !== "player" && (
          <CharacterSprite
            characterType="npc"
            npcId={
              currentScene.speaker === scenario.npcId
                ? scenario.npcId
                : currentScene.speaker!
            }
            isSpeaking={true}
          />
        )}

      {/* 대화 표시 */}
      <AnimatePresence mode="wait">
        {currentScene.type !== "choice" ? (
          <DialogueBox
            key={currentScene.id}
            type={currentScene.type as "dialogue" | "monologue" | "narration"}
            speaker={currentScene.speaker}
            text={currentScene.text}
            onNext={nextScene}
          />
        ) : (
          // 선택지 표시
          <ChoiceButtons
            key={currentScene.id}
            choices={(currentScene.choices || []).map((choice) => ({
              ...choice,
              koreanText: choice.text, // text를 koreanText로 매핑
            }))}
            onSelect={handleChoiceSelect}
          />
        )}
      </AnimatePresence>

      {/* 발음 분석 모달 */}
      <PronunciationModal
        isOpen={showPronunciation}
        onComplete={handlePronunciationComplete}
        onClose={() => setShowPronunciation(false)}
      />

      {/* 뒤로가기 버튼 */}
      <button
        className={styles.backButton}
        onClick={() => navigate("/select-npc")}
      >
        ← 뒤로
      </button>
    </div>
  );
}
