"use client"; // Force client-side rendering
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-white">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
