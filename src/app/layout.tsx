"use client";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
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

        {/* Footer Section */}
        <footer className="bg-gray-800 text-white text-center py-6 mt-8">
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/GaragaKarthikeya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/karthikeya-garaga/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              LinkedIn
            </a>
            <a
              href="mailto:Garaga.Karthikeya@iiitb.ac.in"
              className="hover:text-blue-400 transition"
            >
              Email Me
            </a>
          </div>
          <p className="mt-4">&copy; 2024 My Portfolio. All rights reserved.</p>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}
