import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

interface HeroProps {
  onSeeWorks: () => void;
  onReachOut: () => void;
}

const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];
const HLS_VIDEO_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const Hero: React.FC<HeroProps> = ({ onSeeWorks, onReachOut }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycling roles every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // HLS Video initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        autoStartLoad: true,
        startLevel: -1,
        capLevelToPlayerSize: true,
      });
      hls.loadSource(HLS_VIDEO_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay policy fallback: muted video ensures play
          video.muted = true;
          video.play().catch(() => {});
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari iOS / macOS)
      video.src = HLS_VIDEO_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        ".blur-in",
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.1 },
        "-=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[hsl(var(--bg))] text-[hsl(var(--text))] px-6 select-none"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 filter brightness-90 contrast-105"
        />
        {/* Dark overlay: bg-black/20 */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Bottom fade: h-48 bg-gradient-to-t from-bg to-transparent */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[hsl(var(--bg))] to-transparent pointer-events-none" />
      </div>

      {/* Hero Content (centered, z-10) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto pt-24 pb-20">
        {/* Eyebrow */}
        <div className="blur-in text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] mb-8 font-medium">
          COLLECTION &apos;26
        </div>

        {/* Name */}
        <h1 className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-[hsl(var(--text))] mb-6">
          Michael Smith
        </h1>

        {/* Role line: "A {role} lives in Chicago." */}
        <div className="blur-in text-lg sm:text-xl md:text-2xl text-[hsl(var(--muted))] font-light mb-4">
          A{' '}
          <span
            key={roleIndex}
            className="font-display italic text-[hsl(var(--text))] animate-role-fade-in inline-block px-1"
          >
            {ROLES[roleIndex]}
          </span>{' '}
          lives in Chicago.
        </div>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-[hsl(var(--muted))] max-w-md mx-auto mb-10 leading-relaxed text-balance">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        {/* CTA Buttons (inline-flex gap-4) */}
        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4">
          {/* "See Works": Solid button. Default: bg-text-primary text-bg. Hover: bg-bg text-text-primary with accent gradient border ring */}
          <button
            onClick={onSeeWorks}
            className="group relative rounded-full text-sm font-medium px-7 py-3.5 transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span
              className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient -z-10"
              aria-hidden="true"
            />
            <span className="inline-block rounded-full bg-[hsl(var(--text))] text-[hsl(var(--bg))] group-hover:bg-[hsl(var(--bg))] group-hover:text-[hsl(var(--text))] transition-colors duration-300 font-semibold px-2 py-0.5">
              See Works
            </span>
          </button>

          {/* "Reach out...": Outlined button. Default: border-2 border-stroke bg-bg text-text-primary. Hover: border-transparent with accent gradient border ring */}
          <button
            onClick={onReachOut}
            className="group relative rounded-full text-sm font-medium px-7 py-3.5 transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span
              className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient -z-10"
              aria-hidden="true"
            />
            <span className="inline-block rounded-full border-2 border-[hsl(var(--stroke))] group-hover:border-transparent bg-[hsl(var(--bg))] text-[hsl(var(--text))] transition-all duration-300 px-2 py-0.5">
              Reach out...
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] text-[hsl(var(--muted))] uppercase tracking-[0.2em] font-medium">
          SCROLL
        </span>
        <div className="relative w-px h-10 bg-[hsl(var(--stroke))] overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-4 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
