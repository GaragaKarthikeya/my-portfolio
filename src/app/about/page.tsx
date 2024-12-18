"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-10">
      <motion.div
        className="w-full max-w-4xl text-center rounded-2xl p-10 bg-gray-200 dark:bg-gray-800 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          About Me
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-6 leading-relaxed rounded-2xl p-4 bg-gray-200 dark:bg-gray-800">
          Hello! I’m Karthikeya, a fresher at IIIT Bangalore pursuing Integrated M.Tech (IMTech) in 
          Electronics and Communication Engineering (ECE). I’m passionate about exploring technology, 
          engineering, and creativity, and I’m committed to making an impact through innovation and collaboration.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-6 leading-relaxed rounded-2xl p-4 bg-gray-200 dark:bg-gray-800">
          I enjoy working on modern web technologies, solving problems, and exploring the latest frameworks. 
          I specialize in front-end development, crafting visually appealing and responsive user interfaces 
          with frameworks like <span className="font-semibold">React</span> and <span className="font-semibold">Next.js</span>. 
          My goal is to deliver smooth user experiences and write clean, maintainable code.
        </p>
        <div className="flex flex-wrap justify-center space-x-6">
          <a
            href="/projects"
            className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transform transition-transform hover:scale-105 mb-3"
          >
            View My Projects
          </a>
          <a
            href="mailto:Garaga.Karthikeya@iiitb.ac.in"
            className="px-6 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transform transition-transform hover:scale-105 mb-3"
          >
            Contact Me
          </a>
        </div>
      </motion.div>

      {/* Additional Sections */}
      <motion.div
        className="w-full max-w-4xl mt-10 p-8 bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-lg text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <section className="mb-10 rounded-2xl p-4 bg-gray-200 dark:bg-gray-800 shadow-inner">
          <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
            👀 I’m interested in...
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li className="rounded-xl p-2">
              <strong>VLSI Design &amp; Digital Circuits:</strong> Engrossed in Verilog, VHDL, and the design of digital systems at the chip level.
            </li>
            <li className="rounded-xl p-2">
              <strong>Competitive Programming:</strong> Enthusiastic about problem-solving, logic challenges, and algorithmic thinking.
            </li>
            <li className="rounded-xl p-2">
              <strong>Space Technologies:</strong> Fascinated by space exploration, aspiring to work on electronics and AI solutions for missions to the stars.
            </li>
            <li className="rounded-xl p-2">
              <strong>AI &amp; Machine Learning:</strong> Curious about GPT models, ML algorithms, and their intersection with communication technologies.
            </li>
            <li className="rounded-xl p-2">
              <strong>Creative Engineering:</strong> Blending technical knowledge with creativity, viewing engineering as an art form.
            </li>
          </ul>
        </section>

        <section className="mb-10 rounded-2xl p-4 bg-gray-200 dark:bg-gray-800 shadow-inner">
          <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
            🌱 I’m currently learning...
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li className="rounded-xl p-2">
              <strong>Verilog &amp; Digital Design:</strong> Working with ModelSim, Icarus Verilog, and GTKWave to simulate and design hardware.
            </li>
            <li className="rounded-xl p-2">
              <strong>C Programming:</strong> Strengthening fundamentals in memory management, recursion, and data structures.
            </li>
            <li className="rounded-xl p-2">
              <strong>Probability &amp; Calculus:</strong> Deepening mathematical rigor, essential for algorithm design and signal processing.
            </li>
            <li className="rounded-xl p-2">
              <strong>Physics for Space Applications:</strong> Understanding how electronics and communication adapt to extreme environments.
            </li>
          </ul>
        </section>

        <section className="mb-10 rounded-2xl p-4 bg-gray-200 dark:bg-gray-800 shadow-inner">
          <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
            💞️ I’m looking to collaborate on...
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li className="rounded-xl p-2">
              <strong>VLSI &amp; Digital Design Projects:</strong> Open-source contributions to Verilog-based simulations and FPGA projects.
            </li>
            <li className="rounded-xl p-2">
              <strong>Competitive Programming Projects:</strong> Collaborating on algorithmic challenges using C or Python.
            </li>
            <li className="rounded-xl p-2">
              <strong>Space Exploration Tech:</strong> Teaming up with enthusiasts to develop hardware or AI solutions for space missions.
            </li>
            <li className="rounded-xl p-2">
              <strong>Educational Content Creation:</strong> Making complex engineering concepts accessible through tutorials, blogs, or videos.
            </li>
          </ul>
        </section>

        <section className="mb-10 rounded-2xl p-4 bg-gray-200 dark:bg-gray-800 shadow-inner">
          <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
            📫 How to reach me...
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300 rounded-xl p-4 bg-gray-200 dark:bg-gray-800">
            Feel free to reach out via email at{" "}
            <a href="mailto:Garaga.Karthikeya@iiitb.ac.in" className="underline">
              Garaga.Karthikeya@iiitb.ac.in
            </a>. 
            Connect with me on LinkedIn for professional opportunities 
            (<a href="https://www.linkedin.com/in/karthikeya-garaga/" className="underline">LinkedIn Profile</a>).
          </p>
        </section>

        <section className="mb-10 rounded-2xl p-4 bg-gray-200 dark:bg-gray-800 shadow-inner">
          <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
            😄 Pronouns
          </h2>
          <p className="text-gray-700 dark:text-gray-300 rounded-xl p-4 bg-gray-200 dark:bg-gray-800">
            He/Him
          </p>
        </section>

        <section className="rounded-2xl p-4 bg-gray-200 dark:bg-gray-800 shadow-inner">
          <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
            ⚡ Fun fact about me...
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300 rounded-xl p-4 bg-gray-200 dark:bg-gray-800">
            I’m from Rajahmundry, where summer temperatures can soar up to 45-47°C, 
            inspiring me to enjoy cool indoor activities like coding. I find multivariable 
            calculus graphs mesmerizing and enjoy viewing 3D plots from different angles. 
            I’m also exploring music creation, blending my love for engineering and the arts. 
            Let’s collaborate, create, and shape the future together!
          </p>
        </section>
      </motion.div>
    </div>
  );
}
