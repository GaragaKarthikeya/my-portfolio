"use client";
import { motion } from "framer-motion";

export default function PageLoader({ isLoading }: { isLoading: boolean }) {
  return (
    <motion.div
      className="fixed inset-0 bg-gray-100 dark:bg-gray-900 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        pointerEvents: isLoading ? "auto" : "none", // Prevent click during load
      }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <p className="text-lg mt-4 text-gray-700 dark:text-gray-300">
          Loading...
        </p>
      </div>
    </motion.div>
  );
}
