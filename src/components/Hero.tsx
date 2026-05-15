'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence, useAnimationFrame } from 'framer-motion';
import { Button } from './ui/Button';
import Image from 'next/image';
import { Shield, Globe, Zap, BarChart3, Database, TrendingUp } from 'lucide-react';

const CARDS_DATA = [
  { id: 1, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', label: 'Infrastructure', icon: Database, depth: 1 },
  { id: 2, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', label: 'Innovation', icon: Zap, depth: 2 },
  { id: 3, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', label: 'Corporate', icon: Shield, depth: 1.5 },
  { id: 4, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', label: 'Strategy', icon: BarChart3, depth: 2.5 },
  { id: 5, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', label: 'Fintech', icon: Globe, depth: 1.2 },
  { id: 6, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop', label: 'Growth', icon: TrendingUp, depth: 2 },
];

const POSITIONS = [
  { x: 10, y: 10 },
  { x: 55, y: 5 },
  { x: 25, y: 45 },
  { x: 65, y: 40 },
  { x: 15, y: 75 },
  { x: 60, y: 75 },
];

interface CardProps {
  card: typeof CARDS_DATA[0];
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

  // Calculate slot index based on rotation
  const slotIndex = (index + rotationOffset) % POSITIONS.length;
  const slot = POSITIONS[slotIndex];

  // Continuous floating animation
  const time = useMotionValue(0);
  useAnimationFrame((t) => time.set(t / 1000));

  const floatY = useTransform(time, (t) => Math.sin(t + index) * 10);
  const floatX = useTransform(time, (t) => Math.cos(t * 0.8 + index) * 5);

  // Parallax based on mouse
  const parallaxFactor = card.depth * 25;
  const parallaxX = useTransform(mouseX, [0, 1200], [parallaxFactor, -parallaxFactor]);
  const parallaxY = useTransform(mouseY, [0, 800], [parallaxFactor, -parallaxFactor]);

  // Repulsion effect
  const repulsionX = isAnyHovered && !isHovered ? (slot.x < 50 ? -20 : 20) : 0;
  const repulsionY = isAnyHovered && !isHovered ? (slot.y < 50 ? -20 : 20) : 0;

  // Combine all motions
  const combinedX = useMotionValue(0);
  const combinedY = useMotionValue(0);

  useEffect(() => {
    const unsubscribeX = parallaxX.on("change", (v) => combinedX.set(v + floatX.get() + repulsionX));
    const unsubscribeY = parallaxY.on("change", (v) => combinedY.set(v + floatY.get() + repulsionY));
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [parallaxX, parallaxY, floatX, floatY, repulsionX, repulsionY, combinedX, combinedY]);

  const springConfig = { damping: 30, stiffness: 100 };
  const x = useSpring(combinedX, springConfig);
  const y = useSpring(combinedY, springConfig);

  const zIndex = 10 + slotIndex;
  const opacity = 0.7 + (slotIndex / POSITIONS.length) * 0.3;

  return (
    <motion.div
      layout
      style={{
        x, y,
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        zIndex
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isHovered ? 1 : opacity,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        layout: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
        scale: { type: "spring", stiffness: 400, damping: 25 },
      }}
      onHoverStart={() => setHoveredId(card.id)}
      onHoverEnd={() => setHoveredId(null)}
      className="absolute h-40 w-56 rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] glass cursor-pointer group"
    >
      <Image
        src={card.image}
        alt={card.label}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent transition-opacity duration-500 group-hover:opacity-60" />

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-accent/40 p-1.5 backdrop-blur-xl border border-white/20">
            <card.icon className="h-4 w-4 text-white" />
          </div>
          <span className="text-[10px] font-black text-white tracking-[0.2em] uppercase">{card.label}</span>
        </div>
      </div>

      <div className="absolute inset-0 border border-white/20 rounded-[24px]" />
    </motion.div>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(600);
  const mouseY = useMotionValue(400);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [rotationOffset, setRotationOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationOffset((prev) => (prev + 1) % CARDS_DATA.length);
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
      className="relative flex min-h-screen items-center overflow-hidden bg-white pt-24"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-blue-400/5 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 flex items-center gap-2"
          >
            <div className="h-[2px] w-12 bg-accent" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent">Established Excellence</span>
          </motion.div>

          <h1 className="mb-8 text-6xl font-bold tracking-tight text-primary md:text-[5.5rem] leading-[0.95]">
            Redefining <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent/50">Authority</span> in <br />
            <span className="text-accent">Global Business.</span>
          </h1>

          <p className="mb-12 max-w-lg text-xl text-slate-500 leading-relaxed font-light">
            LEOV combines fintech-grade innovation with world-class corporate strategy to scale your vision across borders. Fast, secure, and relentlessly professional.
          </p>

          <div className="flex flex-wrap gap-6">
            <Button size="lg" className="h-16 px-12 text-[13px] font-black tracking-widest uppercase rounded-full bg-primary hover:bg-accent-dark shadow-2xl">
              Get Started
            </Button>
            <Button variant="secondary" size="lg" className="h-16 px-12 text-[13px] font-black tracking-widest uppercase rounded-full border-slate-200 text-primary hover:bg-slate-50 transition-all">
              View Services
            </Button>
          </div>
        </motion.div>

        <div className="relative hidden h-[650px] lg:block">
          {CARDS_DATA.map((card, index) => (
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
        </div>

        {/* Mobile View */}
        <div className="relative flex w-full gap-4 overflow-x-auto pb-12 lg:hidden no-scrollbar snap-x">
          {CARDS_DATA.map((card) => (
            <motion.div
              key={card.id}
              className="relative aspect-[4/3] w-80 flex-shrink-0 snap-center overflow-hidden rounded-[32px] shadow-2xl border border-slate-100"
            >
              <Image src={card.image} alt={card.label} fill sizes="320px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="rounded-lg bg-accent/40 p-2 backdrop-blur-xl">
                  <card.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{card.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex h-12 w-7 justify-center rounded-full border-2 border-slate-200 p-1.5">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
};
