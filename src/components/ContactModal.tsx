import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Design Engineering');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate swift submission & open mailto as fallback
    setIsSubmitted(true);
    setTimeout(() => {
      window.location.href = `mailto:hello@michaelsmith.com?subject=${encodeURIComponent(
        `Project Inquiry: ${projectType} from ${name}`
      )}&body=${encodeURIComponent(
        `Hi Michael,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}`
      )}`;
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-[hsl(var(--text))]"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[hsl(var(--stroke))] pb-5 mb-6">
            <div>
              <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] font-medium">
                DIRECT INQUIRY
              </span>
              <h2 className="text-2xl sm:text-3xl font-display italic text-white mt-1">
                Say hi & start a dialogue
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

          {isSubmitted ? (
            <div className="py-12 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-xl">
                ✓
              </div>
              <h3 className="text-xl font-semibold text-white">Opening Email Client...</h3>
              <p className="text-xs text-[hsl(var(--muted))] mt-2 max-w-xs mx-auto">
                Thank you! Your inquiry details are ready in your preferred mail application.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[hsl(var(--muted))] mb-1 font-medium">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[hsl(var(--bg))] border border-[hsl(var(--stroke))] rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-sky-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-[hsl(var(--muted))] mb-1 font-medium">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="elena@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[hsl(var(--bg))] border border-[hsl(var(--stroke))] rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-sky-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-[hsl(var(--muted))] mb-1 font-medium">
                  PROJECT SCOPE
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-[hsl(var(--bg))] border border-[hsl(var(--stroke))] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-sky-400 text-sm cursor-pointer"
                >
                  <option value="Design Engineering">Design Engineering / WebGL</option>
                  <option value="Full-Stack Web App">Full-Stack Web App</option>
                  <option value="Brand & System Architecture">Brand & System Architecture</option>
                  <option value="Consulting & Advisory">Consulting & Advisory</option>
                </select>
              </div>

              <div>
                <label className="block text-[hsl(var(--muted))] mb-1 font-medium">
                  MESSAGE / BRIEF
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell me about your goals, timelines, and vision..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[hsl(var(--bg))] border border-[hsl(var(--stroke))] rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-sky-400 text-sm resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full relative group rounded-full p-[1.5px] transition-transform active:scale-[0.98] cursor-pointer"
                >
                  <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
                  <span className="relative block w-full py-3 rounded-full bg-[hsl(var(--surface))] group-hover:bg-transparent text-white font-medium text-center transition-colors">
                    Send Message ↗
                  </span>
                </button>
              </div>

              <p className="text-[11px] text-center text-[hsl(var(--muted))] pt-1">
                Prefer direct mail? Reach out at{' '}
                <a
                  href="mailto:hello@michaelsmith.com"
                  className="text-sky-400 underline underline-offset-2"
                >
                  hello@michaelsmith.com
                </a>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
