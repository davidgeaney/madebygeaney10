import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ppNeueMontreal } from './fonts';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: "Made by Geaney",
  description: "Portfolio and services by David Geaney",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ppNeueMontreal.variable} font-sans m-0 p-0`}>
      <head>
        <link
          rel="preload"
          href="/fonts/ppneuemontreal-book.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'PPNeueMontreal';
              src: url('/fonts/ppneuemontreal-book.otf') format('opentype');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            :root {
              --font-pp-neue-montreal: ${ppNeueMontreal.style.fontFamily};
            }
            body {
              font-family: ${ppNeueMontreal.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }
          `
        }} />
      </head>
      <body className="antialiased m-0 p-0">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
