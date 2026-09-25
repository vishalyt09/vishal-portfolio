import React, { useState } from 'react';
import { X, ExternalLink, Check, Calendar, Users, MapPin, Dumbbell, Shield, Terminal, ArrowRight, Sparkles, Copy } from 'lucide-react';
import { Project } from '../types/index.ts';

interface ProjectDemoModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
}

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  if (!project) return null;

  // State for Hotel Demo
  const [selectedRoom, setSelectedRoom] = useState<'ocean' | 'villa' | 'penthouse'>('ocean');
  const [hotelBookingDates, setHotelBookingDates] = useState({ checkIn: '2026-10-15', checkOut: '2026-10-20', guests: '2' });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // State for Gym Demo
  const [selectedTier, setSelectedTier] = useState<'basic' | 'pro' | 'elite'>('pro');
  const [selectedClassDay, setSelectedClassDay] = useState<'mon' | 'wed' | 'fri'>('mon');
  const [gymTrialSuccess, setGymTrialSuccess] = useState(false);

  // State for DevTools Demo
  const [jsonInput, setJsonInput] = useState('{"project": "VISHAL.DEV", "status": "active", "rating": 5}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [base64Input, setBase64Input] = useState('Hello from Vishal Web Solutions!');
  const [base64Output, setBase64Output] = useState('');
  const [copiedText, setCopiedText] = useState(false);

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
      setJsonError('');
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON syntax');
      setJsonOutput('');
    }
  };

  const handleEncodeBase64 = () => {
    try {
      setBase64Output(btoa(base64Input));
    } catch {
      setBase64Output('Encoding error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0b101e] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d16]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 font-semibold">
              LIVE DEMO EXPLORER
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-mono text-slate-400">{project.label}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Project Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
            <div>
              <div className="text-xs text-slate-400 font-mono mb-1">{project.category}</div>
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">{project.description}</p>
            </div>

            <button
              onClick={() => {
                onClose();
                onInquire(project.title);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shrink-0"
            >
              Request Similar Project
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* DEMO TYPE 1: SKY HOTEL & RESORT */}
          {project.liveDemoType === 'hotel' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-cyan-300">Room Suite Selector & Rates</span>
                  <span className="text-xs text-slate-400">Interactive Prototype</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setSelectedRoom('ocean')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedRoom === 'ocean'
                        ? 'bg-slate-800 border-cyan-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">Deluxe Ocean Suite</div>
                    <div className="text-sm font-semibold text-cyan-400 mt-1">$380 / night</div>
                    <div className="text-[11px] text-slate-400 mt-2">King Bed · Private Balcony · 42m²</div>
                  </button>

                  <button
                    onClick={() => setSelectedRoom('villa')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedRoom === 'villa'
                        ? 'bg-slate-800 border-cyan-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">Cliffside Pool Villa</div>
                    <div className="text-sm font-semibold text-cyan-400 mt-1">$620 / night</div>
                    <div className="text-[11px] text-slate-400 mt-2">Infinity Plunge Pool · Butler · 85m²</div>
                  </button>

                  <button
                    onClick={() => setSelectedRoom('penthouse')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedRoom === 'penthouse'
                        ? 'bg-slate-800 border-cyan-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">Royal Sky Penthouse</div>
                    <div className="text-sm font-semibold text-cyan-400 mt-1">$950 / night</div>
                    <div className="text-[11px] text-slate-400 mt-2">Panoramic 360° Ocean · 150m²</div>
                  </button>
                </div>

                {/* Simulated Enquiry Form */}
                <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-3">
                  <div className="text-xs font-semibold text-white">Test Booking Enquiry Flow</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Check-in</label>
                      <input
                        type="date"
                        value={hotelBookingDates.checkIn}
                        onChange={(e) => setHotelBookingDates({ ...hotelBookingDates, checkIn: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white p-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Check-out</label>
                      <input
                        type="date"
                        value={hotelBookingDates.checkOut}
                        onChange={(e) => setHotelBookingDates({ ...hotelBookingDates, checkOut: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white p-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Guests</label>
                      <select
                        value={hotelBookingDates.guests}
                        onChange={(e) => setHotelBookingDates({ ...hotelBookingDates, guests: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white p-2 rounded"
                      >
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">3+ Guests</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-400">
                      Estimated 5 nights stay: <span className="text-white font-bold">$1,900 USD</span>
                    </span>
                    <button
                      onClick={() => setBookingConfirmed(true)}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded transition-colors"
                    >
                      Simulate Reservation
                    </button>
                  </div>

                  {bookingConfirmed && (
                    <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Enquiry simulated! Lead capture connects with booking engines or emails.</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* DEMO TYPE 2: GYM & FITNESS STUDIO */}
          {project.liveDemoType === 'gym' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-cyan-300">Class Timetable & Memberships</span>
                  <span className="text-xs text-slate-400">Interactive Prototype</span>
                </div>

                {/* Day selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Day:</span>
                  {(['mon', 'wed', 'fri'] as const).map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedClassDay(day)}
                      className={`px-3 py-1 text-xs font-mono rounded ${
                        selectedClassDay === day ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {day.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Schedule items */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div>
                      <div className="font-semibold text-white">HIIT Athletic Burn</div>
                      <div className="text-slate-400 text-[11px]">07:00 AM – 08:00 AM · Coach Alex</div>
                    </div>
                    <button
                      onClick={() => setGymTrialSuccess(true)}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded border border-slate-700"
                    >
                      Reserve Spot
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div>
                      <div className="font-semibold text-white">Power Lifting & Strength</div>
                      <div className="text-slate-400 text-[11px]">12:30 PM – 01:30 PM · Coach Marcus</div>
                    </div>
                    <button
                      onClick={() => setGymTrialSuccess(true)}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded border border-slate-700"
                    >
                      Reserve Spot
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div>
                      <div className="font-semibold text-white">Reformer Pilates & Mobility</div>
                      <div className="text-slate-400 text-[11px]">06:00 PM – 07:00 PM · Coach Elena</div>
                    </div>
                    <button
                      onClick={() => setGymTrialSuccess(true)}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded border border-slate-700"
                    >
                      Reserve Spot
                    </button>
                  </div>
                </div>

                {gymTrialSuccess && (
                  <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Trial session pass booked! Integrates with gym management APIs (Mindbody, Stripe).</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DEMO TYPE 3: DEVTOOLS HUB */}
          {project.liveDemoType === 'devtools' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-cyan-300">Live JSON Formatter & Validator</span>
                  <span className="text-xs text-slate-400">Interactive Client Utility</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <label className="text-slate-400 block mb-1">Input Raw JSON</label>
                    <textarea
                      rows={5}
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-cyan-300 p-2.5 rounded-lg focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      onClick={handleFormatJson}
                      className="mt-2 px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded text-xs transition-colors"
                    >
                      Format & Validate
                    </button>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Formatted Output</label>
                    <textarea
                      readOnly
                      rows={5}
                      value={jsonError ? `Error: ${jsonError}` : jsonOutput || '// Click "Format & Validate"'}
                      className={`w-full bg-slate-950 border p-2.5 rounded-lg focus:outline-none ${
                        jsonError ? 'border-rose-500 text-rose-300' : 'border-slate-800 text-emerald-300'
                      }`}
                    />
                  </div>
                </div>

                {/* Base64 Tool */}
                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-xs font-mono uppercase text-cyan-300 block mb-2">Base64 Text Encoder</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={base64Input}
                      onChange={(e) => setBase64Input(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 text-white text-xs px-3 py-2 rounded focus:outline-none"
                    />
                    <button
                      onClick={handleEncodeBase64}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono rounded"
                    >
                      Encode
                    </button>
                  </div>
                  {base64Output && (
                    <div className="mt-2 p-2 bg-slate-950 border border-slate-800 rounded flex items-center justify-between text-xs font-mono text-cyan-300">
                      <span className="truncate">{base64Output}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(base64Output);
                          setCopiedText(true);
                          setTimeout(() => setCopiedText(false), 1500);
                        }}
                        className="text-slate-400 hover:text-white ml-2"
                      >
                        {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* Key Technologies used in project */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span>Stack:</span>
              {project.technologies.map((t, idx) => (
                <span key={idx} className="text-slate-300">
                  {t}{idx < project.technologies.length - 1 ? ' ·' : ''}
                </span>
              ))}
            </div>
            <span className="text-slate-500">Built with modern web standards</span>
          </div>

        </div>

      </div>
    </div>
  );
};
