"use client";
import { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 shadow-md"
    >
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold hover:text-blue-500 dark:hover:text-blue-400">
          My Portfolio
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="flex items-center gap-4 lg:hidden">
          <DarkModeToggle /> {/* Keep Toggle Inline */}
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-gray-300 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links for Larger Screens */}
        <ul className="hidden lg:flex space-x-6">
          {["Home", "About", "Projects", "Blogs"].map((name, index) => (
            <motion.li
              key={index}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={`/${name.toLowerCase() === "home" ? "" : name.toLowerCase()}`}
                className="hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                {name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden flex flex-col items-center bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 space-y-4 py-4"
        >
          {["Home", "About", "Projects", "Blogs"].map((name, index) => (
            <li key={index}>
              <Link
                href={`/${name.toLowerCase() === "home" ? "" : name.toLowerCase()}`}
                className="block px-4 py-2 text-lg hover:text-blue-500 dark:hover:text-blue-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {name}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
}
