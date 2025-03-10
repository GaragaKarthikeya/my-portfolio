"use client";

import { motion } from "framer-motion";
import projects from "../../lib/projects.json";
import ProjectCard from "../../components/ProjectCard";
import { NeuralBackground } from "@/components/NeuralBackground";

export default function Projects() {
  return (
    <>
      {/* Neural Network Background */}
      <NeuralBackground />

      {/* Ultra Glossy Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-transparent px-4 py-12">
        {/* Heading Container */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl p-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl shadow-2xl mb-8"
        >
          <div className="rounded-2xl p-10 bg-gray-200 dark:bg-gray-800 backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 text-center drop-shadow-lg">
              My Projects
            </h1>
          </div>
        </motion.div>

        {/* Projects Grid Container */}
        <motion.div
          className="w-full max-w-6xl p-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl shadow-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <div className="rounded-2xl p-8 bg-gray-200 dark:bg-gray-800 backdrop-blur-sm">
            <motion.div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="transition-transform duration-300"
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    link={project.link}
                    image={project.image}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
