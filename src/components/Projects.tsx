'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-white dark:bg-[#05070A]">
      <div className="container mx-auto">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">Portfolio</h2>
            <h3 className="text-4xl font-bold tracking-tight text-primary dark:text-white md:text-5xl">
              The Blueprint of <span className="text-accent">Success.</span>
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                  activeCategory === cat
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-white/5"
              >
                <div className={`aspect-16/10 w-full transition-transform duration-500 group-hover:scale-110 ${project.image}`} />
                <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/20 to-transparent p-8 flex flex-col justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">{project.category}</span>
                  <h4 className="mb-2 text-2xl font-bold text-white">{project.title}</h4>
                  <p className="mb-4 text-sm text-gray-300">{project.description}</p>
                  <Button variant="secondary" size="sm" className="w-fit">View Case Study</Button>
                </div>
                <div className="p-6 transition-opacity group-hover:opacity-0">
                  <span className="mb-1 text-xs font-bold uppercase tracking-widest text-accent">{project.category}</span>
                  <h4 className="text-xl font-bold text-primary dark:text-white">{project.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
