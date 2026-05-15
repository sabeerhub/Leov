'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { Button } from './ui/Button';

const categories = ['All', 'Fintech', 'Infrastructure', 'Innovation'];

const projects = [
  { id: 1, title: 'Nexus Pay', category: 'Fintech', image: 'bg-blue-600', description: 'Real-time settlement network for pan-African trade.' },
  { id: 2, title: 'Cloud Grid', category: 'Infrastructure', image: 'bg-slate-700', description: 'Next-gen data center network for corporate resilience.' },
  { id: 3, title: 'Aura Analytics', category: 'Innovation', image: 'bg-indigo-600', description: 'AI-driven business intelligence for market leadership.' },
  { id: 4, title: 'Secure Flow', category: 'Fintech', image: 'bg-emerald-600', description: 'Encrypted transaction layer for institutional finance.' },
  { id: 5, title: 'Vertex Hub', category: 'Infrastructure', image: 'bg-cyan-600', description: 'Shared workspace infrastructure for tech ecosystems.' },
  { id: 6, title: 'Vision OS', category: 'Innovation', image: 'bg-slate-900', description: 'Enterprise operating system for global scale.' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as Transition
};

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-white dark:bg-[#05070A]">
      <div className="container mx-auto">
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          viewport={fadeInUp.viewport}
          transition={fadeInUp.transition}
          className="mb-20 flex flex-col items-center justify-between gap-10 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-accent">Portfolio</h2>
            <h3 className="text-4xl font-bold tracking-tight text-primary dark:text-white md:text-6xl leading-[1.1]">
              The Blueprint of <br /> <span className="text-accent">Success.</span>
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-500 ${
                  activeCategory === cat
                  ? 'bg-accent text-white shadow-xl scale-105'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] } as Transition}
                className="group relative overflow-hidden rounded-[32px] bg-gray-100 dark:bg-white/5 aspect-[4/5]"
              >
                <div className={`absolute inset-0 transition-transform duration-1000 group-hover:scale-110 ${project.image}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent p-10 flex flex-col justify-end opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                  <span className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-accent">{project.category}</span>
                  <h4 className="mb-3 text-3xl font-bold text-white">{project.title}</h4>
                  <p className="mb-8 text-lg text-gray-300 font-light leading-relaxed">{project.description}</p>
                  <Button variant="secondary" size="lg" className="w-fit rounded-full border-white/20 text-white hover:bg-white/10">
                    View Case Study
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.3em] text-accent">{project.category}</span>
                  <h4 className="text-2xl font-bold text-primary dark:text-white">{project.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
