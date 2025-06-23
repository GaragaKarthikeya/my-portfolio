"use client";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "@/styles/globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="color-scheme" content="light dark" />
        {/* High DPI and Retina Display Support */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900 m-0 p-0 antialiased`}>
        {/* Navbar: Make sure Navbar component uses 
            bg-white dark:bg-gray-900 shadow-md rounded-b-lg */}
        <Navbar />

        {/* Main Content: Increase spacing and remove conflicting backgrounds */}
        <main className="mt-10 px-4 py-10 max-w-screen-2xl mx-auto">
          {/* Keep this area background transparent or minimal 
              so navbar stands out */}
          {children}
        </main>

        <Footer />  
        <Analytics />
      </body>
    </html>
  );
}
