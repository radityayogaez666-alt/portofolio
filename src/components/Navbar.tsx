import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenResume,
  onOpenContact,
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link: string) => {
    if (link === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onNavigate('home');
    } else if (link === 'Work') {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      onNavigate('work');
    } else if (link === 'Resume') {
      onOpenResume();
    }
  };

  const navLinks = ['Home', 'Work', 'Resume'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <nav
        aria-label="Primary navigation"
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-[hsl(var(--surface))]/90 px-2 py-2 transition-all duration-300 ${
          hasScrolled ? 'shadow-md shadow-black/50 border-white/15 bg-[hsl(var(--surface))]' : ''
        }`}
      >
        {/* 1. Logo: 9x9 circle with accent gradient border (reverses direction on hover). Inner bg-bg circle with "JA" in font-display italic text-[13px]. Scales 110% on hover */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onNavigate('home');
          }}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          className="relative w-9 h-9 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110 flex items-center justify-center shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          style={{
            background: isLogoHovered
              ? 'linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)'
              : 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
          }}
          title="Return to top"
          aria-label="Michael Smith Home"
        >
          <div className="w-full h-full rounded-full bg-[hsl(var(--bg))] flex items-center justify-center">
            <span className="font-display italic text-[13px] text-[hsl(var(--text))] leading-none select-none">
              JA
            </span>
          </div>
        </button>

        {/* 2. Divider: w-px h-5 bg-stroke mx-1 (hidden on mobile) */}
        <div className="w-px h-5 bg-[hsl(var(--stroke))] mx-1 hidden sm:block shrink-0" aria-hidden="true" />

        {/* 3. Nav links: ["Home", "Work", "Resume"] */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              (link === 'Home' && activeSection === 'home') ||
              (link === 'Work' && activeSection === 'work');

            return (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className={`text-xs sm:text-sm font-medium rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[hsl(var(--text))] bg-[hsl(var(--stroke))]/50'
                    : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--text))] hover:bg-[hsl(var(--stroke))]/50'
                }`}
              >
                {link}
              </button>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-[hsl(var(--stroke))] mx-1 shrink-0" aria-hidden="true" />

        {/* 5. "Say hi" button: On hover shows accent gradient border behind (using absolute span with inset: -2px). Inner content wrapped in bg-surface rounded-full backdrop-blur-md. Includes "↗" arrow */}
        <button
          onClick={onOpenContact}
          className="group relative text-xs sm:text-sm rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 shrink-0"
          aria-label="Say hi and reach out"
        >
          <span
            className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient -z-10"
            aria-hidden="true"
          />
          <span className="inline-flex items-center gap-1 bg-[hsl(var(--surface))] rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-[hsl(var(--text))] font-medium backdrop-blur-md transition-colors duration-200 group-hover:bg-[hsl(var(--surface))]/90 whitespace-nowrap">
            <span>Say hi</span>
            <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </span>
        </button>
      </nav>
    </header>
  );
};
