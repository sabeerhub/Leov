'use client';

import React from 'react';
import { Card } from './ui/Card';
import {
  Shield,
  Globe,
  Zap,
  BarChart3,
  Database,
  TrendingUp
} from 'lucide-react';
import { motion, Transition } from 'framer-motion';

const services = [
  {
    title: 'Strategic Consulting',
    description: 'High-level advisory services for digital transformation and market entry.',
    icon: Database,
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
  },
  {
    title: 'Fintech Infrastructure',
    description: 'Scalable payment gateways and financial software ecosystems.',
    icon: Zap,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
  },
  {
    title: 'Global Expansion',
    description: 'Connecting African enterprises with international markets and investors.',
    icon: Globe,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 dark:bg-indigo-500/10',
  },
  {
    title: 'Cyber Security',
    description: 'Enterprise-grade protection for your most critical digital assets.',
    icon: Shield,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50 dark:bg-cyan-500/10',
  },
  {
    title: 'Data Analytics',
    description: 'Advanced BI solutions to turn your data into actionable intelligence.',
    icon: BarChart3,
    color: 'text-slate-600',
    bg: 'bg-slate-50 dark:bg-slate-500/10',
  },
  {
    title: 'Venture Studio',
    description: 'Incubating the next generation of African high-growth tech startups.',
    icon: TrendingUp,
    color: 'text-blue-700',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as Transition
};

export const Services = () => {
  return (
    <section id="services" className="section-padding bg-[#FAFAFA] dark:bg-[#05070A]">
      <div className="container mx-auto">
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          viewport={fadeInUp.viewport}
          transition={fadeInUp.transition}
          className="mb-20 text-center"
        >
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-accent">Solutions</h2>
          <h3 className="text-4xl font-bold tracking-tight text-primary dark:text-white md:text-6xl">
            Engineered for <span className="text-accent">Excellence.</span>
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            Our suite of services is designed to handle the complexity of modern business, providing you with a clear path to leadership in your industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] } as Transition}
            >
              <Card className="group flex flex-col items-start space-y-6 p-10 rounded-[32px] border-none bg-white dark:bg-white/5 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                <div className={`rounded-2xl ${service.bg} p-5 ${service.color} group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon size={32} />
                </div>
                <h4 className="text-2xl font-bold text-primary dark:text-white">{service.title}</h4>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
