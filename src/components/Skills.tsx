import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, RotateCcw, Check, Sparkles, Layers, SlidersHorizontal } from 'lucide-react';
import { INITIAL_SKILLS } from '../data/portfolioData.ts';
import { SkillItem } from '../types/index.ts';

const STORAGE_KEY = 'vishal_portfolio_skills_v1';

export const Skills: React.FC = () => {
  const [skills, setSkills] = useState<SkillItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_SKILLS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState<{
    name: string;
    category: SkillItem['category'];
    level: string;
    description: string;
  }>({
    name: '',
    category: 'Frontend',
    level: 'Core',
    description: '',
  });

  // Save to localStorage when skills change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
    } catch {
      // localStorage failed silently
    }
  }, [skills]);

  const categories = ['All', 'Frontend', 'Backend & Scripting', 'Integrations & Tools'];

  const filteredSkills = skills.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    const item: SkillItem = {
      id: `skill-${Date.now()}`,
      name: newSkill.name.trim(),
      category: newSkill.category,
      level: newSkill.level || 'Specialized',
      description: newSkill.description || 'Custom technology integration for web applications.',
    };

    setSkills([...skills, item]);
    setNewSkill({
      name: '',
      category: 'Frontend',
      level: 'Core',
      description: '',
    });
  };

  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleResetSkills = () => {
    setSkills(INITIAL_SKILLS);
    localStorage.removeItem(STORAGE_KEY);
    setIsEditMode(false);
  };

  const handleUpdateSkill = (id: string, updatedFields: Partial<SkillItem>) => {
    setSkills(
      skills.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    );
    setEditingSkillId(null);
  };

  return (
    <section id="skills" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Edit Mode Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Technical Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Skills & Technologies
            </h2>
            <p className="text-base text-slate-300">
              Modern frontend architecture, scripting, clean API connections, and responsive design systems.
            </p>
          </div>

          {/* Action buttons: Filter & Edit Skills mode */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded-lg border transition-all ${
                isEditMode
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
              }`}
              title="Toggle interactive editing mode for skills"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {isEditMode ? 'Finish Editing' : 'Edit Skills'}
            </button>

            {isEditMode && (
              <button
                onClick={handleResetSkills}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 rounded-lg hover:border-rose-900/50 transition-colors"
                title="Reset to default skills"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            )}
          </div>
        </div>

        {/* Category Filters (Clean Segmented Buttons) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-[#0b101d] rounded-xl border border-slate-800 w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeCategory === cat
                  ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Add Skill Panel (When in Edit Mode) */}
        {isEditMode && (
          <form
            onSubmit={handleAddSkill}
            className="mb-10 p-5 rounded-xl border border-cyan-500/30 bg-[#0d1627]/80 backdrop-blur-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 font-semibold">
                <Plus className="w-3.5 h-3.5" />
                Add New Skill / Tool
              </span>
              <span className="text-[11px] text-slate-400">Updates saved to browser storage</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <input
                  type="text"
                  placeholder="Skill name (e.g., Next.js, Node.js)"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div className="sm:col-span-3">
                <select
                  value={newSkill.category}
                  onChange={(e) =>
                    setNewSkill({
                      ...newSkill,
                      category: e.target.value as SkillItem['category'],
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend & Scripting">Backend & Scripting</option>
                  <option value="Integrations & Tools">Integrations & Tools</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <input
                  type="text"
                  placeholder="Description / application"
                  value={newSkill.description}
                  onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2 px-3 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => {
            const isEditing = editingSkillId === skill.id;

            return (
              <div
                key={skill.id}
                className="group relative rounded-xl border border-slate-800 bg-[#0c1220]/70 hover:bg-[#0f172a] p-5 transition-all duration-200 hover:border-slate-700 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h3>
                    </div>

                    {/* Unboxed category metadata per Zero-Pill rule */}
                    <div className="text-[11px] font-mono text-slate-400">
                      {skill.category}
                    </div>
                  </div>

                  {/* Description */}
                  {isEditing ? (
                    <div className="mt-2 space-y-2">
                      <textarea
                        defaultValue={skill.description}
                        id={`desc-${skill.id}`}
                        rows={2}
                        className="w-full p-2 text-xs rounded bg-slate-900 border border-cyan-500 text-white focus:outline-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingSkillId(null)}
                          className="px-2 py-1 text-[11px] text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            const val = (
                              document.getElementById(`desc-${skill.id}`) as HTMLTextAreaElement
                            )?.value;
                            handleUpdateSkill(skill.id, { description: val });
                          }}
                          className="px-2 py-1 text-[11px] bg-cyan-400 text-slate-950 rounded font-medium"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 leading-relaxed mt-2 font-normal">
                      {skill.description}
                    </p>
                  )}
                </div>

                {/* Footer metadata or Edit Actions */}
                <div className="pt-4 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span>Proficiency</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-300">{skill.level}</span>
                  </div>

                  {isEditMode && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingSkillId(isEditing ? null : skill.id)}
                        className="text-slate-400 hover:text-cyan-300 p-1"
                        title="Edit text"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="text-slate-400 hover:text-rose-400 p-1"
                        title="Delete skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
