"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/projects/ProjectCard";
import { NeuralBackground } from "@/components/ui/NeuralBackground";

// We're using a JSON-style inline array for projects.
const projects = [
  {
    title: "Banking Notification App",
    description:
      "A Flutter app that extracts banking details using ML algorithms.",
    link: "https://github.com/username/banking-app",
    image: "/images/project1.png",
    technologies: ["Flutter", "Machine Learning", "Python"],
  },
  {
    title: "ML SMS Extractor",
    description:
      "Machine Learning app to extract and detect banking data from SMS.",
    link: "https://github.com/username/ml-sms-extractor",
    image: "/images/project2.png",
    technologies: ["Machine Learning", "Python", "Flutter"],
  },
  {
    title: "Portfolio Website",
    description:
      "A dynamic portfolio website built with Next.js and Tailwind CSS.",
    link: "https://github.com/username/portfolio",
    image: "/images/project3.png",
    technologies: ["Next.js", "Tailwind CSS", "JavaScript"],
  },
  // ... rest of the projects array remains the same ...
];

export default function Projects() {
  return (
    <>
      <NeuralBackground />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-transparent px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl p-1 bg-gradient-to-r from-orange-400 to-rose-600 rounded-2xl shadow-2xl mb-8"
        >
          <div className="rounded-2xl p-10 bg-orange-50 dark:bg-stone-800 backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-800 dark:text-orange-100 text-center drop-shadow-lg">
              My Projects
            </h1>
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-6xl p-1 bg-gradient-to-r from-orange-400 to-rose-600 rounded-2xl shadow-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <div className="rounded-2xl p-8 bg-orange-50 dark:bg-stone-800 backdrop-blur-sm">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    technologies={project.technologies}
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
