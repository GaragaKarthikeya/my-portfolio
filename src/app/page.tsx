"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-10">
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
          Hi, I’m Karthikeya—a front-end developer, ECE student, and VLSI enthusiast.
          Explore my work, learn about my journey, and discover where passion meets technology.
        </p>
        
        <div className="flex flex-wrap justify-center space-x-6 mb-8">
          <a
            href="/about"
            className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transform transition-transform hover:scale-105 mb-3"
          >
            About Me
          </a>
          <a
            href="/projects"
            className="px-6 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transform transition-transform hover:scale-105 mb-3"
          >
            Projects
          </a>
          <a
            href="/blogs"
            className="px-6 py-2 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transform transition-transform hover:scale-105 mb-3"
          >
            Blog
          </a>
        </div>

        {/* A simple teaser for what's inside */}
        <p className="text-gray-700 dark:text-gray-300 text-md sm:text-lg mb-2">
          Interested in VLSI Design, AI in Space, or Competitive Programming?
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-md sm:text-lg mb-4">
          Head over to the About page to learn more about my background and ambitions.
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm italic">
          “Technology, when harnessed creatively, can take us anywhere—even beyond the stars.”
        </p>
      </motion.div>
    </div>
  );
}
