// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import styles from './layout.module.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', // Add this to use it as a CSS variable
});

export const metadata: Metadata = {
  title: 'InsureVis Admin Portal',
  description: 'CNN-based Car Damage Assessment & Insurance Claims Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/eliyantosarage/font-awesome-pro@main/fontawesome-pro-6.5.2-web/css/all.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.5.2/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.5.2/css/sharp-thin.css"
        />
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.5.2/css/sharp-solid.css"
        />
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.5.2/css/sharp-regular.css"
        />
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.5.2/css/sharp-light.css"
        />
      </head>
      <body className={`${inter.className} ${styles.body}`}>{children}</body>
    </html>
  );
}