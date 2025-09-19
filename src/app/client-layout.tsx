'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    // This will run on client-side only
    if (typeof window !== 'undefined') {
      // Force a reflow to ensure fonts are loaded before the page is interactive
      document.body.style.opacity = '1';
    }
  }, []);

  return <>{children}</>;
}
