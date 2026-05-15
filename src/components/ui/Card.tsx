import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const Card = ({ children, className, animate = true }: CardProps) => {
  const content = (
    <div
      className={cn(
        'rounded-2xl border border-gray-200 bg-white p-6 shadow-premium transition-all duration-300 dark:border-white/10 dark:bg-primary/50',
        animate && 'hover:-translate-y-2 hover:shadow-premium-hover',
        className
      )}
    >
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};
