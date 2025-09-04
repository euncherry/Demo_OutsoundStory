import React from "react";
import { useThemeStore, usePlayerStore, useGameFlowStore } from "@/store";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@shared/styles/global.css";

// 개발 환경에서만 store를 window에 추가
if (import.meta.env.DEV) {
  (window as any).store = {
    theme: useThemeStore.getState(),
    player: usePlayerStore.getState(),
    gameFlow: useGameFlowStore.getState(),
  };

  // 캐릭터 디버그 유틸리티 추가
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
