import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/portfolioData.ts';

export const FAQ: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleQuestion = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <section id="faq" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-center space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Everything you need to know about working with Vishal on modern web projects.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);

            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-[#0c1220]/70 hover:bg-[#0f172a] transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-cyan-400 border-cyan-500/40' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/50">
                    <p>“{faq.answer}”</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
