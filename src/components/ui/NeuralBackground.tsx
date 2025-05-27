"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

interface SystemCapabilities {
  level: 'low' | 'medium' | 'high';
  maxFPS: number;
  devicePixelRatio: number;
  isMobile: boolean;
}

interface Config {
  nodeCount: number;
  maxParticles: number;
  connectionDistance: number;
  frameInterval: number;
  nodeOpacity: number;
  connectionOpacity: number;
  particleOpacity: number;
  nodeSpeed: number;
  particleSpeed: number;
  nodeSize: number;
  connectionWidth: number;
}

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [capabilities, setCapabilities] = useState<SystemCapabilities>({
    level: 'medium',
    maxFPS: 30,
    devicePixelRatio: 1,
    isMobile: false
  });

  // System capability detection
  const getSystemCapabilities = useCallback((): SystemCapabilities => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    
    // Conservative performance assessment
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const memory = (navigator as { deviceMemory?: number }).deviceMemory || 4;
    
    let level: 'low' | 'medium' | 'high' = 'low';
    let maxFPS = 25;
    
    if (isMobile) {
      level = 'low';
      maxFPS = 20;
    } else if (hardwareConcurrency >= 8 && memory >= 8) {
      level = 'high';
      maxFPS = 60;
    } else if (hardwareConcurrency >= 4 && memory >= 4) {
      level = 'medium';
      maxFPS = 30;
    }
    
    return { level, maxFPS, devicePixelRatio, isMobile };
  }, []);

  // Performance-optimized configuration with improved visibility
  const getConfig = useCallback((caps: SystemCapabilities) => {
    const baseConfig = {
      low: {
        nodeCount: 4,
        maxParticles: 3,
        connectionDistance: 90,
        frameInterval: 50, // 20 FPS
        nodeOpacity: 0.4,
        connectionOpacity: 0.25,
        particleOpacity: 0.35,
        nodeSpeed: 0.3,
        particleSpeed: 0.8,
        nodeSize: 2,
        connectionWidth: 0.8
      },
      medium: {
        nodeCount: 8,
        maxParticles: 6,
        connectionDistance: 110,
        frameInterval: 33, // 30 FPS
        nodeOpacity: 0.5,
        connectionOpacity: 0.3,
        particleOpacity: 0.4,
        nodeSpeed: 0.4,
        particleSpeed: 1.0,
        nodeSize: 2.5,
        connectionWidth: 1.0
      },
      high: {
        nodeCount: 12,
        maxParticles: 10,
        connectionDistance: 130,
        frameInterval: 16, // 60 FPS
        nodeOpacity: 0.6,
        connectionOpacity: 0.35,
        particleOpacity: 0.45,
        nodeSpeed: 0.5,
        particleSpeed: 1.2,
        nodeSize: 3,
        connectionWidth: 1.2
      }
    };
    
    return baseConfig[caps.level];
  }, []);

  // State management
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastFrameTimeRef = useRef(0);
  const configRef = useRef<Config>(getConfig(capabilities));

  // Initialize nodes
  const initializeNodes = useCallback((canvas: HTMLCanvasElement, config: Config) => {
    const nodes: Node[] = [];
    for (let i = 0; i < config.nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * config.nodeSpeed,
        vy: (Math.random() - 0.5) * config.nodeSpeed,
        life: 1
      });
    }
    return nodes;
  }, []);

  // Create particle
  const createParticle = useCallback((canvas: HTMLCanvasElement, config: Config): Particle => {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * config.particleSpeed,
      vy: (Math.random() - 0.5) * config.particleSpeed,
      life: 1,
      maxLife: 300 + Math.random() * 200
    };
  }, []);

  // Update nodes
  const updateNodes = useCallback((nodes: Node[], canvas: HTMLCanvasElement) => {
    nodes.forEach(node => {
      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Boundary reflection
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

      // Keep within bounds
      node.x = Math.max(0, Math.min(canvas.width, node.x));
      node.y = Math.max(0, Math.min(canvas.height, node.y));
    });
  }, []);

  // Update particles
  const updateParticles = useCallback((particles: Particle[], canvas: HTMLCanvasElement, config: Config) => {
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Update life
      particle.life = Math.max(0, particle.life - 1 / particle.maxLife);
      
      // Remove dead particles or those out of bounds
      if (particle.life <= 0 || 
          particle.x < -50 || particle.x > canvas.width + 50 ||
          particle.y < -50 || particle.y > canvas.height + 50) {
        particles.splice(i, 1);
      }
    }
    
    // Add new particles occasionally with better frequency
    if (particles.length < config.maxParticles && Math.random() < 0.008) {
      particles.push(createParticle(canvas, config));
    }
  }, [createParticle]);

  // Draw nodes with improved visibility
  const drawNodes = useCallback((ctx: CanvasRenderingContext2D, nodes: Node[], config: Config) => {
    // Add subtle glow effect
    ctx.shadowColor = 'rgba(100, 150, 255, 0.3)';
    ctx.shadowBlur = 4;
    
    ctx.fillStyle = `rgba(100, 150, 255, ${config.nodeOpacity})`;
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, config.nodeSize, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }, []);

  // Draw connections with improved visibility
  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, nodes: Node[], config: Config) => {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.connectionDistance) {
          const opacity = (1 - distance / config.connectionDistance) * config.connectionOpacity;
          
          // Add subtle glow to connections
          ctx.shadowColor = `rgba(100, 150, 255, ${opacity * 0.5})`;
          ctx.shadowBlur = 2;
          
          ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
          ctx.lineWidth = config.connectionWidth;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
          
          // Reset shadow
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }
      }
    }
  }, []);

  // Draw particles with improved visibility
  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[], config: Config) => {
    particles.forEach(particle => {
      const opacity = particle.life * config.particleOpacity;
      
      // Add subtle glow to particles
      ctx.shadowColor = `rgba(100, 200, 255, ${opacity * 0.4})`;
      ctx.shadowBlur = 3;
      
      ctx.fillStyle = `rgba(100, 200, 255, ${opacity})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    });
  }, []);

  // Main animation loop
  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config = configRef.current;
    
    // Frame rate limiting
    if (currentTime - lastFrameTimeRef.current < config.frameInterval) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameTimeRef.current = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw
    updateNodes(nodesRef.current, canvas);
    updateParticles(particlesRef.current, canvas, config);
    
    drawConnections(ctx, nodesRef.current, config);
    drawNodes(ctx, nodesRef.current, config);
    drawParticles(ctx, particlesRef.current, config);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateNodes, updateParticles, drawConnections, drawNodes, drawParticles]);

  // Setup canvas
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const caps = getSystemCapabilities();
    setCapabilities(caps);
    
    const config = getConfig(caps);
    configRef.current = config;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    const scale = caps.devicePixelRatio;
    
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    
    ctx.scale(scale, scale);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    // Initialize
    nodesRef.current = initializeNodes(canvas, config);
    particlesRef.current = [];

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [getSystemCapabilities, getConfig, initializeNodes, animate]);

  // Resize handler
  const handleResize = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setupCanvas();
  }, [setupCanvas]);

  // Effects
  useEffect(() => {
    setupCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [setupCanvas, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ 
        background: 'transparent',
        willChange: 'auto'
      }}
    />
  );
};

export { NeuralBackground };
export default NeuralBackground;
