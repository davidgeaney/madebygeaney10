'use client';

import { useEffect, useState } from 'react';
import styles from './IntroAnimation.module.css';

interface IntroAnimationProps {
  onComplete?: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const animationDuration = 3000; // 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, animationDuration);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isMounted) {
    return (
      <div className={`${styles.overlay} ${styles.initial}`}>
        <div className={styles.logoContainer}>
          <img
            src="/madebygeaneylogo.svg"
            alt="Loading..."
            className={styles.logo}
          />
        </div>
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div className={`${styles.overlay} ${styles.animate}`}>
      <div className={styles.logoContainer}>
        <img
          src="/madebygeaneylogo.svg"
          alt="Made by Geaney Logo"
          className={styles.logo}
        />
      </div>
    </div>
  );
};

export default IntroAnimation;
