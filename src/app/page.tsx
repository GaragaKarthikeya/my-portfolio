"use client";

import React, { useState, useEffect, FC } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import GridBackground from "@/components/ui/GridBackground";
import MobileWrapper from "@/components/ui/MobileWrapper";
import { useIsMobile, useHapticFeedback } from "@/hooks/useMobile";

// ---------------------------------------------------------------------------
// Style Constants & Animations
// ---------------------------------------------------------------------------
const glassPanelStyles =
  "rounded-2xl bg-white/10 dark:bg-gray-900/10 border border-white/10 dark:border-gray-700/10 backdrop-blur-sm will-change-transform transform-gpu";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
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
      {/* Subtle background glow effect - GPU accelerated with warm tones */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-orange-500/10 to-rose-500/10 blur-[100px] -z-10 will-change-transform transform-gpu" />

      <motion.div
        className="text-center lg:text-left relative z-10 max-w-7xl w-full mx-auto lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column - Content */}
        <div className="lg:order-1">
          {/* Main Header Section */}
          <motion.div 
            variants={fadeInUp} 
            className="mb-12"
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Profile Photo Section - Mobile Only */}
            <motion.div 
              className="flex justify-center mb-12 lg:hidden"
              variants={fadeInUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Animated border ring - Enhanced for larger size */}
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 via-rose-400 to-amber-400 rounded-full blur-sm opacity-60 dark:opacity-80 group-hover:opacity-80 dark:group-hover:opacity-95 transition duration-700 animate-pulse" style={{animationDuration: '3s'}}></div>
                
                {/* Photo container - Much larger for mobile */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white/80 dark:border-stone-800/80 backdrop-blur-sm shadow-2xl dark:shadow-orange-500/30">
                  <Image
                    src="/images/IMG_20241227_022446.jpg"
                    alt="Karthikeya - CS Student & Tech Enthusiast"
                    fill
                    className="object-cover object-center brightness-105 dark:brightness-110 contrast-105 dark:contrast-110 saturate-110 dark:saturate-125 transition-all duration-500 group-hover:scale-105"
                    priority
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 208px"
                  />
                  
                  {/* Overlay gradient - Enhanced for larger size */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-400/20 via-transparent to-transparent dark:from-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 rounded-full shadow-inner shadow-orange-500/20 dark:shadow-orange-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Enhanced floating particles for larger photo */}
                <div className="absolute -top-4 -right-4 w-3 h-3 bg-orange-400/80 dark:bg-orange-300/90 rounded-full animate-bounce opacity-60 dark:opacity-80 shadow-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-2.5 h-2.5 bg-rose-400/80 dark:bg-rose-300/90 rounded-full animate-bounce opacity-60 dark:opacity-80 shadow-lg" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-1/4 -right-6 w-2.5 h-2.5 bg-amber-400/80 dark:bg-amber-300/90 rounded-full animate-pulse opacity-60 dark:opacity-80 shadow-lg" style={{animationDuration: '2.5s'}}></div>
                <div className="absolute bottom-1/4 -left-6 w-2 h-2 bg-orange-300/80 dark:bg-orange-200/90 rounded-full animate-pulse opacity-50 dark:opacity-70 shadow-lg" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
                <div className="absolute top-3/4 -right-8 w-2 h-2 bg-rose-300/80 dark:bg-rose-200/90 rounded-full animate-bounce opacity-50 dark:opacity-70 shadow-lg" style={{animationDelay: '1.5s'}}></div>
                
                {/* Additional orbital particles */}
                <div className="absolute top-8 -left-8 w-1.5 h-1.5 bg-orange-200/70 dark:bg-orange-400/80 rounded-full animate-pulse opacity-40 dark:opacity-60" style={{animationDuration: '4s'}}></div>
                <div className="absolute bottom-8 -right-10 w-1.5 h-1.5 bg-amber-200/70 dark:bg-amber-400/80 rounded-full animate-pulse opacity-40 dark:opacity-60" style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
              </motion.div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-extrabold mb-6 text-gray-900 dark:text-gray-50 tracking-tight leading-tight will-change-contents min-h-[1.2em]">
              <span>Hey, I'm </span>
              <span className="inline-block min-w-[380px] sm:min-w-[450px] md:min-w-[550px] lg:min-w-[480px] xl:min-w-[580px] text-center lg:text-left">
                <Typewriter
                  options={{
                    strings: [
                      "Karthikeya        ",
                      "studying ECE      ",
                      "figuring things out",
                      "learning to code  ",
                      "into electronics  ",
                      "still exploring   ",
                      "building stuff    ",
                      "just getting started",
                      "curious about tech",
                      "working on projects",
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 15,
                    delay: 40,
                    cursor:
                      '<span style="background: linear-gradient(90deg, #f97316, #e11d48); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">|</span>',
                  }}
                />
              </span>
            </h1>

            {/* Tech stack pills */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-6 sm:mt-8 px-2 lg:px-0"
              variants={stagger}
            >
              {techStack.map((tech, index) => (
                <motion.span
                  key={index}
                  variants={fadeInUp}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-orange-100/80 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border border-orange-200/50 dark:border-orange-700/50 backdrop-blur-sm will-change-transform transform-gpu"
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
            className="mb-12"
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className={`text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed p-6 sm:p-8 font-medium ${glassPanelStyles}`}>
              Welcome to my little corner of the internet! 🚀 I'm a computer science student passionate about 
              creating amazing digital experiences. From web development to hardware design, I love exploring 
              how technology can solve real problems and make life more interesting.
            </div>
          </motion.div>
        </div>

        {/* Right Column - Profile Photo (Desktop Only) */}
        <motion.div 
          className="hidden lg:flex lg:order-2 justify-center lg:justify-center items-center lg:pt-0"
          variants={fadeInUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Animated border ring - Slower and adaptive with subtle fade */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/30 via-rose-400/20 to-amber-400/30 rounded-full blur-2xl opacity-30 dark:opacity-50 group-hover:opacity-50 dark:group-hover:opacity-70 transition duration-1500 animate-pulse" style={{animationDuration: '5s'}}></div>
            
            {/* Outer subtle glow for blending */}
            <div className="absolute -inset-8 bg-gradient-radial from-orange-100/20 via-orange-50/10 to-transparent dark:from-orange-900/30 dark:via-orange-800/15 dark:to-transparent rounded-full opacity-60 dark:opacity-80 blur-3xl"></div>
            
            {/* Photo container - Larger and aligned with text */}
            <div className="relative w-80 h-80 xl:w-88 xl:h-88 2xl:w-96 2xl:h-96 rounded-full overflow-hidden border-3 border-orange-200/50 dark:border-orange-400/30 backdrop-blur-sm shadow-2xl dark:shadow-orange-500/20">
              <Image
                src="/images/IMG_20241227_022446.jpg"
                alt="Karthikeya - CS Student & Tech Enthusiast"
                fill
                className="object-cover object-center brightness-105 dark:brightness-115 contrast-105 dark:contrast-115 saturate-110 dark:saturate-130 transition-all duration-700 group-hover:brightness-110 dark:group-hover:brightness-120 group-hover:saturate-120 dark:group-hover:saturate-140"
                priority
                sizes="(min-width: 1024px) 384px, 0px"
              />
              
              {/* Overlay gradient - Adaptive to theme with subtle blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-400/15 via-orange-300/5 to-transparent dark:from-orange-500/25 dark:via-orange-400/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              {/* Subtle edge fade for blending */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 via-transparent to-orange-50/20 dark:from-orange-900/30 dark:via-transparent dark:to-orange-900/30 rounded-full opacity-30 dark:opacity-50"></div>
              
              {/* Inner glow effect for dark mode */}
              <div className="absolute inset-0 rounded-full ring-1 ring-orange-300/20 dark:ring-orange-400/30 opacity-0 dark:opacity-100 transition-opacity duration-700"></div>
            </div>
            
            {/* Floating particles around photo - Desktop, adaptive colors with fade */}
            <div className="absolute -top-4 -right-4 w-3 h-3 bg-orange-400/70 dark:bg-orange-300/80 rounded-full animate-bounce opacity-40 dark:opacity-60 blur-sm"></div>
            <div className="absolute -bottom-4 -left-4 w-2.5 h-2.5 bg-rose-400/70 dark:bg-rose-300/80 rounded-full animate-bounce opacity-40 dark:opacity-60 blur-sm" style={{animationDelay: '0.8s'}}></div>
            <div className="absolute top-1/4 -right-6 w-2 h-2 bg-amber-400/70 dark:bg-amber-300/80 rounded-full animate-pulse opacity-40 dark:opacity-60 blur-sm" style={{animationDuration: '3s'}}></div>
            <div className="absolute bottom-1/4 -left-6 w-2 h-2 bg-orange-300/70 dark:bg-orange-200/80 rounded-full animate-pulse opacity-30 dark:opacity-50 blur-sm" style={{animationDelay: '1.5s', animationDuration: '3.5s'}}></div>
            <div className="absolute top-3/4 -right-8 w-1.5 h-1.5 bg-rose-300/70 dark:bg-rose-200/80 rounded-full animate-bounce opacity-30 dark:opacity-50 blur-sm" style={{animationDelay: '2.5s'}}></div>
            
            {/* Additional ambient particles for blending */}
            <div className="absolute top-10 -left-8 w-1 h-1 bg-orange-200/50 dark:bg-orange-400/60 rounded-full animate-pulse opacity-20 dark:opacity-40 blur-sm" style={{animationDuration: '4s'}}></div>
            <div className="absolute bottom-10 -right-10 w-1 h-1 bg-amber-200/50 dark:bg-amber-400/60 rounded-full animate-pulse opacity-20 dark:opacity-40 blur-sm" style={{animationDelay: '3s', animationDuration: '4.5s'}}></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Home Component with Mobile Optimization
// ---------------------------------------------------------------------------
const Home: FC = () => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const { impactLight } = useHapticFeedback();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRefresh = async () => {
    // Add haptic feedback for mobile
    if (isMobile) impactLight();
    
    // Simulate refresh (you can replace with actual refresh logic)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Optional: reload the page or refresh data
    window.location.reload();
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50 dark:bg-black">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    );
  }

  return (
    <MobileWrapper onRefresh={handleRefresh}>
      <div className="relative">
        <GridBackground />
        <div className="relative z-10 flex flex-col min-h-screen bg-transparent text-gray-800 dark:text-gray-100">
          <HeroSection />
        </div>
      </div>
    </MobileWrapper>
  );
};

export default Home;
