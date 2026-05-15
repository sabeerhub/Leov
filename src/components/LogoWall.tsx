'use client';

import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  { name: 'Nexus', id: 1 },
  { name: 'Vertex', id: 2 },
  { name: 'Aura', id: 3 },
  { name: 'CloudGrid', id: 4 },
  { name: 'SecureFlow', id: 5 },
  { name: 'VisionOS', id: 6 },
];

export const LogoWall = () => {
  return (
    <section className="bg-white py-20 dark:bg-[#05070A] overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="mb-12 text-center text-xs font-black uppercase tracking-[0.4em] text-gray-400 dark:text-gray-500">
          Trusted by Industry Leaders Worldwide
        </p>

        <div className="relative flex overflow-hidden">
          {/* First set of logos */}
          <motion.div
            animate={{ x: [0, -1035] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex flex-shrink-0 items-center space-x-20"
          >
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex items-center justify-center grayscale transition-all duration-500 hover:grayscale-0"
              >
                <div className="text-3xl font-black tracking-tighter text-gray-300 dark:text-gray-700 hover:text-accent transition-colors">
                  {logo.name}<span className="text-accent opacity-50">.</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
