"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6">
      <motion.div
        className="w-full max-w-4xl text-center rounded-2xl p-10 bg-gray-200 dark:bg-gray-800 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Welcome to My Portfolio
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-6">
          Explore my projects, achievements, and blogs to know more about me!
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="/about"
            className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transform transition-transform hover:scale-105"
          >
            About Me
          </a>
          <a
            href="/projects"
            className="px-6 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transform transition-transform hover:scale-105"
          >
            My Projects
          </a>
        </div>
      </motion.div>
    </div>
  );
}
