import { Routes, Route, Navigate } from 'react-router-dom';
import { Splash } from '@pages/Splash/Splash.tsx';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
