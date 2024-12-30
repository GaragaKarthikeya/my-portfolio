"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  // Load theme preference on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  // Toggle Theme
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

  // Toggle Menu
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Navigation Items: Exclude Current Page
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Blogs", path: "/blogs" },
  ].filter((item) => item.path !== pathname);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-50 w-full bg-white dark:bg-[#1F2937] shadow-md rounded-b-lg"
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
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-7 h-7 text-yellow-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a1 1 0 110 2 1 1 0 010-2zm0 18a1 1 0 110 2 1 1 0 010-2zm9-9a1 1 0 110 2 1 1 0 010-2zM3 12a1 1 0 110 2 1 1 0 010-2zm15.071-5.071a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM6.343 17.657a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM6.343 6.343a1 1 0 010 1.414L5.636 8.464a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17.657 17.657a1 1 0 010 1.414L16.95 19.778a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0z" />
              </motion.svg>
            ) : (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-7 h-7 text-gray-800 dark:text-gray-300"
                animate={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <path d="M20.354 15.354A9 9 0 1111.646 6.646a7 7 0 009.708 8.708z" />
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
              className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#374151] shadow-xl rounded-r-lg z-50"
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
                      className="block w-full px-6 py-4 text-lg font-medium text-gray-800 dark:text-[#D1D5DB] hover:bg-gray-100 dark:hover:bg-[#4B5563] rounded-lg transition-all"
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
