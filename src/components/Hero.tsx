import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, CheckCircle2, Smartphone, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';
import heroAbstractImg from '../assets/images/hero_abstract_tech_1790333203442.jpg';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle ambient gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-24 w-[380px] h-[340px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Client-Focused Messaging */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Role & Availability Status */}
            <div className="inline-flex items-center gap-2.5 text-xs text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-white font-mono tracking-wide">
                Vishal — Web Developer
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Available for Web Projects</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.12]">
              “I build modern, fast and mobile-friendly websites for businesses.”
            </h1>

            {/* Value Proposition */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
              Specializing in custom business websites, high-converting landing pages, and web solutions designed to build trust and attract clients in the USA and worldwide.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-300 hover:from-cyan-300 hover:to-emerald-200 transition-all shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/20 active:scale-[0.98]"
              >
                View My Projects
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all active:scale-[0.98]"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Key Business Advantages (Client-Focused) */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Mobile-First Design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Fast Loading Speeds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Clear Direct Communication</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Premium Web-Design Showcase Visual (No Code, No IDE) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer Glass Container */}
              <div className="relative rounded-2xl border border-slate-800/90 bg-[#0c1220]/90 backdrop-blur-md shadow-2xl shadow-black/80 overflow-hidden">
                
                {/* Visual Backdrop (Abstract Technology & Minimal Geometry) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  {!imageError ? (
                    <img
                      src={heroAbstractImg}
                      alt="Modern web technology design"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-center brightness-95 opacity-85 hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-[#0d1627] to-slate-950" />
                  )}
                  
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1220] via-[#0c1220]/40 to-transparent" />
                  
                  {/* Floating Website Preview Card (No code, pure UI design presentation) */}
                  <div className="absolute inset-4 sm:inset-6 flex flex-col justify-between">
                    
                    {/* Simulated Clean Browser Frame */}
                    <div className="rounded-xl border border-slate-700/60 bg-[#090d16]/85 backdrop-blur-md p-3.5 shadow-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-slate-600" />
                          <span className="w-2 h-2 rounded-full bg-slate-600" />
                          <span className="w-2 h-2 rounded-full bg-slate-600" />
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">yourbusiness.com</span>
                        <div className="w-4" />
                      </div>

                      {/* Mockup Website Layout Elements */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                          <div className="w-16 h-2 rounded bg-cyan-400/80" />
                          <div className="flex gap-2">
                            <div className="w-8 h-1.5 rounded bg-slate-600" />
                            <div className="w-8 h-1.5 rounded bg-slate-600" />
                            <div className="w-10 h-2 rounded bg-teal-400" />
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="w-28 h-2.5 rounded bg-white/90" />
                            <div className="w-36 h-2 rounded bg-slate-500" />
                          </div>
                          <div className="w-14 h-5 rounded bg-cyan-400 flex items-center justify-center">
                            <span className="text-[9px] font-bold text-slate-950 font-sans">Book Now</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Outcome Metric Badges */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="p-2.5 rounded-lg bg-[#090d16]/90 backdrop-blur-md border border-slate-800/90 flex items-center gap-2">
                        <div className="p-1 rounded bg-emerald-500/10 text-emerald-400">
                          <Zap className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">Performance</div>
                          <div className="text-xs font-bold text-white">Ultra Fast</div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#090d16]/90 backdrop-blur-md border border-slate-800/90 flex items-center gap-2">
                        <div className="p-1 rounded bg-cyan-500/10 text-cyan-400">
                          <Smartphone className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">Experience</div>
                          <div className="text-xs font-bold text-white">100% Mobile</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Sub-bar */}
                <div className="px-5 py-3 bg-[#0a0f1c] border-t border-slate-800/90 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    Built for Growth & Conversions
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">VISHAL.DEV</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
