"use client";
import { Analytics } from "@vercel/analytics/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 🚀 This hook triggers the transition and blocks page rendering
  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 1200); // <-- Wait for the transition to finish
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 m-0 p-0">
        <Navbar />
        
        {/* 🚀 This will now BLOCK the new page until the animation is done */}
        <AnimatePresence mode="wait">
          {isTransitioning ? (
            <motion.div
              key="loading"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
            >
              <p className="text-white text-xl font-bold">Loading...</p>
            </motion.div>
          ) : (
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="mt-10 px-4 py-10 max-w-screen-2xl mx-auto"
            >
              {children}
            </motion.main>
          )}
        </AnimatePresence>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
