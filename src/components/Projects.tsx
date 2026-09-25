import React, { useState } from 'react';
import { Eye, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData.ts';
import { Project } from '../types/index.ts';
import { ProjectDemoModal } from './ProjectDemoModal.tsx';

interface ProjectsProps {
  onInquireProject: (projectTitle: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onInquireProject }) => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            Selected Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Featured Projects & Demos
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Practical, fast, and modern web solutions designed for small businesses and developers.
          </p>
          <div className="text-xs font-mono text-slate-400 pt-1">
            * All projects are transparently labeled as demo concepts or personal projects.
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-slate-800 bg-[#0c1220]/70 hover:bg-[#0f172a] overflow-hidden transition-all duration-300 hover:border-slate-700 flex flex-col justify-between"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-slate-800">
                  {!imageErrors[project.id] ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() => handleImageError(project.id)}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 text-center">
                      <Sparkles className="w-8 h-8 text-cyan-400 mb-2" />
                      <span className="text-sm font-semibold text-white">{project.title}</span>
                      <span className="text-xs text-slate-400 font-mono mt-1">{project.category}</span>
                    </div>
                  )}

                  {/* Unboxed label overlay per zero-pill rule */}
                  <div className="absolute top-3 left-3 bg-[#090d16]/90 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono font-medium text-cyan-300 border border-slate-800/80">
                    {project.label}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-xs font-mono text-slate-400 mb-1">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/60">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack metadata (unboxed separated text) */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    {project.technologies.map((t, idx) => (
                      <span key={idx} className="text-slate-300">
                        {t}{idx < project.technologies.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 mt-2 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-cyan-500/40 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Live Demo</span>
                </button>

                <button
                  onClick={() => onInquireProject(project.title)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors"
                >
                  <span>Build This</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Modal */}
      {activeModalProject && (
        <ProjectDemoModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
          onInquire={onInquireProject}
        />
      )}
    </section>
  );
};
