// src/pages/MainStory/MainStory.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGameFlowStore,
  usePronunciationStore,
  useCharacterStore,
} from "@/store";
import { useDialogueFlow } from "@features/dialogue/hooks/useDialogueFlow";
import { DialogueBox } from "@features/dialogue/components/DialogueBox";
import { CharacterSprite } from "@features/dialogue/components/CharacterSprite";
import { ChoiceButtons } from "@features/dialogue/components/ChoiceButtons";
import { ExtendedScene, SceneCharacter, Choice } from "@/types/dialogue.types";
// import { PronunciationModal } from "@features/pronunciation/components/PronunciationModal";
import * as styles from "./MainStory.css.ts";

export function MainStory() {
  const navigate = useNavigate();
  const { updateProgress } = useGameFlowStore();
  const { setCurrentContext } = usePronunciationStore();
  const { selectedNPC } = useCharacterStore();

  const {
    scenario,
    currentScene,
    currentSceneIndex,
    totalScenes,
    isComplete,
    nextScene,
    selectChoice,
  } = useDialogueFlow();

  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showPronunciation, setShowPronunciation] = useState(false);

  // 대화 완료 처리
  useEffect(() => {
    if (isComplete && !showPronunciation) {
      updateProgress("hasCompletedDialogue", true);
      // 발음 분석이 없으면 바로 PlayerRoom으로
      if (!selectedChoice) {
        setTimeout(() => {
          navigate("/room");
        }, 1000);
      }
    }
  }, [isComplete, showPronunciation, selectedChoice, navigate, updateProgress]);

  // 선택지 선택 처리
  const handleChoiceSelect = (choice: Choice) => {
    setSelectedChoice(choice);

    // 발음 컨텍스트 설정
    setCurrentContext({
      npcId: selectedNPC!,
      choiceId: choice.id,
      text: choice.text,
    });

    // 발음 분석 모달 열기
    setShowPronunciation(true);

    // useDialogueFlow의 Choice 타입에 맞게 변환
    const dialogueChoice = {
      id: choice.id,
      text: choice.text,
      audioReference: choice.audioReference,
      nextSceneId: choice.nextDialogueId || null,
      affinityChange: choice.affinityChange,
    };

    // 선택 처리
    selectChoice(dialogueChoice);
  };

  // ✅ 현재 씬의 캐릭터들 렌더링
  const renderCharacters = () => {
    const sceneWithCharacters = currentScene as ExtendedScene;
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
    currentScene?.background || "/src/assets/backgrounds/default.png";

  if (!scenario || !currentScene) {
    return <div>Loading...</div>;
  }

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
      {!(currentScene as ExtendedScene).characters &&
        currentScene.type === "dialogue" &&
        currentScene.speaker !== "player" && (
          <CharacterSprite
            characterType="npc"
            npcId={
              currentScene.speaker === scenario.npcId
                ? scenario.npcId
                : currentScene.speaker!
            }
            emotion={currentScene.emotion}
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
              nextDialogueId: choice.nextSceneId || "", // nextSceneId를 nextDialogueId로 매핑
            }))}
            onSelect={handleChoiceSelect}
          />
        )}
      </AnimatePresence>

      {/* 발음 분석 모달 */}
      {/* TODO: 발음 분석 모달 추가 */}
      {/* {showPronunciation && selectedChoice && (
        <PronunciationModal
          text={selectedChoice.text}
          audioReference={selectedChoice.audioReference}
          onComplete={handlePronunciationComplete}
          onClose={() => setShowPronunciation(false)}
        />
      )} */}

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
