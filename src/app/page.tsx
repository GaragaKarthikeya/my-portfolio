"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

const animationDuration = 0.8;
const ease = "easeOut";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const skills = [
    "Front-End Development with React and Tailwind CSS",
    "Machine Learning and Data Structures",
    "VLSI Design and Digital Logic",
    "Competitive Programming and Algorithms",
  ];

  const skillItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ? savedTheme === "dark" : systemDark;
    setIsDarkMode(initialTheme);

    if (initialTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode, mounted]);

  if (!mounted) return null;

  return (
    <div>
      <Head>
        <title>Karthikeya&apos;s Portfolio</title>
        <meta
          name="description"
          content="Explore my work as a front-end developer, ECE student, and VLSI enthusiast."
        />
      </Head>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-10">
        <motion.div
          className="w-full max-w-4xl text-center rounded-2xl p-10 bg-gray-200 dark:bg-gray-800 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration, ease }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to My Portfolio
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Hi, I&apos;m Karthikeya—a front-end developer, ECE student, and VLSI
            enthusiast. Explore my work, learn about my journey, and discover
            where passion meets technology.
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href="/about"
              className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
              aria-label="About Me"
            >
              About Me
            </Link>
            <Link
              href="/projects"
              className="px-6 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
              aria-label="Projects"
            >
              Projects
            </Link>
            <Link
              href="/blogs"
              className="px-6 py-2 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transition-colors"
              aria-label="Blogs"
            >
              Blogs
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 rounded-full bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors"
              aria-label="Contact"
            >
              Contact
            </Link>
          </div>

          {/* Enhanced Skills Section */}
          <motion.div
            className="text-left mt-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: animationDuration, ease }}
          >
            <h2 className="text-3xl font-semibold mb-4">Technical Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-md"
                  variants={skillItemVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-gray-700 dark:text-gray-300">{skill}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action Section */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animationDuration, ease }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              Ready to Collaborate?
            </h2>
            <p className="text-lg mb-6">
              Have a project in mind or want to discuss technology? Let&apos;s
              connect and create something extraordinary!
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
              aria-label="Get in Touch"
            >
              Get in Touch
            </Link>
          </motion.div>

          {/* Closing Quote */}
          <p className="text-sm italic mt-10 text-gray-600 dark:text-gray-400">
            “Technology, when harnessed creatively, can take us anywhere—even
            beyond the stars.”
          </p>
        </motion.div>
      </div>
    </div>
  );
}