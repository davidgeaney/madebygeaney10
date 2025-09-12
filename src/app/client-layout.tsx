'use client';

import { useState, useEffect } from 'react';
import Script from "next/script";
import IntroAnimationWrapper from "../components/ui/IntroAnimationWrapper";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";

// Client component for client-side functionality
function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  return (
    <>
      <IntroAnimationWrapper onComplete={() => setIsAnimationComplete(true)} />
      <div style={{ visibility: isAnimationComplete ? 'visible' : 'hidden' }}>
        {children}
      </div>
      <VisualEditsMessenger />
    </>
  );
}

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
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
      <ClientLayout>{children}</ClientLayout>
    </>
  );
}
