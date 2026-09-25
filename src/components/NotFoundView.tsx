import React from 'react';
import { ArrowLeft, Home, FileQuestion } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface NotFoundViewProps {
  onReturnHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onReturnHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#090d16] text-[#e2e8f0]">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl border border-slate-800 bg-[#0c1220]/90 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            Error 404
          </span>
          <h1 className="text-3xl font-extrabold text-white">Page Not Found</h1>
          <p className="text-sm text-slate-300">
            The requested page or resource doesn't exist or has moved. Return to the main portfolio below.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onReturnHome}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to {PERSONAL_INFO.brand}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
