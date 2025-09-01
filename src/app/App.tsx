import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { Router } from "./router";
import { useThemeStore } from "@store/themeStore";
import { globalTheme, femaleTheme, maleTheme } from "@shared/styles/theme.css";
import "./App.css";
import { Button3D } from "@/shared/components/3DButton";

function App() {
  const { currentTheme } = useThemeStore();

  // 전체화면 프롬프트 상태
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(true);

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen().catch((err) => {
      console.log("Fullscreen not supported:", err);
    });
    setShowFullscreenPrompt(false);
  };

  // 테마 클래스 선택
  const themeClass =
    currentTheme === "female"
      ? femaleTheme
      : currentTheme === "male"
      ? maleTheme
      : globalTheme;

  return (
    <div className={themeClass}>
      {showFullscreenPrompt && (
        <div className="fullscreen-prompt">
          <p>더 나은 경험을 위해 전체화면을 추천합니다</p>
          <Button3D variant="purple" size="medium" onClick={enterFullscreen}>
            전체화면으로 시작하기
          </Button3D>
        </div>
      )}

      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
