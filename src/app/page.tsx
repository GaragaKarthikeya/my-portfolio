"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import Head from "next/head";
import emailjs from "@emailjs/browser";

const animationDuration = 0.8;
const ease = "easeOut";

export default function Home() {
  // Local state for dark mode, defaulted to false
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Local state for form submission status
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useRef<HTMLFormElement>(null);

  /*
   * Use this effect to initialize dark mode from local storage or system preference.
   * If you want to change the theme globally, update local storage ("theme"),
   * and/or set isDarkMode in your global state manager (e.g., Redux, Context API),
   * and this component will reflect those changes.
   */
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

  /*
   * Reflect changes in isDarkMode on the page.
   * If isDarkMode flips from false -> true (or vice versa), we'll
   * update local storage and add/remove the "dark" class on html.
   */
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

  // Prevent hydration mismatch
  if (!mounted) return null;

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

  // Email submission handler
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.current) {
      console.error("Form reference is not available");
      setIsLoading(false);
      return;
    }

    emailjs
      .sendForm(
        "service_28qe5fc",
        "template_4f1gzif",
        form.current,
        "aaZOM5ZPvGPJIfby3"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Thank you for subscribing!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send the email, please try again.");
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Head>
        <title>Karthikeya&apos;s Portfolio</title>
        <meta
          name="description"
          content="Explore my work as a front-end developer, ECE student, and VLSI enthusiast."
        />
      </Head>

      {/* 
        No theme toggle button in the UI 
        (The theme now depends on local storage and global variable changes).
      */}

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

          {/* Skills Section */}
          <motion.div
            className="text-left mt-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: animationDuration, ease }}
          >
            <h2 className="text-3xl font-semibold mb-4">Skills</h2>
            <ul className="list-disc list-inside text-lg">
              {skills.map((skill, index) => (
                <motion.li
                  key={index}
                  className="mb-2 text-gray-700 dark:text-gray-300"
                  variants={skillItemVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animationDuration, ease }}
          >
            <p className="text-md sm:text-lg mb-4">
              Let&apos;s connect and build something amazing together! Reach out
              through the Contact page.
            </p>
            <p className="text-md sm:text-lg mb-4">
              Stay updated with my latest projects and articles. Subscribe to my
              newsletter!
            </p>
            <div className="flex justify-center mt-4">
              <form ref={form} onSubmit={sendEmail} className="flex w-full max-w-md">
                <input
                  type="email"
                  name="user_email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow dark:bg-gray-700 dark:text-white"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 rounded-r-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            </div>
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