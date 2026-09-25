import React, { useState } from 'react';
import { Mail, Send, Copy, Check, Sparkles, MessageSquare, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { ContactFormData } from '../types/index.ts';

interface ContactProps {
  prefilledProjectType?: string;
  prefilledBudget?: string;
}

export const Contact: React.FC<ContactProps> = ({
  prefilledProjectType,
  prefilledBudget,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    businessName: '',
    projectType: prefilledProjectType || 'Business Website',
    budget: prefilledBudget || '$499 - $799',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Keep pre-filled fields synced if updated from outside
  React.useEffect(() => {
    if (prefilledProjectType) {
      setFormData((prev) => ({ ...prev, projectType: prefilledProjectType }));
    }
  }, [prefilledProjectType]);

  React.useEffect(() => {
    if (prefilledBudget) {
      setFormData((prev) => ({ ...prev, budget: prefilledBudget }));
    }
  }, [prefilledBudget]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Please enter your business or project name';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief message about your project';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate mailto link with encoded query parameters
    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} — ${formData.businessName}`);
    const body = encodeURIComponent(
      `Hi Vishal,\n\nI would like to discuss a web project.\n\n` +
      `Client Name: ${formData.name}\n` +
      `Business: ${formData.businessName}\n` +
      `Email: ${formData.email}\n` +
      `Project Type: ${formData.projectType}\n` +
      `Budget Range: ${formData.budget}\n\n` +
      `Project Details:\n${formData.message}\n\n` +
      `Best regards,\n${formData.name}`
    );

    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;

    // Trigger user's mail client
    window.location.href = mailtoUrl;
    setIsSubmitted(true);
  };

  const getInquirySummaryText = () => {
    return (
      `Project Inquiry for Vishal (VISHAL.DEV):\n` +
      `Name: ${formData.name}\n` +
      `Business: ${formData.businessName}\n` +
      `Email: ${formData.email}\n` +
      `Type: ${formData.projectType}\n` +
      `Budget: ${formData.budget}\n` +
      `Message: ${formData.message}`
    );
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(getInquirySummaryText());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <section id="contact" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Copy & Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Start a Conversation
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {PERSONAL_INFO.contactHeading}
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed font-normal">
                “{PERSONAL_INFO.contactText}”
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0c1220]/80 space-y-4">
              <div className="flex items-center gap-3 text-cyan-400">
                <Mail className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Direct Email
                </span>
              </div>

              <div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-bold text-white hover:text-cyan-300 transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              {/* Secondary CTA: Email Me & Copy Email */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Project%20Inquiry%20from%20Website`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
                >
                  <span>Email Me</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 text-[11px] text-slate-400">
                Fast responses for USA, European, and international clients across all timezones.
              </div>
            </div>

            {/* International Collaboration Assurance */}
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Async & Video Communication Available</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Transparent Milestones & Deliverables</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>No Long Contracts — Direct Collaboration</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#0c1220]/90 backdrop-blur-md shadow-xl shadow-black/40">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          errors.name ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700/80 focus:border-cyan-400'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="sarah@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          errors.email ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700/80 focus:border-cyan-400'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Business Name */}
                    <div>
                      <label htmlFor="businessName" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Business Name *
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => {
                          setFormData({ ...formData, businessName: e.target.value });
                          if (errors.businessName) setErrors({ ...errors, businessName: undefined });
                        }}
                        placeholder="e.g. Apex Hospitality, Pulse Gym"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          errors.businessName ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700/80 focus:border-cyan-400'
                        }`}
                      />
                      {errors.businessName && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.businessName}
                        </p>
                      )}
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="projectType" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Business Website">Business Website (Multi-Page)</option>
                        <option value="Landing Pages">High-Converting Landing Page</option>
                        <option value="AI & API Integration">AI & API Integration</option>
                        <option value="Website Improvements">Website Improvements / Redesign</option>
                        <option value="Custom Project">Custom Requirements</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="$499 - $799">$499 – $799 (Starter)</option>
                      <option value="$799 - $1,500">$799 – $1,500 (Professional)</option>
                      <option value="$1,500+">$1,500+ (Custom / Multi-Phase)</option>
                      <option value="Let's Talk">Let's Discuss First</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Tell me what you're building, any reference websites you like, and your ideal launch timeline..."
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.message ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700/80 focus:border-cyan-400'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-lg text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/20 active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Send Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-slate-400 text-center font-normal">
                    Direct communication with Vishal · No automated marketing spam.
                  </p>

                </form>
              ) : (
                /* Success State with Copy Summary */
                <div className="py-8 text-center space-y-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Inquiry Prepared!</h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      Your email client has been prompted. If it didn't open automatically, you can copy the summary below and email directly to <span className="text-cyan-400 font-mono">{PERSONAL_INFO.email}</span>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left font-mono text-xs text-slate-300 space-y-1 overflow-x-auto">
                    <div className="text-cyan-400 font-semibold mb-2">// Inquiry Summary</div>
                    <div><span className="text-slate-500">Name:</span> {formData.name}</div>
                    <div><span className="text-slate-500">Business:</span> {formData.businessName}</div>
                    <div><span className="text-slate-500">Email:</span> {formData.email}</div>
                    <div><span className="text-slate-500">Type:</span> {formData.projectType}</div>
                    <div><span className="text-slate-500">Budget:</span> {formData.budget}</div>
                    <div><span className="text-slate-500">Message:</span> {formData.message}</div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 text-white text-xs font-mono transition-colors"
                    >
                      {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedSummary ? 'Copied Summary' : 'Copy Summary'}</span>
                    </button>

                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-semibold transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open Email Client</span>
                    </a>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-slate-400 hover:text-white px-3 py-2"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
