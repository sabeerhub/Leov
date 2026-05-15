'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import Image from 'next/image';
import { Shield, Globe, Zap, BarChart3, Database, TrendingUp } from 'lucide-react';

const CARDS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', label: 'Infrastructure', icon: Database, initialX: 10, initialY: 10, depth: 1 },
  { id: 2, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', label: 'Innovation', icon: Zap, initialX: 55, initialY: 5, depth: 2 },
  { id: 3, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', label: 'Corporate', icon: Shield, initialX: 25, initialY: 45, depth: 1.5 },
  { id: 4, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', label: 'Strategy', icon: BarChart3, initialX: 65, initialY: 40, depth: 2.5 },
  { id: 5, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', label: 'Fintech', icon: Globe, initialX: 15, initialY: 75, depth: 1.2 },
  { id: 6, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop', label: 'Growth', icon: TrendingUp, initialX: 60, initialY: 75, depth: 2 },
];

interface CardProps {
  card: typeof CARDS[0];
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
  index: number;
  rotationOffset: number;
}

const FloatingCard = ({ card, mouseX, mouseY, hoveredId, setHoveredId, index, rotationOffset }: CardProps) => {
  const isHovered = hoveredId === card.id;
  const isAnyHovered = hoveredId !== null;

  // Parallax depth
  const factor = card.depth * 35;
  const tx = useTransform(mouseX, [0, 1200], [factor, -factor]);
  const ty = useTransform(mouseY, [0, 800], [factor, -factor]);

  const springConfig = { damping: 30, stiffness: 100 };
  const x = useSpring(tx, springConfig);
  const y = useSpring(ty, springConfig);

  // Repulsion effect
  const repulsionX = isAnyHovered && !isHovered ? (index % 2 === 0 ? -20 : 20) : 0;
  const repulsionY = isAnyHovered && !isHovered ? (index < 3 ? -20 : 20) : 0;

  // Rotation cycle position
  const cycleIndex = (index + rotationOffset) % CARDS.length;
  const zIndex = Math.floor(cycleIndex * 10);
  const opacity = 0.4 + (cycleIndex / CARDS.length) * 0.6;

  return (
    <motion.div
      style={{
        x, y,
        left: `${card.initialX}%`,
        top: `${card.initialY}%`,
        zIndex
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity,
        scale: isHovered ? 1.1 : 1,
        x: x.get() + repulsionX,
        y: y.get() + repulsionY,
      }}
      transition={{
        opacity: { duration: 0.8 },
        scale: { type: "spring", stiffness: 400, damping: 25 },
        x: { type: "spring", stiffness: 100, damping: 30 },
        y: { type: "spring", stiffness: 100, damping: 30 }
      }}
      onHoverStart={() => setHoveredId(card.id)}
      onHoverEnd={() => setHoveredId(null)}
      className="absolute h-44 w-60 rounded-[24px] overflow-hidden shadow-2xl glass cursor-pointer group"
    >
      <Image
        src={card.image}
        alt={card.label}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

      {/* Lighting highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-accent/30 p-2 backdrop-blur-xl border border-white/20">
            <card.icon className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-black text-white tracking-[0.1em] uppercase">{card.label}</span>
        </div>
      </div>

      {/* Continuous physics-like drift */}
      <motion.div
        className="absolute inset-0 border border-white/10 rounded-[24px]"
        animate={{
          y: [0, -12, 0],
          x: [0, 6, 0],
          rotate: [0, 1, 0]
        }}
        transition={{
          duration: 6 + card.id,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [rotationOffset, setRotationOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationOffset((prev) => (prev + 1) % CARDS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#05070A] pt-24"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-accent/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-blue-600/10 blur-[150px]" />

        {/* Animated Grain/Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="mb-8 text-6xl font-bold tracking-tight text-white md:text-[5.5rem] leading-[0.95]">
            Redefining <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent/50">Authority</span> in <br />
            <span className="text-accent">Global Business.</span>
          </h1>

          <p className="mb-12 max-w-lg text-xl text-gray-400 leading-relaxed font-light">
            LEOV combines fintech-grade innovation with world-class corporate strategy to scale your vision across borders. Fast, secure, and relentlessly professional.
          </p>

          <div className="flex flex-wrap gap-6">
            <Button size="lg" className="h-16 px-12 text-lg rounded-full bg-accent hover:bg-accent/90 shadow-[0_0_20px_rgba(0,112,243,0.3)]">
              Get Started
            </Button>
            <Button variant="secondary" size="lg" className="h-16 px-12 text-lg rounded-full border-white/10 text-white hover:bg-white/5 backdrop-blur-sm">
              View Services
            </Button>
          </div>
        </motion.div>

        {/* Right Side - Animated Visual System */}
        <div className="relative hidden h-[700px] lg:block">
          <AnimatePresence>
            {CARDS.map((card, index) => (
              <FloatingCard
                key={card.id}
                card={card}
                mouseX={mouseX}
                mouseY={mouseY}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                index={index}
                rotationOffset={rotationOffset}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile Carousel View */}
        <div className="relative flex w-full gap-4 overflow-x-auto pb-12 lg:hidden no-scrollbar snap-x">
          {CARDS.map((card) => (
            <motion.div
              key={card.id}
              className="relative aspect-[4/3] w-80 flex-shrink-0 snap-center overflow-hidden rounded-3xl shadow-2xl border border-white/10"
            >
              <Image
                src={card.image}
                alt={card.label}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="rounded-lg bg-accent/30 p-2 backdrop-blur-xl">
                  <card.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-widest">{card.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex h-14 w-8 justify-center rounded-full border-2 border-white/10 p-1.5">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-2.5 w-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
};
