'use client';

import React from 'react';

const logos = [
  { name: 'Vanguard', icon: 'V' },
  { name: 'Horizon', icon: 'H' },
  { name: 'Quantum', icon: 'Q' },
  { name: 'Stellar', icon: 'S' },
  { name: 'Apex', icon: 'A' },
  { name: 'Zenith', icon: 'Z' },
];

export const LogoWall = () => {
  return (
    <section className="border-y border-gray-100 bg-white py-12 dark:border-white/5 dark:bg-[#05070A]">
      <div className="container mx-auto px-6">
        <p className="mb-8 text-center text-sm font-bold uppercase tracking-widest text-gray-400">
          Trusted by Industry Leaders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:gap-24">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-white dark:bg-white dark:text-primary">
                {logo.icon}
              </div>
              <span className="text-xl font-bold tracking-tighter text-primary dark:text-white">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
