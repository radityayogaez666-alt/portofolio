import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExplorationItem } from '../types.ts';

interface ExplorationModalProps {
  item: ExplorationItem | null;
  onClose: () => void;
}

export const ExplorationModal: React.FC<ExplorationModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-[hsl(var(--text))]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[hsl(var(--stroke))] pb-4 mb-6">
            <div>
              <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-widest font-mono">
                LAB EXPERIMENT · {item.year}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display italic text-white mt-1">
                {item.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[hsl(var(--stroke))]/40 hover:bg-[hsl(var(--stroke))] flex items-center justify-center text-[hsl(var(--muted))] hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Large Image View */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-900 mb-6 border border-white/10">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-100 contrast-105"
            />
          </div>

          {/* Subtitle & Tags */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-white/90">{item.subtitle}</p>
              <p className="text-xs text-[hsl(var(--muted))] mt-1">
                Interactive shader and generative prototype exploring digital materials and responsive optics.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-[hsl(var(--bg))] text-white/70 border border-[hsl(var(--stroke))]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
