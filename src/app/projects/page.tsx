"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import projects from "../../lib/projects.json";

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

export function ProjectCard({ title, description, link, image }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Optimized Image */}
      <div className="relative w-full h-40 sm:h-48 md:h-56">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
          priority
        />
      </div>
      <h3 className="text-lg md:text-2xl font-bold mt-4 text-gray-800 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
      >
        View Project
      </a>
    </div>
  );
}
