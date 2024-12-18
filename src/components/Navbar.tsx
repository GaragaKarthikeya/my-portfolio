"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  // Toggle Theme Function
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode((prev) => !prev);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Blogs", path: "/blogs" },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-50 w-full bg-white dark:bg-gray-900 shadow-md rounded-b-lg"
      >
        <div className="flex justify-between items-center px-6 py-4">
          {/* Hamburger Icon */}
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-gray-300 hover:scale-105 transition-transform"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-8 h-8"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" />
              )}
            </svg>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hover:scale-110 transition-transform"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              // Sun Icon for Light Mode
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 text-yellow-400"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 0.5 }}
              >
                <path d="M12 2a1 1 0 110 2 1 1 0 010-2zM12 20a1 1 0 110 2 1 1 0 010-2zM4.22 4.22a1 1 0 011.42 0l.71.71a1 1 0 11-1.42 1.42l-.71-.71a1 1 0 010-1.42zM18.36 18.36a1 1 0 011.42 0l.71.71a1 1 0 11-1.42 1.42l-.71-.71a1 1 0 010-1.42zM2 12a1 1 0 110-2 1 1 0 010 2zM22 12a1 1 0 110-2 1 1 0 010 2zM4.22 19.78a1 1 0 010-1.42l.71-.71a1 1 0 111.42 1.42l-.71.71a1 1 0 01-1.42 0zM18.36 5.64a1 1 0 010 1.42l-.71.71a1 1 0 11-1.42-1.42l.71-.71a1 1 0 011.42 0zM12 6a6 6 0 100 12 6 6 0 000-12z" />
              </motion.svg>
            ) : (
              // Moon Icon for Dark Mode
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 text-gray-800 dark:text-gray-300"
                animate={{ rotate: [0, 180] }}
                transition={{ duration: 0.5 }}
              >
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm6.364.636a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM20 10a1 1 0 110 2h-1a1 1 0 110-2h1zm-8 9a7 7 0 110-14 7 7 0 010 14z" />
              </motion.svg>
            )}
          </button>
        </div>
      </motion.nav>

      {/* Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-3/4 sm:w-1/3 bg-white dark:bg-gray-900 shadow-xl rounded-r-lg z-50"
            >
              <ul className="flex flex-col mt-8">
                {menuItems.map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    className="w-full mb-4"
                  >
                    <Link
                      href={item.path}
                      className="block w-full px-6 py-4 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
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
              className="fixed top-0 left-0 w-full h-full bg-black z-40"
              onClick={toggleMenu}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
