"use client";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import Footer from "./components/footer";// Import the Footer component
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("Vercel Analytics Loaded");
  }, []);

  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-900 text-white px-8 py-4 shadow-md">
          <ul className="flex space-x-8 items-center">
            <li>
              <Link href="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-blue-400 transition">
                Projects
              </Link>
            </li>
          </ul>
        </nav>
        <main className="p-6">{children}</main>

        {/* Use the Footer Component */}
        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
