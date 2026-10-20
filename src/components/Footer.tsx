import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

interface FooterProps {
  onOpenContact: () => void;
}

const HLS_VIDEO_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const MARQUEE_TEXT = "BUILDING THE FUTURE • ";

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Initialize HLS video flipped vertically
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
          video.muted = true;
          video.play().catch(() => {});
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_VIDEO_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  // GSAP Marquee: repeated 10x, xPercent: -50, duration 40, ease "none", repeat -1
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const anim = gsap.to(el, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('hello@michaelsmith.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const marqueeRepeats = Array.from({ length: 10 }).map((_, i) => (
    <span key={i} className="inline-block whitespace-nowrap">
      {MARQUEE_TEXT}
    </span>
  ));

  const socialLinks = [
    { label: 'Twitter', url: 'https://twitter.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
    { label: 'Dribbble', url: 'https://dribbble.com' },
    { label: 'GitHub', url: 'https://github.com' },
  ];

  return (
    <footer
      id="contact"
      className="relative bg-[hsl(var(--bg))] pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden border-t border-[hsl(var(--stroke))]/40"
    >
      {/* Background Video: same HLS source, flipped vertically scale-y-[-1], heavier overlay bg-black/60 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] filter brightness-75 contrast-110 opacity-40"
        />
        {/* Heavier overlay: bg-black/60 */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* GSAP Marquee: "BUILDING THE FUTURE • " repeated 10x */}
      <div className="relative z-10 w-full overflow-hidden py-4 border-y border-white/5 select-none pointer-events-none mb-16 md:mb-24">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-widest text-white/10"
        >
          {marqueeRepeats}
          {marqueeRepeats}
        </div>
      </div>

      {/* Main CTA Container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center">
        <div className="max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] font-medium block mb-4">
            LET&apos;S COLLABORATE
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display italic text-[hsl(var(--text))] tracking-tight">
            Have a project in mind?
          </h2>
          <p className="text-sm md:text-base text-[hsl(var(--muted))] mt-4 max-w-md mx-auto">
            Currently accepting select commissions, architectural consultations, and full-stack engineering contracts.
          </p>
        </div>

        {/* CTA: Email button with gradient hover border ring */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 md:mb-20">
          <a
            href="mailto:hello@michaelsmith.com"
            className="group relative rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span
              className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient -z-10"
              aria-hidden="true"
            />
            <span className="inline-flex items-center gap-3 rounded-full bg-[hsl(var(--surface))] hover:bg-[hsl(var(--surface))]/90 border border-white/15 px-8 py-4 text-[hsl(var(--text))] shadow-xl backdrop-blur-md">
              <span className="font-mono text-sm sm:text-base">hello@michaelsmith.com</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                ↗
              </span>
            </span>
          </a>

          {/* Quick Copy / Message button */}
          <button
            onClick={handleCopyEmail}
            className="text-xs uppercase tracking-wider text-[hsl(var(--muted))] hover:text-white px-4 py-2 rounded-full border border-transparent hover:border-[hsl(var(--stroke))] transition-colors"
          >
            {copied ? '✓ Copied to clipboard' : 'Copy email address'}
          </button>
        </div>

        {/* Footer Bar */}
        <div className="pt-8 border-t border-[hsl(var(--stroke))]/40 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[hsl(var(--muted))]">
          {/* Availability badge: Green pulsing dot + "Available for projects" */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-medium text-white/90">Available for projects</span>
            <span className="text-white/40">·</span>
            <span>Q1–Q2 2026</span>
          </div>

          {/* Social Links [Twitter, LinkedIn, Dribbble, GitHub] */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[hsl(var(--text))] transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-[hsl(var(--muted))]/70">
            © {new Date().getFullYear()} Michael Smith. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
