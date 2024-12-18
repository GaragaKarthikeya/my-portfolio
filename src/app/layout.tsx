"use client"; // Force client-side rendering
import { useEffect, useState } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  // Set initial dark mode based on system or localStorage
  useEffect(() => {
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || (!savedTheme && isSystemDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <html lang="en">
      <body>
        {/* Navigation Bar */}
        <nav className="w-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 shadow-md">
          <div className="flex justify-between items-center px-8 py-4">
            {/* Logo */}
            <div className="text-xl font-bold">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                My Portfolio
              </Link>
            </div>

            {/* Navigation Links */}
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Projects
                </Link>
              </li>
            </ul>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all"
            >
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m8.485-8.485l-.707-.707M4.929 4.929l-.707-.707M21 12h-1M4 12H3m16.485 4.485l-.707.707M4.929 19.071l-.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm5.657 2.343a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM5.05 5.05a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414L5.05 6.464a1 1 0 010-1.414zM10 15a5 5 0 110-10 5 5 0 010 10zm7 3a1 1 0 110-2h1a1 1 0 110 2h-1zM3 17a1 1 0 100-2H2a1 1 0 100 2h1zm1.343-2.657a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 17a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-white">
          {children}
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
