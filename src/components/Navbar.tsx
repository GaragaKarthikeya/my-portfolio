"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Mark from "mark.js";

import {
  FaHome,
  FaInfoCircle,
  FaProjectDiagram,
  FaBlog,
  FaSun,
  FaMoon,
  FaChevronUp,
} from "react-icons/fa";

export default function Navbar() {
  // --------------------
  // STATE & CONSTANTS
  // --------------------
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("en");
  const pathname = usePathname();

  // --------------------
  // LOAD & SAVE THEME
  // --------------------
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

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

  // --------------------
  // MARK.JS EFFECT FOR FULL-PAGE SEARCH
  // --------------------
  useEffect(() => {
    const context = document.querySelector("main");
    if (!context) return;
    const markInstance = new Mark(context);
    if (searchQuery) {
      markInstance.unmark({
        done: () => {
          markInstance.mark(searchQuery);
        },
      });
    } else {
      markInstance.unmark();
    }
  }, [searchQuery]);

  // --------------------
  // MENU ITEMS
  // --------------------
  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome className="mr-2" /> },
    { name: "About", path: "/about", icon: <FaInfoCircle className="mr-2" /> },
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram className="mr-2" /> },
    { name: "Blogs", path: "/blogs", icon: <FaBlog className="mr-2" /> },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --------------------
  // HANDLERS
  // --------------------
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // --------------------
  // MOUNTING EFFECT
  // --------------------
  useEffect(() => {
    setMounted(true);
  }, []);

  // --------------------
  // CONDITIONAL RENDERING AFTER MOUNT
  // --------------------
  if (!mounted) return null;

  // --------------------
  // NAVBAR RENDER
  // --------------------
  return (
    <>
      {/* MAIN NAVBAR */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1F2937]
                   shadow-md rounded-b-lg border-b-2 border-transparent dark:border-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* DESKTOP MENU */}
          <ul className="hidden md:flex space-x-4 items-center">
            {filteredMenuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    aria-label={`Go to ${item.name}`}
                    className={`relative px-4 py-2 flex items-center transition-colors
                      duration-300 rounded-md ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold"
                          : "hover:bg-gray-100 dark:hover:bg-[#374151] text-gray-800 dark:text-gray-300"
                      }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              );
            })}

            {/* Desktop Search Bar */}
            <div className="relative flex items-center bg-gray-100
                            dark:bg-[#2D3748] rounded-full overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-32 px-2 py-1 text-sm text-gray-800
                           dark:text-gray-300 bg-transparent
                           focus:outline-none focus:ring
                           focus:ring-blue-400 rounded-full"
              />
            </div>

            {/* LANGUAGE SELECTOR */}
            <select
              aria-label="Language Selector"
              value={language}
              onChange={handleLanguageChange}
              className="px-2 py-1 text-sm rounded-md bg-gray-100 dark:bg-[#2D3748]
                         text-gray-800 dark:text-gray-300 focus:outline-none
                         focus:ring-1 focus:ring-blue-500"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
            </select>

            {/* CTA BUTTON */}
            <li>
              <Link
                href="/contact"
                aria-label="Contact Me"
                className="ml-2 px-3 py-2 text-sm font-semibold text-white
                           bg-gradient-to-r from-blue-500 to-indigo-500
                           rounded-md hover:opacity-90
                           focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Contact Me
              </Link>
            </li>
          </ul>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="ml-4 hover:scale-110 transition-transform
                       focus:outline-none text-gray-800 dark:text-gray-300"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <FaSun className="text-yellow-400 w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <FaMoon className="w-6 h-6" />
              </motion.div>
            )}
          </button>
        </div>
      </motion.nav>

      {/* SUBTLE HAMBURGER BUTTON (MOBILE) */}
      <motion.button
        onClick={toggleMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 flex items-center justify-center
                   w-12 h-12 rounded-full bg-gradient-to-br from-gray-500 to-gray-800
                   text-white shadow-lg hover:shadow-xl transition-all
                   md:hidden z-50"
        aria-label="Toggle Menu"
      >
        {!isMenuOpen ? (
          <div className="space-y-1">
            <span className="block w-5 h-0.5 bg-white rounded-full"></span>
            <span className="block w-5 h-0.5 bg-white rounded-full"></span>
            <span className="block w-5 h-0.5 bg-white rounded-full"></span>
          </div>
        ) : (
          <FaChevronUp className="w-5 h-5" />
        )}
      </motion.button>

      {/* SMALL POP-UP MENU (MOBILE) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-20 right-5 w-64 bg-white dark:bg-[#374151]
                       shadow-xl rounded-md z-40 p-4 flex flex-col"
          >
            {/* Mobile Search inside pop-up */}
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full px-2 py-1 text-sm text-gray-800
                           dark:text-gray-300 bg-gray-100
                           dark:bg-[#2D3748] rounded-full focus:outline-none
                           focus:ring focus:ring-blue-400"
              />
            </div>
            {/* Nav items */}
            <ul>
              {filteredMenuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <motion.li
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    className="mb-2"
                  >
                    <Link
                      href={item.path}
                      aria-label={`Go to ${item.name}`}
                      className={`block px-4 py-2 text-md font-medium
                                 rounded-md transition-all
                                 text-gray-800 dark:text-[#D1D5DB]
                                 hover:bg-gray-100 dark:hover:bg-[#4B5563]
                                 ${
                                   isActive
                                     ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                                     : ""
                                 }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
