'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    content: "LEOV's approach to corporate infrastructure is unparalleled. They didn't just build a system; they engineered a competitive advantage for our global operations.",
    author: "Marcus Thorne",
    role: "CEO",
    company: "Nexus Global",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 2,
    content: "The level of precision and technological depth LEOV brings to the table is what sets them apart. They are the gold standard for fintech-grade innovation in Africa.",
    author: "Elena Rodriguez",
    role: "CTO",
    company: "Innovate Africa",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 3,
    content: "Working with LEOV felt like partnering with a silicon-valley powerhouse. Their strategic clarity and execution speed are simply world-class.",
    author: "David Chen",
    role: "Managing Director",
    company: "Vertex Capital",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

export const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section id="testimonials" className="section-padding bg-[#FAFAFA] dark:bg-[#05070A] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">Testimonials</h2>
          <h3 className="text-4xl font-bold tracking-tight text-primary dark:text-white md:text-5xl">
            Trusted by the <span className="text-accent">Architects of Tomorrow.</span>
          </h3>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="relative h-[400px] md:h-[300px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                className="absolute w-full px-4"
              >
                <div className="glass rounded-3xl p-8 md:p-12 shadow-premium relative overflow-hidden">
                  <Quote className="absolute -top-4 -left-4 h-24 w-24 text-accent/5 -rotate-12" />

                  <div className="relative z-10">
                    <p className="mb-8 text-xl md:text-2xl font-medium leading-relaxed text-gray-800 dark:text-gray-200 italic">
                      "{testimonials[index].content}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-accent/20">
                        <Image
                          src={testimonials[index].image}
                          alt={testimonials[index].author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary dark:text-white">{testimonials[index].author}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonials[index].role} <span className="text-accent mx-1">•</span> {testimonials[index].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-primary transition-all hover:bg-accent hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-primary transition-all hover:bg-accent hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-accent' : 'w-2 bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
