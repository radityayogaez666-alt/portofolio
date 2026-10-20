import React from 'react';
import { motion } from 'framer-motion';

export const Stats: React.FC = () => {
  const stats = [
    {
      value: '20+',
      label: 'Years Experience',
      description: 'Two decades architecting digital products, design systems, and high-performance interactive canvases.',
    },
    {
      value: '95+',
      label: 'Projects Done',
      description: 'Delivered mission-critical applications, creative direction, and bespoke experiences globally.',
    },
    {
      value: '200%',
      label: 'Satisfied Clients',
      description: 'Enduring long-term partnerships driven by obsessive attention to craft and technical fidelity.',
    },
  ];

  return (
    <section className="bg-[hsl(var(--bg))] py-16 md:py-24 border-t border-[hsl(var(--stroke))]/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col border-l border-[hsl(var(--stroke))] pl-6 sm:pl-8 group"
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-display text-[hsl(var(--text))] tabular-nums tracking-tight group-hover:text-sky-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-widest text-[hsl(var(--text))] font-semibold mt-3 mb-2">
                {stat.label}
              </div>
              <p className="text-xs sm:text-sm text-[hsl(var(--muted))] leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
