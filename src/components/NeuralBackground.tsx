"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  FC,
} from "react";

// Helper: Random value between min and max
const randomBetween = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

// Constant: Reference area for dynamic particle scaling (1080p)
const REFERENCE_AREA = 1920 * 1080;

// Types
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

// Custom Hook: useNeuralAnimation
const useNeuralAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) => {
  const [dimensions, setDimensions] = useState(() =>
    typeof window !== "undefined"
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 0, height: 0 }
  );
  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  );
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const nodes = useRef<NodeType[]>([]);
  const pulses = useRef<Pulse[]>([]);
  const particles = useRef<Particle[]>([]);
  const shockwaves = useRef<Shockwave[]>([]);
  const mouseActive = useRef(false);

  // Memoized configuration with boosted values for coolness
  const config = useMemo(
    () => ({
      nodeDensity: randomBetween(12000, 14000), // More nodes
      maxNodes:
        typeof window !== "undefined" && window.innerWidth < 768
          ? Math.round(randomBetween(50, 60))
          : Math.round(randomBetween(100, 120)),
      pulseSpeed: randomBetween(0.5, 0.8), // Faster pulses
      forceMultiplier: randomBetween(0.006, 0.008), // Stronger mouse pull
      friction: randomBetween(0.97, 0.98), // Less friction for more bounce
      interactionRadius: randomBetween(200, 250), // Bigger interaction zone
      glowRadius: randomBetween(100, 120) + 30, // Epic glow
      connectionDistance: 180, // Longer connections
    }),
    []
  );

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

  // Mouse events with continuous particle trail
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      mouseActive.current = true;
      if (Math.random() < 0.1) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          size: randomBetween(1, 3),
          opacity: 0.8,
          life: randomBetween(20, 40),
        });
      }
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

  // Touch events with burst
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
          maxRadius: 120,
          speed: 3,
          startTime: Date.now(),
          initialOpacity: 0.7,
          opacity: 0.7,
        });
      }
    };
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Click events with epic explosion
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const scaleFactor =
        (dimensions.width * dimensions.height) / REFERENCE_AREA;
      shockwaves.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 150,
        speed: 4,
        startTime: Date.now(),
        initialOpacity: 0.8,
        opacity: 0.8,
      });
      nodes.current.forEach((node) => {
        const dist = Math.hypot(node.x - e.clientX, node.y - e.clientY);
        if (dist < 100) {
          const baseCount = 8;
          const particleCount = Math.floor(baseCount * scaleFactor);
          for (let k = 0; k < particleCount; k++) {
            particles.current.push({
              x: node.x,
              y: node.y,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              size: randomBetween(1, 4),
              opacity: 1,
              life: randomBetween(30, 50),
            });
          }
          node.x = Math.random() * canvas.width;
          node.y = Math.random() * canvas.height;
        }
      });
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [canvasRef, dimensions, config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    if (nodes.current.length === 0) {
      const nodeCount = Math.min(
        Math.floor((dimensions.width * dimensions.height) / config.nodeDensity),
        config.maxNodes
      );
      for (let i = 0; i < nodeCount; i++) {
        nodes.current.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          radius: randomBetween(2, 4), // Bigger nodes
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          originX: Math.random() * dimensions.width,
          originY: Math.random() * dimensions.height,
        });
      }
    }

    const gradientStart = isDark
      ? "rgba(180, 100, 255, 0.5)"
      : "rgba(124, 58, 237, 0.5)";
    const gradientEnd = isDark
      ? "rgba(80, 0, 150, 0)"
      : "rgba(59,130,246, 0)";

    const shockwaveThreshold = 25;
    const shockwaveForce = 0.08;

    const animate = () => {
      const now = Date.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // Subtle background texture (noise)
      ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)";
      for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          randomBetween(1, 3),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // Update and draw pulses with trail
      for (let i = pulses.current.length - 1; i >= 0; i--) {
        const pulse = pulses.current[i];
        const elapsed = (now - pulse.startTime) / 1000;
        const oscillation = (Math.cos(elapsed * Math.PI * 4) + 1) / 2; // Faster pulse
        pulse.opacity = pulse.initialOpacity * (1 - elapsed) * oscillation;
        pulse.radius += pulse.speed;
        if (
          pulse.opacity <= 0.02 ||
          pulse.radius >= pulse.maxRadius ||
          elapsed > 1
        ) {
          pulses.current.splice(i, 1);
        } else {
          // Trail effect
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(124,58,237,${(pulse.opacity * 0.4).toFixed(2)})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(124,58,237,${pulse.opacity.toFixed(2)})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      // Generate pulses and particle bursts more often
      if (nodes.current.length > 0 && Math.random() < 0.015) {
        const scaleFactor =
          (dimensions.width * dimensions.height) / REFERENCE_AREA;
        const randomIndex = Math.floor(Math.random() * nodes.current.length);
        const randomNode = nodes.current[randomIndex];
        pulses.current.push({
          x: randomNode.x,
          y: randomNode.y,
          radius: randomNode.radius,
          maxRadius: randomBetween(70, 100),
          speed: config.pulseSpeed + Math.random() * 0.5,
          startTime: now,
          initialOpacity: 0.7,
          opacity: 0.7,
        });
        const baseCount = 5 + Math.floor(Math.random() * 5);
        const particleCount = Math.floor(baseCount * scaleFactor);
        for (let k = 0; k < particleCount; k++) {
          particles.current.push({
            x: randomNode.x,
            y: randomNode.y,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            size: randomBetween(1, 4),
            opacity: 1,
            life: randomBetween(30, 60),
          });
        }
      }

      // Update and draw particles with trails
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.opacity *= 0.92; // Slower fade
        p.vx *= 0.98; // Add some drag
        p.vy *= 0.98;

        // Trail
        ctx.beginPath();
        ctx.arc(p.x - p.vx * 0.5, p.y - p.vy * 0.5, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${(p.opacity * 0.3).toFixed(2)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${p.opacity.toFixed(2)})`;
        ctx.fill();
        if (p.life <= 0 || p.opacity < 0.05) {
          particles.current.splice(i, 1);
        }
      }

      // Update and draw shockwaves with particle burst
      for (let i = shockwaves.current.length - 1; i >= 0; i--) {
        const sw = shockwaves.current[i];
        sw.radius += sw.speed;
        sw.opacity = sw.initialOpacity * (1 - sw.radius / sw.maxRadius);
        if (sw.radius >= sw.maxRadius) {
          // Burst on completion
          for (let k = 0; k < 15; k++) {
            particles.current.push({
              x: sw.x,
              y: sw.y,
              vx: (Math.random() - 0.5) * 5,
              vy: (Math.random() - 0.5) * 5,
              size: randomBetween(2, 5),
              opacity: 1,
              life: randomBetween(20, 40),
            });
          }
          shockwaves.current.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(124,58,237,${sw.opacity.toFixed(2)})`;
          ctx.lineWidth = 4;
          ctx.stroke();

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

      // Update nodes with enhanced effects
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
            const grad = ctx.createLinearGradient(
              node.x,
              node.y,
              mousePosRef.current.x,
              mousePosRef.current.y
            );
            grad.addColorStop(0, gradientStart);
            grad.addColorStop(1, gradientEnd);
            ctx.strokeStyle = grad;
            ctx.lineWidth = (config.interactionRadius - dist) / config.interactionRadius * 2;
            ctx.stroke();
          }
        }

        const dxOrigin = node.originX - node.x;
        const dyOrigin = node.originY - node.y;
        if (Math.hypot(dxOrigin, dyOrigin) > 150) {
          node.vx += dxOrigin * 0.003;
          node.vy += dyOrigin * 0.003;
        }

        node.vx += (Math.random() - 0.5) * 0.002; // More jitter
        node.vy += (Math.random() - 0.5) * 0.002;
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx = -node.vx * 0.9;
        if (node.y < 0 || node.y > canvas.height) node.vy = -node.vy * 0.9;
        node.vx *= config.friction;
        node.vy *= config.friction;

        // Double-layered glow
        const pulseFactor = 1 + 0.3 * Math.sin(now / 400 + i); // Faster, bigger pulse
        const isNearMouse =
          mouseActive.current &&
          Math.hypot(
            mousePosRef.current.x - node.x,
            mousePosRef.current.y - node.y
          ) < config.glowRadius;
        if (isNearMouse) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * pulseFactor * 12, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(124,58,237,0.2)"; // Outer glow
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * pulseFactor * 8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(124,58,237,0.6)"; // Inner glow
          ctx.fill();
        }

        const nodeFill = isNearMouse
          ? (isDark ? "#f472b6" : "#a855f7")
          : (isDark ? "#60a5fa" : "#3b82f6");
        const gradNode = ctx.createRadialGradient(
          node.x,
          node.y,
          node.radius * 0.2,
          node.x,
          node.y,
          node.radius * pulseFactor * 2 // Bigger gradient
        );
        gradNode.addColorStop(0, nodeFill);
        gradNode.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = gradNode;
        ctx.fill();

        // Connections with thicker lines
        for (let j = i + 1; j < nodes.current.length; j++) {
          const other = nodes.current[j];
          const dxNodes = node.x - other.x;
          const dyNodes = node.y - other.y;
          const distance = Math.hypot(dxNodes, dyNodes);
          if (distance < config.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const opacity = (1 - distance / config.connectionDistance) * 0.3;
            const otherNearMouse =
              mouseActive.current &&
              Math.hypot(
                mousePosRef.current.x - other.x,
                mousePosRef.current.y - other.y
              ) < config.glowRadius;
            ctx.strokeStyle =
              isNearMouse || otherNearMouse
                ? `rgba(124,58,237,${(opacity * 2).toFixed(2)})`
                : `rgba(59,130,246,${opacity.toFixed(2)})`;
            ctx.lineWidth = isNearMouse || otherNearMouse ? 2 : 1;
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
  }, [dimensions, canvasRef, isDark, config]);
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