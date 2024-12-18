"use client";
import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "Project Title 1",
      description: "A brief description of the project.",
      link: "#",
    },
    {
      title: "Project Title 2",
      description: "Another amazing project description.",
      link: "#",
    },
    {
      title: "Project Title 3",
      description: "Yet another project worth showcasing.",
      link: "#",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-12">
      {/* Heading */}
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
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              {project.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {project.description}
            </p>
            <a
              href={project.link}
              className="inline-block px-5 py-2 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-all duration-300"
            >
              View Project
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
