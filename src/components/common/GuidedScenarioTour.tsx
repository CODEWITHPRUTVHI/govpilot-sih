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
  TrendingUp,
  Landmark,
  Rocket,
  FileCheck
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
      title: 'Stage 1: Problem Challenge (Rural Water Quality)',
      stage: 'Problem Formulation',
      role: 'GOVERNMENT_OFFICER' as const,
      tab: 'challenges',
      challengeId: 'CH-001',
      icon: <Target className="w-5 h-5 text-white" />,
      summary: 'Rural drinking water historically required 72 hours for manual testing. The state department formulated an objective challenge: automated telemetry detecting contamination within 24 hours under ₹300 per test.',
      actionText: 'View Challenge Specification',
      onApply: () => {
        setRole('GOVERNMENT_OFFICER');
        setSelectedChallengeId('CH-001');
        setActiveTab('challenges');
      }
    },
    {
      title: 'Stage 2: DPIIT Startup Screening & Matching',
      stage: 'Startup Evaluation',
      role: 'GOVERNMENT_OFFICER' as const,
      tab: 'startup-discovery',
      challengeId: 'CH-001',
      icon: <Rocket className="w-5 h-5 text-white" />,
      summary: 'Automated screening of DPIIT-recognized startups evaluated AquaSense Technologies with a 94% capability match score. Evaluators cleared the startup for a field sandbox pilot.',
      actionText: 'View Evaluated Startup',
      onApply: () => {
        setRole('GOVERNMENT_OFFICER');
        setSelectedStartupId('ST-001');
        setActiveTab('startup-discovery');
      }
    },
    {
      title: 'Stage 3: 50-Village Controlled Sandbox Pilot',
      stage: 'Field Telemetry',
      role: 'GOVERNMENT_OFFICER' as const,
      tab: 'pilot-command',
      pilotId: 'PLT-001',
      icon: <FlaskConical className="w-5 h-5 text-white" />,
      summary: 'IoT spectrophotometric sensors deployed across 50 elevated storage reservoirs in Solapur. Live telemetry automated contamination alert dissemination in 28 seconds.',
      actionText: 'Inspect Live Telemetry Grid',
      onApply: () => {
        setRole('GOVERNMENT_OFFICER');
        setSelectedPilotId('PLT-001');
        setActiveTab('pilot-command');
      }
    },
    {
      title: 'Stage 4: Empirical Outcome Verification & Lab Audit',
      stage: 'Evidence Verification',
      role: 'INDEPENDENT_VALIDATOR' as const,
      tab: 'baseline-outcome',
      pilotId: 'PLT-001',
      icon: <Scale className="w-5 h-5 text-white" />,
      summary: 'Comparative analysis demonstrated 4x faster detection (18h vs 72h) and 40% cost reduction (₹270 vs ₹450). Third-party validators CWPRS and IIT Bombay issued 98.4% passing certification.',
      actionText: 'Inspect Lab Verification Audit',
      onApply: () => {
        setRole('INDEPENDENT_VALIDATOR');
        setSelectedPilotId('PLT-001');
        setActiveTab('baseline-outcome');
      }
    },
    {
      title: 'Stage 5: Statutory Scale Sanction (GFR 194-A)',
      stage: 'Scale Procurement',
      role: 'GOVERNMENT_OFFICER' as const,
      tab: 'scale-decision',
      pilotId: 'PLT-001',
      icon: <Landmark className="w-5 h-5 text-white" />,
      summary: 'With NABL lab audit verification on record, the Competent Authority sanctioned statewide rollout across 12 priority districts (2,400 village tanks) generating ₹1.54 Cr recurring annual savings.',
      actionText: 'Review Scale Sanction Order',
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
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20">
            {currentStepData.icon}
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
