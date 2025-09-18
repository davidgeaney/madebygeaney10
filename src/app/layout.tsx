import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientRootLayout from "./client-layout";

export const metadata: Metadata = {
  title: "David Geaney - Product Designer & Developer",
  description: "Portfolio of David Geaney, Product Designer and Developer",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="m-0 p-0">
      <body className="antialiased m-0 p-0">
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
