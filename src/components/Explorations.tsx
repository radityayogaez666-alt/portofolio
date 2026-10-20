import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExplorationItem } from '../types.ts';

gsap.registerPlugin(ScrollTrigger);

export const EXPLORATIONS_DATA: ExplorationItem[] = [
  {
    id: 'exp-1',
    title: 'Chromatic Refraction',
    subtitle: 'WebGL Glass & Spectral Dispersion',
    year: '2026',
    rotation: '-rotate-3',
    yOffset: -60,
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=700&q=80',
    tags: ['GLSL', 'Refraction', 'Optics'],
  },
  {
    id: 'exp-2',
    title: 'Soundscape Oscillations',
    subtitle: 'Audio-reactive Canvas Spectrogram',
    year: '2026',
    rotation: 'rotate-2',
    yOffset: 40,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80',
    tags: ['WebAudio', 'FFT', 'Sensory'],
  },
  {
    id: 'exp-3',
    title: 'Kinetic Monolith',
    subtitle: 'Brutalist Physics & Gravity Canvas',
    year: '2025',
    rotation: 'rotate-4',
    yOffset: -80,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80',
    tags: ['Matter.js', 'Physics', 'Typography'],
  },
  {
    id: 'exp-4',
    title: 'Cellular Automata',
    subtitle: 'WASM Reaction-Diffusion System',
    year: '2025',
    rotation: '-rotate-2',
    yOffset: 70,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80',
    tags: ['WASM', 'Math', 'Generative'],
  },
  {
    id: 'exp-5',
    title: 'Cybernetic Mesh',
    subtitle: 'Real-time Vertex Displacement',
    year: '2026',
    rotation: '-rotate-4',
    yOffset: -40,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80',
    tags: ['Three.js', 'Shaders', 'Wireframe'],
  },
  {
    id: 'exp-6',
    title: 'Solar Orbitals',
    subtitle: 'Kepler Gravitational Simulation',
    year: '2025',
    rotation: 'rotate-3',
    yOffset: 50,
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=700&q=80',
    tags: ['Astronomy', 'Vectors', 'Canvas'],
  },
];

interface ExplorationsProps {
  onSelectItem: (item: ExplorationItem) => void;
}

export const Explorations: React.FC<ExplorationsProps> = ({ onSelectItem }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinnedContent = pinnedContentRef.current;
    const colLeft = colLeftRef.current;
    const colRight = colRightRef.current;

    if (!section || !pinnedContent) return;

    const ctx = gsap.context(() => {
      // Pin center header using ScrollTrigger
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinnedContent,
        pinSpacing: false,
      });

      // Parallax scroll for columns
      if (colLeft) {
        gsap.fromTo(
          colLeft,
          { y: 150 },
          {
            y: -150,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      if (colRight) {
        gsap.fromTo(
          colRight,
          { y: -60 },
          {
            y: 180,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const col1 = [EXPLORATIONS_DATA[0], EXPLORATIONS_DATA[2], EXPLORATIONS_DATA[4]];
  const col2 = [EXPLORATIONS_DATA[1], EXPLORATIONS_DATA[3], EXPLORATIONS_DATA[5]];

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-[260vh] md:min-h-[300vh] bg-[hsl(var(--bg))] border-t border-[hsl(var(--stroke))]/40 overflow-hidden"
    >
      {/* Layer 1: Pinned Center (z-10) */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none"
      >
        <div className="max-w-xl mx-auto pointer-events-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 h-px bg-[hsl(var(--stroke))]" />
            <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] font-medium">
              Explorations
            </span>
            <span className="w-6 h-px bg-[hsl(var(--stroke))]" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-[hsl(var(--text))] tracking-tight">
            Visual <span className="font-display italic text-[hsl(var(--text))]">playground</span>
          </h2>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-[hsl(var(--muted))] mt-3 max-w-sm mx-auto leading-relaxed">
            Experiments in shaders, procedural generation, sound synthesis, and micro-interactions.
          </p>

          {/* Dribbble button */}
          <div className="mt-6">
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-full border border-[hsl(var(--stroke))] bg-[hsl(var(--surface))]/80 backdrop-blur-md px-5 py-2 text-xs uppercase tracking-wider text-[hsl(var(--text))] font-medium transition-all duration-300 hover:border-white/30 hover:scale-105"
            >
              <span>Follow on Dribbble</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Layer 2: Parallax Columns (z-20, absolute on desktop, positioned over scroll area) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] h-full mx-auto px-6 md:px-12 flex justify-between items-start pt-32 pb-48">
          {/* Left Column */}
          <div
            ref={colLeftRef}
            className="flex flex-col gap-28 md:gap-48 w-1/2 max-w-[340px] pointer-events-auto"
          >
            {col1.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`group cursor-pointer select-none transition-transform duration-500 ${item.rotation} hover:rotate-0 hover:scale-105`}
              >
                <div className="relative aspect-square w-full max-w-[320px] rounded-3xl overflow-hidden bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] shadow-2xl transition-all duration-300 group-hover:border-white/40 group-hover:shadow-sky-950/40">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--bg))]/90 via-transparent to-transparent opacity-80" />

                  {/* Card Content Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                    <span className="text-[10px] text-white/60 uppercase tracking-widest block mb-1">
                      {item.year} · {item.tags[0]}
                    </span>
                    <h3 className="text-base font-semibold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-1 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Click affordance */}
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-white">↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div
            ref={colRightRef}
            className="flex flex-col gap-28 md:gap-48 w-1/2 max-w-[340px] ml-auto items-end pointer-events-auto pt-24"
          >
            {col2.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`group cursor-pointer select-none transition-transform duration-500 ${item.rotation} hover:rotate-0 hover:scale-105`}
              >
                <div className="relative aspect-square w-full max-w-[320px] rounded-3xl overflow-hidden bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] shadow-2xl transition-all duration-300 group-hover:border-white/40 group-hover:shadow-sky-950/40">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--bg))]/90 via-transparent to-transparent opacity-80" />

                  {/* Card Content Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                    <span className="text-[10px] text-white/60 uppercase tracking-widest block mb-1">
                      {item.year} · {item.tags[0]}
                    </span>
                    <h3 className="text-base font-semibold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-1 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Click affordance */}
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-white">↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
