"use client";

import React, { useState, useEffect, useRef, useCallback, FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown } from "react-icons/fa";

// ---------------------------------------------------------------------------
// Style Constants
// ---------------------------------------------------------------------------
const glassPanelStyles =
  "rounded-3xl backdrop-blur-md bg-white/25 dark:bg-gray-900/25 border border-white/20 dark:border-gray-700/20 shadow-xl";
const buttonStyles =
  "rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105";

// ---------------------------------------------------------------------------
// Custom Hook: useNeuralAnimation
// Handles the canvas animation, mouse events, and dynamic effects
// ---------------------------------------------------------------------------
interface NodeType {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
}

interface Pulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

const useNeuralAnimation = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const animationFrameId = useRef<number>();
  const nodes = useRef<NodeType[]>([]);
  const mouseActive = useRef(false);
  const pulses = useRef<Pulse[]>([]);

  // Update dimensions on window resize
  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Listen for dark/light mode changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Handle mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      mouseActive.current = true;
    };
    const handleMouseLeave = () => {
      mouseActive.current = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to full viewport
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Initialize nodes once
    if (nodes.current.length === 0) {
      const nodeCount = Math.min(
        Math.floor((dimensions.width * dimensions.height) / 15000),
        100
      );
      for (let i = 0; i < nodeCount; i++) {
        nodes.current.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          originX: Math.random() * dimensions.width,
          originY: Math.random() * dimensions.height,
        });
      }
    }

    // Define gradient colors based on color scheme
    const gradientStart = isDark
      ? "rgba(180, 100, 255, 0.3)"
      : "rgba(124, 58, 237, 0.2)";
    const gradientEnd = isDark ? "rgba(80, 0, 150, 0)" : "rgba(59, 130, 246, 0)";

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw pulses (iterate backwards to safely remove finished pulses)
      for (let i = pulses.current.length - 1; i >= 0; i--) {
        const pulse = pulses.current[i];
        pulse.radius += pulse.speed;
        pulse.opacity -= 0.005;
        if (pulse.opacity <= 0 || pulse.radius >= pulse.maxRadius) {
          pulses.current.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(124, 58, 237, ${pulse.opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Occasionally generate a new pulse
      if (Math.random() < 0.005) {
        const randomNode =
          nodes.current[Math.floor(Math.random() * nodes.current.length)];
        pulses.current.push({
          x: randomNode.x,
          y: randomNode.y,
          radius: randomNode.radius,
          maxRadius: 60,
          opacity: 0.5,
          speed: 0.5 + Math.random() * 0.5,
        });
      }

      // Update nodes
      nodes.current.forEach((currentNode, i) => {
        // Mouse repulsion and connection effect
        if (mouseActive.current) {
          const dx = mousePos.x - currentNode.x;
          const dy = mousePos.y - currentNode.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 200;
          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            currentNode.vx -= dx * force * 0.005;
            currentNode.vy -= dy * force * 0.005;

            ctx.beginPath();
            ctx.moveTo(currentNode.x, currentNode.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            const grad = ctx.createLinearGradient(
              currentNode.x,
              currentNode.y,
              mousePos.x,
              mousePos.y
            );
            grad.addColorStop(0, gradientStart);
            grad.addColorStop(1, gradientEnd);
            ctx.strokeStyle = grad;
            ctx.lineWidth = (maxDist - dist) / maxDist;
            ctx.shadowBlur = 5;
            ctx.shadowColor = isDark ? "#a5b4fc" : "#c7d2fe";
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }

        // Pull node back toward its origin if it strays too far
        const dxOrigin = currentNode.originX - currentNode.x;
        const dyOrigin = currentNode.originY - currentNode.y;
        if (Math.hypot(dxOrigin, dyOrigin) > 100) {
          currentNode.vx += dxOrigin * 0.002;
          currentNode.vy += dyOrigin * 0.002;
        }

        // Add subtle jitter for continuous gentle motion
        currentNode.vx += (Math.random() - 0.5) * 0.001;
        currentNode.vy += (Math.random() - 0.5) * 0.001;

        // Update node position
        currentNode.x += currentNode.vx;
        currentNode.y += currentNode.vy;

        // Reflect off boundaries
        if (currentNode.x < 0 || currentNode.x > canvas.width)
          currentNode.vx = -currentNode.vx;
        if (currentNode.y < 0 || currentNode.y > canvas.height)
          currentNode.vy = -currentNode.vy;

        // Apply friction for gradual slowing
        currentNode.vx *= 0.99;
        currentNode.vy *= 0.99;

        // Calculate a pulse factor based on time for subtle node pulsing
        const pulseFactor = 1 + 0.2 * Math.sin(Date.now() / 500 + i);

        // Determine if node is near the mouse pointer
        const isNearMouse =
          mouseActive.current &&
          Math.hypot(mousePos.x - currentNode.x, mousePos.y - currentNode.y) <
            100;

        // Draw glow if near mouse
        if (isNearMouse) {
          ctx.beginPath();
          ctx.arc(
            currentNode.x,
            currentNode.y,
            currentNode.radius * pulseFactor * 3,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "rgba(124, 58, 237, 0.3)";
          ctx.fill();
        }

        // Set node fill color based on color scheme and proximity
        const nodeFill = isNearMouse
          ? isDark
            ? "#f472b6"
            : "#a855f7"
          : isDark
          ? "#60a5fa"
          : "#3b82f6";

        // Draw node with pulsing effect and glow
        ctx.beginPath();
        ctx.arc(currentNode.x, currentNode.y, currentNode.radius * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = nodeFill;
        ctx.shadowBlur = 10;
        ctx.shadowColor = nodeFill;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw lines between nearby nodes
        for (let j = i + 1; j < nodes.current.length; j++) {
          const otherNode = nodes.current[j];
          const dxNodes = currentNode.x - otherNode.x;
          const dyNodes = currentNode.y - otherNode.y;
          const distance = Math.hypot(dxNodes, dyNodes);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(currentNode.x, currentNode.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            const opacity = (1 - distance / 150) * 0.2;
            const otherNearMouse =
              mouseActive.current &&
              Math.hypot(mousePos.x - otherNode.x, mousePos.y - otherNode.y) <
                100;
            ctx.strokeStyle =
              isNearMouse || otherNearMouse
                ? `rgba(124, 58, 237, ${opacity * 2})`
                : `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = isNearMouse || otherNearMouse ? 1.5 : 0.8;
            ctx.shadowBlur = 5;
            ctx.shadowColor = isDark ? "#a5b4fc" : "#c7d2fe";
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [dimensions, mousePos, canvasRef, isDark]);
};

// ---------------------------------------------------------------------------
// NeuralBackground Component (Full-Page Fixed Canvas)
// ---------------------------------------------------------------------------
const NeuralBackground: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useNeuralAnimation(canvasRef);
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen z-0"
      style={{ pointerEvents: "none" }}
    />
  );
};

// ---------------------------------------------------------------------------
// Page Sections
// ---------------------------------------------------------------------------
const HeroSection: FC = () => (
  <section className="relative flex items-center justify-center min-h-screen px-4 py-10 z-10">
    <motion.div
      className="text-center relative z-10 max-w-4xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-xl bg-gradient-to-br from-blue-400 to-purple-500 ring-4 ring-white/50 dark:ring-gray-800/50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        <Typewriter
          options={{
            strings: [
              "Karthikeya: The Future Iron Man",
              "VLSI Engineer & FPGA Developer",
              "Machine Learning Enthusiast",
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 40,
          }}
        />
      </h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-700 dark:text-gray-300 leading-relaxed p-6 ${glassPanelStyles}`}
      >
        Welcome to my portfolio—where hardware innovation meets cutting-edge software development.
        I blend VLSI design expertise with modern web development to create tomorrow's technologies.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex justify-center space-x-6 mb-10"
      >
        {[
          { icon: <FaGithub size={20} />, url: "https://github.com/" },
          { icon: <FaLinkedin size={20} />, url: "https://linkedin.com/" },
          { icon: <FaTwitter size={20} />, url: "https://twitter.com/" },
        ].map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/50 dark:bg-gray-800/50 shadow-md hover:shadow-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transform hover:scale-110 transition-all backdrop-blur-sm"
          >
            {social.icon}
          </a>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <Link href="/about" className={`${buttonStyles} bg-blue-500 text-white hover:bg-blue-600 px-8 py-3`}>
          About Me
        </Link>
        <Link href="/projects" className={`${buttonStyles} bg-green-500 text-white hover:bg-green-600 px-8 py-3`}>
          Projects
        </Link>
        <Link href="/contact" className={`${buttonStyles} bg-blue-500 text-white hover:bg-blue-600 px-8 py-3`}>
          Contact
        </Link>
        <a
          href="/resume.pdf"
          target="_blank"
          className={`${buttonStyles} border-2 border-blue-500 text-blue-500 dark:text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3`}
        >
          Resume
        </a>
      </motion.div>
    </motion.div>
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <FaArrowDown className="text-gray-600 dark:text-gray-400" />
    </div>
  </section>
);

const AboutSection: FC = () => (
  <section className="py-20 px-4 z-10 relative">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100 relative inline-block">
          About Me
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
        </h2>
        <p className={`text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed p-6 ${glassPanelStyles}`}>
          I'm Karthikeya—a passionate front-end developer and ECE student with a strong foundation in VLSI design.
          My journey spans building FPGA projects and designing MIPS CPUs to exploring machine learning and excelling in competitive programming.
          I thrive at the intersection of hardware and software, always pushing the limits of innovation.
        </p>
        <Link href="/about" className={`${buttonStyles} bg-blue-500 text-white hover:bg-blue-600 inline-block px-8 py-3`}>
          Learn More
        </Link>
      </motion.div>
    </div>
  </section>
);

const SkillsSection: FC = () => {
  const skills: string[] = [
    "React, Next.js, Tailwind CSS, Framer-Motion",
    "Machine Learning, Data Structures & Algorithms",
    "VLSI Design & Digital Logic",
    "FPGA Design & MIPS CPU Development",
    "Competitive Programming (Codeforces, LeetCode)",
    "UI/UX & Responsive Design",
    "Hardware Enthusiasm & System Architecture",
  ];
  return (
    <section className="py-20 px-4 z-10 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100 relative inline-block mx-auto"
        >
          Technical Expertise
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${glassPanelStyles} p-6 hover:shadow-2xl transition-all`}
            >
              <p className="text-gray-700 dark:text-gray-300 text-lg">{skill}</p>
              <div className="w-full h-2 bg-gray-300/50 dark:bg-gray-600/50 rounded-full mt-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${75 + Math.random() * 20}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineSection: FC = () => {
  const timeline: { year: string; event: string; icon: string }[] = [
    { year: "2018", event: "Started my journey in programming and digital electronics.", icon: "💡" },
    { year: "2019", event: "Built my first FPGA project and explored VLSI design.", icon: "🔧" },
    { year: "2020", event: "Dove into competitive programming and machine learning.", icon: "🧠" },
    { year: "2021", event: "Designed a MIPS CPU and mastered digital logic.", icon: "🖥️" },
    { year: "2022", event: "Collaborated on innovative projects and honed my skills.", icon: "👥" },
    { year: "2023", event: "Pushed boundaries in front-end development and AI integration.", icon: "🚀" },
  ];
  return (
    <section className="py-20 px-4 z-10 relative">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100 relative inline-block mx-auto"
        >
          My Journey
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
        </motion.h2>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full">
            <div className="w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-blue-500 h-full"></div>
          </div>
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex md:flex-row flex-col items-center md:items-start"
              >
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:pl-16 md:order-last"
                  }`}
                >
                  <div className={`p-6 ${glassPanelStyles}`}>
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <p className="text-xl font-bold text-blue-500 mb-2">{item.year}</p>
                    <p className="text-gray-700 dark:text-gray-300">{item.event}</p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white dark:border-gray-800 z-10 shadow-lg"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection: FC = () => (
  <section className="py-20 px-4 z-10 relative">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`p-8 ${glassPanelStyles}`}
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100 relative inline-block">
          Ready to Collaborate?
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 p-6 bg-white/20 dark:bg-gray-800/20 rounded-3xl">
          Have a project in mind or want to discuss technology? Let's connect and create something extraordinary!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className={`${buttonStyles} bg-blue-500 text-white hover:bg-blue-600 px-8 py-3`}>
            Get in Touch
          </Link>
          <a href="mailto:Garaga.Karthikeya@iiitb.ac.in" className={`${buttonStyles} bg-green-500 text-white hover:bg-green-600 px-8 py-3`}>
            Email Me
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Main Home Component (Pure immersive experience: no extra overlay)
// ---------------------------------------------------------------------------
const Home: FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <NeuralBackground />
      {/* Main content container now has a completely transparent background */}
      <div className="relative z-10 flex flex-col min-h-screen bg-transparent text-gray-800 dark:text-gray-100">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <TimelineSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Home;
