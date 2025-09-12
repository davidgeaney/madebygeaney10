'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './IntroAnimation.module.css';

interface IntroAnimationProps {
  onComplete?: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted on client
    setMounted(true);
    
    // Start fade out after 1.5 seconds
    const fadeOutTimer = setTimeout(() => {
      setShow(false);
    }, 1500);

    // Call onComplete after animation finishes (2 seconds total)
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 2000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`${styles.overlay} ${!show ? styles.hidden : ''}`}>
      <div className={styles.logoContainer}>
        <Image
          src="/madebygeaneylogo.svg"
          alt="Made by Geaney"
          className={styles.logo}
          width={300}
          height={60}
          priority
        />
      </div>
    </div>
  );
};

export default IntroAnimation;
