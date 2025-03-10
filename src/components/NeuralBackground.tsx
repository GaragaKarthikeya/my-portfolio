"use client";

import React, { useState, useEffect, useRef, useCallback, FC } from "react";

// ---------------------------------------------------------------------------
// Types & Custom Hook: useNeuralAnimation
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

const useNeuralAnimation = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const animationFrameId = useRef<number | null>(null);
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
        ctx.arc(
          currentNode.x,
          currentNode.y,
          currentNode.radius * pulseFactor,
          0,
          Math.PI * 2
        );
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
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [dimensions, mousePos, canvasRef, isDark]);
};

export const NeuralBackground: FC = () => {
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
