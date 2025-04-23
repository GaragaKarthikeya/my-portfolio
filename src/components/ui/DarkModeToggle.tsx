"use client";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
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
  );
}
