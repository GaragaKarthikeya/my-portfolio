"use client";

import React, { useState, useEffect, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { NeuralBackground } from "@/components/ui/NeuralBackground";

// ---------------------------------------------------------------------------
// Style Constants & Animations
// ---------------------------------------------------------------------------
const glassPanelStyles =
  "rounded-2xl bg-white/10 dark:bg-gray-900/10 border border-white/10 dark:border-gray-700/10 backdrop-blur-sm will-change-transform transform-gpu";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// ---------------------------------------------------------------------------
// HeroSection Component with Futuristic Enhancements
// ---------------------------------------------------------------------------
const HeroSection: FC = () => {
  // For animating tech stack items
  const techStack = ["React", "Next.js", "VLSI", "Python", "JavaScript", "AI/ML"];

  return (
    <section className="relative flex items-center justify-center min-h-screen px-4 py-10 overflow-hidden transform-gpu">
      {/* Subtle background glow effect - GPU accelerated */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-[100px] -z-10 will-change-transform transform-gpu" />

      <motion.div
        className="text-center relative z-10 max-w-5xl w-full mx-auto"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Main Header Section */}
        <motion.div variants={fadeInUp} custom={0} className="mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 text-gray-900 dark:text-gray-50 tracking-tight leading-tight will-change-contents">
            <Typewriter
              options={{
                strings: [
                  "Hey, I'm Karthikeya! 👋",
                  "CS Student & Tech Enthusiast",
                  "Building Cool Stuff with Code",
                  "VLSI & FPGA Explorer",
                  "Future Engineer in the Making",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 40,
                cursor:
                  '<span style="background: linear-gradient(90deg, #a855f7, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">|</span>',
              }}
            />
          </h1>

          {/* Tech stack pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-2"
            variants={stagger}
          >
            {techStack.map((tech, index) => (
              <motion.span
                key={index}
                variants={fadeInUp}
                custom={index}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm will-change-transform transform-gpu"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Description Section */}
        <motion.div
          variants={fadeInUp}
          custom={1}
          className="mb-12"
        >
          <div className={`text-base sm:text-lg md:text-xl max-w-4xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed p-6 sm:p-8 font-medium ${glassPanelStyles}`}>
            Welcome to my little corner of the internet! 🚀 I'm a computer science student passionate about 
            creating amazing digital experiences. From web development to hardware design, I love exploring 
            how technology can solve real problems and make life more interesting.
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Home Component
// ---------------------------------------------------------------------------
const Home: FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <NeuralBackground />
      <div className="relative z-10 flex flex-col min-h-screen bg-transparent text-gray-800 dark:text-gray-100">
        <HeroSection />
      </div>
    </div>
  );
};

export default Home;
