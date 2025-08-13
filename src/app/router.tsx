// src/app/router.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Splash } from '@pages/Splash/Splash';
import { PlayerSetup } from '@pages/PlayerSetup/PlayerSetup';
import { PlayerRoom } from '@pages/PlayerRoom/PlayerRoom';
import { NPCSelection } from '@pages/NPCSelection/NPCSelection';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/player-setup" element={<PlayerSetup />} />
      <Route path="/room" element={<PlayerRoom />} />
      <Route path="/select-npc" element={<NPCSelection />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
