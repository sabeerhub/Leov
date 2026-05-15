'use client';

import React from 'react';
import { Card } from './ui/Card';
import { Globe, BarChart, Cpu, Lock, Briefcase, Rocket } from 'lucide-react';

const services = [
  {
    title: 'Strategic Consulting',
    description: 'High-level advisory services for digital transformation and market entry.',
    icon: <Briefcase className="text-blue-500" />,
  },
  {
    title: 'Fintech Infrastructure',
    description: 'Scalable payment gateways and financial software ecosystems.',
    icon: <Cpu className="text-emerald-500" />,
  },
  {
    title: 'Global Expansion',
    description: 'Connecting African enterprises with international markets and investors.',
    icon: <Globe className="text-indigo-500" />,
  },
  {
    title: 'Cyber Security',
    description: 'Advanced protection for corporate assets and sensitive data.',
    icon: <Lock className="text-cyan-500" />,
  },
  {
    title: 'Data Analytics',
    description: 'Unlocking actionable insights through custom AI-driven dashboards.',
    icon: <BarChart className="text-slate-500" />,
  },
  {
    title: 'Venture Studio',
    description: 'Incubating and accelerating the next generation of SaaS unicorns.',
    icon: <Rocket className="text-orange-500" />,
  },
];

export const Services = () => {
  return (
    <section id="services" className="section-padding bg-soft-white dark:bg-[#0A0E1A]">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">Solutions</h2>
          <h3 className="text-4xl font-bold tracking-tight text-primary dark:text-white md:text-5xl">
            Engineered for <span className="text-accent">Excellence.</span>
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Our suite of services is designed to handle the complexity of modern business, providing you with a clear path to leadership in your industry.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="group flex flex-col justify-between h-full hover:border-accent/50 transition-colors">
              <div>
                <div className="mb-4 inline-block rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-100 group-hover:ring-accent/20 dark:bg-primary/50 dark:ring-white/10 [&>svg]:size-7">
                  {service.icon}
                </div>
                <h4 className="mb-2 text-xl font-bold text-primary dark:text-white">{service.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
              <div className="mt-6 flex items-center text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <span className="ml-2">→</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
