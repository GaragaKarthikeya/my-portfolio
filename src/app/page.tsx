"use client";

import React, { useState, useEffect, FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown } from "react-icons/fa";
import { NeuralBackground } from "../components/NeuralBackground";

// ---------------------------------------------------------------------------
// Style Constants
// ---------------------------------------------------------------------------
const glassPanelStyles =
  "rounded-3xl backdrop-blur-md bg-white/25 dark:bg-gray-900/25 border border-white/20 dark:border-gray-700/20 shadow-xl";
const buttonStyles =
  "rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105";

// ---------------------------------------------------------------------------
// HeroSection Component
// ---------------------------------------------------------------------------
const HeroSection: FC = () => (
  <section className="relative flex items-center justify-center min-h-screen px-4 py-10 z-10">
    <motion.div
      className="text-center relative z-10 max-w-4xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Profile Photo Container */}
      <motion.div
        className="relative w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-xl bg-gradient-to-br from-blue-400 to-purple-500 ring-4 ring-white/50 dark:ring-gray-800/50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Use a standard <img> tag for the favicon (placed in public/images) */}
        <img
          src="/images/favicon.ico"
          alt="Profile Photo"
          className="object-cover w-full h-full"
        />
      </motion.div>

      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 dark:text-gray-100">
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
          }}
        />
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-700 dark:text-gray-300 leading-relaxed p-6 ${glassPanelStyles}`}
      >
        Welcome to my portfolio—where hardware innovation meets cutting-edge software development.
        I blend VLSI design expertise with modern web development to create tomorrow's technologies.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex justify-center space-x-6 mb-10"
      >
        {[
          { icon: <FaGithub size={20} />, url: "https://github.com/" },
          { icon: <FaLinkedin size={20} />, url: "https://linkedin.com/" },
          { icon: <FaTwitter size={20} />, url: "https://twitter.com/" },
        ].map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/50 dark:bg-gray-800/50 shadow-md hover:shadow-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transform hover:scale-110 transition-all backdrop-blur-sm"
          >
            {social.icon}
          </a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <Link
          href="/about"
          className={`${buttonStyles} bg-blue-500 text-white hover:bg-blue-600 px-8 py-3`}
        >
          About Me
        </Link>
        <Link
          href="/projects"
          className={`${buttonStyles} bg-green-500 text-white hover:bg-green-600 px-8 py-3`}
        >
          Projects
        </Link>
        <Link
          href="/contact"
          className={`${buttonStyles} bg-blue-500 text-white hover:bg-blue-600 px-8 py-3`}
        >
          Contact
        </Link>
        <a
          href="/resume.pdf"
          target="_blank"
          className={`${buttonStyles} border-2 border-blue-500 text-blue-500 dark:text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3`}
        >
          Resume
        </a>
      </motion.div>
    </motion.div>

    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <FaArrowDown className="text-gray-600 dark:text-gray-400" />
    </div>
  </section>
);

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
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
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
