import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';
import { useThemeStore } from '@store/themeStore';
import { globalTheme, femaleTheme, maleTheme } from '@shared/styles/theme.css';

function App() {
  const { currentTheme } = useThemeStore();

  // 테마 클래스 선택
  const themeClass =
    currentTheme === 'female'
      ? femaleTheme
      : currentTheme === 'male'
      ? maleTheme
      : globalTheme;

  return (
    <div className={themeClass}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
