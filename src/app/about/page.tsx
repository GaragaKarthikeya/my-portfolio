"use client";

import { motion } from "framer-motion";
import { NeuralBackground } from "@/components/NeuralBackground";

export default function About() {
  return (
    <>
      {/* Neural Network Background */}
      <NeuralBackground />

      {/* Ultra Glossy Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-transparent">
        {/* Main Card with Glossy Border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-4xl p-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl shadow-2xl mb-8"
        >
          <div className="rounded-2xl p-10 bg-gray-200 dark:bg-gray-800 backdrop-blur-sm">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4 drop-shadow-xl">
              About Me
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-6 leading-relaxed rounded-2xl p-4 bg-white/70 dark:bg-gray-700/70 shadow-lg">
              Hello! I’m Karthikeya, a fresher at IIIT Bangalore pursuing Integrated M.Tech (IMTech) in 
              Electronics and Communication Engineering (ECE). I’m passionate about exploring technology, 
              engineering, and creativity, and I’m committed to making an impact through innovation and collaboration.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-6 leading-relaxed rounded-2xl p-4 bg-white/70 dark:bg-gray-700/70 shadow-lg">
              I enjoy working on modern web technologies, solving problems, and exploring the latest frameworks. 
              I specialize in front-end development, crafting visually appealing and responsive user interfaces 
              with frameworks like <span className="font-semibold">React</span> and <span className="font-semibold">Next.js</span>. 
              My goal is to deliver smooth user experiences and write clean, maintainable code.
            </p>
            <div className="flex flex-wrap justify-center space-x-6">
              <a
                href="/projects"
                className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transform transition-transform hover:scale-105 shadow-lg"
              >
                View My Projects
              </a>
              <a
                href="mailto:Garaga.Karthikeya@iiitb.ac.in"
                className="px-6 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transform transition-transform hover:scale-105 shadow-lg"
              >
                Contact Me
              </a>
            </div>
          </div>
        </motion.div>

        {/* Additional Sections in Glossy Containers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full max-w-4xl p-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl shadow-2xl"
        >
          <div className="rounded-2xl p-8 bg-gray-200 dark:bg-gray-800 backdrop-blur-sm text-gray-800 dark:text-gray-100">
            <section className="mb-10 rounded-2xl p-4 bg-white/70 dark:bg-gray-700/70 shadow-lg">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                👀 I’m interested in...
              </h2>
              <ul className="list-disc ml-6 space-y-2">
                <li className="rounded-xl p-2">
                  <strong>VLSI Design &amp; Digital Circuits:</strong> Engrossed in Verilog, VHDL, and digital system design.
                </li>
                <li className="rounded-xl p-2">
                  <strong>Competitive Programming:</strong> Enthusiastic about algorithmic challenges and problem-solving.
                </li>
                <li className="rounded-xl p-2">
                  <strong>Space Technologies:</strong> Fascinated by space exploration and AI solutions for space missions.
                </li>
                <li className="rounded-xl p-2">
                  <strong>AI &amp; Machine Learning:</strong> Curious about GPT models, ML algorithms, and their applications.
                </li>
                <li className="rounded-xl p-2">
                  <strong>Creative Engineering:</strong> Blending technical expertise with artistic creativity.
                </li>
              </ul>
            </section>

            <section className="mb-10 rounded-2xl p-4 bg-white/70 dark:bg-gray-700/70 shadow-lg">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                🌱 I’m currently learning...
              </h2>
              <ul className="list-disc ml-6 space-y-2">
                <li className="rounded-xl p-2">
                  <strong>Verilog &amp; Digital Design:</strong> Simulating hardware with ModelSim and GTKWave.
                </li>
                <li className="rounded-xl p-2">
                  <strong>C Programming:</strong> Strengthening fundamentals in memory management and data structures.
                </li>
                <li className="rounded-xl p-2">
                  <strong>Probability &amp; Calculus:</strong> Deepening mathematical skills essential for engineering.
                </li>
                <li className="rounded-xl p-2">
                  <strong>Physics for Space Applications:</strong> Understanding electronics and communication in extreme environments.
                </li>
              </ul>
            </section>

            <section className="mb-10 rounded-2xl p-4 bg-white/70 dark:bg-gray-700/70 shadow-lg">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                💞️ I’m looking to collaborate on...
              </h2>
              <ul className="list-disc ml-6 space-y-2">
                <li className="rounded-xl p-2">
                  <strong>VLSI &amp; Digital Design Projects:</strong> Contributing to FPGA projects and hardware simulations.
                </li>
                <li className="rounded-xl p-2">
                  <strong>Competitive Programming Projects:</strong> Tackling algorithmic challenges in C or Python.
                </li>
                <li className="rounded-xl p-2">
                  <strong>Space Exploration Tech:</strong> Developing AI/hardware solutions for space missions.
                </li>
                <li className="rounded-xl p-2">
                  <strong>Educational Content Creation:</strong> Making complex concepts accessible through tutorials or blogs.
                </li>
              </ul>
            </section>

            <section className="mb-10 rounded-2xl p-4 bg-white/70 dark:bg-gray-700/70 shadow-lg">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                📫 How to reach me...
              </h2>
              <p className="leading-relaxed">
                Feel free to reach out via email at{" "}
                <a href="mailto:Garaga.Karthikeya@iiitb.ac.in" className="underline">
                  Garaga.Karthikeya@iiitb.ac.in
                </a>.
                Connect with me on LinkedIn for professional opportunities (
                <a href="https://www.linkedin.com/in/karthikeya-garaga/" className="underline">
                  LinkedIn Profile
                </a>
                ).
              </p>
            </section>

            <section className="mb-10 rounded-2xl p-4 bg-white/70 dark:bg-gray-700/70 shadow-lg">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                😄 Pronouns
              </h2>
              <p>He/Him</p>
            </section>

            <section className="rounded-2xl p-4 bg-white/70 dark:bg-gray-700/70 shadow-lg">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                ⚡ Fun fact about me...
              </h2>
              <p className="leading-relaxed">
                I’m from Rajahmundry, where summer temperatures can soar up to 45-47°C, inspiring me to enjoy cool indoor activities like coding.
                I find multivariable calculus graphs mesmerizing and enjoy 3D plots from different angles.
                I’m also exploring music creation, blending my love for engineering and the arts. Let’s collaborate and shape the future together!
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}
