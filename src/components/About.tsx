'use client';

import React from 'react';
import { Card } from './ui/Card';
import { Shield, Target, Zap } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="section-padding bg-white dark:bg-[#05070A]">
      <div className="container mx-auto">
        <div className="mb-16 max-w-3xl">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">Our Story</h2>
          <h3 className="text-4xl font-bold tracking-tight text-primary dark:text-white md:text-5xl">
            A Legacy of Excellence, Built for the <span className="text-accent">Future.</span>
          </h3>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
            Founded on the principles of integrity and forward-thinking, LEOV has evolved from a boutique consultancy into a powerhouse of corporate innovation. We don&apos;t just follow trends; we set the benchmark for professionalism in the African corporate-tech landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="flex flex-col items-start space-y-4">
            <div className="rounded-lg bg-blue-50 p-3 text-blue-600 dark:bg-blue-500/10">
              <Shield size={24} />
            </div>
            <h4 className="text-xl font-bold text-primary dark:text-white">Unwavering Trust</h4>
            <p className="text-gray-600 dark:text-gray-400">
              We operate with a fintech-grade security mindset, ensuring that every partnership is built on a foundation of absolute transparency.
            </p>
          </Card>

          <Card className="flex flex-col items-start space-y-4">
            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-500/10">
              <Target size={24} />
            </div>
            <h4 className="text-xl font-bold text-primary dark:text-white">Precision Strategy</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Our approach is data-driven and results-oriented. We map out every move with surgical precision to ensure maximum impact.
            </p>
          </Card>

          <Card className="flex flex-col items-start space-y-4">
            <div className="rounded-lg bg-amber-50 p-3 text-amber-600 dark:bg-amber-500/10">
              <Zap size={24} />
            </div>
            <h4 className="text-xl font-bold text-primary dark:text-white">Agile Innovation</h4>
            <p className="text-gray-600 dark:text-gray-400">
              We move at the speed of thought. Our systems are built to adapt and scale, keeping you ahead of the global competition.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
