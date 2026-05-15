'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const PROJECT_PREVIEWS = [
  { id: 1, title: 'Nexus Pay', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop', category: 'Fintech' },
  { id: 2, title: 'Cloud Grid', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop', category: 'Infrastructure' },
  { id: 3, title: 'Aura Analytics', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop', category: 'Innovation' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  const navLinks = React.useMemo(() => [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects', hasDropdown: true },
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
          isScrolled ? 'glass py-3' : 'bg-transparent py-6'
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
          <Link href="/" className="text-2xl font-black tracking-[-0.05em] text-primary group">
            LEOV<span className="text-accent transition-all duration-300 group-hover:pl-1">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-10 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setIsProjectsOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsProjectsOpen(false)}
              >
                <Link
                  href={link.href}
                  className="group flex items-center gap-1 text-[13px] font-bold uppercase tracking-[0.15em] text-gray-500 transition-colors hover:text-primary"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={14} className={cn("transition-transform duration-300", isProjectsOpen && "rotate-180")} />}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* Apple-style visual dropdown for Projects */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isProjectsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 top-full -translate-x-1/2 pt-6"
                      >
                        <div className="w-[600px] overflow-hidden rounded-[24px] bg-white p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-slate-100">
                          <div className="mb-4 flex items-center justify-between border-b border-slate-50 pb-4">
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Featured Case Studies</span>
                            <Link href="#projects" className="text-xs font-bold text-accent hover:underline">View All Projects</Link>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            {PROJECT_PREVIEWS.map((proj) => (
                              <Link key={proj.id} href="#projects" className="group/item">
                                <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl">
                                  <Image src={proj.image} alt={proj.title} fill className="object-cover transition-transform duration-500 group-hover/item:scale-110" />
                                </div>
                                <h5 className="text-sm font-bold text-primary">{proj.title}</h5>
                                <p className="text-[11px] text-gray-400 uppercase tracking-tighter">{proj.category}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <Button size="sm" className="rounded-full px-6 bg-primary text-white font-bold tracking-widest uppercase text-[11px]">
              Start Project
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-primary lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Sheet Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[120] flex max-h-[90vh] flex-col rounded-t-[32px] bg-white p-8 pb-12 shadow-2xl lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xl font-black tracking-tighter text-primary">LEOV.</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-primary"
                >
                  <X size={20} />
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
                      className="flex items-center justify-between text-3xl font-bold tracking-tight text-primary group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="text-accent" size={24} />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-6"
                >
                  <Button className="w-full h-16 rounded-2xl text-lg font-bold tracking-widest uppercase bg-primary">
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
