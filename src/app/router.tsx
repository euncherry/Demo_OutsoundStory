// src/app/router.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Splash } from "@pages/Splash/Splash";
import { PlayerSetup } from "@pages/PlayerSetup/PlayerSetup";
import { PlayerRoom } from "@pages/PlayerRoom/PlayerRoom";
import { NPCSelection } from "@pages/NPCSelection/NPCSelection";
import { MainStory } from "@pages/MainStory/MainStory";
import { PronunciationResults } from "@pages/PronunciationResults/PronunciationResults"; // 새 라우트 추가
import AboutPage from "@/pages/test/AboutPage";

export function Router() {
  return (
    <Routes>
      <Route path="/test" element={<AboutPage />} />
      <Route path="/" element={<Splash />} />
      <Route path="/player-setup" element={<PlayerSetup />} />
      <Route path="/room" element={<PlayerRoom />} />
      <Route path="/select-npc" element={<NPCSelection />} />
      <Route path="/story" element={<MainStory />} />
      <Route
        path="/pronunciation-results"
        element={<PronunciationResults />}
      />{" "}
      {/* 새 라우트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
