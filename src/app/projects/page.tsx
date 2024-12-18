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
    <div
      className="flex flex-col items-center justify-center min-h-screen 
      bg-gray-100 dark:bg-gray-900 px-6"
    >
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-10">
        My Projects
      </h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md 
            hover:shadow-lg transform transition-all hover:-translate-y-2"
            whileHover={{ scale: 1.03 }}
          >
            {/* Project Title */}
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              {project.title}
            </h2>

            {/* Project Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {project.description}
            </p>

            {/* View Project Link */}
            <a
              href={project.link}
              className="inline-block px-4 py-2 rounded-full bg-blue-500 text-white 
              hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              View Project
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
