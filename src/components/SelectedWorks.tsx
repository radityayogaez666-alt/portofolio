import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types.ts';
import automotiveImg from '../assets/images/work_automotive_motion_1792479590623.jpg';
import architectureImg from '../assets/images/work_urban_architecture_1792479590530.jpg';
import humanImg from '../assets/images/work_human_perspective_1792479590650.jpg';
import brandImg from '../assets/images/work_brand_identity_1792479591693.jpg';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'automotive-motion',
    title: 'Automotive Motion',
    category: 'Digital Product / WebGL',
    year: '2026',
    description: 'High-performance real-time telemetry dashboard & aerodynamic visualizer for next-gen electric vehicles.',
    fullDescription: 'A multi-sensory automotive interface bringing real-time chassis telemetry, battery thermal dynamics, and wind tunnel aerodynamic simulations to driver dashboards and mobile companion platforms. Engineered with sub-millisecond WebGL frame dispatch and custom shaders.',
    image: automotiveImg,
    colSpan: 'md:col-span-7',
    aspect: 'aspect-[16/10] sm:aspect-[16/9]',
    client: 'Hyperion Motor Labs',
    role: 'Lead Creative Technologist',
    technologies: ['Three.js', 'WebGL', 'TypeScript', 'WebSockets', 'Tailwind CSS'],
    metrics: '60fps under load · 14ms latency',
  },
  {
    id: 'urban-architecture',
    title: 'Urban Architecture',
    category: 'Spatial Design / Generative',
    year: '2025',
    description: 'Brutalist spatial pavilion archives and generative acoustic architectural modeling platform.',
    fullDescription: 'An interactive monograph and spatial modeling studio celebrating monumental concrete cantilevers and acoustic environmental resonance. Allows architects to simulate daylight sunpaths and sonic reverberations inside monolithic structures.',
    image: architectureImg,
    colSpan: 'md:col-span-5',
    aspect: 'aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3]',
    client: 'Atelier Moreau & Co',
    role: 'Creative Director & Fullstack Engineer',
    technologies: ['React', 'GLSL', 'Tone.js', 'WebAudio API', 'GSAP'],
    metrics: 'ArchDaily Feature · 180k unique visits',
  },
  {
    id: 'human-perspective',
    title: 'Human Perspective',
    category: 'Editorial / Computational Film',
    year: '2025',
    description: 'Cinematic monograph and computational monochrome photography exhibition archive.',
    fullDescription: 'A museum-grade digital retrospective examining tactile chiaroscuro portraiture and human expressions. Employs progressive lossless image pyramids and micro-grain simulation to preserve high-contrast medium-format Leica aesthetics on the web.',
    image: humanImg,
    colSpan: 'md:col-span-5',
    aspect: 'aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3]',
    client: 'Nordic Visual Foundation',
    role: 'Art Director & Frontend Architect',
    technologies: ['Next.js', 'Framer Motion', 'Canvas 2D', 'Sharp Image Pipeline'],
    metrics: 'Awwwards Site of the Day · FWA of the Day',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    category: 'Design Systems / Tactile Web',
    year: '2026',
    description: 'Comprehensive design system, debossed foil typography, and tactile brand guidelines.',
    fullDescription: 'Complete brand language spanning custom variable typography, embossed stationery packaging, physical architectural signage, and a modular component design system built for luxury design firms.',
    image: brandImg,
    colSpan: 'md:col-span-7',
    aspect: 'aspect-[16/10] sm:aspect-[16/9]',
    client: 'ARQUET Architecture Studio',
    role: 'Brand & Systems Designer',
    technologies: ['Design Tokens', 'Figma', 'React', 'Tailwind CSS', 'Framer Motion'],
    metrics: '3x Brand Conversion Lift',
  },
];

interface SelectedWorksProps {
  onSelectProject: (project: Project) => void;
  onViewAllWork: () => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({
  onSelectProject,
  onViewAllWork,
}) => {
  return (
    <section
      id="work"
      className="bg-[hsl(var(--bg))] py-12 md:py-20 border-t border-[hsl(var(--stroke))]/40"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow: w-8 h-px bg-stroke + "Selected Work" text-xs text-muted uppercase tracking-[0.3em] */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[hsl(var(--stroke))]" aria-hidden="true" />
              <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] font-medium">
                Selected Work
              </span>
            </div>

            {/* Heading: "Featured projects" — italic word in font-display italic */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[hsl(var(--text))] tracking-tight">
              Featured <span className="font-display italic text-[hsl(var(--text))]">projects</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-[hsl(var(--muted))] mt-3 max-w-lg">
              A selection of projects I&apos;ve worked on, from concept to launch.
            </p>
          </div>

          {/* "View all work" button (desktop only, hidden md:inline-flex) */}
          <div className="hidden md:inline-flex">
            <button
              onClick={onViewAllWork}
              className="group relative rounded-full text-xs uppercase tracking-wider font-medium px-5 py-2.5 transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <span
                className="absolute -inset-[1.5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient -z-10"
                aria-hidden="true"
              />
              <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--stroke))] group-hover:border-transparent bg-[hsl(var(--surface))] px-4 py-2 text-[hsl(var(--text))]">
                <span>View all work</span>
                <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </button>
          </div>
        </motion.div>

        {/* Bento Grid: 12 columns, 7/5/5/7 span pattern */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS_DATA.map((project, index) => {
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={() => onSelectProject(project)}
                className={`group relative overflow-hidden bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-3xl ${project.colSpan} cursor-pointer transition-all duration-500 hover:border-white/20`}
              >
                {/* Image Container */}
                <div className={`relative w-full ${project.aspect} overflow-hidden bg-neutral-900`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Halftone overlay: radial-gradient(circle, #000 1px, transparent 1px) at 4×4px, opacity-20 mix-blend-multiply */}
                  <div
                    className="absolute inset-0 bg-halftone opacity-20 mix-blend-multiply pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Subtle permanent dark gradient for contrast */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--bg))]/90 via-black/20 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Permanent Quiet Card Metadata */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-xs text-white/80 pointer-events-none">
                    <span className="text-[11px] font-medium tracking-wider uppercase bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      {project.category}
                    </span>
                    <span className="font-mono text-[11px] text-white/60">
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom title block */}
                  <div className="absolute bottom-5 left-5 right-5 pointer-events-none transition-transform duration-300 group-hover:-translate-y-1">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-1 mt-1 max-w-md">
                      {project.description}
                    </p>
                  </div>

                  {/* Hover Overlay: bg-bg/70 opacity-0->1 + backdrop-blur-lg */}
                  <div className="absolute inset-0 bg-[hsl(var(--bg))]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md flex items-center justify-center p-6 pointer-events-none">
                    {/* Hover label: pill with animated gradient border, white bg, "View — Title" (title in font-display italic) */}
                    <div className="relative p-[1.5px] rounded-full animate-gradient-shift accent-gradient shadow-2xl">
                      <div className="bg-white text-black px-5 py-2 rounded-full flex items-center gap-2 text-sm font-medium">
                        <span>View</span>
                        <span className="text-neutral-400">—</span>
                        <span className="font-display italic text-base font-normal">
                          {project.title}
                        </span>
                        <span className="text-xs ml-1">↗</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile View All Work CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={onViewAllWork}
            className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--stroke))] bg-[hsl(var(--surface))] px-6 py-2.5 text-xs uppercase tracking-wider font-medium text-[hsl(var(--text))]"
          >
            <span>View all work</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
