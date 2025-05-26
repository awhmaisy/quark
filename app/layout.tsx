import type { Metadata } from "next";
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
