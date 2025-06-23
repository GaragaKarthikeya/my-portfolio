"use client";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "@/styles/globals.css";
import { Inter } from 'next/font/google';
import { useEffect } from 'react';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize cursor position to center of screen
    document.documentElement.style.setProperty('--cursor-x', `${window.innerWidth / 2}px`);
    document.documentElement.style.setProperty('--cursor-y', `${window.innerHeight / 2}px`);
    document.documentElement.style.setProperty('--cursor-scale', '1');

    // Custom cursor functionality - Global
    const updateCursor = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    const handleMouseDown = () => {
      document.documentElement.style.setProperty('--cursor-scale', '0.8');
    };

    const handleMouseUp = () => {
      document.documentElement.style.setProperty('--cursor-scale', '1');
    };

    const handleMouseLeave = () => {
      // Hide cursor when mouse leaves window
      document.documentElement.style.setProperty('--cursor-scale', '0');
    };

    const handleMouseEnter = () => {
      // Show cursor when mouse enters window
      document.documentElement.style.setProperty('--cursor-scale', '1');
    };

    // Only add cursor functionality on desktop devices
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    if (isDesktop) {
      document.addEventListener('mousemove', updateCursor);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
    }

    // Cleanup
    return () => {
      if (isDesktop) {
        document.removeEventListener('mousemove', updateCursor);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />
        <meta name="theme-color" content="#f97316" />
        <meta name="color-scheme" content="light dark" />
        {/* High DPI and Retina Display Support */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-orange-50 dark:bg-stone-900 m-0 p-0 antialiased`} suppressHydrationWarning>
        <Navbar />
        <main className="mt-10 px-4 py-10 max-w-screen-2xl mx-auto">
          {children}
        </main>
        <Footer />  
        <Analytics />
      </body>
    </html>
  );
}
