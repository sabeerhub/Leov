'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { Button } from './ui/Button';
import Image from 'next/image';

const categories = ['All', 'Fintech', 'Infrastructure', 'Innovation'];

const projects = [
  {
    id: 1,
    title: 'Nexus Pay',
    category: 'Fintech',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    description: 'Real-time settlement network for pan-African trade.'
  },
  {
    id: 2,
    title: 'Cloud Grid',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    description: 'Next-gen data center network for corporate resilience.'
  },
  {
    id: 3,
    title: 'Aura Analytics',
    category: 'Innovation',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    description: 'AI-driven business intelligence for market leadership.'
  },
  {
    id: 4,
    title: 'Secure Flow',
    category: 'Fintech',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    description: 'Encrypted transaction layer for institutional finance.'
  },
  {
    id: 5,
    title: 'Vertex Hub',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    description: 'Shared workspace infrastructure for tech ecosystems.'
  },
  {
    id: 6,
    title: 'Vision OS',
    category: 'Innovation',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    description: 'Enterprise operating system for global scale.'
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as Transition
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    } as Transition
  },
};

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="container mx-auto">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="mb-20 flex flex-col items-center justify-between gap-10 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <h2 className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-accent">Portfolio</h2>
            <h3 className="text-4xl font-bold tracking-tight text-primary md:text-6xl leading-[1.1]">
              The Blueprint of <br /> <span className="text-accent">Success.</span>
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-8 py-3 text-[11px] font-black tracking-widest uppercase transition-all duration-500 ${
                  activeCategory === cat
                  ? 'bg-primary text-white shadow-xl'
                  : 'bg-slate-50 text-gray-400 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={cardVariants}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="group relative overflow-hidden rounded-[40px] bg-slate-50 aspect-[4/5] shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent p-12 flex flex-col justify-end opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                  <span className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-accent">{project.category}</span>
                  <h4 className="mb-3 text-4xl font-bold text-white">{project.title}</h4>
                  <p className="mb-10 text-lg text-slate-300 font-light leading-relaxed">{project.description}</p>
                  <Button variant="secondary" size="lg" className="w-fit rounded-full border-white/20 text-white hover:bg-white/10 font-black tracking-widest uppercase text-xs">
                    View Case Study
                  </Button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-12 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-accent">{project.category}</span>
                  <h4 className="text-3xl font-bold text-primary">{project.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
