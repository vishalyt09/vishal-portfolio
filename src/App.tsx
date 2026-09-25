/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Skills } from './components/Skills.tsx';
import { Services } from './components/Services.tsx';
import { Projects } from './components/Projects.tsx';
import { Pricing } from './components/Pricing.tsx';
import { Process } from './components/Process.tsx';
import { FAQ } from './components/FAQ.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { NotFoundView } from './components/NotFoundView.tsx';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [prefilledProjectType, setPrefilledProjectType] = useState<string>('');
  const [prefilledBudget, setPrefilledBudget] = useState<string>('');
  const [is404, setIs404] = useState<boolean>(() => {
    return window.location.hash === '#404';
  });

  // Track scroll position to update active navbar item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'services', 'projects', 'pricing', 'process', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to hash changes (for 404 test)
  useEffect(() => {
    const handleHashChange = () => {
      setIs404(window.location.hash === '#404');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setIs404(false);
    if (window.location.hash === '#404') {
      window.location.hash = '';
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setPrefilledProjectType(serviceTitle);
    handleNavigate('contact');
  };

  const handleInquireProject = (projectTitle: string) => {
    setPrefilledProjectType(`Demo Inspired: ${projectTitle}`);
    handleNavigate('contact');
  };

  const handleSelectPlan = (planName: string, budgetRange: string) => {
    setPrefilledProjectType(`${planName} Website Plan`);
    setPrefilledBudget(budgetRange);
    handleNavigate('contact');
  };

  if (is404) {
    return (
      <NotFoundView
        onReturnHome={() => {
          setIs404(false);
          window.location.hash = '';
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-[#e2e8f0] relative selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cyan-400 text-slate-950 font-bold rounded shadow-lg"
      >
        Skip to main content
      </a>

      {/* Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero onNavigate={handleNavigate} />
        <About />
        <Skills />
        <Services onSelectService={handleSelectService} />
        <Projects onInquireProject={handleInquireProject} />
        <Pricing
          currency={currency}
          onCurrencyChange={setCurrency}
          onSelectPlan={handleSelectPlan}
        />
        <Process />
        <FAQ />
        <Contact
          prefilledProjectType={prefilledProjectType}
          prefilledBudget={prefilledBudget}
        />
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
