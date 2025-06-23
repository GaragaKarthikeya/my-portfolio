"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FaHome, 
  FaUser, 
  FaCode, 
  FaPenFancy,
  FaVolumeUp,
  FaVolumeMute,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import { useIsMobile, useHapticFeedback } from '@/hooks/useMobile';
import { useDarkMode } from '@/hooks/useDarkMode';

const navigationItems = [
  { href: '/', icon: FaHome, label: 'Home' },
  { href: '/about', icon: FaUser, label: 'About' },
  { href: '/projects', icon: FaCode, label: 'Projects' },
  { href: '/blogs', icon: FaPenFancy, label: 'Blog' },
];

export default function MobileNavigation() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const { impactLight } = useHapticFeedback();
  const { isDark, toggleDarkMode } = useDarkMode();
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Load sound preference from localStorage
    const savedSoundEnabled = localStorage.getItem('soundEnabled');
    if (savedSoundEnabled !== null) {
      setSoundEnabled(JSON.parse(savedSoundEnabled));
    }
  }, []);

  const handleNavigation = (href: string) => {
    router.push(href);
    impactLight();
  };

  const handleSoundToggle = () => {
    const newSoundEnabled = !soundEnabled;
    setSoundEnabled(newSoundEnabled);
    localStorage.setItem('soundEnabled', JSON.stringify(newSoundEnabled));
    impactLight();
  };

  const handleThemeToggle = () => {
    toggleDarkMode();
    impactLight();
  };

  if (!isMobile) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-40 safe-area-pb"
    >
      {/* Main navigation bar */}
      <div className="mx-4 mb-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-orange-200/30 dark:border-orange-900/30 overflow-hidden">
        <div className="flex items-center px-2 py-3">
          {/* Main navigation items */}
          <div className="flex justify-around items-center flex-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`relative flex flex-col items-center gap-1 py-3 px-4 rounded-xl transition-all duration-300 no-select ${
                    isActive 
                      ? 'text-white' 
                      : 'text-stone-500 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={item.label}
                >
                  {/* Active background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl shadow-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {/* Icon and label */}
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <motion.div
                      animate={{ 
                        scale: isActive ? 1.1 : 1,
                        y: isActive ? -1 : 0
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <span className="text-xs font-medium tracking-wide">
                      {item.label}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-stone-300 dark:bg-stone-600 mx-2" />

          {/* Control buttons */}
          <div className="flex items-center gap-2">
            {/* Sound toggle */}
            <motion.button
              onClick={handleSoundToggle}
              className="p-3 rounded-xl text-stone-500 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300 no-select"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
            >
              {soundEnabled ? (
                <FaVolumeUp className="w-4 h-4" />
              ) : (
                <FaVolumeMute className="w-4 h-4" />
              )}
            </motion.button>

            {/* Theme toggle */}
            <motion.button
              onClick={handleThemeToggle}
              className="p-3 rounded-xl text-stone-500 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300 no-select"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <FaSun className="w-4 h-4" />
              ) : (
                <FaMoon className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
