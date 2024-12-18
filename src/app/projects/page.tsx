"use client";
import { motion } from "framer-motion";
import projects from "../../lib/projects.json";
import ProjectCard from "../../components/ProjectCard";

export default function Projects() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-12">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-10 text-center"
      >
        My Projects
      </motion.h1>

      {/* Projects Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {/* Render Project Cards */}
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
  );
}
