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
  const factor = card.depth * 25;
  const tx = useTransform(mouseX, [0, 1000], [factor, -factor]);
  const ty = useTransform(mouseY, [0, 1000], [factor, -factor]);

  const springConfig = { damping: 25, stiffness: 120 };
  const x = useSpring(tx, springConfig);
  const y = useSpring(ty, springConfig);

  // Repulsion effect
  const repulsionX = isAnyHovered && !isHovered ? (index % 2 === 0 ? -15 : 15) : 0;
  const repulsionY = isAnyHovered && !isHovered ? (index < 3 ? -15 : 15) : 0;

  // Rotation cycle position
  const cycleIndex = (index + rotationOffset) % CARDS.length;
  const zIndex = Math.floor(cycleIndex * 10);
  const opacity = 0.5 + (cycleIndex / CARDS.length) * 0.5;

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
        opacity: { duration: 0.5 },
        scale: { type: "spring", stiffness: 300, damping: 20 },
      }}
      onHoverStart={() => setHoveredId(card.id)}
      onHoverEnd={() => setHoveredId(null)}
      className="absolute h-40 w-56 rounded-2xl overflow-hidden shadow-2xl glass cursor-pointer"
    >
      <Image
        src={card.image}
        alt={card.label}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-accent/20 p-1.5 backdrop-blur-md">
            <card.icon className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-white tracking-wide uppercase">{card.label}</span>
        </div>
      </div>

      {/* Continuous float animation via internal div to not mess with parallax */}
      <motion.div
        className="absolute inset-0 border border-white/20 rounded-2xl"
        animate={{
          y: [0, -8, 0],
          x: [0, 4, 0]
        }}
        transition={{
          duration: 5 + card.id,
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
    }, 5000);
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
      className="relative flex min-h-screen items-center overflow-hidden bg-[#FAFAFA] pt-24 dark:bg-[#05070A]"
    >
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="z-20"
        >
          <h1 className="mb-6 text-6xl font-bold tracking-tight text-primary dark:text-white md:text-8xl leading-[1.1]">
            Redefining Authority in <span className="text-accent">Global Business.</span>
          </h1>
          <p className="mb-10 max-w-lg text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            LEOV combines fintech-grade innovation with world-class corporate strategy to scale your vision across borders. Fast, secure, and relentlessly professional.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="h-14 px-10 text-lg">Get Started</Button>
            <Button variant="secondary" size="lg" className="h-14 px-10 text-lg">View Services</Button>
          </div>
        </motion.div>

        {/* Right Side - Animated Visual System */}
        <div className="relative hidden h-[650px] lg:block">
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

          {/* Background Decorative Elements */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute -bottom-20 left-20 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />
        </div>

        {/* Mobile Carousel View */}
        <div className="relative flex w-full gap-4 overflow-x-auto pb-8 lg:hidden no-scrollbar snap-x">
          {CARDS.map((card) => (
            <motion.div
              key={card.id}
              className="relative aspect-[4/3] w-72 flex-shrink-0 snap-center overflow-hidden rounded-2xl shadow-xl"
            >
              <Image
                src={card.image}
                alt={card.label}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <card.icon className="h-4 w-4 text-accent" />
                <span className="text-sm font-bold text-white uppercase">{card.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex h-12 w-7 justify-center rounded-full border-2 border-gray-300 p-1 dark:border-gray-800">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
};
