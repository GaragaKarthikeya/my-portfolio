"use client";
import { motion } from "framer-motion";
import projects from "../../lib/projects.json";
import ProjectCard from "../../components/ProjectCard";

export default function Projects() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4 py-12">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold mb-8 text-center"
      >
        My Projects
      </motion.h1>

      {/* Projects Grid */}
      <motion.div
        /* Removed whileInView & viewport so it’s always rendered */
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.title} // Make sure 'title' is unique, otherwise use an 'id'
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
  );
}
