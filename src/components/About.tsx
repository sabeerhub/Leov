'use client';

import React from 'react';
import { Card } from './ui/Card';
import { Shield, Target, Zap } from 'lucide-react';
import { motion, TargetAndTransition, VariantLabels, Transition } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as Transition
};

export const About = () => {
  return (
    <section id="about" className="section-padding bg-white dark:bg-[#05070A]">
      <div className="container mx-auto">
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          viewport={fadeInUp.viewport}
          transition={fadeInUp.transition}
          className="mb-16 max-w-3xl"
        >
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">Our Story</h2>
          <h3 className="text-4xl font-bold tracking-tight text-primary dark:text-white md:text-6xl leading-[1.1]">
            A Legacy of Excellence, Built for the <span className="text-accent">Future.</span>
          </h3>
          <p className="mt-8 text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
            Founded on the principles of integrity and forward-thinking, LEOV has evolved from a boutique consultancy into a powerhouse of corporate innovation. We don&apos;t just follow trends; we set the benchmark for professionalism in the African corporate-tech landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Unwavering Trust",
              color: "text-blue-600 dark:text-blue-400",
              bg: "bg-blue-50 dark:bg-blue-500/10",
              text: "We operate with a fintech-grade security mindset, ensuring that every partnership is built on a foundation of absolute transparency."
            },
            {
              icon: Target,
              title: "Precision Strategy",
              color: "text-emerald-600 dark:text-emerald-400",
              bg: "bg-emerald-50 dark:bg-emerald-500/10",
              text: "Our approach is data-driven and results-oriented. We map out every move with surgical precision to ensure maximum impact."
            },
            {
              icon: Zap,
              title: "Agile Innovation",
              color: "text-amber-600 dark:text-amber-400",
              bg: "bg-amber-50 dark:bg-amber-500/10",
              text: "We move at the speed of thought. Our systems are built to adapt and scale, keeping you ahead of the global competition."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] } as Transition}
            >
              <Card className="flex h-full flex-col items-start space-y-6 p-8 rounded-[24px] border-none bg-[#F8F9FA] dark:bg-white/5 hover:shadow-2xl transition-all duration-500">
                <div className={`rounded-2xl ${item.bg} p-4 ${item.color}`}>
                  <item.icon size={28} />
                </div>
                <h4 className="text-2xl font-bold text-primary dark:text-white">{item.title}</h4>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  {item.text}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
