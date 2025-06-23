"use client";

import { motion } from 'framer-motion';

interface MobileLoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'spinner' | 'dots' | 'pulse';
}

export default function MobileLoading({ 
  message = 'Loading...', 
  size = 'md',
  type = 'spinner'
}: MobileLoadingProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (type === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <motion.div
          className={`border-3 border-orange-200 dark:border-orange-800 border-t-orange-500 rounded-full ${sizeClasses[size]}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className={`text-gray-600 dark:text-stone-400 font-medium ${textSizeClasses[size]}`}>
          {message}
        </p>
      </div>
    );
  }

  if (type === 'dots') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-orange-500 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <p className={`text-gray-600 dark:text-stone-400 font-medium ${textSizeClasses[size]}`}>
          {message}
        </p>
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <motion.div
          className={`bg-orange-500 rounded-full ${sizeClasses[size]}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <p className={`text-gray-600 dark:text-stone-400 font-medium ${textSizeClasses[size]}`}>
          {message}
        </p>
      </div>
    );
  }

  return null;
}
