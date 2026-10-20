import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onContact,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-8 max-h-[92vh] overflow-y-auto text-[hsl(var(--text))]"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-[hsl(var(--stroke))] pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted))] uppercase tracking-widest font-medium">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[hsl(var(--stroke))]/40 hover:bg-[hsl(var(--stroke))] flex items-center justify-center text-[hsl(var(--muted))] hover:text-white transition-colors cursor-pointer"
              aria-label="Close project view"
            >
              ✕
            </button>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-display italic text-white tracking-tight mb-4">
            {project.title}
          </h2>

          <p className="text-base text-white/80 max-w-2xl mb-8 leading-relaxed">
            {project.description}
          </p>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-900 mb-8 border border-white/10 shadow-xl">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-halftone opacity-15 mix-blend-multiply pointer-events-none" />
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[hsl(var(--bg))] border border-[hsl(var(--stroke))] mb-8 text-xs">
            <div>
              <span className="text-[hsl(var(--muted))] block mb-1 uppercase tracking-wider">Client</span>
              <span className="text-white font-medium">{project.client}</span>
            </div>
            <div>
              <span className="text-[hsl(var(--muted))] block mb-1 uppercase tracking-wider">Role</span>
              <span className="text-white font-medium">{project.role}</span>
            </div>
            <div>
              <span className="text-[hsl(var(--muted))] block mb-1 uppercase tracking-wider">Impact</span>
              <span className="text-white font-medium">{project.metrics || 'Production Shipped'}</span>
            </div>
            <div>
              <span className="text-[hsl(var(--muted))] block mb-1 uppercase tracking-wider">Year</span>
              <span className="text-white font-medium">{project.year}</span>
            </div>
          </div>

          {/* Deep Dive Description */}
          <div className="space-y-4 mb-8 text-sm text-white/80 leading-relaxed">
            <h3 className="text-xs uppercase tracking-widest text-[hsl(var(--muted))] font-semibold">
              Case Study Overview
            </h3>
            <p>{project.fullDescription}</p>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest text-[hsl(var(--muted))] font-semibold mb-3">
              Technologies & Architecture
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-[hsl(var(--stroke))]/50 text-white/90 border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[hsl(var(--stroke))] pt-6 gap-4">
            <span className="text-xs text-[hsl(var(--muted))]">
              Interested in a similar deployment or architecture?
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onContact();
                }}
                className="rounded-full bg-white text-black font-semibold text-xs px-6 py-2.5 hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Inquire About This Project ↗
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
