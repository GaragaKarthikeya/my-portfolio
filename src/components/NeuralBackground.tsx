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
  lastExplosion?: number;
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
  isExplosion?: boolean;
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

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  startTime: number;
  initialOpacity: number;
  opacity: number;
}

// ---------------------------------------------------------------------------
// Custom Hook: useNeuralAnimation
// ---------------------------------------------------------------------------
const useNeuralAnimation = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  // Use lazy initializer for dimensions and dark mode so SSR gets stable values
  const [dimensions, setDimensions] = useState(() =>
    typeof window !== "undefined"
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 0, height: 0 }
  );
  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : false
  );
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const nodes = useRef<NodeType[]>([]);
  const pulses = useRef<Pulse[]>([]);
  const particles = useRef<Particle[]>([]);
  const shockwaves = useRef<Shockwave[]>([]);
  const mouseActive = useRef(false);

  // Reference area for scaling (1080p resolution)
  const REFERENCE_AREA = 1920 * 1080;

  const configRef = useRef({
    nodeDensity: randomBetween(14000, 16000),
    maxNodes:
      typeof window !== "undefined" && window.innerWidth < 768
        ? Math.round(randomBetween(45, 55))
        : Math.round(randomBetween(90, 110)),
    pulseSpeed: randomBetween(0.4, 0.6),
    forceMultiplier: randomBetween(0.004, 0.006),
    friction: randomBetween(0.98, 0.99),
    interactionRadius: randomBetween(180, 220),
    // Increase glow radius for extra glow
    glowRadius: randomBetween(90, 110) + 20,
    connectionDistance: 150,
  });
  const config = configRef.current;

  const updateDimensions = useCallback(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, [updateDimensions]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
      mq.addEventListener("change", handleChange);
      return () => mq.removeEventListener("change", handleChange);
    }
  }, []);

  // Mouse events
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

  // Touch events
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mousePosRef.current = { x: touch.clientX, y: touch.clientY };
        mouseActive.current = true;
      }
    };
    const handleTouchEnd = (e: TouchEvent) => {
      mouseActive.current = false;
      if (e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        shockwaves.current.push({
          x: touch.clientX,
          y: touch.clientY,
          radius: 0,
          maxRadius: 100,
          speed: 2,
          startTime: Date.now(),
          initialOpacity: 0.5,
          opacity: 0.5,
        });
      }
    };
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [dimensions]);

  // Click events (include dimensions for scaling)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Calculate scale factor based on screen area
      const scaleFactor = (dimensions.width * dimensions.height) / REFERENCE_AREA;
      shockwaves.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 100,
        speed: 2,
        startTime: Date.now(),
        initialOpacity: 0.5,
        opacity: 0.5,
      });
      nodes.current.forEach((node) => {
        const dist = Math.hypot(node.x - e.clientX, node.y - e.clientY);
        if (dist < 80) {
          // Generate a scaled number of particles
          const baseCount = 5;
          const particleCount = Math.floor(baseCount * scaleFactor);
          for (let k = 0; k < particleCount; k++) {
            particles.current.push({
              x: node.x,
              y: node.y,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              size: 1 + Math.random(),
              opacity: 1,
              life: 30 + Math.floor(Math.random() * 20),
            });
          }
          node.x = Math.random() * canvas.width;
          node.y = Math.random() * canvas.height;
        }
      });
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [canvasRef, dimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Initialize nodes if empty
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

    // Adjust gradient colors for enhanced glow
    const gradientStart = isDark
      ? "rgba(180, 100, 255, 0.5)"
      : "rgba(124, 58, 237, 0.5)";
    const gradientEnd = isDark ? "rgba(80, 0, 150, 0)" : "rgba(59,130,246, 0)";

    // Constants for shockwave influence
    const shockwaveThreshold = 20;
    const shockwaveForce = 0.05;

    const animate = () => {
      const now = Date.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // Update and draw pulses
      for (let i = pulses.current.length - 1; i >= 0; i--) {
        const pulse = pulses.current[i];
        const elapsed = (now - pulse.startTime) / 1000;
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

      // Occasionally generate new pulses and particles with dynamic scaling
      if (nodes.current.length > 0 && Math.random() < 0.005) {
        const scaleFactor = (dimensions.width * dimensions.height) / REFERENCE_AREA;
        const randomIndex = Math.floor(Math.random() * nodes.current.length);
        const randomNode = nodes.current[randomIndex];
        pulses.current.push({
          x: randomNode.x,
          y: randomNode.y,
          radius: randomNode.radius,
          maxRadius: 60,
          speed: config.pulseSpeed + Math.random() * config.pulseSpeed,
          startTime: now,
          initialOpacity: 0.5,
          opacity: 0.5,
        });
        const baseCount = 3 + Math.floor(Math.random() * 3);
        const particleCount = Math.floor(baseCount * scaleFactor);
        for (let k = 0; k < particleCount; k++) {
          particles.current.push({
            x: randomNode.x,
            y: randomNode.y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: 1 + Math.random(),
            opacity: 1,
            life: 30 + Math.floor(Math.random() * 20),
          });
        }
      }

      // Update and draw particles
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

      // Update and draw shockwaves, and apply their impulse to nodes
      for (let i = shockwaves.current.length - 1; i >= 0; i--) {
        const sw = shockwaves.current[i];
        sw.radius += sw.speed;
        sw.opacity = sw.initialOpacity * (1 - sw.radius / sw.maxRadius);
        if (sw.radius >= sw.maxRadius) {
          shockwaves.current.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(124,58,237,${sw.opacity.toFixed(2)})`;
          ctx.lineWidth = 3;
          ctx.stroke();

          // Apply shockwave impulse to each node near the shockwave front
          nodes.current.forEach((node) => {
            const dx = node.x - sw.x;
            const dy = node.y - sw.y;
            const dist = Math.hypot(dx, dy);
            const delta = Math.abs(dist - sw.radius);
            if (delta < shockwaveThreshold && dist !== 0) {
              const impulse = (1 - delta / shockwaveThreshold) * shockwaveForce;
              node.vx += (dx / dist) * impulse;
              node.vy += (dy / dist) * impulse;
            }
          });
        }
      }

      // Update nodes, draw connections, and enhance glow
      nodes.current.forEach((node, i) => {
        if (mouseActive.current) {
          const dx = mousePosRef.current.x - node.x;
          const dy = mousePosRef.current.y - node.y;
          const dist = Math.hypot(dx, dy);
          if (dist < config.interactionRadius) {
            const force = (config.interactionRadius - dist) / config.interactionRadius;
            node.vx -= dx * force * config.forceMultiplier;
            node.vy -= dy * force * config.forceMultiplier;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mousePosRef.current.x, mousePosRef.current.y);
            const grad = ctx.createLinearGradient(node.x, node.y, mousePosRef.current.x, mousePosRef.current.y);
            grad.addColorStop(0, gradientStart);
            grad.addColorStop(1, gradientEnd);
            ctx.strokeStyle = grad;
            ctx.lineWidth = (config.interactionRadius - dist) / config.interactionRadius;
            ctx.stroke();
          }
        }

        // Pull node back to its origin if too far
        const dxOrigin = node.originX - node.x;
        const dyOrigin = node.originY - node.y;
        if (Math.hypot(dxOrigin, dyOrigin) > 100) {
          node.vx += dxOrigin * 0.002;
          node.vy += dyOrigin * 0.002;
        }

        // Update node position with jitter and friction
        node.vx += (Math.random() - 0.5) * 0.001;
        node.vy += (Math.random() - 0.5) * 0.001;
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx = -node.vx;
        if (node.y < 0 || node.y > canvas.height) node.vy = -node.vy;
        node.vx *= config.friction;
        node.vy *= config.friction;

        // Enhanced glow: increase multiplier from 5 to 7
        const pulseFactor = 1 + 0.2 * Math.sin(now / 500 + i);
        const isNearMouse = mouseActive.current &&
          Math.hypot(mousePosRef.current.x - node.x, mousePosRef.current.y - node.y) < config.glowRadius;
        if (isNearMouse) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * pulseFactor * 7, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(124,58,237,0.5)";
          ctx.fill();
        }

        // Radial gradient for node fill
        const nodeFill = isNearMouse
          ? (isDark ? "#f472b6" : "#a855f7")
          : (isDark ? "#60a5fa" : "#3b82f6");
        const gradNode = ctx.createRadialGradient(
          node.x,
          node.y,
          node.radius * 0.2,
          node.x,
          node.y,
          node.radius * pulseFactor
        );
        gradNode.addColorStop(0, nodeFill);
        gradNode.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = gradNode;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < nodes.current.length; j++) {
          const other = nodes.current[j];
          const dxNodes = node.x - other.x;
          const dyNodes = node.y - other.y;
          const distance = Math.hypot(dxNodes, dyNodes);
          if (distance < config.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const opacity = (1 - distance / config.connectionDistance) * 0.2;
            const otherNearMouse = mouseActive.current &&
              Math.hypot(mousePosRef.current.x - other.x, mousePosRef.current.y - other.y) < config.glowRadius;
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
  }, [dimensions, canvasRef, isDark]);

};

export const NeuralBackground: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useNeuralAnimation(canvasRef);

  return (
    <div suppressHydrationWarning={true}>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen z-0"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};
