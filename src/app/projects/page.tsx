"use client";

import { motion } from "framer-motion";
import ProjectCard from "../../components/ProjectCard";
import { NeuralBackground } from "@/components/NeuralBackground";
import { client } from "@/lib/sanityClient";
import { PortableText } from "@portabletext/react";
import { useState, useEffect } from "react";
import { PortableTextBlock } from "@portabletext/types";

// -----------------------------------------------------
// 💀🔥 Interface for Project Structure
// -----------------------------------------------------
interface Project {
  _id: string;
  title: string;
  description: PortableTextBlock[];
  link: string;
  image: string;
  techStack: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // -----------------------------------------------------
  // 💀🔥 Fetch projects from Sanity CMS with error logging
  // -----------------------------------------------------
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"]`;
        const data = await client.fetch(query);
        setProjects(data);
      } catch (error) {
        console.error("🔥 Error fetching projects from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // -----------------------------------------------------
  // 💀🔥 Animate each project card individually
  // -----------------------------------------------------
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.15,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      {/* 💀🔥 Neural Network Background */}
      <NeuralBackground />

      {/* 💀🔥 Ultra Glossy Container */}
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

        {/* 💀🔥 Loading Animation */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-gray-500 dark:text-gray-400"
          >
            🚀 Fetching Projects...
          </motion.div>
        )}

        {/* 💀🔥 Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              variants={cardVariants}
              custom={index}
            >
              <ProjectCard
                key={project._id}
                title={project.title}
                description={
                  <PortableText value={project.description} />
                }
                link={project.link}
                image={
                  project.image.startsWith("http")
                    ? project.image
                    : `/images/${project.image}`
                }
                techStack={project.techStack}
              />
            </motion.div>
          ))}

          {/* 💀🔥 Fallback UI if no projects */}
          {projects.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-center col-span-full"
            >
              💀 No Projects Found... Upload something cool on Sanity.
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
}
