"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaInfoCircle,
  FaProjectDiagram,
  FaBlog,
  FaSun,
  FaMoon,
  FaTimes,
  FaEnvelope,
} from "react-icons/fa";
import useSound from "use-sound";

export default function Navbar() {
  // --------------------
  // STATE & CONSTANTS
  // --------------------
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.25 });
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --------------------
  // THEME MANAGEMENT
  // --------------------
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ? savedTheme === "dark" : systemDark;

    setIsDarkMode(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  // --------------------
  // MENU ITEMS
  // --------------------
  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome className="mr-2" /> },
    { name: "About", path: "/about", icon: <FaInfoCircle className="mr-2" /> },
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram className="mr-2" /> },
    { name: "Blogs", path: "/blogs", icon: <FaBlog className="mr-2" /> },
    { name: "Contact", path: "/contact", icon: <FaEnvelope className="mr-2" /> },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* MAIN NAVBAR */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 inset-x-0 z-50 bg-gray-100 dark:bg-gray-900 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-800/30 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* MOBILE THEME TOGGLE */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full backdrop-blur-sm bg-gray-200/30 dark:bg-gray-800/30 border border-gray-300/20 dark:border-gray-700/30 hover:scale-110 transition-transform"
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              {isDarkMode ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <FaSun className="text-yellow-400 w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div animate={{ rotate: 180 }} transition={{ duration: 0.5 }}>
                  <FaMoon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </motion.div>
              )}
            </button>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex space-x-4 items-center">
            {menuItems.map((item) => (
              <motion.li 
                key={item.name}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => {
                  hoverTimeout.current = setTimeout(() => playHover(), 200);
                }}
                onHoverEnd={() => {
                  if (hoverTimeout.current) {
                    clearTimeout(hoverTimeout.current);
                    hoverTimeout.current = null;
                  }
                }}
              >
                <Link
                  href={item.path}
                  className={`px-4 py-2 rounded-md flex items-center transition-all ${
                    pathname === item.path
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                      : "text-gray-800 dark:text-gray-300 hover:bg-gray-200/30 dark:hover:bg-gray-700/30 backdrop-blur-sm border border-gray-300/20 dark:border-gray-600/20"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-4">
            {/* MOBILE MENU TOGGLE */}
            <div className="md:hidden flex items-center justify-end flex-1">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-200/30 dark:hover:bg-gray-700/30 backdrop-blur-sm border border-gray-300/20 dark:border-gray-600/20 relative z-50"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                ) : (
                  <div className="space-y-1">
                    <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-300 rounded-full"></span>
                    <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-300 rounded-full"></span>
                    <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-300 rounded-full"></span>
                  </div>
                )}
              </button>
            </div>

            {/* DESKTOP THEME TOGGLE */}
            <div className="hidden md:flex items-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full backdrop-blur-sm bg-gray-200/30 dark:bg-gray-800/30 border border-gray-300/20 dark:border-gray-700/30 hover:scale-110 transition-transform"
                aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              >
                {isDarkMode ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                    <FaSun className="text-yellow-400 w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div animate={{ rotate: 180 }} transition={{ duration: 0.5 }}>
                    <FaMoon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                  </motion.div>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-16 inset-x-0 mx-4 bg-gray-100/90 dark:bg-gray-900/90 shadow-xl rounded-md p-4 flex flex-col z-50 backdrop-blur-xl border border-gray-200/20 dark:border-gray-800/30"
            >
              <ul>
                {menuItems.map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    className="mb-2"
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center px-4 py-2 rounded-md ${
                        pathname === item.path
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                          : "text-gray-800 dark:text-gray-300 hover:bg-gray-200/30 dark:hover:bg-gray-700/30"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}