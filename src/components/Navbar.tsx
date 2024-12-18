"use client";

import { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const pathname = usePathname();

  // Define pages and their corresponding routes
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Blogs", path: "/blogs" },
  ];

  // Filter out the current page
  const filteredItems = menuItems.filter((item) => item.path !== pathname);

  // Gradient backgrounds for menu items
  const itemColors = [
    "bg-gradient-to-r from-blue-500 to-blue-600",
    "bg-gradient-to-r from-green-500 to-green-600",
    "bg-gradient-to-r from-yellow-500 to-yellow-600",
    "bg-gradient-to-r from-purple-500 to-purple-600",
  ];

  return (
    <>
      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-50 w-full bg-gradient-to-r from-gray-200/80 to-gray-300/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-sm text-gray-800 dark:text-gray-300 shadow-lg"
      >
        <div className="flex justify-between items-center px-6 py-4">
          {/* Hamburger Icon (Left) */}
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-gray-300 focus:outline-none hover:scale-105 transition-transform"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>

          {/* Dark Mode Toggle (Right) */}
          <DarkModeToggle />
        </div>
      </motion.nav>

      {/* Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Side Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 left-0 h-full w-3/4 sm:w-1/3 md:w-1/4 bg-gray-100 dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
            >
              {/* Close Button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={toggleMenu}
                  className="text-gray-800 dark:text-gray-300 hover:scale-110 transition-transform"
                  aria-label="Close Menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Menu Links */}
              <ul className="flex flex-col items-stretch mt-8 px-4">
                {filteredItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    className={`w-full mb-4 rounded-lg text-white font-semibold shadow-md overflow-hidden ${itemColors[index % itemColors.length]}`}
                  >
                    <Link
                      href={item.path}
                      className="block w-full px-6 py-4 text-lg text-center hover:bg-opacity-90 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-full bg-black z-40"
              onClick={toggleMenu}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
