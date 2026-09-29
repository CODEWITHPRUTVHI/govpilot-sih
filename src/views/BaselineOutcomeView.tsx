import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Scale, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Download,
  Award,
  Sparkles,
  Zap
} from 'lucide-react';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Badge } from '../components/common/Badge';

export const BaselineOutcomeView: React.FC = () => {
  const { setActiveTab } = useApp();

  const comparisonRows = [
    {
      metric: 'Detection Time (Speed)',
      oldWay: '72 Hours (3 Days by hand)',
      newWay: '18 Hours (Automated sensor)',
      change: '4x Faster',
      improved: true
    },
    {
      metric: 'Cost Per Water Sample',
      oldWay: '₹450 / test',
      newWay: '₹270 / test',
      change: '40% Cheaper',
      improved: true
    },
    {
      metric: 'Contamination Alert Time',
      oldWay: '3 to 5 Days (Paper report)',
      newWay: '28 Seconds (SMS & Auto-Valve)',
      change: 'Real-time (<30s)',
      improved: true
    },
    {
      metric: 'Lab Accuracy & Correlation',
      oldWay: '80% (decay in transit)',
      newWay: '98.4% (Direct water stream)',
      change: '+18.4% Accuracy',
      improved: true
    },
    {
      metric: 'Villages Monitored Live',
      oldWay: '4 villages / month',
      newWay: '50 villages continuously (24/7)',
      change: '12x Coverage',
      improved: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* 5-Step Stepper */}
      <WorkflowStepper />

      {/* Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-900 text-xs font-bold px-2.5 py-1 rounded-full mb-1">
              <Scale className="w-3.5 h-3.5" />
              <span>Stage 4 of 5</span>
              <span>•</span>
              <span>Empirical Outcome Verification</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              The Proof: Baseline vs Outcome (90-Day Sandbox Pilot)
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Side-by-side proof showing AquaSense passed all 5 government performance goals.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('scale-decision')}
            className="bg-[#123B63] hover:bg-[#1D5E8C] text-white text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all shrink-0"
          >
            <span>Proceed to Scale Sanction</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lab Verification Certificate Card */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 border border-white/30">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-white text-emerald-900 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full">
                Independent Audit Complete
              </span>
              <span className="text-xs text-emerald-100 font-bold">Grade: A+ (98.4%)</span>
            </div>
            <h2 className="text-lg font-black mt-0.5">
              Certified by CWPRS Pune & Quality Council of India
            </h2>
            <p className="text-xs text-emerald-100 mt-0.5">
              All 1.84 Million sensor readings verified against government NABL laboratories. Zero fatal failures detected.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('validation')}
          className="bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-black px-3.5 py-2 rounded-xl shadow-xs shrink-0 transition-colors flex items-center gap-1"
        >
          <span>View Official Certificate</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Side-by-Side Visual Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Old Way */}
        <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-black text-rose-950">
              Old Way (Manual Water Testing)
            </h3>
          </div>
          <p className="text-xs text-rose-800 mb-4 font-medium">
            How water was tested before this startup pilot program.
          </p>

          <div className="space-y-3">
            <div className="bg-white p-3 rounded-xl border border-rose-100">
              <div className="text-[10px] font-bold text-gray-400 uppercase">Detection Time</div>
              <div className="text-sm font-black text-rose-900 mt-0.5">72 Hours (3 full days)</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-rose-100">
              <div className="text-[10px] font-bold text-gray-400 uppercase">Cost Per Sample</div>
              <div className="text-sm font-black text-rose-900 mt-0.5">₹450 / test</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-rose-100">
              <div className="text-[10px] font-bold text-gray-400 uppercase">Alert Speed</div>
              <div className="text-sm font-black text-rose-900 mt-0.5">3 to 5 Days (Paper report)</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-rose-100">
              <div className="text-[10px] font-bold text-gray-400 uppercase">Lab Accuracy</div>
              <div className="text-sm font-black text-rose-900 mt-0.5">80% (water spoils on the way)</div>
            </div>
          </div>
        </div>

        {/* New Startup Way */}
        <div className="bg-emerald-50/70 border border-emerald-300 ring-2 ring-emerald-500/20 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-black text-emerald-950">
              New Startup Way (AquaSense IoT)
            </h3>
          </div>
          <p className="text-xs text-emerald-800 mb-4 font-medium">
            Actual results verified in 50 Solapur villages over 90 days.
          </p>

          <div className="space-y-3">
            <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">Detection Time</div>
                <div className="text-sm font-black text-emerald-900 mt-0.5">18 Hours</div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full">
                4x Faster
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">Cost Per Sample</div>
                <div className="text-sm font-black text-emerald-900 mt-0.5">₹270 / test</div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full">
                40% Cheaper
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">Alert Speed</div>
                <div className="text-sm font-black text-emerald-900 mt-0.5">28 Seconds (Auto-Valve)</div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full">
                Real-time
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">Lab Accuracy</div>
                <div className="text-sm font-black text-emerald-900 mt-0.5">98.4% Match</div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full">
                ISO Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
