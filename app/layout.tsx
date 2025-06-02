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
          // Wait for hydration to complete before manipulating classes
          document.addEventListener('DOMContentLoaded', function() {
            // Add loading class after DOM is ready (post-hydration)
            document.body.classList.add('fonts-loading');
            
            // Font loading detection
            if (document.fonts && document.fonts.ready) {
              document.fonts.ready.then(() => {
                document.body.classList.remove('fonts-loading');
                document.body.classList.add('fonts-loaded');
              });
            }
            
            // Fallback in case fonts take too long
            setTimeout(() => {
              document.body.classList.remove('fonts-loading');
              document.body.classList.add('fonts-loaded');
            }, 1000);
          });
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
