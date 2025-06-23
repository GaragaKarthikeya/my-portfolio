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
import { useIsMobile, useHapticFeedback, useSwipeGesture } from "@/hooks/useMobile";

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
        className="fixed pointer-events-none z-[999] w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 dark:from-amber-400 dark:to-orange-400"
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
    className="p-2 rounded-full backdrop-blur-sm bg-orange-200/30 dark:bg-black/30 border border-orange-300/20 dark:border-white/10 relative overflow-hidden group"
    aria-label={`Current theme: ${themeMode} (click to cycle)`}
    whileTap={{ scale: reducedMotion ? 1 : 0.9 }}
    whileHover={{ scale: reducedMotion ? 1 : 1.1 }}
    transition={{ type: "spring", stiffness: 300, damping: 10 }}
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
          <FaDesktop className="w-6 h-6 text-orange-800 dark:text-orange-300" />
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
          <FaMoon className="w-6 h-6 text-orange-800 dark:text-orange-300" />
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
              ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg"
              : "text-orange-800 dark:text-orange-300 hover:bg-orange-200/30 dark:hover:bg-black/30 backdrop-blur-sm border border-orange-300/20 dark:border-white/10"
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
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

const MobileMenu: FC<MobileMenuProps> = ({
  menuItems,
  currentPath,
  isOpen,
  setIsOpen,
  reducedMotion,
  onTouchStart,
  onTouchEnd,
}) => (
  <AnimatePresence initial={false}>
    {isOpen && (
      <>
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
          role="presentation"
        />
        <FocusLock>
          <motion.div
            key="mobile-menu"
            initial={{ 
              opacity: 0, 
              scale: reducedMotion ? 1 : 0.95,
              y: reducedMotion ? 0 : -20 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0 
            }}
            exit={{ 
              opacity: 0, 
              scale: reducedMotion ? 1 : 0.95,
              y: reducedMotion ? 0 : -20 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-20 inset-x-4 bg-white/95 dark:bg-stone-900/95 shadow-2xl rounded-2xl p-6 flex flex-col z-50 backdrop-blur-xl border border-orange-200/30 dark:border-orange-900/30"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            aria-labelledby="mobile-menu-heading"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 id="mobile-menu-heading" className="text-xl font-semibold text-orange-800 dark:text-orange-200">
                Navigation
              </h2>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="touch-target p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                aria-label="Close menu"
                whileHover={reducedMotion ? {} : { scale: 1.05 }}
                whileTap={reducedMotion ? {} : { scale: 0.95 }}
              >
                <FaTimes className="w-5 h-5 text-orange-700 dark:text-orange-300" />
              </motion.button>
            </div>
            
            <ul role="menu" className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  whileHover={reducedMotion ? {} : { scale: 1.02 }}
                  whileTap={reducedMotion ? {} : { scale: 0.98 }}
                  role="menuitem"
                >
                  <Link
                    href={item.path}
                    className={`flex items-center px-4 py-4 rounded-xl transition-all duration-200 relative overflow-hidden group ${
                      currentPath === item.path
                        ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg"
                        : "text-orange-800 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30"
                    }`}
                    onClick={() => setIsOpen(false)}
                    aria-current={currentPath === item.path ? "page" : undefined}
                  >
                    <div className={`mr-4 p-2 rounded-lg transition-colors ${
                      currentPath === item.path
                        ? "bg-white/20"
                        : "bg-orange-100 dark:bg-orange-900/30 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50"
                    }`}>
                      {item.icon}
                    </div>
                    <span className="font-medium text-lg">{item.name}</span>
                    
                    {/* Active indicator */}
                    {currentPath === item.path && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute right-4 w-2 h-2 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
            
            {/* Bottom decoration */}
            <div className="mt-6 pt-4 border-t border-orange-200/30 dark:border-orange-900/30">
              <p className="text-center text-sm text-orange-600/70 dark:text-orange-400/70">
                Swipe left to close menu
              </p>
            </div>
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
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Mobile hooks
  const isMobile = useIsMobile();
  const { impactLight } = useHapticFeedback();
  
  // Swipe to close mobile menu
  const { handleTouchStart: handleSwipeStart, handleTouchEnd: handleSwipeEnd } = useSwipeGesture(
    () => {
      // Swipe left to close menu
      if (isMenuOpen) {
        setIsMenuOpen(false);
        impactLight();
      }
    },
    () => {
      // Swipe right to open menu (when closed)
      if (!isMenuOpen && isMobile) {
        setIsMenuOpen(true);
        impactLight();
      }
    }
  );
  
  // Convert to React TouchEvent handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleSwipeStart(e.nativeEvent);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    handleSwipeEnd(e.nativeEvent);
  };
  
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
    setMounted(true);
  }, []);

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

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <nav className="fixed top-0 inset-x-0 z-50 bg-orange-100/80 backdrop-blur-xl border-b border-orange-200/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="hidden md:flex space-x-4 items-center">
            <div className="px-4 py-2 rounded-md bg-orange-500 text-white">Loading...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Animated Particles */}
      <Particles particles={particles} removeParticle={removeParticle} />

      {/* Main Navbar - Hidden on mobile */}
      <motion.nav
        initial={{ y: reducedMotion ? 0 : -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
        className={`fixed top-0 inset-x-0 z-50 bg-orange-100/80 dark:bg-stone-950/95 backdrop-blur-xl border-b border-orange-200/20 dark:border-white/10 shadow-sm ${
          isMobile ? 'hidden' : ''
        }`}
        aria-label="Main navigation"
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
                className="touch-target p-3 rounded-xl bg-orange-100/50 dark:bg-orange-900/30 hover:bg-orange-200/70 dark:hover:bg-orange-900/50 backdrop-blur-sm border border-orange-300/30 dark:border-orange-800/30 relative z-50 group transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                whileHover={reducedMotion ? {} : { scale: 1.05 }}
                whileTap={reducedMotion ? {} : { scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTimes className="w-5 h-5 text-orange-700 dark:text-orange-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-1"
                    >
                      <motion.span 
                        className="block w-5 h-0.5 bg-orange-700 dark:bg-orange-300 rounded-full origin-center"
                        animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.span 
                        className="block w-5 h-0.5 bg-gradient-to-r from-orange-500 to-rose-500 dark:from-orange-400 dark:to-rose-400 rounded-full"
                        animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.span 
                        className="block w-5 h-0.5 bg-orange-700 dark:bg-orange-300 rounded-full origin-center"
                        animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
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
              className="p-2 rounded-full backdrop-blur-sm bg-orange-200/30 dark:bg-black/30 border border-orange-300/20 dark:border-white/10 relative overflow-hidden group"
              aria-label={`Sound effects ${soundEnabled ? "enabled" : "disabled"}`}
              whileHover={reducedMotion ? {} : { scale: 1.1 }}
              whileTap={reducedMotion ? {} : { scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              {soundEnabled ? (
                <FaVolumeUp className="w-6 h-6 text-orange-800 dark:text-orange-300" />
              ) : (
                <FaVolumeMute className="w-6 h-6 text-orange-800 dark:text-orange-300" />
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
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
    </>
  );
}
