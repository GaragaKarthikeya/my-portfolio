"use client";

import { motion } from "framer-motion";
import ProjectCard from "../../components/ProjectCard";
import { NeuralBackground } from "@/components/NeuralBackground";
import { useState, useEffect } from "react";

// -----------------------------------------------------
// 🔥 Static Project Data (Instead of Sanity)
// -----------------------------------------------------
const projectData = [
  {
    id: "1",
    title: "AI Chatbot",
    description: "An advanced AI chatbot built using Next.js, OpenAI API, and Tailwind CSS.",
    link: "https://github.com/example/chatbot",
    image: "/images/chatbot.png",
    techStack: ["Next.js", "OpenAI", "Tailwind CSS"],
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with secure authentication and Stripe integration.",
    link: "https://github.com/example/ecommerce",
    image: "/images/ecommerce.png",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "A sleek and modern portfolio website with smooth animations and dark mode.",
    link: "https://github.com/example/portfolio",
    image: "/images/portfolio.png",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS"],
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<typeof projectData>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // -----------------------------------------------------
  // 🔥 Simulating Data Fetching
  // -----------------------------------------------------
  useEffect(() => {
    setTimeout(() => {
      setProjects(projectData);
      setLoading(false);
    }, 1000); // Simulates a 1s delay (remove if unnecessary)
  }, []);

  // -----------------------------------------------------
  // 🔥 Animation Variants
  // -----------------------------------------------------
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" },
    }),
  };

  return (
    <>
      {/* 🔥 Neural Network Background */}
      <NeuralBackground />

      {/* 🔥 Glossy Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-transparent px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl p-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl shadow-2xl mb-8"
        >
          <div className="rounded-2xl p-10 bg-gray-200 dark:bg-gray-800 backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 text-center drop-shadow-lg">
              🚀 My Projects
            </h1>
          </div>
        </motion.div>

        {/* 🔥 Loading Animation */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-gray-500 dark:text-gray-400"
          >
            🚀 Loading Projects...
          </motion.div>
        )}

        {/* 🔥 Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={cardVariants} custom={index}>
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                link={project.link}
                image={project.image}
                techStack={project.techStack}
              />
            </motion.div>
          ))}

          {/* 🔥 Fallback UI if no projects found */}
          {projects.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-center col-span-full"
            >
              💀 No Projects Found...
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
}
