"use client";

import React, { useState, useEffect, useRef, useCallback, FC } from "react";

// ---------------------------------------------------------------------------
// Helper: Random value between min and max
// ---------------------------------------------------------------------------
const randomBetween = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

// ---------------------------------------------------------------------------
// Types
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
  speed: number;
  startTime: number;
  initialOpacity: number;
  opacity: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

// ---------------------------------------------------------------------------
// Custom Hook: useNeuralAnimation
// ---------------------------------------------------------------------------
const useNeuralAnimation = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  // Use a ref for mouse position instead of state
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const animationFrameId = useRef<number | null>(null);
  const nodes = useRef<NodeType[]>([]);
  const pulses = useRef<Pulse[]>([]);
  const particles = useRef<Particle[]>([]);
  const mouseActive = useRef(false);

  // -------------------------------------------------------------------------
  // Dynamic Configuration (randomized once on mount)
  // -------------------------------------------------------------------------
  const configRef = useRef({
    nodeDensity: randomBetween(14000, 16000), // Lower means more nodes per area
    maxNodes:
      window.innerWidth < 768
        ? Math.round(randomBetween(45, 55))
        : Math.round(randomBetween(90, 110)),
    pulseSpeed: randomBetween(0.4, 0.6),
    forceMultiplier: randomBetween(0.004, 0.006),
    friction: randomBetween(0.98, 0.99),
    interactionRadius: randomBetween(180, 220),
    glowRadius: randomBetween(90, 110),
    connectionDistance: 150, // static for now
  });
  const config = configRef.current;

  // -------------------------------------------------------------------------
  // Update dimensions on window resize
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // Listen for dark/light mode changes
  // -------------------------------------------------------------------------
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // -------------------------------------------------------------------------
  // Handle mouse events for desktop using refs
  // -------------------------------------------------------------------------
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
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

  // -------------------------------------------------------------------------
  // Handle touch events for mobile using refs
  // -------------------------------------------------------------------------
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mousePosRef.current = { x: touch.clientX, y: touch.clientY };
        mouseActive.current = true;
      }
    };
    const handleTouchEnd = () => {
      mouseActive.current = false;
    };
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // -------------------------------------------------------------------------
  // Main Animation Loop
  // -------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Initialize nodes (only once)
    if (nodes.current.length === 0) {
      const nodeCount = Math.min(
        Math.floor((dimensions.width * dimensions.height) / config.nodeDensity),
        config.maxNodes
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

    // Colors for connections
    const gradientStart = isDark
      ? "rgba(180, 100, 255, 0.3)"
      : "rgba(124, 58, 237, 0.2)";
    const gradientEnd = isDark
      ? "rgba(80, 0, 150, 0)"
      : "rgba(59, 130,246, 0)";

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // Update Pulses with Oscillatory Decay
      for (let i = pulses.current.length - 1; i >= 0; i--) {
        const pulse = pulses.current[i];
        const elapsed = (now - pulse.startTime) / 1000; // seconds
        const oscillation = (Math.cos(elapsed * Math.PI * 2) + 1) / 2;
        pulse.opacity = pulse.initialOpacity * (1 - elapsed) * oscillation;
        pulse.radius += pulse.speed;
        if (pulse.opacity <= 0.02 || pulse.radius >= pulse.maxRadius || elapsed > 1.5) {
          pulses.current.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(124,58,237,${pulse.opacity.toFixed(2)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Occasionally generate a new pulse and spawn particles (throttled)
      if (Math.random() < 0.005) {
        const randomNode = nodes.current[Math.floor(Math.random() * nodes.current.length)];
        const newPulse: Pulse = {
          x: randomNode.x,
          y: randomNode.y,
          radius: randomNode.radius,
          maxRadius: 60,
          speed: config.pulseSpeed + Math.random() * config.pulseSpeed,
          startTime: now,
          initialOpacity: 0.5,
          opacity: 0.5,
        };
        pulses.current.push(newPulse);

        const count = 3 + Math.floor(Math.random() * 3);
        for (let k = 0; k < count; k++) {
          particles.current.push({
            x: randomNode.x,
            y: randomNode.y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: 1 + Math.random() * 1,
            opacity: 1,
            life: 30 + Math.floor(Math.random() * 20),
          });
        }
      }

      // Update and Draw Particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.opacity *= 0.95;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${p.opacity.toFixed(2)})`;
        ctx.fill();
        if (p.life <= 0 || p.opacity < 0.05) {
          particles.current.splice(i, 1);
        }
      }

      // Cache mouse coordinates locally
      const { x: mouseX, y: mouseY } = mousePosRef.current;

      // Update Nodes and Draw Connections with Radial Gradients
      nodes.current.forEach((currentNode, i) => {
        if (mouseActive.current) {
          const dx = mouseX - currentNode.x;
          const dy = mouseY - currentNode.y;
          const dist = Math.hypot(dx, dy);
          if (dist < config.interactionRadius) {
            const force = (config.interactionRadius - dist) / config.interactionRadius;
            currentNode.vx -= dx * force * config.forceMultiplier;
            currentNode.vy -= dy * force * config.forceMultiplier;
            ctx.beginPath();
            ctx.moveTo(currentNode.x, currentNode.y);
            ctx.lineTo(mouseX, mouseY);
            const grad = ctx.createLinearGradient(currentNode.x, currentNode.y, mouseX, mouseY);
            grad.addColorStop(0, gradientStart);
            grad.addColorStop(1, gradientEnd);
            ctx.strokeStyle = grad;
            ctx.lineWidth = (config.interactionRadius - dist) / config.interactionRadius;
            ctx.stroke();
          }
        }

        // Pull node back to its origin if too far
        const dxOrigin = currentNode.originX - currentNode.x;
        const dyOrigin = currentNode.originY - currentNode.y;
        if (Math.hypot(dxOrigin, dyOrigin) > 100) {
          currentNode.vx += dxOrigin * 0.002;
          currentNode.vy += dyOrigin * 0.002;
        }

        // Add subtle jitter and update node position
        currentNode.vx += (Math.random() - 0.5) * 0.001;
        currentNode.vy += (Math.random() - 0.5) * 0.001;
        currentNode.x += currentNode.vx;
        currentNode.y += currentNode.vy;
        if (currentNode.x < 0 || currentNode.x > canvas.width) currentNode.vx = -currentNode.vx;
        if (currentNode.y < 0 || currentNode.y > canvas.height) currentNode.vy = -currentNode.vy;
        currentNode.vx *= config.friction;
        currentNode.vy *= config.friction;

        const pulseFactor = 1 + 0.2 * Math.sin(now / 500 + i);
        const isNearMouse =
          mouseActive.current &&
          Math.hypot(mouseX - currentNode.x, mouseY - currentNode.y) < config.glowRadius;

        // Optional glow when near pointer
        if (isNearMouse) {
          ctx.beginPath();
          ctx.arc(
            currentNode.x,
            currentNode.y,
            currentNode.radius * pulseFactor * 3,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "rgba(124,58,237,0.3)";
          ctx.fill();
        }

        // Use a radial gradient for node fill
        const nodeFill = isNearMouse
          ? (isDark ? "#f472b6" : "#a855f7")
          : (isDark ? "#60a5fa" : "#3b82f6");
        const gradient = ctx.createRadialGradient(
          currentNode.x,
          currentNode.y,
          currentNode.radius * 0.2,
          currentNode.x,
          currentNode.y,
          currentNode.radius * pulseFactor
        );
        gradient.addColorStop(0, nodeFill);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.beginPath();
        ctx.arc(currentNode.x, currentNode.y, currentNode.radius * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections between nodes
        for (let j = i + 1; j < nodes.current.length; j++) {
          const otherNode = nodes.current[j];
          const dxNodes = currentNode.x - otherNode.x;
          const dyNodes = currentNode.y - otherNode.y;
          const distance = Math.hypot(dxNodes, dyNodes);
          if (distance < config.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(currentNode.x, currentNode.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            const opacity = (1 - distance / config.connectionDistance) * 0.2;
            const otherNearMouse =
              mouseActive.current &&
              Math.hypot(mouseX - otherNode.x, mouseY - otherNode.y) < config.glowRadius;
            ctx.strokeStyle =
              isNearMouse || otherNearMouse
                ? `rgba(124,58,237,${(opacity * 2).toFixed(2)})`
                : `rgba(59,130,246,${opacity.toFixed(2)})`;
            ctx.lineWidth = isNearMouse || otherNearMouse ? 1.5 : 0.8;
            ctx.stroke();
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
  }, [dimensions, canvasRef, isDark]); // Note: mouse position is not included here!

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
