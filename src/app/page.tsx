"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-200 px-6">
      <motion.div
        className="max-w-4xl text-center overflow-visible"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 drop-shadow-md mb-6">
          Welcome to My Portfolio
        </h1>

        {/* Subtext */}
        <p className="text-gray-700 text-lg sm:text-xl mb-6 px-2">
          Explore my projects, achievements, and blogs!
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            href="/about"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About Me
          </motion.a>
          <motion.a
            href="/projects"
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            My Projects
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
