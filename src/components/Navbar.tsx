import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, DollarSign } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  currency: 'USD' | 'EUR' | 'GBP';
  onCurrencyChange: (currency: 'USD' | 'EUR' | 'GBP') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  currency,
  onCurrencyChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Process', id: 'process' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          {/* Zone 1: Wordmark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="group flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
            aria-label="VISHAL.DEV Home"
          >
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors font-mono">
              {PERSONAL_INFO.brand}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-sm font-medium transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Currency Switcher + CTA) */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Currency selector for international clients */}
            <div className="flex items-center text-xs text-slate-400 bg-slate-900/80 border border-slate-800 rounded-lg p-1">
              {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onCurrencyChange(curr)}
                  className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
                    currency === curr
                      ? 'bg-slate-800 text-cyan-300 font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={`View pricing in ${curr}`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleLinkClick('contact')}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 rounded-lg hover:from-cyan-300 hover:to-teal-200 transition-all duration-200 shadow-sm shadow-cyan-500/10 hover:shadow-cyan-500/25 active:scale-[0.98] whitespace-nowrap"
            >
              Start a Project
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#090d16]/98 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                  activeSection === link.id
                    ? 'text-cyan-400 bg-slate-800/60'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400">Currency</span>
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
              {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onCurrencyChange(curr)}
                  className={`px-2 py-0.5 text-xs font-mono rounded ${
                    currency === curr ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleLinkClick('contact')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 rounded-lg hover:from-cyan-300 transition-colors"
          >
            Start a Project
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
