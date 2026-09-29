import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Target, 
  Building2, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  FileText, 
  Users, 
  CheckSquare, 
  FlaskConical, 
  ChevronRight, 
  Search,
  Award,
  Sparkles
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const ChallengeDetailView: React.FC = () => {
  const { 
    challenges, 
    selectedChallengeId, 
    setActiveTab, 
    applications, 
    setSelectedStartupId,
    setSelectedPilotId
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'applications' | 'pilot'>('overview');

  const challenge = challenges.find(c => c.id === selectedChallengeId) || challenges[0];
  const challengeApps = applications.filter(a => a.challengeId === challenge.id);

  return (
    <div className="space-y-6">
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('challenges')}
          className="text-xs font-semibold text-[#123B63] hover:text-[#0E2E4E] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Challenges Portfolio
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#66727E]">{challenge.department}</span>
          <span className="text-[#D9E0E7]">•</span>
          <Badge variant="info" size="sm">{challenge.challengeCode}</Badge>
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 border-b border-[#D9E0E7]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="neutral" size="sm">{challenge.theme}</Badge>
              <Badge variant="success" size="sm">{challenge.status}</Badge>
              <Badge variant="info" size="sm">{challenge.stage.replace('_', ' ')}</Badge>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
              {challenge.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('discovery')}
              className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2 rounded flex items-center gap-1.5 shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              Discover Startups
            </button>
            <button
              onClick={() => setActiveTab('screening')}
              className="bg-[#F0F4F8] hover:bg-[#E2EAF1] text-[#123B63] border border-[#C5D6E5] text-xs font-semibold px-3.5 py-2 rounded flex items-center gap-1.5"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Screening ({challengeApps.length})
            </button>
            {challenge.activePilotId && (
              <button
                onClick={() => {
                  setSelectedPilotId(challenge.activePilotId!);
                  setActiveTab('pilot-command');
                }}
                className="bg-[#287D4A] hover:bg-[#20633B] text-white text-xs font-semibold px-3.5 py-2 rounded flex items-center gap-1.5 shadow-xs"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                Active Pilot
              </button>
            )}
          </div>
        </div>

        {/* Quick Meta Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-1">
          <div>
            <span className="text-[10.5px] text-[#66727E] block uppercase font-medium">Pilot Grant Budget</span>
            <span className="text-sm font-bold text-[#123B63]">₹{(challenge.pilotBudget / 100000).toFixed(1)} Lakh</span>
          </div>
          <div>
            <span className="text-[10.5px] text-[#66727E] block uppercase font-medium">Pilot Duration</span>
            <span className="text-sm font-bold text-[#17212B]">{challenge.pilotDurationDays} Days</span>
          </div>
          <div>
            <span className="text-[10.5px] text-[#66727E] block uppercase font-medium">Target Districts</span>
            <span className="text-sm font-semibold text-[#17212B]">{challenge.district}</span>
          </div>
          <div>
            <span className="text-[10.5px] text-[#66727E] block uppercase font-medium">Submitted Proposals</span>
            <span className="text-sm font-bold text-[#2F6F95]">{challengeApps.length} Startups</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#D9E0E7] flex gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`pb-2.5 border-b-2 transition-colors ${
            activeSubTab === 'overview'
              ? 'border-[#123B63] text-[#123B63]'
              : 'border-transparent text-[#66727E] hover:text-[#17212B]'
          }`}
        >
          Problem Statement & Evaluation Matrix
        </button>
        <button
          onClick={() => setActiveSubTab('applications')}
          className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'applications'
              ? 'border-[#123B63] text-[#123B63]'
              : 'border-transparent text-[#66727E] hover:text-[#17212B]'
          }`}
        >
          Submitted Proposals
          <span className="bg-[#EBF2F7] text-[#123B63] px-1.5 py-0.2 rounded text-[10px]">{challengeApps.length}</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="gov-card p-5 space-y-4">
              <h3 className="text-sm font-bold text-[#123B63] uppercase tracking-wider">Problem Context & Baseline</h3>
              
              <div>
                <span className="text-xs font-semibold text-[#475467] block mb-1">Problem Statement</span>
                <p className="text-xs text-[#17212B] leading-relaxed bg-[#F8FAFC] p-3 rounded border border-[#E6ECF1]">
                  {challenge.problemStatement}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-[#475467] block mb-1">Current Manual Workflow</span>
                  <p className="text-xs text-[#17212B] leading-relaxed bg-[#F8FAFC] p-3 rounded border border-[#E6ECF1]">
                    {challenge.currentProcess}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#475467] block mb-1">Affected Beneficiaries</span>
                  <p className="text-xs text-[#17212B] leading-relaxed bg-[#F8FAFC] p-3 rounded border border-[#E6ECF1]">
                    {challenge.affectedPopulation}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-[#475467] block mb-1">Current Baseline vs Target Outcome</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#FEF5E7] border border-[#FADBAA] rounded">
                    <span className="font-bold text-[#8C5900] block mb-0.5">Current Baseline:</span>
                    <p className="text-[#17212B]">{challenge.currentBaseline}</p>
                  </div>
                  <div className="p-3 bg-[#EAF5EE] border border-[#BDE0CB] rounded">
                    <span className="font-bold text-[#1E6B3E] block mb-0.5">Target Expected Outcome:</span>
                    <p className="text-[#17212B]">{challenge.expectedOutcome}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="gov-card p-5 space-y-3">
              <h3 className="text-sm font-bold text-[#123B63] uppercase tracking-wider">Evaluation Weights Matrix</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
                  <span className="text-[#66727E] block text-[11px]">Technical Feasibility</span>
                  <span className="font-bold text-[#123B63] text-sm">{challenge.evaluationWeights.technicalFeasibility}%</span>
                </div>
                <div className="p-2.5 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
                  <span className="text-[#66727E] block text-[11px]">Expected Impact</span>
                  <span className="font-bold text-[#123B63] text-sm">{challenge.evaluationWeights.expectedImpact}%</span>
                </div>
                <div className="p-2.5 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
                  <span className="text-[#66727E] block text-[11px]">Scalability</span>
                  <span className="font-bold text-[#123B63] text-sm">{challenge.evaluationWeights.scalability}%</span>
                </div>
                <div className="p-2.5 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
                  <span className="text-[#66727E] block text-[11px]">Security & Privacy</span>
                  <span className="font-bold text-[#123B63] text-sm">{challenge.evaluationWeights.security}%</span>
                </div>
                <div className="p-2.5 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
                  <span className="text-[#66727E] block text-[11px]">Cost Effectiveness</span>
                  <span className="font-bold text-[#123B63] text-sm">{challenge.evaluationWeights.costEffectiveness}%</span>
                </div>
                <div className="p-2.5 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
                  <span className="text-[#66727E] block text-[11px]">Implementation Readiness</span>
                  <span className="font-bold text-[#123B63] text-sm">{challenge.evaluationWeights.implementationReadiness}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="gov-card p-4 space-y-3 text-xs">
              <h3 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">Statutory Eligibility Rules</h3>
              
              <div className="space-y-2 text-[#17212B]">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#E6ECF1]">
                  <span className="text-[#66727E]">DPIIT Recognition:</span>
                  <span className="font-semibold text-[#1E6B3E]">Mandatory</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-[#E6ECF1]">
                  <span className="text-[#66727E]">Max Incorporation Age:</span>
                  <span className="font-semibold">{challenge.eligibilityCriteria.maxCompanyAgeYears} Years</span>
                </div>
                <div>
                  <span className="text-[#66727E] block mb-0.5">Required Domain:</span>
                  <span className="font-medium">{challenge.eligibilityCriteria.requiredDomain}</span>
                </div>
                <div>
                  <span className="text-[#66727E] block mb-0.5">Security Requirements:</span>
                  <span className="font-medium">{challenge.eligibilityCriteria.securityRequirements}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F0F6FA] border border-[#B9D5E8] rounded text-xs space-y-2">
              <span className="font-bold text-[#123B63] block">Lifecycle Navigation</span>
              <p className="text-[#475467] leading-relaxed">
                Startups that pass eligibility screening move directly to blinded evaluation and controlled pilot sanctioning.
              </p>
              <button
                onClick={() => setActiveTab('discovery')}
                className="w-full bg-[#123B63] hover:bg-[#0E2E4E] text-white py-2 rounded font-semibold text-center mt-2 shadow-xs"
              >
                View Recommended Startups
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Applications */}
      {activeSubTab === 'applications' && (
        <div className="gov-card overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Startup Name</th>
                <th>Solution Title</th>
                <th>Proposed Cost</th>
                <th>Screening</th>
                <th>Avg Eval Score</th>
                <th>Selection Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {challengeApps.map((app) => (
                <tr key={app.id}>
                  <td className="font-semibold text-[#123B63]">{app.startupName}</td>
                  <td className="max-w-xs truncate text-xs">{app.solutionTitle}</td>
                  <td className="font-medium text-xs">₹{(app.proposedCost / 100000).toFixed(1)} Lakh</td>
                  <td>
                    {app.screeningStatus === 'PASS' ? (
                      <Badge variant="success" size="sm">Screened (Pass)</Badge>
                    ) : app.screeningStatus === 'FAIL' ? (
                      <Badge variant="danger" size="sm">Failed</Badge>
                    ) : (
                      <Badge variant="warning" size="sm">Review Req</Badge>
                    )}
                  </td>
                  <td>
                    {app.averageEvaluationScore ? (
                      <span className="font-bold text-xs text-[#123B63]">{app.averageEvaluationScore} / 100</span>
                    ) : (
                      <span className="text-[#66727E] text-xs italic">Pending</span>
                    )}
                  </td>
                  <td>
                    <Badge variant={app.selectionStatus === 'PILOT_SELECTED' ? 'purple' : 'neutral'} size="sm">
                      {app.selectionStatus.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="text-right whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedStartupId(app.startupId);
                        setActiveTab('startup-profile');
                      }}
                      className="text-xs text-[#123B63] hover:underline font-medium mr-2"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => setActiveTab('screening')}
                      className="text-xs text-[#2F6F95] hover:underline font-medium"
                    >
                      Screening
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
