"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  FC,
  MutableRefObject,
} from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import FocusLock from "react-focus-lock";
import {
  FaHome,
  FaInfoCircle,
  FaProjectDiagram,
  FaBlog,
  FaSun,
  FaMoon,
  FaTimes,
  FaEnvelope,
  FaDesktop,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import useSound from "use-sound";

/* ===============================
   Custom Hook: useTheme
   Handles theme state, localStorage, and system changes.
=================================== */
export type ThemeMode = "system" | "dark" | "light";

// Add this utility near the top of your file, before the useTheme hook
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
      return false;
    }
  }
};

export function useTheme() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = safeLocalStorage.getItem("theme") as ThemeMode | null;
    const initialTheme = savedTheme || "system";
    setThemeMode(initialTheme);

    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemDark = colorSchemeQuery.matches;
    const initialDark = initialTheme === "system" ? systemDark : initialTheme === "dark";
    setIsDarkMode(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);

    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (themeMode === "system") {  // Use themeMode instead of initialTheme
        setIsDarkMode(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    colorSchemeQuery.addEventListener("change", handleSystemChange);
    return () => {
      colorSchemeQuery.removeEventListener("change", handleSystemChange);
    };
  }, [themeMode]); // Add themeMode as a dependency

  const toggleTheme = useCallback(() => {
    const newMode: ThemeMode =
      themeMode === "system" ? "dark" : themeMode === "dark" ? "light" : "system";
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const newDark = newMode === "system" ? systemDark : newMode === "dark";

    safeLocalStorage.setItem("theme", newMode);

    setThemeMode(newMode);
    setIsDarkMode(newDark);
    document.documentElement.classList.toggle("dark", newDark);
  }, [themeMode]);

  return { themeMode, isDarkMode, toggleTheme };
}

/* ===============================
   Types & Interfaces
=================================== */
interface Particle {
  id: number;
  x: number;
  y: number;
}

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

/* ===============================
   Particle Animation Component
=================================== */
interface ParticlesProps {
  particles: Particle[];
  removeParticle: (id: number) => void;
}

const Particles: FC<ParticlesProps> = ({ particles, removeParticle }) => (
  <AnimatePresence>
    {particles.map((particle) => (
      <motion.div
        key={particle.id}
        initial={{ scale: 1, opacity: 1, x: particle.x, y: particle.y }}
        animate={{
          x: particle.x + (Math.random() - 0.5) * 100,
          y: particle.y - 100,
          scale: 0,
          opacity: 0,
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed pointer-events-none z-[999] w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-blue-400 dark:to-purple-400"
        onAnimationComplete={() => removeParticle(particle.id)}
      />
    ))}
  </AnimatePresence>
);

/* ===============================
   Theme Toggle Component
=================================== */
interface ThemeToggleProps {
  themeMode: ThemeMode;
  isDarkMode: boolean;
  toggleTheme: () => void;
  buttonRef: MutableRefObject<HTMLButtonElement | null>;
  reducedMotion: boolean;
}

const ThemeToggle: FC<ThemeToggleProps> = ({
  themeMode,
  isDarkMode,
  toggleTheme,
  buttonRef,
  reducedMotion,
}) => (
  <motion.button
    ref={buttonRef}
    onClick={toggleTheme}
    className="p-2 rounded-full backdrop-blur-sm bg-gray-200/30 dark:bg-gray-800/30 border border-gray-300/20 dark:border-gray-700/30 relative overflow-hidden group"
    aria-label={`Current theme: ${themeMode} (click to cycle)`}
    whileTap={{ scale: reducedMotion ? 1 : 0.9 }}
    whileHover={{ scale: reducedMotion ? 1 : 1.1 }}
    transition={{ type: "spring", stiffness: 300, damping: 10 }}
    suppressHydrationWarning
  >
    <AnimatePresence mode="wait">
      {themeMode === "system" ? (
        <motion.div
          key="system"
          initial={{ rotate: reducedMotion ? 0 : -180, scale: reducedMotion ? 1 : 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: reducedMotion ? 0 : 180, scale: reducedMotion ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaDesktop className="w-6 h-6 text-gray-800 dark:text-gray-300" />
        </motion.div>
      ) : isDarkMode ? (
        <motion.div
          key="sun"
          initial={{ rotate: reducedMotion ? 0 : -180, scale: reducedMotion ? 1 : 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: reducedMotion ? 0 : 180, scale: reducedMotion ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaSun className="text-yellow-400 w-6 h-6" />
        </motion.div>
      ) : (
        <motion.div
          key="moon"
          initial={{ rotate: reducedMotion ? 0 : 180, scale: reducedMotion ? 1 : 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: reducedMotion ? 0 : -180, scale: reducedMotion ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaMoon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

/* ===============================
   Desktop Menu Component
=================================== */
interface DesktopMenuProps {
  menuItems: MenuItem[];
  currentPath: string;
  playHover: () => void;
  hoverTimeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null>;
  reducedMotion: boolean;
}

const DesktopMenu: FC<DesktopMenuProps> = ({
  menuItems,
  currentPath,
  playHover,
  hoverTimeoutRef,
  reducedMotion,
}) => (
  <ul className="hidden md:flex space-x-4 items-center">
    {menuItems.map((item) => (
      <motion.li
        key={item.name}
        whileHover={reducedMotion ? {} : { scale: 1.05 }}
        onHoverStart={() => {
          hoverTimeoutRef.current = setTimeout(playHover, 200);
        }}
        onHoverEnd={() => {
          if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        }}
        className="relative"
      >
        <Link
          href={item.path}
          className={`px-4 py-2 rounded-md flex items-center transition-all relative overflow-hidden group ${
            currentPath === item.path
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
              : "text-gray-800 dark:text-gray-300 hover:bg-gray-200/30 dark:hover:bg-gray-700/30 backdrop-blur-sm border border-gray-300/20 dark:border-gray-600/20"
          }`}
          aria-current={currentPath === item.path ? "page" : undefined}
        >
          {item.icon}
          {item.name}
          {currentPath === item.path && (
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
);

/* ===============================
   Mobile Menu Component
=================================== */
interface MobileMenuProps {
  menuItems: MenuItem[];
  currentPath: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  reducedMotion: boolean;
}

const MobileMenu: FC<MobileMenuProps> = ({
  menuItems,
  currentPath,
  isOpen,
  setIsOpen,
  reducedMotion,
}) => (
  <AnimatePresence initial={false}>
    {isOpen && (
      <>
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
          role="presentation"
        />
        <FocusLock>
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: reducedMotion ? 0 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -20 }}
            className="fixed top-16 inset-x-0 mx-4 bg-gray-100/90 dark:bg-gray-900/90 shadow-xl rounded-md p-4 flex flex-col z-50 backdrop-blur-xl border border-gray-200/20 dark:border-gray-800/30"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            aria-labelledby="mobile-menu-heading"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 id="mobile-menu-heading" className="text-lg font-medium text-gray-800 dark:text-gray-200">Menu</h2>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                aria-label="Close menu"
                whileHover={reducedMotion ? {} : { scale: 1.1 }}
              >
                <FaTimes className="w-5 h-5 text-gray-800 dark:text-gray-300" />
              </motion.button>
            </div>
            <ul role="menu">
              {menuItems.map((item) => (
                <motion.li
                  key={item.name}
                  whileHover={reducedMotion ? {} : { scale: 1.02 }}
                  className="mb-2"
                  role="menuitem"
                >
                  <Link
                    href={item.path}
                    className={`flex items-center px-4 py-2 rounded-md relative overflow-hidden ${
                      currentPath === item.path
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                        : "text-gray-800 dark:text-gray-300 hover:bg-gray-200/30 dark:hover:bg-gray-700/30"
                    }`}
                    onClick={() => setIsOpen(false)}
                    aria-current={currentPath === item.path ? "page" : undefined}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </FocusLock>
      </>
    )}
  </AnimatePresence>
);

/* ===============================
   Main Navbar Component
=================================== */
export default function Navbar() {
  const { themeMode, isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const pathname = usePathname();
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const [playHover] = useSound("/sounds/hover.mp3", { 
    volume: 0.25,
    // Add error handling
    onplayerror: () => {
      console.warn("Could not play hover sound. File may be missing.");
    }
  });
  
  const [playToggle] = useSound("/sounds/toggle.mp3", { 
    volume: 0.3,
    // Add error handling
    onplayerror: () => {
      console.warn("Could not play toggle sound. File may be missing.");
    }
  });
  const particleId = useRef(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handleReducedMotionChange = () => {
      setReducedMotion(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handleReducedMotionChange);
    return () => {
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  const createParticles = useCallback((x: number, y: number) => {
    // Reset counter if it gets too large to prevent potential issues
    if (particleId.current > 10000) {
      particleId.current = 0;
    }
    
    const newParticles = Array.from({ length: 8 }).map(() => ({
      id: particleId.current++,
      x: x + Math.random() * 20 - 10,
      y: y + Math.random() * 20 - 10,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
  }, []);

  const handleToggleTheme = useCallback(() => {
    if (soundEnabled) {
      playToggle();
    }
    const rect = themeButtonRef.current?.getBoundingClientRect();
    if (rect) {
      createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    toggleTheme();
  }, [soundEnabled, playToggle, createParticles, toggleTheme]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  const menuItems: MenuItem[] = useMemo(
    () => [
      { name: "Home", path: "/", icon: <FaHome className="mr-2" /> },
      { name: "About", path: "/about", icon: <FaInfoCircle className="mr-2" /> },
      { name: "Projects", path: "/projects", icon: <FaProjectDiagram className="mr-2" /> },
      { name: "Blogs", path: "/blogs", icon: <FaBlog className="mr-2" /> },
      { name: "Contact", path: "/contact", icon: <FaEnvelope className="mr-2" /> },
    ],
    []
  );

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <>
      {/* Animated Particles */}
      <Particles particles={particles} removeParticle={removeParticle} />

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: reducedMotion ? 0 : -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
        className="fixed top-0 inset-x-0 z-50 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/30 shadow-sm"
        aria-label="Main navigation"
        suppressHydrationWarning
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
          {/* Mobile Theme Toggle */}
          <div className="md:hidden flex items-center">
            <ThemeToggle
              themeMode={themeMode}
              isDarkMode={isDarkMode}
              toggleTheme={handleToggleTheme}
              buttonRef={themeButtonRef}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* Desktop Menu */}
          <DesktopMenu
            menuItems={menuItems}
            currentPath={pathname}
            playHover={() => {
              if (soundEnabled) playHover();
            }}
            hoverTimeoutRef={hoverTimeout}
            reducedMotion={reducedMotion}
          />

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center justify-end flex-1">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-200/30 dark:hover:bg-gray-700/30 backdrop-blur-sm border border-gray-300/20 dark:border-gray-600/20 relative z-50 group"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                whileHover={reducedMotion ? {} : { scale: 1.1 }}
              >
                {isMenuOpen ? (
                  <FaTimes className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                ) : (
                  <div className="space-y-1">
                    <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-300 rounded-full" />
                    <span className="block w-6 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-300 dark:to-purple-300 rounded-full" />
                    <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-300 rounded-full" />
                  </div>
                )}
              </motion.button>
            </div>

            {/* Desktop Theme Toggle */}
            <div className="hidden md:flex items-center">
              <ThemeToggle
                themeMode={themeMode}
                isDarkMode={isDarkMode}
                toggleTheme={handleToggleTheme}
                buttonRef={themeButtonRef}
                reducedMotion={reducedMotion}
              />
            </div>

            {/* Sound Toggle Button */}
            <motion.button
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="p-2 rounded-full backdrop-blur-sm bg-gray-200/30 dark:bg-gray-800/30 border border-gray-300/20 dark:border-gray-700/30 relative overflow-hidden group"
              aria-label={`Sound effects ${soundEnabled ? "enabled" : "disabled"}`}
              whileHover={reducedMotion ? {} : { scale: 1.1 }}
              whileTap={reducedMotion ? {} : { scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              suppressHydrationWarning
            >
              {soundEnabled ? (
                <FaVolumeUp className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              ) : (
                <FaVolumeMute className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        menuItems={menuItems}
        currentPath={pathname}
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        reducedMotion={reducedMotion}
      />
    </>
  );
}
