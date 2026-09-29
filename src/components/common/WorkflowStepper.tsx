import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Target, 
  Search, 
  FlaskConical, 
  Scale, 
  TrendingUp, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';

export const WorkflowStepper: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const steps = [
    {
      step: 1,
      id: 'challenges',
      aliases: ['challenges', 'create-challenge', 'challenge-detail'],
      title: '1. Problem',
      tagline: 'What needs fixing?',
      icon: <Target className="w-4 h-4" />,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      step: 2,
      id: 'startup-discovery',
      aliases: ['startup-discovery', 'discovery', 'startup-profile', 'eligibility-screening', 'screening', 'expert-evaluation', 'evaluation'],
      title: '2. Pick Startup',
      tagline: 'Find best solution',
      icon: <Search className="w-4 h-4" />,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      step: 3,
      id: 'pilot-command',
      aliases: ['pilot-command', 'contract-milestones'],
      title: '3. Live Test',
      tagline: '90-day village test',
      icon: <FlaskConical className="w-4 h-4" />,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      step: 4,
      id: 'baseline-outcome',
      aliases: ['baseline-outcome', 'validation', 'evidence-room'],
      title: '4. See Proof',
      tagline: 'Did it work? (Results)',
      icon: <Scale className="w-4 h-4" />,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      step: 5,
      id: 'scale-decision',
      aliases: ['scale-decision', 'scale-simulator', 'procurement-readiness', 'procurement-pathway'],
      title: '5. Buy & Scale',
      tagline: 'Gov approval & rollout',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'from-sky-500 to-blue-700',
      bgColor: 'bg-sky-50 text-sky-700 border-sky-200'
    }
  ];

  const getCurrentStepIndex = () => {
    const idx = steps.findIndex(s => s.aliases.includes(activeTab) || s.id === activeTab);
    return idx >= 0 ? idx : 0;
  };

  const currentIdx = getCurrentStepIndex();

  return (
    <div className="gov-card p-3 mb-6">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100 px-1">
        <div className="flex items-center gap-2">
          <span className="live-dot"></span>
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            How It Works &mdash; 5 Steps
          </span>
        </div>
        <span className="text-xs text-gray-400 font-medium bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
          Step {currentIdx + 1} of 5
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {steps.map((s, idx) => {
          const isActive = s.aliases.includes(activeTab) || s.id === activeTab;
          const isPassed = idx < currentIdx;

          return (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-[#0F3460] to-[#1A5276] text-white border-transparent shadow-md ring-2 ring-[#0F3460]/20'
                  : isPassed
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100/80'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm shadow-sm ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : isPassed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {isPassed ? <CheckCircle2 className="w-4 h-4" /> : s.icon}
              </div>

              <div className="min-w-0 flex-1">
                <p className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {s.title}
                </p>
                <p className={`text-[10.5px] truncate ${isActive ? 'text-blue-200' : 'text-gray-500'}`}>
                  {s.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
