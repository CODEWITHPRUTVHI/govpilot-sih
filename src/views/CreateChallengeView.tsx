import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Target, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Sliders, 
  CheckCircle2 
} from 'lucide-react';
import { AiAssistantBox } from '../components/common/AiAssistantBox';
import { Badge } from '../components/common/Badge';

export const CreateChallengeView: React.FC = () => {
  const { createChallenge, setActiveTab, currentUser } = useApp();

  const [step, setStep] = useState(1);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: 'Automated Real-time Sensor Monitoring for Canal Siltation & Water Ingress',
    department: 'Water Resources Department',
    theme: 'Water & Sanitation' as const,
    problemStatement: 'Major irrigation canal networks suffer from unmonitored silt build-up and unrecorded illegal breaches during monsoon surges, resulting in unequal tail-end water distribution to downstream farmers.',
    currentProcess: 'Patwari physically inspects canal sections on a bi-weekly rota; reports drafted manually and collated at division headquarters after 10-14 days.',
    affectedPopulation: '180,000 farmers across 4 irrigation command areas in Solapur & Pune.',
    geographicScope: 'Solapur Division Main Canal (120 km testbed)',
    district: 'Solapur, Pune',
    currentBaseline: 'Siltation breach detection latency: 14 days. Distribution volumetric discrepancy: 32%. Annual manual patrol cost: ₹18 Lakh.',
    expectedOutcome: 'Continuous optical/ultrasonic siltation anomaly alert ≤ 24 hours. Volumetric delivery accuracy improved to > 90%. Inspection cost reduced by 40%.',
    constraints: 'Sensors must be solar powered, resist algae accumulation, and function under low-power GSM telemetry.',
    
    // Outcomes / Metrics
    metrics: [
      { name: 'Siltation & Breach Detection Latency', baseline: '14 Days', target: '24 Hours', unit: 'Hours' },
      { name: 'Tail-End Water Allocation Discrepancy', baseline: '32%', target: '8%', unit: '%' },
      { name: 'Monitoring Operational Expenditure', baseline: '₹1,500/km/mo', target: '₹850/km/mo', unit: '₹/km' }
    ],

    // Eligibility
    dpiitRequired: true,
    maxCompanyAgeYears: 7,
    requiredDomain: 'Hydrological Telemetry / Agritech / IoT Sensing',
    securityRequirements: 'MeitY empaneled Indian cloud hosting, TLS 1.3 data transfer.',
    technicalRequirements: 'Submersible or ultrasonic non-contact flow & silt sensor with IP67 rating.',
    financialRequirements: 'Positive net worth or verified incubation/grant backing of at least ₹20 Lakh.',

    // Evaluation Weights (sum to 100)
    weights: {
      technicalFeasibility: 25,
      expectedImpact: 25,
      scalability: 15,
      security: 15,
      costEffectiveness: 10,
      implementationReadiness: 10
    },

    // Pilot Framework
    pilotDurationDays: 90,
    pilotLocation: 'Solapur Canal Command Area (40 Sensor Stations)',
    pilotBudget: 1200000,
    maxParticipants: 3,
    milestones: [
      { name: 'M1 — Bench Calibration & Pre-deployment Survey', duration: '30 Days', payment: 25 },
      { name: 'M2 — Live Canal Deployment & 30-Day Stream', duration: '60 Days', payment: 40 },
      { name: 'M3 — Comprehensive Audit & Outcome Validation', duration: '90 Days', payment: 35 }
    ]
  });

  const handleWeightChange = (key: keyof typeof formData.weights, val: number) => {
    setFormData(prev => ({
      ...prev,
      weights: { ...prev.weights, [key]: Number(val) }
    }));
  };

  const totalWeight = Object.values(formData.weights).reduce((a: number, b: number) => a + b, 0);

  const handleApplyAiSuggestions = () => {
    setFormData(prev => ({
      ...prev,
      expectedOutcome: 'Continuous optical/ultrasonic siltation anomaly alert ≤ 24 hours. Volumetric delivery accuracy improved to > 92%. Inspection cost reduced by 42%.',
      constraints: 'Solar-powered with integrated MPPT, anti-fouling ultrasonic transducer, and SMS/IVR Marathi alerts to canal section engineers.'
    }));
    setShowAiSuggestions(false);
  };

  const handlePublish = () => {
    const newId = createChallenge({
      title: formData.title,
      department: formData.department,
      theme: formData.theme,
      problemStatement: formData.problemStatement,
      currentProcess: formData.currentProcess,
      affectedPopulation: formData.affectedPopulation,
      geographicScope: formData.geographicScope,
      district: formData.district,
      currentBaseline: formData.currentBaseline,
      expectedOutcome: formData.expectedOutcome,
      constraints: formData.constraints,
      pilotBudget: formData.pilotBudget,
      pilotDurationDays: formData.pilotDurationDays,
      pilotLocation: formData.pilotLocation,
      maxParticipants: formData.maxParticipants,
      eligibilityCriteria: {
        dpiitRequired: formData.dpiitRequired,
        maxCompanyAgeYears: formData.maxCompanyAgeYears,
        requiredDomain: formData.requiredDomain,
        securityRequirements: formData.securityRequirements,
        technicalRequirements: formData.technicalRequirements,
        financialRequirements: formData.financialRequirements
      },
      evaluationWeights: formData.weights
    });

    setActiveTab('challenges');
  };

  const stepsList = [
    { num: 1, label: 'Problem Definition' },
    { num: 2, label: 'Outcome & Metrics' },
    { num: 3, label: 'Startup Eligibility' },
    { num: 4, label: 'Evaluation Matrix' },
    { num: 5, label: 'Pilot Framework' },
    { num: 6, label: 'Review & Publish' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Step-by-Step Problem Structuring
            </span>
            <Badge variant="neutral" size="sm">GovPilot Framework</Badge>
          </div>
          <h1 className="text-2xl font-bold text-[#123B63] tracking-tight">
            Create Innovation Challenge
          </h1>
          <p className="text-xs text-[#66727E] mt-1">
            Structure your department's challenge with clear baselines, measurable KPIs, and a controlled pilot blueprint.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('challenges')}
          className="text-xs text-[#66727E] hover:text-[#17212B] font-medium"
        >
          Cancel & Back to Challenges
        </button>
      </div>

      {/* Stepper Progress Bar */}
      <div className="gov-card p-4">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {stepsList.map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`p-2 rounded text-left border transition-all ${
                step === s.num
                  ? 'bg-[#123B63] text-white border-[#123B63]'
                  : step > s.num
                    ? 'bg-[#F0F6FA] text-[#123B63] border-[#C5D8E8]'
                    : 'bg-[#F8FAFC] text-[#66727E] border-[#D9E0E7]'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider">
                Step 0{s.num}
              </div>
              <div className="text-xs font-semibold truncate mt-0.5">
                {s.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="gov-card p-6">
        {/* STEP 1: Problem Definition */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9E0E7]">
              <div>
                <h3 className="text-base font-bold text-[#123B63]">Step 1: Department Problem Definition</h3>
                <p className="text-xs text-[#66727E]">Specify the root public service bottleneck, current manual process, and baseline constraints.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAiSuggestions(!showAiSuggestions)}
                className="bg-[#EBF2F7] hover:bg-[#DCE9F2] text-[#123B63] border border-[#C5D8E8] text-xs px-3 py-1.5 rounded font-semibold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#2F6F95]" />
                {showAiSuggestions ? 'Hide AI Structurer' : 'Analyze & Structure Problem'}
              </button>
            </div>

            {showAiSuggestions && (
              <AiAssistantBox
                title="AI Problem Structuring Assistant"
                recommendation="Synthesized analysis for Canal Siltation & Water Ingress: Strongly recommend focusing outcome metrics on tail-end farmer flow delivery variance and automated optical silt accumulation sensing."
                reasoning={[
                  'Identified comparable telemetry pilot in Jalgaon division which reduced volumetric discrepancy by 28%.',
                  'Recommended setting maximum sensor latency to ≤ 24 hours to enable emergency canal gate throttling.',
                  'Suggested pre-requisite: Solar harvesting capability with anti-biofouling transducer.'
                ]}
                suggestedActions={[
                  { label: 'Auto-fill Refined Outcomes & Constraints', onClick: handleApplyAiSuggestions, isPrimary: true }
                ]}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Problem / Challenge Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#123B63] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Government Department *
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#123B63] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Detailed Problem Statement *
              </label>
              <textarea
                rows={3}
                value={formData.problemStatement}
                onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#123B63] focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Current Manual / Existing Process *
                </label>
                <textarea
                  rows={2}
                  value={formData.currentProcess}
                  onChange={(e) => setFormData({ ...formData, currentProcess: e.target.value })}
                  className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#123B63] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Affected Citizen / Beneficiary Population *
                </label>
                <textarea
                  rows={2}
                  value={formData.affectedPopulation}
                  onChange={(e) => setFormData({ ...formData, affectedPopulation: e.target.value })}
                  className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#123B63] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Current Measurable Baseline *
                </label>
                <input
                  type="text"
                  value={formData.currentBaseline}
                  onChange={(e) => setFormData({ ...formData, currentBaseline: e.target.value })}
                  className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#123B63] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Geographic Scope & Priority Districts *
                </label>
                <input
                  type="text"
                  value={formData.geographicScope}
                  onChange={(e) => setFormData({ ...formData, geographicScope: e.target.value })}
                  className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#123B63] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Technical, Environmental & Operational Constraints *
              </label>
              <input
                type="text"
                value={formData.constraints}
                onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#123B63] focus:bg-white"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Outcome Definition */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#D9E0E7]">
              <h3 className="text-base font-bold text-[#123B63]">Step 2: Outcome Definition & Measurable Targets</h3>
              <p className="text-xs text-[#66727E]">Define concrete quantitative baselines and pilot target thresholds to evaluate pilot success.</p>
            </div>

            <div className="space-y-3">
              {formData.metrics.map((m, idx) => (
                <div key={idx} className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-[#66727E] uppercase block mb-1">Outcome Metric Name</label>
                    <input
                      type="text"
                      value={m.name}
                      onChange={(e) => {
                        const newM = [...formData.metrics];
                        newM[idx].name = e.target.value;
                        setFormData({ ...formData, metrics: newM });
                      }}
                      className="w-full bg-white border border-[#D9E0E7] text-xs rounded p-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#66727E] uppercase block mb-1">Current Baseline</label>
                    <input
                      type="text"
                      value={m.baseline}
                      onChange={(e) => {
                        const newM = [...formData.metrics];
                        newM[idx].baseline = e.target.value;
                        setFormData({ ...formData, metrics: newM });
                      }}
                      className="w-full bg-white border border-[#D9E0E7] text-xs rounded p-2 focus:outline-none text-[#A66A00] font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#66727E] uppercase block mb-1">Target Threshold</label>
                    <input
                      type="text"
                      value={m.target}
                      onChange={(e) => {
                        const newM = [...formData.metrics];
                        newM[idx].target = e.target.value;
                        setFormData({ ...formData, metrics: newM });
                      }}
                      className="w-full bg-white border border-[#D9E0E7] text-xs rounded p-2 focus:outline-none text-[#287D4A] font-semibold"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Synthesized Expected Outcome Description *
              </label>
              <textarea
                rows={3}
                value={formData.expectedOutcome}
                onChange={(e) => setFormData({ ...formData, expectedOutcome: e.target.value })}
                className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#123B63] focus:bg-white"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Eligibility */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#D9E0E7]">
              <h3 className="text-base font-bold text-[#123B63]">Step 3: Startup Eligibility Requirements</h3>
              <p className="text-xs text-[#66727E]">Specify DPIIT, cybersecurity, and technical criteria without creating rigid vendor lock-in.</p>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#D9E0E7] rounded space-y-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#123B63] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.dpiitRequired}
                  onChange={(e) => setFormData({ ...formData, dpiitRequired: e.target.checked })}
                  className="rounded border-[#D9E0E7] text-[#123B63] focus:ring-[#123B63]"
                />
                Require Active DPIIT Startup Recognition Certificate (Department for Promotion of Industry and Internal Trade)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#17212B] mb-1">Maximum Startup Incorporation Age</label>
                  <select
                    value={formData.maxCompanyAgeYears}
                    onChange={(e) => setFormData({ ...formData, maxCompanyAgeYears: Number(e.target.value) })}
                    className="w-full bg-white border border-[#D9E0E7] text-xs rounded p-2 focus:outline-none"
                  >
                    <option value={5}>Up to 5 Years</option>
                    <option value={7}>Up to 7 Years (Standard Startup India)</option>
                    <option value={10}>Up to 10 Years (DeepTech / Biotech)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17212B] mb-1">Eligible Domain Specialization</label>
                  <input
                    type="text"
                    value={formData.requiredDomain}
                    onChange={(e) => setFormData({ ...formData, requiredDomain: e.target.value })}
                    className="w-full bg-white border border-[#D9E0E7] text-xs rounded p-2 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">Security & Data Hosting Mandates *</label>
              <input
                type="text"
                value={formData.securityRequirements}
                onChange={(e) => setFormData({ ...formData, securityRequirements: e.target.value })}
                className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#123B63] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">Technical Hardware / Software Prerequisites *</label>
              <input
                type="text"
                value={formData.technicalRequirements}
                onChange={(e) => setFormData({ ...formData, technicalRequirements: e.target.value })}
                className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#123B63] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">Financial Soundness & Grant Backing *</label>
              <input
                type="text"
                value={formData.financialRequirements}
                onChange={(e) => setFormData({ ...formData, financialRequirements: e.target.value })}
                className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#123B63] focus:bg-white"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Evaluation Matrix */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#D9E0E7] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#123B63]">Step 4: Expert Evaluation Matrix & Weights</h3>
                <p className="text-xs text-[#66727E]">Configure transparent scoring weights for the independent technical evaluation committee.</p>
              </div>
              <div className={`text-xs font-bold px-2.5 py-1 rounded ${totalWeight === 100 ? 'bg-[#EAF5EE] text-[#1E6B3E]' : 'bg-[#FDF0EE] text-[#A31D14]'}`}>
                Total Weight: {totalWeight}% {totalWeight === 100 ? '(Balanced)' : '(Must equal 100%)'}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-[#17212B]">Technical Feasibility & Architecture</span>
                  <span className="text-xs font-bold text-[#123B63]">{formData.weights.technicalFeasibility}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={formData.weights.technicalFeasibility}
                  onChange={(e) => handleWeightChange('technicalFeasibility', Number(e.target.value))}
                  className="w-full accent-[#123B63]"
                />
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-[#17212B]">Expected Department Impact & Efficacy</span>
                  <span className="text-xs font-bold text-[#123B63]">{formData.weights.expectedImpact}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={formData.weights.expectedImpact}
                  onChange={(e) => handleWeightChange('expectedImpact', Number(e.target.value))}
                  className="w-full accent-[#123B63]"
                />
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-[#17212B]">Statewide Scalability & Replication</span>
                  <span className="text-xs font-bold text-[#123B63]">{formData.weights.scalability}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={formData.weights.scalability}
                  onChange={(e) => handleWeightChange('scalability', Number(e.target.value))}
                  className="w-full accent-[#123B63]"
                />
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-[#17212B]">Cybersecurity & Data Privacy</span>
                  <span className="text-xs font-bold text-[#123B63]">{formData.weights.security}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={formData.weights.security}
                  onChange={(e) => handleWeightChange('security', Number(e.target.value))}
                  className="w-full accent-[#123B63]"
                />
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-[#17212B]">Cost Effectiveness & TCO</span>
                  <span className="text-xs font-bold text-[#123B63]">{formData.weights.costEffectiveness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={formData.weights.costEffectiveness}
                  onChange={(e) => handleWeightChange('costEffectiveness', Number(e.target.value))}
                  className="w-full accent-[#123B63]"
                />
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-[#17212B]">Implementation Readiness & Team</span>
                  <span className="text-xs font-bold text-[#123B63]">{formData.weights.implementationReadiness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={formData.weights.implementationReadiness}
                  onChange={(e) => handleWeightChange('implementationReadiness', Number(e.target.value))}
                  className="w-full accent-[#123B63]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Pilot Framework */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#D9E0E7]">
              <h3 className="text-base font-bold text-[#123B63]">Step 5: Controlled Pilot Framework</h3>
              <p className="text-xs text-[#66727E]">Design duration, testbed site, grant budget, and milestone payment schedule.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">Pilot Duration (Days) *</label>
                <input
                  type="number"
                  value={formData.pilotDurationDays}
                  onChange={(e) => setFormData({ ...formData, pilotDurationDays: Number(e.target.value) })}
                  className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">Pilot Budget (₹ INR) *</label>
                <input
                  type="number"
                  value={formData.pilotBudget}
                  onChange={(e) => setFormData({ ...formData, pilotBudget: Number(e.target.value) })}
                  className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:bg-white font-semibold text-[#123B63]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">Max Pilot Cohort Startups</label>
                <input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: Number(e.target.value) })}
                  className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">Designated Testbed Locations *</label>
              <input
                type="text"
                value={formData.pilotLocation}
                onChange={(e) => setFormData({ ...formData, pilotLocation: e.target.value })}
                className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2.5 focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-2">Milestone Schedule & Payment Tranches</label>
              <div className="space-y-2">
                {formData.milestones.map((ms, idx) => (
                  <div key={idx} className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#123B63]">{ms.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[#66727E]">{ms.duration}</span>
                      <Badge variant="info" size="sm">{ms.payment}% Tranche</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Review & Publish */}
        {step === 6 && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#D9E0E7]">
              <h3 className="text-base font-bold text-[#123B63]">Step 6: Review & Publish Innovation Challenge</h3>
              <p className="text-xs text-[#66727E]">Confirm the challenge details before publishing onto the Maharashtra State Innovation Society registry.</p>
            </div>

            <div className="bg-[#F8FAFC] border border-[#D9E0E7] rounded p-4 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-b border-[#E6ECF1] pb-2">
                <div>
                  <span className="text-[11px] text-[#66727E] block">Challenge Title</span>
                  <span className="font-bold text-[#123B63]">{formData.title}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#66727E] block">Department & Theme</span>
                  <span className="font-semibold text-[#17212B]">{formData.department} ({formData.theme})</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-[#66727E] block">Problem Statement</span>
                <p className="text-[#17212B] mt-0.5 leading-relaxed">{formData.problemStatement}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-[#E6ECF1] pt-2">
                <div>
                  <span className="text-[11px] text-[#66727E] block">Pilot Budget</span>
                  <span className="font-bold text-[#287D4A]">₹{(formData.pilotBudget / 100000).toFixed(1)} Lakh</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#66727E] block">Pilot Duration</span>
                  <span className="font-semibold text-[#17212B]">{formData.pilotDurationDays} Days</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#66727E] block">DPIIT Prerequisite</span>
                  <span className="font-semibold text-[#17212B]">{formData.dpiitRequired ? 'Mandatory' : 'Optional'}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#EAF5EE] border border-[#BDE0CB] rounded text-xs text-[#1E6B3E] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>All mandatory government challenge parameters and evaluation weightings are fully verified.</span>
            </div>
          </div>
        )}

        {/* Step Navigation Buttons */}
        <div className="pt-6 border-t border-[#D9E0E7] flex items-center justify-between">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className={`px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 border ${
              step === 1 
                ? 'opacity-40 cursor-not-allowed border-[#D9E0E7] text-[#66727E]' 
                : 'border-[#D9E0E7] hover:bg-[#F0F4F8] text-[#17212B]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Step
          </button>

          {step < 6 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2 rounded flex items-center gap-1.5 shadow-xs"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="bg-[#287D4A] hover:bg-[#20633B] text-white text-xs font-semibold px-5 py-2 rounded flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-4 h-4" />
              Publish Challenge
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
