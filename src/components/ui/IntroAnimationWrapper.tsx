'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import styles from './IntroAnimation.module.css';

interface IntroAnimationWrapperProps {
  onComplete?: () => void;
}

const IntroAnimation = dynamic(
  () => import('./IntroAnimation'),
  { 
    ssr: false,
    loading: () => (
      <div className={styles.overlay}>
        <div className={styles.logoContainer}>
          <img
            src="/madebygeaneylogo.svg"
            alt="Loading..."
            className={styles.logo}
          />
        </div>
      </div>
    )
  }
);

export default function IntroAnimationWrapper({ onComplete }: IntroAnimationWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything on the server
  if (!isClient) {
    return (
      <div className={styles.overlay}>
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

  return <IntroAnimation onComplete={onComplete} />;
}
