import React from 'react';
import { useApp } from '../../context/AppContext';
import { PlayCircle, RotateCcw, Sparkles } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { startGuidedTour, resetScenario, guidedTourActive } = useApp();

  return (
    <aside aria-label="Demonstration Notice" className="bg-gradient-to-r from-[#0A1929] via-[#0F2340] to-[#0A1929] text-white text-xs border-b border-white/5 py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 flex-wrap text-center sm:text-left">
          <span className="bg-amber-500/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md tracking-wider uppercase shadow-sm">
            Demo Mode
          </span>
          <span className="text-gray-300 font-medium">
            Smart India Hackathon 2026 &mdash; Maharashtra State Innovation Society
          </span>
          <span className="hidden md:inline text-gray-600">•</span>
          <span className="hidden md:inline text-blue-400 text-[11px] font-medium">
            CH-MH-2026-014 &middot; Rural Water Contamination Early Detection
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!guidedTourActive && (
            <button
              onClick={startGuidedTour}
              className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-100 shadow-md shadow-blue-900/30"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              Start Tour
            </button>
          )}
          <button
            onClick={resetScenario}
            className="bg-white/8 hover:bg-white/15 text-gray-300 hover:text-white px-2.5 py-1.5 rounded-lg text-[11px] font-medium flex items-center gap-1.5 transition-all border border-white/10"
            title="Reset demonstration data"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>
    </aside>
  );
};
