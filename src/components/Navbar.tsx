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
  FaTimes,
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
  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

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
          {/* Enhanced Mobile Search Bar */}
          <div className="flex items-center md:hidden w-full px-4">
            <div className="relative flex items-center bg-gray-100 dark:bg-gray-700 
                            rounded-md overflow-hidden shadow-md w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full px-4 py-2 text-sm text-gray-800 dark:text-gray-200 
                           bg-transparent focus:outline-none focus:ring-2 
                           focus:ring-blue-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

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
                            dark:bg-[#2D3748] rounded-md overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-32 px-2 py-1 text-sm text-gray-800 
                           dark:text-gray-300 bg-transparent 
                           focus:outline-none focus:ring 
                           focus:ring-blue-400 rounded-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-1 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
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

      {/* FLOATING BUTTON (MOBILE) */}
      <button
        onClick={toggleMenu}
        className="fixed bottom-5 right-5 flex items-center justify-center 
                   w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 
                   text-white shadow-lg hover:scale-105 transition-transform 
                   md:hidden z-50"
        aria-label="Open Menu (Floating Button)"
      >
        {isMenuOpen ? (
          <FaTimes />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" />
          </svg>
        )}
      </button>

      {/* BOTTOM SHEET MENU (MOBILE) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4 }}
              className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#374151] 
                         shadow-xl rounded-t-lg z-40 flex flex-col"
            >
              {/* Mobile Search inside bottom sheet */}
              <div className="px-6 mt-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="w-full px-2 py-1 mb-4 text-sm text-gray-800 
                             dark:text-gray-300 bg-gray-100 
                             dark:bg-[#2D3748] rounded-md focus:outline-none 
                             focus:ring focus:ring-blue-400"
                />
              </div>
              {/* Close bottom sheet */}
              <button
                onClick={toggleMenu}
                className="self-end mt-4 mr-4 text-gray-800 dark:text-gray-100 
                           hover:scale-110 transition-transform"
                aria-label="Close menu"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              {/* Filtered nav items */}
              <ul className="mt-4">
                {filteredMenuItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <motion.li key={item.name} whileHover={{ scale: 1.02 }} className="mb-4">
                      <Link
                        href={item.path}
                        aria-label={`Go to ${item.name}`}
                        className={`relative block px-6 py-3 text-lg font-medium 
                                   text-gray-800 dark:text-[#D1D5DB] 
                                   rounded-r-lg hover:bg-gray-100 
                                   dark:hover:bg-[#4B5563] transition-all 
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

            {/* Backdrop for bottom sheet */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 w-full h-full bg-black z-30"
              onClick={toggleMenu}
              aria-label="Close menu backdrop"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
