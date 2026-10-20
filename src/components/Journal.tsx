import React from 'react';
import { motion } from 'framer-motion';
import { JournalEntry } from '../types.ts';

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'sub-pixel-interaction',
    title: 'On Modern Digital Craft: The Nuances of Sub-Pixel Interaction',
    date: 'October 14, 2026',
    readTime: '4 min read',
    category: 'Design Engineering',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    excerpt: 'Examining why easing curves, haptic feedback models, and compositor-layer boundaries define the tactile difference between software that feels alive and software that feels mechanical.',
    content: [
      'Digital interaction has largely moved past the era of skeumorphic metaphors and flat minimalism into an era of physical momentum. The human brain interprets latency under 50 milliseconds not as computation, but as direct physical connection.',
      'When an element on a glass screen responds instantaneously with physics-based deceleration curves rather than linear math, users suspend disbelief. We explore how sub-pixel rendering and WebGL shaders are replacing standard DOM cascades for high-retention enterprise tools.',
      'True craft today lies in the margins: the 120Hz frame timing, the spatial memory preserved during page transitions, and the tactile restraint to avoid animation for animation’s sake.'
    ],
  },
  {
    id: 'monoliths-to-spatial-canvas',
    title: 'A Decade in Systems: From Monoliths to Spatial Canvas',
    date: 'September 28, 2026',
    readTime: '7 min read',
    category: 'Architecture & Systems',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    excerpt: 'How our mental models of information retrieval are shifting from nested hierarchical directories into infinite collaborative spatial canvases.',
    content: [
      'Ten years ago, web software was constrained to vertical scrolling feeds and columnated data grids. Today, computing surfaces are unbounded. As GPU acceleration becomes standard across mobile browsers, UI is becoming spatial.',
      'In this essay, we break down our architecture for state synchronization across infinite 2D/3D canvases, utilizing delta-compression and local-first SQLite databases embedded in WebAssembly.',
      'The modern fullstack engineer cannot merely be an API glue programmer; they must understand render trees, spatial indexing (R-trees), and memory footprints.'
    ],
  },
  {
    id: 'architecture-of-restraint',
    title: 'The Architecture of Restraint: Why Negative Space Outlives Trends',
    date: 'August 19, 2026',
    readTime: '5 min read',
    category: 'Philosophy',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    excerpt: 'In an internet saturated with synthetic noise, maximalist UI kits, and gratuitous badges, the most radical design decision is subtraction.',
    content: [
      'Every unnecessary badge, colored pill, and decorative icon added to an interface diminishes the significance of the actual content. When everything screams for attention, nothing is heard.',
      'We discuss the Bauhaus principles of spatial math, typographic rhythm, and how Japanese Ma (negative space) can be applied to complex financial and medical telemetry interfaces.',
      'Subtraction is not laziness—it is the highest form of editorial discipline.'
    ],
  },
  {
    id: 'real-time-cinematic-performance',
    title: 'Real-Time Telemetry and Cinematic Web Performance',
    date: 'July 05, 2026',
    readTime: '6 min read',
    category: 'Frontend Performance',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
    excerpt: 'Techniques for rendering continuous streaming sensor data at 120 FPS without locking the main thread or causing garbage collection stutter.',
    content: [
      'Rendering thousands of incoming metrics per second over WebSockets causes catastrophic layout thrashing if done through naive React state updates.',
      'By decoupling data ingestion from the DOM render loop using OffscreenCanvas, SharedArrayBuffers, and Web Workers, we achieved zero-frame-drop performance for industrial robotics monitoring.',
      'Here are our open-source benchmarks and architectural blueprints for zero-overhead telemetry dashboards.'
    ],
  },
];

interface JournalProps {
  onSelectEntry: (entry: JournalEntry) => void;
  onViewAllJournal: () => void;
}

export const Journal: React.FC<JournalProps> = ({
  onSelectEntry,
  onViewAllJournal,
}) => {
  return (
    <section id="journal" className="bg-[hsl(var(--bg))] py-16 md:py-24 border-t border-[hsl(var(--stroke))]/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header: same pattern as selected works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[hsl(var(--stroke))]" aria-hidden="true" />
              <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] font-medium">
                Journal
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[hsl(var(--text))] tracking-tight">
              Recent <span className="font-display italic text-[hsl(var(--text))]">thoughts</span>
            </h2>

            <p className="text-sm md:text-base text-[hsl(var(--muted))] mt-3 max-w-lg">
              Writings on digital craftsmanship, spatial software, and systems engineering.
            </p>
          </div>

          <div className="hidden md:inline-flex">
            <button
              onClick={onViewAllJournal}
              className="group relative rounded-full text-xs uppercase tracking-wider font-medium px-5 py-2.5 transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <span
                className="absolute -inset-[1.5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient -z-10"
                aria-hidden="true"
              />
              <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--stroke))] group-hover:border-transparent bg-[hsl(var(--surface))] px-4 py-2 text-[hsl(var(--text))]">
                <span>View all</span>
                <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </button>
          </div>
        </motion.div>

        {/* 4 journal entries displayed as horizontal pills (rounded-[40px] sm:rounded-full) */}
        <div className="space-y-4 sm:space-y-5">
          {JOURNAL_ENTRIES.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => onSelectEntry(entry)}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:p-4 rounded-[40px] sm:rounded-full bg-[hsl(var(--surface))]/30 hover:bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] hover:border-[hsl(var(--stroke))]/80 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-black/20"
            >
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                {/* Entry image thumbnail */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-neutral-800 shrink-0 border border-white/10 group-hover:border-sky-400/50 transition-colors">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Title & Metadata */}
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-medium text-[hsl(var(--text))] group-hover:text-sky-300 transition-colors truncate tracking-tight pr-2">
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted))] mt-1">
                    <span>{entry.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{entry.date}</span>
                    <span className="hidden md:inline" aria-hidden="true">·</span>
                    <span className="hidden md:inline text-[hsl(var(--muted))]/80">{entry.category}</span>
                  </div>
                </div>
              </div>

              {/* Read button / Arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pl-16 sm:pl-0 sm:pr-4 shrink-0">
                <span className="text-xs uppercase tracking-wider text-[hsl(var(--muted))] group-hover:text-[hsl(var(--text))] transition-colors hidden sm:inline">
                  Read
                </span>
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--stroke))]/40 group-hover:bg-[hsl(var(--text))] group-hover:text-[hsl(var(--bg))] flex items-center justify-center transition-all duration-300">
                  <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={onViewAllJournal}
            className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--stroke))] bg-[hsl(var(--surface))] px-6 py-2.5 text-xs uppercase tracking-wider font-medium text-[hsl(var(--text))]"
          >
            <span>View all thoughts</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
