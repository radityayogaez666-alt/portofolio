/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { SelectedWorks, PROJECTS_DATA } from './components/SelectedWorks.tsx';
import { Journal, JOURNAL_ENTRIES } from './components/Journal.tsx';
import { Explorations } from './components/Explorations.tsx';
import { Stats } from './components/Stats.tsx';
import { Footer } from './components/Footer.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { ProjectModal } from './components/ProjectModal.tsx';
import { JournalModal } from './components/JournalModal.tsx';
import { ExplorationModal } from './components/ExplorationModal.tsx';
import { Project, JournalEntry, ExplorationItem } from './types.ts';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Modal states
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedJournal, setSelectedJournal] = useState<JournalEntry | null>(null);
  const [selectedExploration, setSelectedExploration] = useState<ExplorationItem | null>(null);

  // Track active section for navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const workEl = document.getElementById('work');
      const workOffset = workEl ? workEl.offsetTop - 300 : 700;

      if (scrollY < workOffset) {
        setActiveSection('home');
      } else {
        setActiveSection('work');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToWorks = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('work');
    }
  };

  return (
    <div className="relative min-h-screen bg-[hsl(var(--bg))] text-[hsl(var(--text))] antialiased selection:bg-sky-500/25 selection:text-white">
      {/* Section 1: Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Floating Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={(section) => setActiveSection(section)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <main>
        {/* Section 2: Hero with background HLS video & GSAP entrance */}
        <Hero
          onSeeWorks={handleScrollToWorks}
          onReachOut={() => setIsContactOpen(true)}
        />

        {/* Section 3: Selected Works (7/5/5/7 Bento Grid) */}
        <SelectedWorks
          onSelectProject={(project) => setSelectedProject(project)}
          onViewAllWork={() => setSelectedProject(PROJECTS_DATA[0])}
        />

        {/* Section 4: Journal (4 horizontal pills) */}
        <Journal
          onSelectEntry={(entry) => setSelectedJournal(entry)}
          onViewAllJournal={() => setSelectedJournal(JOURNAL_ENTRIES[0])}
        />

        {/* Section 5: Explorations (Parallax Gallery) */}
        <Explorations
          onSelectItem={(item) => setSelectedExploration(item)}
        />

        {/* Section 6: Stats */}
        <Stats />
      </main>

      {/* Section 7: Contact / Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContact={() => {
          setSelectedProject(null);
          setIsContactOpen(true);
        }}
      />

      <JournalModal
        entry={selectedJournal}
        onClose={() => setSelectedJournal(null)}
      />

      <ExplorationModal
        item={selectedExploration}
        onClose={() => setSelectedExploration(null)}
      />
    </div>
  );
}
