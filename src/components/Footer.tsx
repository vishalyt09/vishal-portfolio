import React, { useState } from 'react';
import { Mail, ArrowUp, Github, Linkedin, ExternalLink, Copy, Check, Info } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [socialModal, setSocialModal] = useState<'github' | 'linkedin' | null>(null);
  const [copiedPlaceholder, setCopiedPlaceholder] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleCopyPlaceholder = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPlaceholder(text);
    setTimeout(() => setCopiedPlaceholder(null), 2000);
  };

  return (
    <footer className="border-t border-slate-800 bg-[#070b13] relative text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                {PERSONAL_INFO.brand}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              “{PERSONAL_INFO.footerTagline}”
            </p>

            <div className="pt-2 text-xs text-slate-400">
              Web Developer · USA & International Client Solutions
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-cyan-400 transition-colors focus:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white">
              Direct Contact
            </div>
            
            <div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 break-all"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>

            {/* Social Links (Strictly following rule: "Do not invent social-media URLs") */}
            <div className="pt-3 space-y-2">
              <span className="text-xs font-mono text-slate-400 block">Profiles & Verification</span>
              <div className="flex flex-col gap-2 text-xs font-mono">
                
                {/* GitHub link with placeholder */}
                <button
                  onClick={() => setSocialModal('github')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group text-left"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 shrink-0" />
                  <span>GitHub — <span className="text-slate-500 underline decoration-dotted">[Add GitHub URL]</span></span>
                </button>

                {/* LinkedIn link with placeholder */}
                <button
                  onClick={() => setSocialModal('linkedin')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group text-left"
                >
                  <Linkedin className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 shrink-0" />
                  <span>LinkedIn — <span className="text-slate-500 underline decoration-dotted">[Add LinkedIn URL]</span></span>
                </button>

              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>{PERSONAL_INFO.copyright}</div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Social URL Customizer / Modal */}
      {socialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0c1220] border border-slate-800 rounded-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-sm font-bold text-white capitalize">
                {socialModal} Profile Link
              </span>
              <button
                onClick={() => setSocialModal(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Per portfolio specification, verified official URLs for {socialModal} can be attached here.
            </p>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 truncate">
                {socialModal === 'github' ? 'GitHub — [Add GitHub URL]' : 'LinkedIn — [Add LinkedIn URL]'}
              </span>
              <button
                onClick={() =>
                  handleCopyPlaceholder(
                    socialModal === 'github'
                      ? 'https://github.com/[username]'
                      : 'https://linkedin.com/in/[username]'
                  )
                }
                className="text-cyan-400 hover:text-cyan-300 ml-2"
                title="Copy template link"
              >
                {copiedPlaceholder ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={() => setSocialModal(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
