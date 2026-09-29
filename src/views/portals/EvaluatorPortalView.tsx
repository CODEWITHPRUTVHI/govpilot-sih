import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const EvaluatorPortalView: React.FC = () => {
  const { applications, setActiveTab, currentUser } = useApp();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Technical Committee Workspace
            </span>
            <Badge variant="neutral" size="sm">Blinded Reviewer</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Welcome, {currentUser.name} (Technical Committee)
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Review anonymized technical proposals, evaluate weighted criteria across 6 dimensions, and submit blinded scores.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('expert-evaluation')}
          className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 shadow-xs shrink-0"
        >
          Open Scoring Matrix Workspace
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Assigned Proposals List */}
      <div className="gov-card p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E6ECF1]">
          <h2 className="text-sm font-bold text-[#123B63] uppercase tracking-wider">
            Assigned Startup Proposals for Review
          </h2>
          <Badge variant="info" size="sm">{applications.length} Proposals</Badge>
        </div>

        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app.id} className="p-4 bg-[#F8FAFC] border border-[#D9E0E7] rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#123B63] text-sm">{app.startupName}</span>
                  <Badge variant="neutral" size="sm">TRL {(app as any).trlLevel || '8'}</Badge>
                  <Badge variant={app.selectionStatus === 'PILOT_SELECTED' ? 'purple' : 'neutral'} size="sm">
                    {app.selectionStatus.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-[#475467] font-medium">{app.solutionTitle}</p>
                <div className="text-[11px] text-[#66727E]">
                  Proposed Pilot Cost: <strong>₹{(app.proposedCost / 100000).toFixed(1)} Lakh</strong> • Duration: {(app as any).proposedDurationWeeks || Math.round(app.proposedDurationDays / 7) || 12} Weeks
                </div>
              </div>

              <button
                onClick={() => setActiveTab('expert-evaluation')}
                className="bg-white border border-[#C5D8E8] hover:bg-[#EBF2F7] text-[#123B63] text-xs font-semibold px-3 py-1.5 rounded shadow-xs shrink-0"
              >
                Score Proposal
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
