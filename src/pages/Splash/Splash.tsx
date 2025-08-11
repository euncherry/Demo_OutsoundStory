import { useNavigate } from 'react-router-dom';
import * as styles from './Splash.css.ts';
import { Button } from '../../shared/components/Button/index.ts';

export function Splash() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.heart1} />
      <div className={styles.heart2} />
      <div className={styles.heart3} />
      <div className={styles.heart4} />
      <div className={styles.heart5} />
      <div className={styles.buttonSection}>
        <div className={styles.buttonContainer}>
          <Button variant="game-main" size="large" onClick={() => navigate('/setup')}>
            새 게임
          </Button>
          <Button
            variant="game-sub"
            size="large"
            onClick={() => navigate('/continue')}
            // disabled
          >
            이어하기
          </Button>
        </div>
      </div>
      <div className={styles.leftSection} />
      <div className={styles.rightSection} />

      {/* <h1 className={styles.title}>발음교정 연애 시뮬레이션</h1>
      <p className={styles.subtitle}>Demo Version</p> */}
    </div>
  );
}
