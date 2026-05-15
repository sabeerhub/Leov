'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = React.useMemo(() => [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          isScrolled ? 'glass py-4 shadow-2xl' : 'bg-transparent py-8'
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
          <Link href="/" className="text-3xl font-black tracking-[-0.05em] text-primary dark:text-white group">
            LEOV<span className="text-accent transition-all duration-300 group-hover:pl-1">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-12 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-sm font-bold uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-white"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Button size="lg" className="rounded-full px-8 bg-accent text-white font-bold tracking-widest uppercase">
              Start Project
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Premium Mobile Bottom Sheet Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md md:hidden"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[120] flex max-h-[90vh] flex-col rounded-t-[40px] bg-[#0A0C10] p-8 pb-12 shadow-2xl md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-2xl font-black tracking-tighter text-white">MENU</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between text-4xl font-bold tracking-tight text-white group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="text-accent transition-transform group-hover:translate-x-2" size={32} />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-8"
                >
                  <Button className="w-full h-20 rounded-3xl text-xl font-bold tracking-widest uppercase bg-accent">
                    Get Started
                  </Button>
                </motion.div>
              </div>

              {/* Decorative background element for mobile menu */}
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-[100px] pointer-events-none" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
