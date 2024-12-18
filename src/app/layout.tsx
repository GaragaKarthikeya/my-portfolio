"use client"; // Force client-side rendering
import { Analytics } from "@vercel/analytics/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-200 dark:bg-gray-800 m-0 p-0">
        {/* Navbar */}
        <Navbar />

        {/* Main Content: Added Margin Top */}
        <main
          className="mt-6 p-4 sm:p-6 bg-white dark:bg-gray-900 dark:text-white rounded-t-lg rounded-b-3xl 
                     shadow-2xl mx-2 md:mx-auto max-w-screen-2xl transition-all duration-300"
        >
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
