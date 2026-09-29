import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Target, 
  Search, 
  FlaskConical, 
  Scale, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  IndianRupee, 
  Zap, 
  PlayCircle,
  Users,
  AlertTriangle
} from 'lucide-react';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Badge } from '../components/common/Badge';

export const DashboardView: React.FC = () => {
  const { 
    setActiveTab, 
    challenges, 
    pilots, 
    setSelectedChallengeId, 
    setSelectedPilotId,
    startGuidedTour,
    currentRole
  } = useApp();

  const storySteps = [
    {
      step: 1,
      tag: 'Problem',
      title: 'Water Contamination Delay',
      desc: 'Old manual tests take 72 hours. Target: <24h.',
      status: 'Published',
      statusColor: 'bg-blue-100 text-blue-800',
      actionTab: 'challenges',
      btnText: 'See Problem',
      icon: <Target className="w-5 h-5 text-blue-600" />
    },
    {
      step: 2,
      tag: 'Startup Match',
      title: 'AquaSense Technologies',
      desc: 'DPIIT startup scored 94% match for smart water sensors.',
      status: 'Selected',
      statusColor: 'bg-amber-100 text-amber-800',
      actionTab: 'startup-discovery',
      btnText: 'View Startup',
      icon: <Search className="w-5 h-5 text-amber-600" />
    },
    {
      step: 3,
      tag: 'Live Test',
      title: '50 Villages in Solapur',
      desc: 'Day 68 of 90. Sensors streaming data every 10 mins.',
      status: 'Testing (Active)',
      statusColor: 'bg-purple-100 text-purple-800',
      actionTab: 'pilot-command',
      btnText: 'Watch Live Test',
      icon: <FlaskConical className="w-5 h-5 text-purple-600" />
    },
    {
      step: 4,
      tag: 'Verified Results',
      title: '4x Faster & 98% Accurate',
      desc: 'IIT Bombay & CWPRS certified water detection results.',
      status: 'Lab Certified ✅',
      statusColor: 'bg-emerald-100 text-emerald-800',
      actionTab: 'baseline-outcome',
      btnText: 'Inspect Proof',
      icon: <Scale className="w-5 h-5 text-emerald-600" />
    },
    {
      step: 5,
      tag: 'Statewide Scale',
      title: 'Rollout to 12 Districts',
      desc: 'Save ₹1.54 Crore/year for Maharashtra water supply.',
      status: 'Ready to Buy',
      statusColor: 'bg-sky-100 text-sky-800',
      actionTab: 'scale-decision',
      btnText: 'Approve Scale',
      icon: <TrendingUp className="w-5 h-5 text-sky-600" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* 5-Step Workflow Header */}
      <WorkflowStepper />

      {/* Hero Welcome Card */}
      <div className="gov-gradient-hero rounded-2xl p-6 text-white shadow-lg relative overflow-hidden animate-fade-in">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold mb-3 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>🏛️ Maharashtra State Innovation Society</span>
              <span className="text-white/40">•</span>
              <span className="text-emerald-300 font-extrabold">SIH 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Test Startups in Real Life
              <span className="block text-blue-300">Before Buying Their Solution</span>
            </h1>
            <p className="text-blue-200/80 text-sm mt-2 max-w-2xl leading-relaxed">
              Post challenges → Pilot startups in real villages for 90 days → Verify proof independently → Scale with full confidence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <button
              onClick={startGuidedTour}
              className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all hover:scale-105 active:scale-100"
            >
              <PlayCircle className="w-4 h-4" />
              ▶ Play 2-Min Demo
            </button>
            <button
              onClick={() => setActiveTab('scale-simulator')}
              className="glass text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-white/20 transition-all"
            >
              <IndianRupee className="w-4 h-4 text-amber-300" />
              Savings Calculator
            </button>
          </div>
        </div>
      </div>

      {/* 4 Big Visual Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="metric-card blue animate-fade-in-up delay-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
              ⚡
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Detection Speed</div>
              <div className="text-2xl font-black text-gray-900 leading-tight">4× Faster</div>
              <div className="text-[11px] font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 72 hrs → 18 hrs
              </div>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="metric-card green animate-fade-in-up delay-200">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
              💰
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Testing Cost</div>
              <div className="text-2xl font-black text-gray-900 leading-tight">40% Cheaper</div>
              <div className="text-[11px] font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> ₹450 → ₹270/test
              </div>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="metric-card amber animate-fade-in-up delay-300">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
              🎯
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Lab Accuracy</div>
              <div className="text-2xl font-black text-gray-900 leading-tight">98.4%</div>
              <div className="text-[11px] font-semibold text-purple-700 mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> IIT Bombay Certified
              </div>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="metric-card sky animate-fade-in-up delay-400">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
              🏘️
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">People Protected</div>
              <div className="text-2xl font-black text-gray-900 leading-tight">48,000+</div>
              <div className="text-[11px] font-semibold text-sky-700 mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 50 Tanks · Solapur
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Storyboard: 5 Steps at a Glance */}
      <div className="gov-card p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-sm">🚀</span>
              <span>Primary Pilot: Rural Drinking Water</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 ml-10">
              Challenge CH-MH-2026-014 · From problem definition to statewide scaling
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="live-dot"></span>
            <span className="text-xs font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
              Day 68 of 90 Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {storySteps.map((s) => (
            <div
              key={s.step}
              className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center font-bold text-xs text-gray-700 border border-gray-200">
                    {s.step}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.statusColor}`}>
                    {s.status}
                  </span>
                </div>
                <div className="text-[11px] font-bold uppercase text-gray-400 tracking-wide">{s.tag}</div>
                <h3 className="text-xs font-extrabold text-gray-900 mt-0.5 leading-snug">{s.title}</h3>
                <p className="text-[11px] text-gray-500 mt-1 leading-normal">{s.desc}</p>
              </div>

              <button
                onClick={() => setActiveTab(s.actionTab)}
                className="mt-3 w-full bg-white hover:bg-[#123B63] hover:text-white text-[#123B63] border border-blue-200 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 group"
              >
                <span>{s.btnText}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2 Side-by-Side Quick Action Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: What Needs Attention (Simple 1-click approvals) */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Needs Your Attention (3 Items)
            </h3>
            <span className="text-xs text-gray-400 font-medium">1-Click Actions</span>
          </div>

          <div className="space-y-2.5">
            {/* Item 1 */}
            <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">📋</div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Lab Validation Report Ready</div>
                  <div className="text-[11px] text-emerald-800 font-medium">CWPRS Pune signed 98.4% lab passing score.</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedPilotId('PLT-001');
                  setActiveTab('validation');
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 shadow-xs"
              >
                View Report
              </button>
            </div>

            {/* Item 2 */}
            <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🏛️</div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Scale to 12 Districts</div>
                  <div className="text-[11px] text-blue-800 font-medium">Approval ready for Joint Secretary sign-off.</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedPilotId('PLT-001');
                  setActiveTab('scale-decision');
                }}
                className="bg-[#123B63] hover:bg-[#1D5E8C] text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 shadow-xs"
              >
                Approve Scale
              </button>
            </div>

            {/* Item 3 */}
            <div className="p-3 rounded-xl border border-purple-200 bg-purple-50/50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">💸</div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Milestone 4 Payment Release</div>
                  <div className="text-[11px] text-purple-800 font-medium">₹2.84 Lakh tranche ready for release upon review.</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedPilotId('PLT-001');
                  setActiveTab('contract-milestones');
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 shadow-xs"
              >
                Release Fund
              </button>
            </div>
          </div>
        </div>

        {/* Right: Interactive State Map & Village Tank Status */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                <span>📍 Live Village Tanks Status (Solapur District)</span>
              </h3>
              <button
                onClick={() => setActiveTab('pilot-command')}
                className="text-xs text-blue-700 hover:underline font-bold flex items-center gap-1"
              >
                <span>Open Live Map</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Tank status bars */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-center">
                <div className="text-xl font-black text-emerald-700">46</div>
                <div className="text-[10px] font-bold text-emerald-800 uppercase">🟢 Clean Water</div>
              </div>
              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-center">
                <div className="text-xl font-black text-amber-700">3</div>
                <div className="text-[10px] font-bold text-amber-800 uppercase">🟡 Caution (pH Alert)</div>
              </div>
              <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-200 text-center">
                <div className="text-xl font-black text-rose-700">1</div>
                <div className="text-[10px] font-bold text-rose-800 uppercase">🔴 Auto-Purge Done</div>
              </div>
            </div>

            {/* Simulated Live Alert Pill */}
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs text-gray-700 font-medium">
                  <strong>Telemetry Uptime:</strong> 99.8% • Last sync 4 mins ago
                </span>
              </div>
              <span className="text-[11px] font-bold text-gray-500">GSM/IoT Mesh</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('pilot-command')}
            className="mt-4 w-full bg-gray-900 hover:bg-black text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            <span>Open Real-Time Pilot Command Center</span>
          </button>
        </div>
      </div>
    </div>
  );
};
