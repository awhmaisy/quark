import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";


export const metadata: Metadata = {
  title: "C:\MAISYVERSE\V3",
  description: "@awhmaisy's personal site",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="js-loading">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        {/* Font preloading for optimal performance */}
        <link rel="preload" href="/fonts/VT323-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/ft-speaker/FTSpeaker-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
        {/* Critical CSS for font loading */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Font definitions */
          @font-face {
            font-family: 'VT323';
            src: url('/fonts/VT323-Regular.ttf') format('truetype');
            font-weight: 400;
            font-style: normal;
            font-display: block;
          }
          
          @font-face {
            font-family: 'FT Speaker';
            src: url('/fonts/ft-speaker/FTSpeaker-Regular.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          
          /* Force fonts */
          body, html, pre, code, .terminal-section, .retro-profile {
            font-family: 'VT323', monospace !important;
          }
          
          .terminal-title-container, .maisy-title-container, .terminal-title-text {
            font-family: 'FT Speaker', Arial, sans-serif !important;
          }
          
          /* Hide content until fonts are loaded */
          .js-loading {
            visibility: hidden;
          }
        `}} />
        {/* Font loading script */}
        <script dangerouslySetInnerHTML={{ __html: `
          document.documentElement.classList.add('js-loading');
          
          // Add font loading detection
          document.fonts.ready.then(() => {
            document.documentElement.classList.remove('js-loading');
          });
          
          // Fallback in case fonts take too long
          setTimeout(() => {
            document.documentElement.classList.remove('js-loading');
          }, 1000);
        `}} />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
