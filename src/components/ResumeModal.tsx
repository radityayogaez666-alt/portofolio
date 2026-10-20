import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto text-[hsl(var(--text))]"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[hsl(var(--stroke))] pb-6 mb-8">
            <div>
              <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] font-medium">
                CURRICULUM VITAE
              </span>
              <h2 className="text-3xl sm:text-4xl font-display italic text-white mt-1">
                Michael Smith
              </h2>
              <p className="text-xs sm:text-sm text-[hsl(var(--muted))] mt-1">
                Creative Director & Lead Design Engineer · Chicago, IL
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[hsl(var(--stroke))]/40 hover:bg-[hsl(var(--stroke))] flex items-center justify-center text-[hsl(var(--muted))] hover:text-white transition-colors cursor-pointer"
              aria-label="Close resume"
            >
              ✕
            </button>
          </div>

          {/* Body Content */}
          <div className="space-y-8 text-sm">
            {/* Summary */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[hsl(var(--muted))] font-semibold mb-3">
                Profile & Philosophy
              </h3>
              <p className="text-white/80 leading-relaxed text-sm">
                20+ years building high-fidelity interactive digital systems, real-time visual simulations, and bespoke design systems. Operating at the exact intersection of strict software engineering discipline and fine art typography.
              </p>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[hsl(var(--muted))] font-semibold mb-4">
                Selected Experience
              </h3>
              <div className="space-y-6 border-l border-[hsl(var(--stroke))] pl-4 sm:pl-6">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="font-semibold text-white">Lead Creative Technologist</span>
                    <span className="text-xs text-[hsl(var(--muted))] font-mono">2023 — Present</span>
                  </div>
                  <div className="text-xs text-sky-400 font-medium">Hyperion Motor Labs</div>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Spearheaded next-generation cockpit UI, custom WebGL aerodynamic simulation engines, and ultra-low-latency vehicle telemetry dashboards.
                  </p>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="font-semibold text-white">Principal Design Engineer</span>
                    <span className="text-xs text-[hsl(var(--muted))] font-mono">2018 — 2023</span>
                  </div>
                  <div className="text-xs text-sky-400 font-medium">Atelier Moreau & Co</div>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Directed interactive architecture monographs, WebAssembly spatial acoustic models, and luxury brand design systems.
                  </p>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="font-semibold text-white">Creative Director & Founder</span>
                    <span className="text-xs text-[hsl(var(--muted))] font-mono">2012 — 2018</span>
                  </div>
                  <div className="text-xs text-sky-400 font-medium">Synthex Labs Chicago</div>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Consulted for Fortune 100 enterprise clients, shipping 50+ award-winning commercial web applications and digital installations.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Capabilities */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[hsl(var(--muted))] font-semibold mb-3">
                Technical Stack & Disciplines
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-[hsl(var(--bg))] rounded-2xl border border-[hsl(var(--stroke))]">
                  <div className="font-semibold text-white mb-1">Graphics & Frontend</div>
                  <p className="text-white/60">
                    WebGL, Three.js, GLSL Shaders, React, Next.js, TypeScript, Tailwind CSS, GSAP, Framer Motion
                  </p>
                </div>
                <div className="p-3.5 bg-[hsl(var(--bg))] rounded-2xl border border-[hsl(var(--stroke))]">
                  <div className="font-semibold text-white mb-1">Systems & Real-time</div>
                  <p className="text-white/60">
                    WebSockets, Node.js, WebAssembly, Rust, WebAudio API, High-Performance Canvas, HLS streaming
                  </p>
                </div>
              </div>
            </div>

            {/* Honors & Recognition */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[hsl(var(--muted))] font-semibold mb-3">
                Honors & Recognition
              </h3>
              <div className="text-xs text-white/70 space-y-1.5">
                <div className="flex justify-between">
                  <span>Awwwards Site of the Year Nominee</span>
                  <span className="font-mono text-white/40">2025</span>
                </div>
                <div className="flex justify-between">
                  <span>FWA of the Day (×6 awards)</span>
                  <span className="font-mono text-white/40">2020—2025</span>
                </div>
                <div className="flex justify-between">
                  <span>ADC Gold Cube · Interactive Digital Craft</span>
                  <span className="font-mono text-white/40">2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-[hsl(var(--stroke))] pt-6 mt-8">
            <span className="text-xs text-[hsl(var(--muted))] font-mono">
              STATUS: AVAILABLE Q1 2026
            </span>
            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@michaelsmith.com?subject=Inquiry%20via%20Portfolio"
                className="rounded-full bg-white text-black font-semibold text-xs px-5 py-2.5 hover:bg-neutral-200 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
