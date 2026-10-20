import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const ROTATING_WORDS = ["Design", "Create", "Inspire"];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isFinishing, setIsFinishing] = useState<boolean>(false);

  // Cycling words every 900ms
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 900);
    return () => clearInterval(wordInterval);
  }, []);

  // requestAnimationFrame counter from 000 -> 100 over 2700ms
  useEffect(() => {
    const duration = 2700; // 2700ms
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth cubic easing for high fidelity counter feel
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(100);
        setIsFinishing(true);
        // 400ms delay then onComplete
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 400);
        return () => clearTimeout(completeTimeout);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFinishing ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none pointer-events-auto"
      style={{ backgroundColor: 'hsl(var(--bg))' }}
      aria-label="Loading portfolio"
    >
      {/* Top-left: "Portfolio" label */}
      <div className="flex items-center justify-between w-full">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] font-medium"
        >
          Portfolio
        </motion.span>
        <span className="text-xs text-[hsl(var(--muted))]/60 tracking-widest hidden sm:inline-block">
          MICHAEL SMITH · 2026
        </span>
      </div>

      {/* Center: Rotating words */}
      <div className="flex items-center justify-center my-auto min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={ROTATING_WORDS[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-[hsl(var(--text))]/80 text-center tracking-tight"
          >
            {ROTATING_WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom area: Counter and progress bar */}
      <div className="w-full space-y-6">
        <div className="flex items-end justify-between">
          <span className="text-xs text-[hsl(var(--muted))] tracking-widest hidden sm:inline-block">
            INITIALIZING CANVAS
          </span>
          {/* Bottom-right: Counter display */}
          <div className="ml-auto text-right">
            <span className="text-6xl md:text-8xl lg:text-9xl font-display text-[hsl(var(--text))] tabular-nums leading-none">
              {String(count).padStart(3, "0")}
            </span>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="w-full h-[3px] bg-[hsl(var(--stroke))]/50 rounded-full overflow-hidden">
          <div
            className="h-full accent-gradient origin-left transition-transform duration-75 ease-linear"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
