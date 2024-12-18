"use client";
import { Analytics } from "@vercel/analytics/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 m-0 p-0">
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
