import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { LogoWall } from '@/components/LogoWall';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Projects } from '@/components/Projects';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <main className="relative min-h-screen dark kinetic-grid">
      <Navbar />
      <Hero />
      <LogoWall />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />

      <footer className="bg-primary py-12 text-center text-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="mb-8 text-2xl font-bold tracking-tighter">
            LEOV<span className="text-accent">.</span>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} LEOV Corporate. All rights reserved. Built for the African Digital Frontier.
          </p>
        </div>
      </footer>
    </main>
  );
}
