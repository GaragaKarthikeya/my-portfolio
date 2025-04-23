"use client";

import { motion } from "framer-motion";
import { NeuralBackground } from "@/components/ui/NeuralBackground";
import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaCode,
  FaMicrochip,
  FaRocket,
  FaLaptopCode,
} from "react-icons/fa";

export default function About() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Only attach mousemove listener if not mobile
    if (window.innerWidth >= 768) {
      const handleMouseMove = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", checkMobile);
      };
    } else {
      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }
  }, []);

  const interestItems = [
    {
      icon: <FaMicrochip className="text-2xl text-blue-500" />,
      title: "VLSI Design & Digital Circuits",
      description: "Engrossed in Verilog, VHDL, and digital system design.",
    },
    {
      icon: <FaCode className="text-2xl text-indigo-500" />,
      title: "Competitive Programming",
      description: "Enthusiastic about algorithmic challenges and problem-solving.",
    },
    {
      icon: <FaRocket className="text-2xl text-purple-500" />,
      title: "Space Technologies",
      description: "Fascinated by space exploration and AI solutions for space missions.",
    },
    {
      icon: <FaLaptopCode className="text-2xl text-pink-500" />,
      title: "AI & Machine Learning",
      description: "Curious about GPT models, ML algorithms, and their applications.",
    },
    {
      icon: <FaCode className="text-2xl text-green-500" />,
      title: "Creative Engineering",
      description: "Blending technical expertise with artistic creativity.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      {/* Render the heavy NeuralBackground only on non-mobile devices */}
      {!isMobile && <NeuralBackground />}

      {/* Cursor Effect - only for desktop; clip to circle to avoid square block shadow */}
      {isMounted && !isMobile && (
        <div className="pointer-events-none fixed inset-0 z-30" aria-hidden="true">
          <div
            className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-500/20 blur-xl"
            style={{
              left: `${cursorPosition.x - 80}px`,
              top: `${cursorPosition.y - 80}px`,
              transition: "transform 0.1s ease-out",
              clipPath: "circle(50% at 50% 50%)",
            }}
          />
        </div>
      )}

      {/* Ultra Glossy Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-transparent">
        {/* Hero Section with Glass Morphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-4xl mb-8 overflow-hidden"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Background gradient with glass effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-600/80 backdrop-blur-sm z-0"></div>

            {/* Light flare effects */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl"></div>

            <div className="relative z-10 p-8 md:p-12 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 p-1"
              >
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  {/* Profile initial or image */}
                  <span className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
                    KG
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-5xl md:text-6xl font-extrabold text-center text-white mb-4 drop-shadow-xl"
              >
                <span className="bg-gradient-to-r from-blue-200 to-purple-100 text-transparent bg-clip-text">
                  Karthikeya Garaga
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-center text-blue-100 text-xl mb-8 max-w-2xl mx-auto"
              >
                IMTech Student at IIIT Bangalore • Electronics & Communication Enthusiast
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a
                  href="/projects"
                  className="px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-white/30 flex items-center gap-2"
                >
                  <span>View Projects</span>
                  <span className="text-blue-300">→</span>
                </a>
                <a
                  href="mailto:Garaga.Karthikeya@iiitb.ac.in"
                  className="px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-white/30 flex items-center gap-2"
                >
                  <span>Contact Me</span>
                  <FaEnvelope className="text-blue-300" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* About Me Section with Frosted Glass Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-4xl mb-8 overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-md p-[1px]"
        >
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-3xl p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              About Me
            </h2>

            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl leading-relaxed backdrop-blur-sm rounded-2xl p-4 bg-white/40 dark:bg-gray-800/40 shadow-lg border border-white/30 dark:border-gray-700/50"
              >
                Hello! I'm Karthikeya, a fresher at IIIT Bangalore pursuing Integrated M.Tech (IMTech) in Electronics
                and Communication Engineering (ECE). I'm passionate about exploring technology, engineering,
                and creativity, and I'm committed to making an impact through innovation and collaboration.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl leading-relaxed backdrop-blur-sm rounded-2xl p-4 bg-white/40 dark:bg-gray-800/40 shadow-lg border border-white/30 dark:border-gray-700/50"
              >
                I enjoy working on modern web technologies, solving problems, and exploring the latest frameworks. I
                specialize in front-end development, crafting visually appealing and responsive user interfaces with
                frameworks like{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">React</span> and{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">Next.js</span>. My goal is to
                deliver smooth user experiences and write clean, maintainable code.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Interests Section with Modern Card Layout */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl mb-8 overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-md p-[1px]"
        >
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-3xl p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              👀 I'm interested in...
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interestItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="backdrop-blur-sm rounded-2xl p-5 bg-white/40 dark:bg-gray-800/40 shadow-lg border border-white/30 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-xl bg-white/70 dark:bg-gray-700/70 shadow-md group-hover:shadow-xl transition-all">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.title}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Learning & Collaboration Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="w-full max-w-4xl mb-8 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Learning Section */}
            <div className="rounded-3xl shadow-2xl bg-gradient-to-bl from-blue-600/10 to-purple-600/10 backdrop-blur-md p-[1px] h-full">
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-3xl p-6 md:p-8 h-full">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-500 text-transparent bg-clip-text flex items-center">
                  <span className="mr-2">🌱</span> Currently learning
                </h2>

                <ul className="space-y-4">
                  {[
                    {
                      title: "Verilog & Digital Design",
                      desc: "Simulating hardware with ModelSim and GTKWave.",
                    },
                    {
                      title: "C Programming",
                      desc: "Strengthening fundamentals in memory management and data structures.",
                    },
                    {
                      title: "Probability & Calculus",
                      desc: "Deepening mathematical skills essential for engineering.",
                    },
                    {
                      title: "Physics for Space Applications",
                      desc: "Understanding electronics and communication in extreme environments.",
                    },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="backdrop-blur-sm rounded-xl p-3 bg-white/40 dark:bg-gray-800/40 shadow-md border border-white/30 dark:border-gray-700/50"
                    >
                      <h3 className="font-bold text-gray-800 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Collaboration Section */}
            <div className="rounded-3xl shadow-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-md p-[1px] h-full">
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-3xl p-6 md:p-8 h-full">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text flex items-center">
                  <span className="mr-2">💞️</span> Looking to collaborate on
                </h2>

                <ul className="space-y-4">
                  {[
                    {
                      title: "VLSI & Digital Design Projects",
                      desc: "Contributing to FPGA projects and hardware simulations.",
                    },
                    {
                      title: "Competitive Programming Projects",
                      desc: "Tackling algorithmic challenges in C or Python.",
                    },
                    {
                      title: "Space Exploration Tech",
                      desc: "Developing AI/hardware solutions for space missions.",
                    },
                    {
                      title: "Educational Content Creation",
                      desc: "Making complex concepts accessible through tutorials or blogs.",
                    },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="backdrop-blur-sm rounded-xl p-3 bg-white/40 dark:bg-gray-800/40 shadow-md border border-white/30 dark:border-gray-700/50"
                    >
                      <h3 className="font-bold text-gray-800 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact & Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-4xl mb-8 overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-md p-[1px]"
        >
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-3xl p-8 md:p-10">
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text border-b border-gray-400 dark:border-gray-600 pb-2">
                📫 How to reach me
              </h2>
              <p className="leading-relaxed text-gray-800 dark:text-gray-100">
                Feel free to reach out via email at{" "}
                <a
                  href="mailto:Garaga.Karthikeya@iiitb.ac.in"
                  className="underline text-blue-400 dark:text-blue-300"
                >
                  Garaga.Karthikeya@iiitb.ac.in
                </a>
                . Connect with me on LinkedIn for professional opportunities (
                <a
                  href="https://www.linkedin.com/in/karthikeya-garaga/"
                  className="underline text-blue-400 dark:text-blue-300"
                >
                  LinkedIn Profile
                </a>
                ).
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text border-b border-gray-400 dark:border-gray-600 pb-2">
                😄 Pronouns
              </h2>
              <p className="text-gray-800 dark:text-gray-100">He/Him</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text border-b border-gray-400 dark:border-gray-600 pb-2">
                ⚡ Fun fact
              </h2>
              <p className="leading-relaxed text-gray-800 dark:text-gray-100">
                I’m from Rajahmundry, where summer temperatures can soar up to 45-47°C, inspiring me to enjoy coding
                indoors. I love multivariable calculus graphs and exploring 3D plots from different angles. I’m also
                into music creation, blending engineering and the arts—let’s collaborate and shape the future together!
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}
