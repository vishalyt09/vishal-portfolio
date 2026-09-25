import React from 'react';
import { Palette, Terminal, Lightbulb, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, ABOUT_CARDS } from '../data/portfolioData.ts';

export const About: React.FC = () => {
  const getCardIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Palette className="w-5 h-5 text-cyan-400" />;
      case 1:
        return <Terminal className="w-5 h-5 text-teal-400" />;
      case 2:
        return <Lightbulb className="w-5 h-5 text-amber-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="about" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            Introduction
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {PERSONAL_INFO.aboutHeading}
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
            “{PERSONAL_INFO.aboutText}”
          </p>
        </div>

        {/* 3 Pillars / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ABOUT_CARDS.map((card, idx) => (
            <div
              key={card.number}
              className="group relative rounded-xl border border-slate-800 bg-[#0c1220]/60 hover:bg-[#0f172a]/80 p-8 transition-all duration-300 hover:border-slate-700 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono font-semibold tracking-wider text-slate-400">
                    {card.number}
                  </span>
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 group-hover:border-slate-700 transition-colors">
                    {getCardIcon(idx)}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>

                <p className="text-base font-medium text-slate-300 mb-3">
                  {card.description}
                </p>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {card.detail}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>VISHAL.DEV Focus</span>
                <span className="text-cyan-400">0{idx + 1} / 03</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
