'use client';

import React from 'react';
import { Button } from './ui/Button';
import { motion, Transition } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as Transition
};

export const Contact = () => {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formsubmit.co/ajax/mustaphaabdulsalam1666@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-[#05070A]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
          >
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-accent">Contact Us</h2>
            <h3 className="mb-8 text-5xl font-bold tracking-tight text-primary dark:text-white md:text-7xl leading-[1.1]">
              Let&apos;s Build the <span className="text-accent">Future</span> Together.
            </h3>
            <p className="mb-12 text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              Ready to scale your vision? Our team of experts is standing by to help you navigate the complexities of global business.
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-primary dark:text-white">Headquarters</h4>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-light">123 Innovation Drive, Tech District, Lagos</p>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-primary dark:text-white">General Inquiries</h4>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-light">hello@leov.com</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={{ ...fadeInUp.transition, delay: 0.2 } as Transition}
            className="rounded-[40px] bg-[#F8F9FA] p-10 dark:bg-white/5 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-2xl border-none bg-white px-6 py-4 text-primary shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-accent dark:bg-white/5 dark:text-white dark:ring-white/10"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-gray-500">Work Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-2xl border-none bg-white px-6 py-4 text-primary shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-accent dark:bg-white/5 dark:text-white dark:ring-white/10"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold uppercase tracking-widest text-gray-500">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full rounded-2xl border-none bg-white px-6 py-4 text-primary shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-accent dark:bg-white/5 dark:text-white dark:ring-white/10 appearance-none"
                >
                  <option>Strategic Consulting</option>
                  <option>Fintech Infrastructure</option>
                  <option>Global Expansion</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-gray-500">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full rounded-2xl border-none bg-white px-6 py-4 text-primary shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-accent dark:bg-white/5 dark:text-white dark:ring-white/10"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <Button
                size="lg"
                type="submit"
                disabled={status === 'loading'}
                className="w-full h-16 rounded-2xl text-lg font-bold tracking-widest uppercase disabled:opacity-70"
              >
                {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
              </Button>

              {status === 'success' && (
                <p className="text-center text-green-500 font-bold">Thank you! Your message has been sent.</p>
              )}
              {status === 'error' && (
                <p className="text-center text-red-500 font-bold">Something went wrong. Please try again.</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
