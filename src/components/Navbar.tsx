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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const pathname = usePathname();
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.25 });
  const [playToggle] = useSound("/sounds/toggle.mp3", { volume: 0.3 });
  const particleId = useRef(0);

  // --------------------
  // THEME MANAGEMENT
  // --------------------
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ? savedTheme === "dark" : systemDark;
    
    setIsDarkMode(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme);

    return () => setMounted(false);
  }, []);

  const createParticles = (x: number, y: number) => {
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: particleId.current++,
      x: x + Math.random() * 20 - 10,
      y: y + Math.random() * 20 - 10,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
  };

  const toggleTheme = (e: React.MouseEvent) => {
    playToggle();
    const rect = themeButtonRef.current?.getBoundingClientRect();
    if (rect) {
      createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

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
      {/* ANIMATED PARTICLES */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              scale: 1,
              opacity: 1,
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              x: particle.x + (Math.random() - 0.5) * 100,
              y: particle.y - 100,
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
            className="fixed pointer-events-none z-[999] w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-blue-400 dark:to-purple-400"
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((p) => p.id !== particle.id));
            }}
          />
        ))}
      </AnimatePresence>

      {/* MAIN NAVBAR */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 inset-x-0 z-50 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/30 shadow-sm"
        suppressHydrationWarning
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
          {/* MOBILE THEME TOGGLE */}
          <div className="md:hidden flex items-center">
            <motion.button
              ref={themeButtonRef}
              onClick={toggleTheme}
              className="p-2 rounded-full backdrop-blur-sm bg-gray-200/30 dark:bg-gray-800/30 border border-gray-300/20 dark:border-gray-700/30 relative overflow-hidden"
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 180, scale: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaSun className="text-yellow-400 w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -180, scale: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaMoon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity rounded-full" />
            </motion.button>
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
                  hoverTimeout.current && clearTimeout(hoverTimeout.current);
                }}
                className="relative"
              >
                <Link
                  href={item.path}
                  className={`px-4 py-2 rounded-md flex items-center transition-all relative overflow-hidden group ${
                    pathname === item.path
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                      : "text-gray-800 dark:text-gray-300 hover:bg-gray-200/30 dark:hover:bg-gray-700/30 backdrop-blur-sm border border-gray-300/20 dark:border-gray-600/20"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                  {item.icon}
                  {item.name}
                  {pathname === item.path && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-white/20 dark:bg-black/20 rounded-md"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-4">
            {/* MOBILE MENU TOGGLE */}
            <div className="md:hidden flex items-center justify-end flex-1">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-200/30 dark:hover:bg-gray-700/30 backdrop-blur-sm border border-gray-300/20 dark:border-gray-600/20 relative z-50 group"
                aria-label="Toggle menu"
                whileHover={{ scale: 1.1 }}
              >
                {isMenuOpen ? (
                  <FaTimes className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                ) : (
                  <div className="space-y-1">
                    <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-300 rounded-full transition-transform" />
                    <span className="block w-6 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-300 dark:to-purple-300 rounded-full transition-transform" />
                    <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-300 rounded-full transition-transform" />
                  </div>
                )}
              </motion.button>
            </div>

            {/* DESKTOP THEME TOGGLE */}
            <div className="hidden md:flex items-center">
              <motion.button
                ref={themeButtonRef}
                onClick={toggleTheme}
                className="p-2 rounded-full backdrop-blur-sm bg-gray-200/30 dark:bg-gray-800/30 border border-gray-300/20 dark:border-gray-700/30 relative overflow-hidden group"
                aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      exit={{ rotate: 180, scale: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaSun className="text-yellow-400 w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      exit={{ rotate: -180, scale: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaMoon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence initial={false}>
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
                      className={`flex items-center px-4 py-2 rounded-md relative overflow-hidden ${
                        pathname === item.path
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                          : "text-gray-800 dark:text-gray-300 hover:bg-gray-200/30 dark:hover:bg-gray-700/30"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity rounded-md" />
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