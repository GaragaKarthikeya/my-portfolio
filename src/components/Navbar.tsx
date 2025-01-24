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
} from "react-icons/fa";
import useSound from "use-sound";

export default function Navbar() {
  // --------------------
  // STATE & CONSTANTS
  // --------------------
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.25 });
  const hoverTimeout = useRef(null);
  const navRef = useRef(null);

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

  // --------------------
  // SCROLL MANAGEMENT
  // --------------------
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --------------------
  // THEME TOGGLE
  // --------------------
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.add("theme-transition");
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 300);
      
      return newMode;
    });
  };

  // --------------------
  // MENU ITEMS
  // --------------------
  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome className="shrink-0" /> },
    { name: "About", path: "/about", icon: <FaInfoCircle className="shrink-0" /> },
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram className="shrink-0" /> },
    { name: "Blogs", path: "/blogs", icon: <FaBlog className="shrink-0" /> },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* MAIN NAVBAR */}
      <motion.nav
        ref={navRef}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 inset-x-0 z-50 backdrop-blur-3xl border-b transition-all duration-300 ${
          isScrolled 
            ? "bg-white/80 dark:bg-gray-900/90 border-white/20 dark:border-gray-700/30 shadow-xl"
            : "bg-white/50 dark:bg-gray-900/70 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* BRANDING */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Link
                href="/"
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
              >
                DevPort
              </Link>
            </motion.div>

            {/* DESKTOP MENU */}
            <ul className="hidden md:flex items-center space-x-3">
              {menuItems.map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => {
                    hoverTimeout.current = setTimeout(() => playHover(), 200);
                  }}
                  onHoverEnd={() => {
                    clearTimeout(hoverTimeout.current);
                  }}
                  className="relative"
                >
                  <Link
                    href={item.path}
                    className={`px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-all duration-300 ${
                      pathname === item.path
                        ? "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-600 dark:text-blue-400 shadow-inner"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-800/40"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.name}</span>
                    {pathname === item.path && (
                      <motion.span
                        className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-blue-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.li>
              ))}

              {/* CONTACT BUTTON */}
              <motion.li 
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => {
                  hoverTimeout.current = setTimeout(() => playHover(), 200);
                }}
                onHoverEnd={() => {
                  clearTimeout(hoverTimeout.current);
                }}
              >
                <Link
                  href="/contact"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-blue-500/20 transition-all flex items-center space-x-2 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
                  <span>📬</span>
                  <span className="text-sm font-medium">Contact</span>
                </Link>
              </motion.li>
            </ul>

            {/* RIGHT SECTION */}
            <div className="flex items-center space-x-4">
              {/* THEME TOGGLE */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-xl bg-white/30 dark:bg-gray-800/40 border border-white/30 dark:border-gray-700/40 transition-transform"
                aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              >
                {isDarkMode ? (
                  <motion.div 
                    animate={{ rotate: 360, scale: [0.9, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaSun className="text-amber-400 w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div 
                    animate={{ rotate: 180, scale: [0.9, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaMoon className="text-indigo-600 dark:text-gray-300 w-6 h-6" />
                  </motion.div>
                )}
              </motion.button>

              {/* MOBILE MENU TOGGLE */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.05 }}
                className="md:hidden p-2 rounded-xl bg-white/30 dark:bg-gray-800/40 border border-white/30 dark:border-gray-700/40 transition-transform relative z-50"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <motion.div className="space-y-1.5">
                    <span className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full transition-transform" />
                    <span className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full transition-transform" />
                    <span className="block w-4 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full transition-transform ml-auto" />
                  </motion.div>
                )}
              </motion.button>
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
              className="fixed top-20 right-4 left-4 bg-white/95 dark:bg-gray-900/95 shadow-2xl rounded-xl p-4 flex flex-col z-50 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30"
            >
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                        pathname === item.path
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.name}</span>
                      {pathname === item.path && (
                        <motion.span
                          className="absolute right-4 w-2 h-2 bg-blue-500 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
                <motion.li whileHover={{ scale: 1.02 }}>
                  <Link
                    href="/contact"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white mt-2 relative overflow-hidden"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
                    <span>📬</span>
                    <span className="text-sm font-medium">Contact Me</span>
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SCROLL PROGRESS INDICATOR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ 
          transformOrigin: 'left center',
          scaleX: isScrolled ? window.scrollY / (document.body.scrollHeight - window.innerHeight) : 0
        }}
      />
    </>
  );
}