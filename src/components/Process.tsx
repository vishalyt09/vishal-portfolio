import React from 'react';
import { Search, Compass, Code, Rocket, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../data/portfolioData.ts';

export const Process: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Search className="w-5 h-5 text-cyan-400" />;
      case 1:
        return <Compass className="w-5 h-5 text-teal-400" />;
      case 2:
        return <Code className="w-5 h-5 text-purple-400" />;
      case 3:
        return <Rocket className="w-5 h-5 text-emerald-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="process" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            How We Work Together
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A clear, collaborative 4-step workflow from initial brief to successful deployment.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="group relative rounded-xl border border-slate-800 bg-[#0c1220]/70 hover:bg-[#0f172a] p-6 transition-all duration-300 hover:border-slate-700 flex flex-col justify-between"
            >
              <div>
                {/* Step number & icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-black font-mono tracking-tight text-slate-400 group-hover:text-cyan-400 transition-colors">
                    {step.number}
                  </span>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-colors">
                    {getStepIcon(idx)}
                  </div>
                </div>

                {/* Step Name */}
                <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {step.name}
                </h3>

                {/* Tagline */}
                <p className="text-xs font-semibold text-slate-300 mb-3">
                  {step.tagline}
                </p>

                {/* Detailed Description */}
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Phase 0{idx + 1} of 04</span>
                <span className="text-cyan-400">Step {step.number}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
