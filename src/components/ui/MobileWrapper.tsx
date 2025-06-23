"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { usePullToRefresh, useIsMobile } from '@/hooks/useMobile';

interface MobileWrapperProps {
  children: ReactNode;
  onRefresh?: () => Promise<void>;
  className?: string;
}

export default function MobileWrapper({ 
  children, 
  onRefresh,
  className = "" 
}: MobileWrapperProps) {
  const isMobile = useIsMobile();
  
  const { isRefreshing, pullDistance } = usePullToRefresh(
    onRefresh || (() => Promise.resolve())
  );

  return (
    <div className={`relative ${className}`}>
      {/* Pull-to-refresh indicator */}
      <AnimatePresence>
        {isMobile && pullDistance > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: Math.min(pullDistance / 60, 1),
              scale: Math.min(0.8 + (pullDistance / 60) * 0.2, 1),
              y: Math.min(pullDistance, 60)
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <motion.div
                animate={{ rotate: isRefreshing ? 360 : 0 }}
                transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
              <span className="text-sm font-medium">
                {pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        style={{ 
          transform: isMobile ? `translateY(${Math.min(pullDistance * 0.3, 30)}px)` : undefined 
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
