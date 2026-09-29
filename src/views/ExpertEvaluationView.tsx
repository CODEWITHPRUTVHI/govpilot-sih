import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Award, 
  Sparkles, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  ArrowRight, 
  UserCheck, 
  Building2, 
  Scale 
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { AiAssistantBox } from '../components/common/AiAssistantBox';

export const ExpertEvaluationView: React.FC = () => {
  const { applications, submitEvaluationScore, setActiveTab, currentUser, createPilotFromApplication } = useApp();

  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || 'APP-001');
  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const appEvaluations = selectedApp?.evaluations || [];

  // Active Evaluator Scoring Form
  const [scores, setScores] = useState({
    technicalFeasibility: 24, // out of 25
    expectedImpact: 23,        // out of 25
    scalability: 14,           // out of 15
    security: 14,              // out of 15
    costEffectiveness: 9,      // out of 10
    implementationReadiness: 9 // out of 10
  });

  const [qualitativeNotes, setQualitativeNotes] = useState({
    strengths: 'Proprietary multi-wavelength optical sensor eliminates recurring reagent replenishment. Low latency GSM edge transmission provides robust telemetry under rural conditions.',
    weaknesses: 'Optical window requires periodic anti-fouling wiper blade inspection under high-turbidity monsoon flows.',
    risks: 'Dependence on cellular connectivity in remote tribal valleys (mitigated by SD card store-and-forward buffer).'
  });

  const [aiAnalysisOpen, setAiAnalysisOpen] = useState(false);
  const [saveConfirmation, setSaveConfirmation] = useState(false);

  const totalScore: number = (
    scores.technicalFeasibility +
    scores.expectedImpact +
    scores.scalability +
    scores.security +
    scores.costEffectiveness +
    scores.implementationReadiness
  );

  const handleScoreChange = (field: keyof typeof scores, val: number) => {
    setScores(prev => ({ ...prev, [field]: Number(val) }));
  };

  const handleSaveEvaluation = () => {
    submitEvaluationScore(selectedApp.id, {
      scores: {
        problemFit: scores.expectedImpact,
        technicalFeasibility: scores.technicalFeasibility,
        scalability: scores.scalability,
        security: scores.security,
        costEffectiveness: scores.costEffectiveness,
        implementationReadiness: scores.implementationReadiness
      },
      weightedTotal: totalScore,
      qualitativeFeedback: {
        strengths: qualitativeNotes.strengths,
        risks: qualitativeNotes.risks,
        pilotRecommendations: qualitativeNotes.weaknesses
      }
    });

    setSaveConfirmation(true);
    setTimeout(() => setSaveConfirmation(false), 3000);
  };

  const handleSelectForPilot = () => {
    createPilotFromApplication(selectedApp.id);
    setActiveTab('contract-milestones');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Technical Committee Evaluation
            </span>
            <Badge variant="neutral" size="sm">Blinded Multi-Reviewer Scoring</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Expert Evaluation & Scoring Workspace
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Independent technical scoring across weighted criteria. Evaluators score proposals independently to prevent anchoring bias.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSelectForPilot}
            className="bg-[#287D4A] hover:bg-[#20633B] text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            Sanction Controlled Pilot
          </button>
        </div>
      </div>

      {/* Main Grid: Proposal selector + Blinded scoring workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Proposal Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="gov-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">Proposals for Evaluation</h2>
              <Badge variant="info" size="sm">{applications.length} Applicants</Badge>
            </div>

            <div className="space-y-2">
              {applications.map((app) => {
                const isSelected = app.id === selectedAppId;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`p-3 rounded border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#EBF2F7] border-[#123B63] text-[#123B63]'
                        : 'bg-white border-[#D9E0E7] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">{app.startupName}</span>
                      <span className="text-xs font-bold text-[#123B63] bg-white px-2 py-0.5 rounded border border-[#C5D8E8]">
                        {app.averageEvaluationScore ? `${app.averageEvaluationScore}/100` : 'Pending'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#66727E] truncate">{app.solutionTitle}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D9E0E7]/60 text-[10.5px]">
                      <span className="text-[#66727E]">Cost: ₹{(app.proposedCost / 100000).toFixed(1)} Lakh</span>
                      <Badge variant={app.selectionStatus === 'PILOT_SELECTED' ? 'purple' : 'neutral'} size="sm">
                        {app.selectionStatus.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Aggregated Committee Variance Panel */}
          <div className="gov-card p-4 space-y-3">
            <h3 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">Committee Score Breakdown</h3>
            {appEvaluations.length > 0 ? (
              <div className="space-y-2.5">
                {appEvaluations.map((ev: any, idx: number) => (
                  <div key={ev.expertId || idx} className="p-2.5 bg-[#F8FAFC] border border-[#D9E0E7] rounded text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#17212B]">{ev.expertName || ev.evaluatorName}</span>
                      <span className="font-bold text-[#123B63]">{ev.weightedTotal || ev.scores?.total || 90} / 100</span>
                    </div>
                    <span className="text-[10.5px] text-[#66727E] block">{ev.organization || ev.evaluatorRole || 'Technical Expert'}</span>
                    {ev.qualitativeFeedback?.strengths && (
                      <p className="text-[11px] text-[#475467] italic pt-1 border-t border-[#E6ECF1]">
                        "{ev.qualitativeFeedback.strengths.substring(0, 75)}..."
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#66727E] italic">No prior committee evaluations recorded yet.</p>
            )}
          </div>
        </div>

        {/* Scoring Matrix Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="gov-card p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-[#D9E0E7] gap-2">
              <div>
                <span className="text-xs text-[#66727E]">Scoring Proposal:</span>
                <h3 className="text-base font-bold text-[#123B63]">{selectedApp.solutionTitle}</h3>
                <p className="text-xs text-[#475467]">Submitted by <strong>{selectedApp.startupName}</strong></p>
              </div>

              <button
                type="button"
                onClick={() => setAiAnalysisOpen(!aiAnalysisOpen)}
                className="bg-[#EBF2F7] hover:bg-[#DCE9F2] text-[#123B63] border border-[#C5D8E8] text-xs px-3 py-1.5 rounded font-semibold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#2F6F95]" />
                {aiAnalysisOpen ? 'Hide AI Proposal Review' : 'Analyze Proposal'}
              </button>
            </div>

            {aiAnalysisOpen && (
              <AiAssistantBox
                title="AI Proposal Analysis & Benchmark Audit"
                recommendation="AquaSense proposal shows strong empirical alignment with Jal Jeevan Mission telemetry norms. Sensor optical calibration validated by STQC test report STQC-PUN-2025-881."
                reasoning={[
                  'Proposed ₹300 per sensor/month unit operating cost is 33% below current manual water sample testing baseline.',
                  'Edge anomaly detection model has zero cloud egress dependence for basic chlorine threshold alarms.',
                  'Minor risk: High-turbidity river inflows during monsoon will require automated lens wiper maintenance routine.'
                ]}
              />
            )}

            {/* 6 Dimension Weighted Sliders */}
            <div className="space-y-3.5 pt-1">
              <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#17212B]">1. Technical Feasibility & Architecture (Max 25 pts)</span>
                  <span className="font-bold text-[#123B63] text-sm">{scores.technicalFeasibility} / 25</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={scores.technicalFeasibility}
                  onChange={(e) => handleScoreChange('technicalFeasibility', Number(e.target.value))}
                  className="w-full accent-[#123B63]"
                />
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#17212B]">2. Expected Public Department Impact (Max 25 pts)</span>
                  <span className="font-bold text-[#123B63] text-sm">{scores.expectedImpact} / 25</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={scores.expectedImpact}
                  onChange={(e) => handleScoreChange('expectedImpact', Number(e.target.value))}
                  className="w-full accent-[#123B63]"
                />
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#17212B]">3. Scalability across 36 Maharashtra Districts (Max 15 pts)</span>
                  <span className="font-bold text-[#123B63] text-sm">{scores.scalability} / 15</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={scores.scalability}
                  onChange={(e) => handleScoreChange('scalability', Number(e.target.value))}
                  className="w-full accent-[#123B63]"
                />
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#17212B]">4. Cybersecurity & Data Sovereignty (Max 15 pts)</span>
                  <span className="font-bold text-[#123B63] text-sm">{scores.security} / 15</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={scores.security}
                  onChange={(e) => handleScoreChange('security', Number(e.target.value))}
                  className="w-full accent-[#123B63]"
                />
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#17212B]">5. Cost Effectiveness & Unit Economics (Max 10 pts)</span>
                  <span className="font-bold text-[#123B63] text-sm">{scores.costEffectiveness} / 10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={scores.costEffectiveness}
                  onChange={(e) => handleScoreChange('costEffectiveness', Number(e.target.value))}
                  className="w-full accent-[#123B63]"
                />
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#17212B]">6. Implementation Readiness & Team (Max 10 pts)</span>
                  <span className="font-bold text-[#123B63] text-sm">{scores.implementationReadiness} / 10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={scores.implementationReadiness}
                  onChange={(e) => handleScoreChange('implementationReadiness', Number(e.target.value))}
                  className="w-full accent-[#123B63]"
                />
              </div>
            </div>

            {/* Total Cumulative Score */}
            <div className="p-4 bg-[#123B63] text-white rounded flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-200 uppercase font-bold tracking-wider block">Aggregate Score</span>
                <span className="text-xl font-bold">Total Evaluation: {totalScore} / 100</span>
              </div>
              <Badge variant={totalScore >= 75 ? 'success' : 'warning'} size="lg">
                {totalScore >= 75 ? 'RECOMMENDED FOR PILOT' : 'UNDER THRESHOLD'}
              </Badge>
            </div>

            {/* Qualitative Review Comments */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">Key Technical Strengths *</label>
                <textarea
                  rows={2}
                  value={qualitativeNotes.strengths}
                  onChange={(e) => setQualitativeNotes({ ...qualitativeNotes, strengths: e.target.value })}
                  className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">Identified Weaknesses & Mitigation Needs *</label>
                <textarea
                  rows={2}
                  value={qualitativeNotes.weaknesses}
                  onChange={(e) => setQualitativeNotes({ ...qualitativeNotes, weaknesses: e.target.value })}
                  className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
                />
              </div>
            </div>

            {/* Save Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#D9E0E7]">
              <div className="text-xs text-[#66727E]">
                Evaluator: <strong>{currentUser.name}</strong> ({currentUser.role})
              </div>

              <div className="flex items-center gap-2">
                {saveConfirmation && (
                  <span className="text-xs font-bold text-[#1E6B3E] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Score Submitted Successfully
                  </span>
                )}
                <button
                  onClick={handleSaveEvaluation}
                  className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2 rounded flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  Submit Blinded Evaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
