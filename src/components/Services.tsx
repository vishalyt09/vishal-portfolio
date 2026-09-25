import React from 'react';
import { Building2, Rocket, Cpu, Sparkles, ArrowRight, Check } from 'lucide-react';
import { SERVICES } from '../data/portfolioData.ts';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5 text-cyan-400" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-teal-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      default:
        return <Building2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            What I Offer
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Tailored Web Solutions
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Delivering clean, fast, and high-converting web experiences for USA and international businesses.
          </p>
        </div>

        {/* Services Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-xl border border-slate-800 bg-[#0c1220]/70 hover:bg-[#0f172a] p-8 transition-all duration-300 hover:border-slate-700 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-xs font-mono text-slate-400">Production Ready</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-base text-slate-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800/60">
                  <span className="text-xs font-mono uppercase text-slate-400">Key Deliverables</span>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Action Button */}
              <div className="pt-8 mt-6">
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-cyan-500/50 transition-all group/btn"
                >
                  <span>Inquire About {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
