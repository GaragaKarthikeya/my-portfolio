"use client";
import { useState, useEffect } from "react";
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
} from "react-icons/fa";

export default function Navbar() {
  // --------------------
  // STATE & CONSTANTS
  // --------------------
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

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
      document.documentElement.classList.toggle("dark", !prev);
      localStorage.setItem("theme", !prev ? "dark" : "light");
      return !prev;
    });
  };

  // --------------------
  // MENU ITEMS
  // --------------------
  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome className="mr-2" /> },
    { name: "About", path: "/about", icon: <FaInfoCircle className="mr-2" /> },
    {
      name: "Projects",
      path: "/projects",
      icon: <FaProjectDiagram className="mr-2" />,
    },
    { name: "Blogs", path: "/blogs", icon: <FaBlog className="mr-2" /> },
  ];

  // --------------------
  // RENDER GUARD
  // --------------------
  if (!mounted) return null;

  // --------------------
  // COMPONENT RENDER
  // --------------------
  return (
    <>
      {/* MAIN NAVBAR */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 inset-x-0 z-50 bg-white dark:bg-gray-800 shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* LEFT SIDE - THEME TOGGLE (MOBILE) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="hover:scale-110 transition-transform"
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              {isDarkMode ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaSun className="text-yellow-400 w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaMoon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </motion.div>
              )}
            </button>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex space-x-4 items-center">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                        : "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              );
            })}

            {/* DESKTOP CONTACT BUTTON */}
            <li>
              <Link
                href="/contact"
                className="flex items-center px-4 py-2 rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90"
              >
                <span className="mr-2">📬</span>
                Contact Me
              </Link>
            </li>
          </ul>

          {/* RIGHT SIDE - HAMBURGER (MOBILE) */}
          <div className="md:hidden flex items-center justify-end flex-1">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative z-50"
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
              className="hover:scale-110 transition-transform"
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              {isDarkMode ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaSun className="text-yellow-400 w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaMoon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </motion.div>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* OVERLAY BEHIND MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black dark:bg-black z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 inset-x-0 mx-4 bg-white dark:bg-gray-700 shadow-xl rounded-md p-4 flex flex-col z-50"
          >
            <ul>
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <motion.li
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    className="mb-2"
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center px-4 py-2 rounded-md ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                          : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </motion.li>
                );
              })}
              {/* MOBILE CONTACT BUTTON */}
              <motion.li whileHover={{ scale: 1.02 }} className="mb-2">
                <Link
                  href="/contact"
                  className="flex items-center px-4 py-2 rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-2">📬</span>
                  Contact Me
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}