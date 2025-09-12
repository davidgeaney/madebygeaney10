'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

interface IntroAnimationWrapperProps {
  onComplete?: () => void;
  show?: boolean;
}

const IntroAnimation = dynamic(
  () => import('./IntroAnimation'),
  { ssr: false }
);

export default function IntroAnimationWrapper({ onComplete, show = true }: IntroAnimationWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsVisible(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <IntroAnimation onComplete={onComplete} />;
}
