import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  CheckCircle, 
  PlayCircle,
  Sparkles,
  Target,
  Search,
  FlaskConical,
  Scale,
  TrendingUp
} from 'lucide-react';

export const GuidedScenarioTour: React.FC = () => {
  const { 
    guidedTourActive, 
    guidedTourStep, 
    nextTourStep, 
    prevTourStep, 
    endTour, 
    setActiveTab, 
    setRole,
    setSelectedChallengeId,
    setSelectedStartupId,
    setSelectedPilotId
  } = useApp();

  if (!guidedTourActive) return null;

  const tourSteps = [
    {
      title: 'Step 1: The Problem (Dirty Water Warning)',
      stage: 'Problem',
      role: 'GOVERNMENT_OFFICER' as const,
      tab: 'challenges',
      challengeId: 'CH-001',
      emoji: '🎯',
      summary: 'Rural drinking water takes 72 hours to test by hand. The government posts a challenge: "We need an automatic sensor that detects contamination in under 24 hours for under ₹300 per test!"',
      actionText: 'See The Problem ➔',
      onApply: () => {
        setRole('GOVERNMENT_OFFICER');
        setSelectedChallengeId('CH-001');
        setActiveTab('challenges');
      }
    },
    {
      title: 'Step 2: Pick the Best Startup',
      stage: 'Startup Match',
      role: 'GOVERNMENT_OFFICER' as const,
      tab: 'startup-discovery',
      challengeId: 'CH-001',
      emoji: '🚀',
      summary: 'The system scans verified Indian startups. AquaSense Technologies gets a 94% match score with their solar smart water sensor. The judges approve them for a live test.',
      actionText: 'View Matched Startup ➔',
      onApply: () => {
        setRole('GOVERNMENT_OFFICER');
        setSelectedStartupId('ST-001');
        setActiveTab('startup-discovery');
      }
    },
    {
      title: 'Step 3: Live 90-Day Village Test',
      stage: 'Live Village Test',
      role: 'GOVERNMENT_OFFICER' as const,
      tab: 'pilot-command',
      pilotId: 'PLT-001',
      emoji: '🧪',
      summary: 'We install smart sensors in 50 village drinking water tanks in Solapur. Live telemetry shows contamination warnings trigger in 28 minutes instead of 3 days!',
      actionText: 'Open Live Village Map & Sensors ➔',
      onApply: () => {
        setRole('GOVERNMENT_OFFICER');
        setSelectedPilotId('PLT-001');
        setActiveTab('pilot-command');
      }
    },
    {
      title: 'Step 4: Check Proof & Results',
      stage: 'Before vs After Proof',
      role: 'INDEPENDENT_VALIDATOR' as const,
      tab: 'baseline-outcome',
      pilotId: 'PLT-001',
      emoji: '📊',
      summary: 'Before vs After comparison: 4x faster (18h vs 72h) and 40% cheaper (₹270 vs ₹450). Independent lab validator (IIT Bombay & CWPRS) signs the official 98.4% passing certificate!',
      actionText: 'See Before vs After Proof ➔',
      onApply: () => {
        setRole('INDEPENDENT_VALIDATOR');
        setSelectedPilotId('PLT-001');
        setActiveTab('baseline-outcome');
      }
    },
    {
      title: 'Step 5: Buy & Scale Across Maharashtra',
      stage: 'Scale & Buy',
      role: 'GOVERNMENT_OFFICER' as const,
      tab: 'scale-decision',
      pilotId: 'PLT-001',
      emoji: '🏛️',
      summary: 'With proven lab results, the Joint Secretary authorizes statewide rollout for 12 districts (2,400 villages), saving Maharashtra ₹1.54 Crore every year!',
      actionText: 'Approve & Scale Rollout ➔',
      onApply: () => {
        setRole('GOVERNMENT_OFFICER');
        setSelectedPilotId('PLT-001');
        setActiveTab('scale-decision');
      }
    }
  ];

  const currentStepData = tourSteps[guidedTourStep] || tourSteps[0];
  const isFirst = guidedTourStep === 0;
  const isLast = guidedTourStep === tourSteps.length - 1;

  const handleGoStep = () => {
    currentStepData.onApply();
  };

  return (
    <div className="bg-gradient-to-r from-[#123B63] to-[#1E568A] text-white border-b border-[#0E2E4E] px-4 py-3 shadow-lg transition-all animate-fadeIn">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Step Badge & Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl shrink-0 border border-white/20">
            {currentStepData.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                Step {guidedTourStep + 1} of {tourSteps.length}
              </span>
              <span className="text-xs text-blue-200 font-semibold">
                {currentStepData.stage}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">
              {currentStepData.title}
            </h4>
            <p className="text-xs text-blue-100 max-w-2xl mt-0.5 line-clamp-1 sm:line-clamp-none">
              {currentStepData.summary}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end shrink-0">
          <button
            onClick={handleGoStep}
            className="bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white text-xs px-3.5 py-2 rounded-lg font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <PlayCircle className="w-4 h-4" />
            {currentStepData.actionText}
          </button>

          <div className="flex items-center gap-1">
            <button
              disabled={isFirst}
              onClick={() => {
                prevTourStep();
                const prev = tourSteps[guidedTourStep - 1];
                if (prev) prev.onApply();
              }}
              className={`p-2 rounded-lg border text-xs ${isFirst ? 'opacity-30 cursor-not-allowed border-white/10' : 'hover:bg-white/10 border-white/30'}`}
              title="Previous Step"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              disabled={isLast}
              onClick={() => {
                nextTourStep();
                const next = tourSteps[guidedTourStep + 1];
                if (next) next.onApply();
              }}
              className={`p-2 rounded-lg border text-xs ${isLast ? 'opacity-30 cursor-not-allowed border-white/10' : 'hover:bg-white/10 border-white/30'}`}
              title="Next Step"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={endTour}
              className="p-2 hover:bg-white/10 rounded-lg text-blue-200 hover:text-white transition-colors"
              title="Close Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
