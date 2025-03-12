"use client";

import { motion } from "framer-motion";
import ProjectCard from "../../components/ProjectCard";
import { NeuralBackground } from "@/components/NeuralBackground";
import { useState, useEffect } from "react";

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
  {
    title: "Notification Data Tracker",
    description:
      "A tracker that automatically updates financial information by reading notifications.",
    link: "https://github.com/username/notification-tracker",
    image: "/images/project4.png",
    technologies: ["Android", "Firebase", "Java"],
  },
  {
    title: "Digital Design Learning Tool",
    description:
      "A tool to help students practice and understand digital design concepts effectively.",
    link: "https://github.com/username/digital-design-tool",
    image: "/images/project5.png",
    technologies: ["Digital Design", "Verilog", "FPGA"],
  },
  {
    title: "DSA Visualization Platform",
    description:
      "An interactive web app to visualize Data Structures and Algorithms.",
    link: "https://github.com/username/dsa-visualizer",
    image: "/images/project6.png",
    technologies: ["React", "JavaScript", "Data Structures"],
  },
  {
    title: "Linear Algebra Solver",
    description:
      "A Python-based solver for linear algebra problems, focusing on matrices and vectors.",
    link: "https://github.com/username/linear-algebra-solver",
    image: "/images/project7.png",
    technologies: ["Python", "NumPy", "Mathematics"],
  },
  {
    title: "STEM Expo Organizer Tool",
    description:
      "A web app designed to organize and manage STEM expos for schools.",
    link: "https://github.com/username/stem-expo-tool",
    image: "/images/project8.png",
    technologies: ["React", "JavaScript", "Event Management"],
  },
  {
    title: "Physical Education Tracker",
    description:
      "An app to log and track physical education activities and fitness progress.",
    link: "https://github.com/username/pe-tracker",
    image: "/images/project9.png",
    technologies: ["Android", "Firebase", "Health Tracking"],
  },
  {
    title: "Economics Calculator",
    description:
      "A mobile app for solving economic problems and visualizing key concepts.",
    link: "https://github.com/username/economics-calculator",
    image: "/images/project10.png",
    technologies: ["Android", "Kotlin", "Economics"],
  },
  {
    title: "Credit Card Fraud Detector",
    description:
      "A machine learning model to detect fraudulent transactions in banking data.",
    link: "https://github.com/username/fraud-detector",
    image: "/images/project11.png",
    technologies: ["Machine Learning", "Python", "Banking"],
  },
  {
    title: "AI Chatbot Assistant",
    description:
      "A chatbot designed to help with academic and project queries.",
    link: "https://github.com/username/chatbot-assistant",
    image: "/images/project12.png",
    technologies: ["Python", "Chatbot", "AI"],
  },
  {
    title: "Open Source Contributions Tracker",
    description:
      "A tracker to manage and showcase open source contributions across platforms.",
    link: "https://github.com/username/oss-tracker",
    image: "/images/project13.png",
    technologies: ["GitHub", "Open Source", "React"],
  },
  {
    title: "Flutter-based Weather App",
    description:
      "A minimalistic weather app with live updates and forecasts.",
    link: "https://github.com/username/weather-app",
    image: "/images/project14.png",
    technologies: ["Flutter", "API", "Weather"],
  },
  {
    title: "Graph Theory Visualizer",
    description:
      "An interactive tool to visualize graphs and algorithms like BFS, DFS, and Dijkstra.",
    link: "https://github.com/username/graph-visualizer",
    image: "/images/project15.png",
    technologies: ["JavaScript", "D3.js", "Graph Theory"],
  },
];

export default function Projects() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a fast fetch
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  // Optional: Simple entrance animation for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      {/* Neural Background */}
      <NeuralBackground />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-transparent">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl p-1 bg-gradient-to-r from-blue-500 to-pink-500 rounded-2xl shadow-lg mb-8"
        >
          <div className="rounded-2xl p-10 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 drop-shadow">
              🚀 My Projects
            </h1>
          </div>
        </motion.header>

        {/* Projects Grid */}
        {loading ? (
          <motion.div
            className="flex flex-wrap gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <motion.div
                  key={idx}
                  className="w-80 h-64 rounded-xl bg-gray-300/40 dark:bg-gray-800/60 animate-pulse"
                />
              ))}
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className="transition-transform duration-300"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  link={project.link}
                  image={project.image}
                  techStack={project.technologies}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}
