import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JournalEntry } from '../types.ts';

interface JournalModalProps {
  entry: JournalEntry | null;
  onClose: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({ entry, onClose }) => {
  if (!entry) return null;

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

        <motion.article
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto text-[hsl(var(--text))]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[hsl(var(--stroke))] pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted))] uppercase tracking-widest font-medium">
              <span>{entry.category}</span>
              <span aria-hidden="true">·</span>
              <span>{entry.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{entry.date}</span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[hsl(var(--stroke))]/40 hover:bg-[hsl(var(--stroke))] flex items-center justify-center text-[hsl(var(--muted))] hover:text-white transition-colors cursor-pointer"
              aria-label="Close article"
            >
              ✕
            </button>
          </div>

          <h2 className="text-2xl sm:text-4xl font-display italic text-white tracking-tight leading-tight mb-6">
            {entry.title}
          </h2>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 border border-white/10">
            <img
              src={entry.image}
              alt={entry.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 text-sm sm:text-base text-white/85 leading-relaxed font-light">
            <p className="text-base sm:text-lg font-normal text-white border-l-2 border-sky-400 pl-4 py-1 italic">
              {entry.excerpt}
            </p>
            {entry.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="border-t border-[hsl(var(--stroke))] pt-6 mt-8 flex items-center justify-between text-xs text-[hsl(var(--muted))]">
            <span>Author: Michael Smith</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-[hsl(var(--stroke))] hover:border-white/40 text-white transition-colors"
            >
              Back to Journal
            </button>
          </div>
        </motion.article>
      </div>
    </AnimatePresence>
  );
};
