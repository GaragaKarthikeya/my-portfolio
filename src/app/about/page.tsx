"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6">
      <motion.div
        className="w-full max-w-4xl text-center rounded-2xl p-10 bg-gray-200 dark:bg-gray-800 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          About Me
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-6 leading-relaxed">
          Hello! I'm Karthikeya, a passionate developer currently building my
          portfolio to showcase my skills, projects, and achievements. I enjoy working on 
          modern web technologies, solving problems, and exploring the latest frameworks.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-6 leading-relaxed">
          I specialize in front-end development, crafting visually appealing and responsive 
          user interfaces with frameworks like <span className="font-semibold">React</span> 
          and <span className="font-semibold">Next.js</span>. My goal is to deliver smooth user 
          experiences and write clean, maintainable code.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="/projects"
            className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold 
            hover:bg-blue-600 transform transition-transform hover:scale-105"
          >
            View My Projects
          </a>
          <a
            href="mailto:Garaga.Karthikeya@iiitb.ac.in"
            className="px-6 py-2 rounded-full bg-green-500 text-white font-semibold 
            hover:bg-green-600 transform transition-transform hover:scale-105"
          >
            Contact Me
          </a>
        </div>
      </motion.div>
    </div>
  );
}
