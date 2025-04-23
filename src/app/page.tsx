"use client";

import React, { useState, useEffect, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { NeuralBackground } from "@/components/ui/NeuralBackground";

// ---------------------------------------------------------------------------
// Style Constants & Animations
// ---------------------------------------------------------------------------
const glassPanelStyles =
  "rounded-3xl backdrop-blur-md bg-white/25 dark:bg-gray-900/25 border border-white/20 dark:border-gray-700/20 shadow-xl";
const buttonStyles =
  "rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300";
const gradients = {
  blue: "bg-gradient-to-br from-blue-500 to-indigo-600",
  green: "bg-gradient-to-br from-emerald-500 to-teal-600",
  purple: "bg-gradient-to-br from-purple-500 to-pink-600",
};

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
  const techStack = ["VLSI", "FPGAs", "AI/ML", "React", "Next.js"];

  // Mouse glow effect state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <section className="relative flex items-center justify-center min-h-screen px-4 py-10 z-10 overflow-hidden">
      {/* Glowing Mouse Effect */}
      <motion.div
        className="fixed pointer-events-none w-32 h-32 bg-blue-500/30 blur-[50px] rounded-full"
        style={{ left: mousePos.x - 64, top: mousePos.y - 64 }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Animated background glow effect */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-[80px] z-0"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="text-center relative z-10 max-w-5xl"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Photo with 3D Tilt and Pulse Effect */}
        <motion.div
          className="relative w-36 h-36 mx-auto mb-10 rounded-full overflow-hidden shadow-xl bg-gradient-to-br from-blue-400 to-purple-500 ring-4 ring-white/50 dark:ring-gray-800/50"
          variants={fadeInUp}
          custom={0}
          whileHover={{
            scale: 1.1,
            rotateY: 15,
            boxShadow: "0 0 25px rgba(125, 125, 255, 0.5)",
          }}
          style={{ perspective: 1000 }}
        >
          {/* Consider using Next.js' Image component here */}
          <img
            src="/images/favicon.ico"
            alt="Profile Photo"
            className="object-cover w-full h-full"
          />
          {/* Animated ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-400 -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Typewriter with Custom Gradient Cursor */}
        <motion.div variants={fadeInUp} custom={1} className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            <Typewriter
              options={{
                strings: [
                  "Karthikeya: The Future Iron Man",
                  "VLSI Engineer & FPGA Developer",
                  "Machine Learning Enthusiast",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 40,
                cursor:
                  '<span style="background: linear-gradient(90deg, #a855f7, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">|</span>',
              }}
            />
          </h1>

          {/* Animated tech stack pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-4"
            variants={stagger}
          >
            {techStack.map((tech, index) => (
              <motion.span
                key={index}
                variants={fadeInUp}
                custom={index}
                className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 text-gray-700 dark:text-gray-200"
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Glass Panel Description with Floating Effect */}
        <motion.div
          variants={fadeInUp}
          custom={2}
          className="mb-10 relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className={`text-xl md:text-2xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed p-6 ${glassPanelStyles}`}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Welcome to my portfolio—where hardware innovation meets cutting-edge software development.
            I blend VLSI design expertise with modern web development to create tomorrow's technologies.
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-blue-500"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-purple-500"></div>
        </motion.div>

        {/* Social Media Icons with Advanced Animation */}
        <motion.div
          variants={fadeInUp}
          custom={3}
          className="flex justify-center space-x-6 mb-12"
        >
          {[
            {
              icon: <FaGithub size={22} />,
              url: "https://github.com/",
              color: "from-gray-600 to-gray-800",
            },
            {
              icon: <FaLinkedin size={22} />,
              url: "https://linkedin.com/",
              color: "from-blue-600 to-blue-800",
            },
            {
              icon: <FaTwitter size={22} />,
              url: "https://twitter.com/",
              color: "from-sky-400 to-sky-600",
            },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-4 rounded-full bg-white/50 dark:bg-gray-800/50 shadow-lg text-gray-700 dark:text-gray-300 backdrop-blur-sm overflow-hidden group"
              whileHover={{
                scale: 1.2,
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Icon */}
              <motion.div className="relative z-10">{social.icon}</motion.div>

              {/* Background glow effect on hover */}
              <motion.div
                className={`absolute inset-0 opacity-0 bg-gradient-to-br ${social.color}`}
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Navigation Buttons with Advanced Effects */}
        <motion.div variants={stagger} className="flex flex-wrap justify-center gap-5">
          {[
            { href: "/about", text: "About Me", gradient: gradients.blue },
            { href: "/projects", text: "Projects", gradient: gradients.green },
            { href: "/contact", text: "Contact", gradient: gradients.purple },
          ].map((link, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              custom={index + 4}
            >
              <Link
                href={link.href}
                className={`${buttonStyles} ${link.gradient} text-white px-8 py-4 inline-block`}
              >
                <span className="relative z-10 font-bold tracking-wide">
                  {link.text}
                </span>
              </Link>

              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-white/20 blur-sm rounded-full"
                animate={{ x: ["-100%", "100%"], opacity: [0, 0.5, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 3,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}

          {/* Resume button with unique design */}
          <motion.div
            variants={fadeInUp}
            custom={7}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.a
              href="/resume.pdf"
              target="_blank"
              className={`${buttonStyles} relative overflow-hidden border-2 border-blue-500 text-blue-500 dark:text-blue-400 px-8 py-4 flex items-center gap-2 group`}
              whileHover="hover"
            >
              <span className="relative z-10 font-bold tracking-wide group-hover:text-white transition-colors duration-300">
                Resume
              </span>

              {/* Fill animation on hover */}
              <motion.div
                className="absolute inset-0 bg-blue-500 z-0"
                initial={{ x: "-100%" }}
                variants={{ hover: { x: 0 } }}
                transition={{ duration: 0.3 }}
              />

              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="relative z-10 group-hover:text-white transition-colors duration-300"
                variants={{
                  hover: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 1 } },
                }}
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </motion.svg>
            </motion.a>
          </motion.div>
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
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        {/* Futuristic loading animation */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-t-4 border-r-4 border-blue-500 animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 rounded-full border-b-4 border-l-4 border-purple-500 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center text-blue-500 text-sm font-mono">
            <AnimatePresence>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                Loading...
              </motion.span>
            </AnimatePresence>
          </div>
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
