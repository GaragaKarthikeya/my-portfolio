"use client";

import { motion } from "framer-motion";
import ProjectCard from "../../components/ProjectCard";
import { NeuralBackground } from "@/components/NeuralBackground";
import { client } from "@/lib/sanityClient";
import { useState, useEffect } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  techStack: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch projects from Sanity CMS with error logging
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"]`;
        const data = await client.fetch(query);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects from Sanity:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      {/* Neural Network Background */}
      <NeuralBackground />

      {/* Ultra Glossy Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-transparent px-4 py-12">
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

        {/* Projects Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              description={project.description}
              link={project.link}
              image={project.image}
              techStack={project.techStack}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
}
