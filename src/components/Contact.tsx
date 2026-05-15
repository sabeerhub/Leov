'use client';

import React from 'react';
import { Button } from './ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-soft-white dark:bg-[#0A0E1A]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">Contact Us</h2>
            <h3 className="text-4xl font-bold tracking-tight text-primary dark:text-white md:text-5xl">
              Let&apos;s Build the <span className="text-accent">Extraordinary.</span>
            </h3>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Ready to elevate your corporate strategy? Our team of experts is standing by to discuss your vision and how LEOV can help you achieve it.
            </p>

            <div className="mt-12 space-y-8">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary dark:text-white">Email Us</p>
                  <p className="text-gray-600 dark:text-gray-400">hello@leov.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary dark:text-white">Call Us</p>
                  <p className="text-gray-600 dark:text-gray-400">+234 (0) 800 LEOV CORP</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary dark:text-white">Visit Us</p>
                  <p className="text-gray-600 dark:text-gray-400">Eko Atlantic City, Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-premium dark:bg-primary/50 dark:ring-1 dark:ring-white/10 md:p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary dark:text-white">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-hidden transition-all focus:border-accent focus:ring-4 focus:ring-accent/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-accent/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary dark:text-white">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-hidden transition-all focus:border-accent focus:ring-4 focus:ring-accent/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-accent/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary dark:text-white">Subject</label>
                <select className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-hidden transition-all focus:border-accent focus:ring-4 focus:ring-accent/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-accent/50">
                  <option>Strategic Consulting</option>
                  <option>Fintech Solutions</option>
                  <option>Partnership Inquiry</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary dark:text-white">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-hidden transition-all focus:border-accent focus:ring-4 focus:ring-accent/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-accent/50"
                ></textarea>
              </div>

              <Button className="w-full space-x-2 py-4">
                <span>Send Message</span>
                <Send size={18} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
