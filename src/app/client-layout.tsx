'use client';

import { useState, useEffect } from 'react';
import Script from "next/script";
import IntroAnimation from "../components/ui/IntroAnimation";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render anything on the server
  }

  return (
    <>
      <Script
        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
        strategy="afterInteractive"
        data-target-origin="*"
        data-message-type="ROUTE_CHANGE"
        data-include-search-params="true"
        data-only-in-iframe="true"
        data-debug="true"
        data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
      />
      <IntroAnimation onComplete={() => setIsAnimationComplete(true)} />
      <div style={{ 
        opacity: isAnimationComplete ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        visibility: isAnimationComplete ? 'visible' : 'hidden',
        position: isAnimationComplete ? 'relative' : 'fixed',
        width: '100%',
        height: isAnimationComplete ? 'auto' : '100vh',
        overflowX: 'hidden',
        overflowY: isAnimationComplete ? 'visible' : 'hidden'
      }}>
        {children}
      </div>
      <VisualEditsMessenger />
    </>
  );
}
