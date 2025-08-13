import { useNavigate } from 'react-router-dom';
import * as styles from './Splash.css.ts';
import { Button } from '../../shared/components/Button';
import { useThemeStore } from '@store/themeStore';

export function Splash() {
  const navigate = useNavigate();
  const { currentTheme, setTheme } = useThemeStore();

  return (
    <div className={styles.container}>
      <div className={styles.heart1} />
      <div className={styles.heart2} />
      <div className={styles.heart3} />
      <div className={styles.heart4} />
      <div className={styles.heart5} />
      <div className={styles.buttonSection}>
        <div className={styles.buttonContainer}>
          <Button variant="main" size="large" onClick={() => navigate('/player-setup')}>
            처음부터
          </Button>
          <Button
            variant="sub"
            size="large"
            onClick={() => navigate('/continue')}
            // disabled
          >
            이어하기
          </Button>
          <button className={styles.button} onClick={() => setTheme('global')}>
            Global
          </button>
          <button className={styles.button} onClick={() => setTheme('female')}>
            Female
          </button>
          <button className={styles.button} onClick={() => setTheme('male')}>
            Male
          </button>
          <p>Current: {currentTheme}</p>
        </div>
      </div>
      <div className={styles.leftSection} />
      <div className={styles.rightSection} />
    </div>
  );
}
