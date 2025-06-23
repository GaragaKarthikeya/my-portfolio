"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { FaWifi, FaExclamationTriangle } from 'react-icons/fa';
import { useNetworkStatus } from '@/hooks/useMobile';

export default function MobileOfflineIndicator() {
  const { isOnline, connectionType } = useNetworkStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white px-4 py-2 text-center text-sm font-medium safe-area-pt"
        >
          <div className="flex items-center justify-center space-x-2">
            <FaExclamationTriangle className="w-4 h-4" />
            <span>You're offline. Some features may not work.</span>
          </div>
        </motion.div>
      )}
      
      {isOnline && connectionType === 'slow-2g' && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white px-4 py-2 text-center text-sm font-medium safe-area-pt"
        >
          <div className="flex items-center justify-center space-x-2">
            <FaWifi className="w-4 h-4" />
            <span>Slow connection detected</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
