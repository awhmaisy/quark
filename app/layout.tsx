import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
// Only using VT323 font for the entire project
import "./globals.css";
import "./fonts.css";


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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        {/* Font preloading for optimal performance */}
        <link rel="preload" href="/fonts/VT323-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/ft-speaker/FTSpeaker-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
        {/* Only loading VT323 font */}
        {/* Critical CSS for font loading */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Force VT323 font for everything */
          body, html, pre, code, .terminal-section, .retro-profile,
          .terminal-title-container, .terminal-title-container-mobile,
          .maisy-title-container, .terminal-title-text, #maisy-typewriter,
          #typewriter-text, #system-part-mobile, #init-part-mobile,
          .system-part, .init-part, .system-line, .init-line {
            font-family: 'VT323', monospace !important;
          }
          
          /* Font visibility management moved to client-side */
          /* We'll use opacity for a smoother transition */
          .fonts-loading {
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .fonts-loaded {
            opacity: 1;
          }
        `}} />
        {/* Font loading script - client-side only, runs after hydration */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Use requestAnimationFrame to ensure this runs after hydration
          requestAnimationFrame(() => {
            // Ensure consistent class names between server and client
            if (!document.body.classList.contains('fonts-loaded')) {
              document.body.classList.add('fonts-loaded');
            }
            
            // Font loading detection for FT Speaker font
            const ftSpeakerFont = new FontFace('FT Speaker', 'url(/fonts/ft-speaker/FTSpeaker-Regular.woff2)');
            ftSpeakerFont.load().then(() => {
              document.fonts.add(ftSpeakerFont);
              // Apply the font to maisy-typewriter element
              const maisyElement = document.getElementById('maisy-typewriter');
              if (maisyElement) {
                maisyElement.style.fontFamily = "'FT Speaker', sans-serif";
              }
            }).catch(err => {
              console.error('Failed to load FT Speaker font:', err);
            });
          });
        `}} />
      </head>
      <body className="antialiased fonts-loaded">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
