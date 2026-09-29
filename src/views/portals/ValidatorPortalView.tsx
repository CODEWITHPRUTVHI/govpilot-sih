import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  Lock,
  Building2
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const ValidatorPortalView: React.FC = () => {
  const { pilots, setActiveTab, currentUser } = useApp();

  const pilot = pilots[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Third-Party Quality Assurance
            </span>
            <Badge variant="success" size="sm">CWPRS / QCI Empaneled</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Welcome, {currentUser.name} (Independent Validator)
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Conduct statutory third-party audit of field testbed telemetry, verify empirical claims against lab benchmarks, and issue digitally signed validation reports.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('validation')}
          className="bg-[#287D4A] hover:bg-[#20633B] text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <ShieldCheck className="w-4 h-4" />
          Access Validation Workspace
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Active Audit Assignment */}
      <div className="gov-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#E6ECF1]">
          <div>
            <span className="text-[10.5px] text-[#66727E] uppercase font-bold">Assigned Audit Target</span>
            <h2 className="text-base font-bold text-[#123B63] mt-0.5">{pilot?.challengeTitle || (pilot as any)?.title || 'Village Water Monitoring Pilot'}</h2>
            <p className="text-xs text-[#475467]">Startup: <strong>{pilot?.startupName || 'AquaSense Technologies'}</strong> • Department: {pilot?.department || 'Water Supply & Sanitation'}</p>
          </div>
          <Badge variant="success" size="lg">VALIDATION COMPLETED</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
            <span className="text-[#66727E] block text-[10.5px] uppercase font-semibold">Evidence Dataset</span>
            <div className="text-base font-bold text-[#123B63] mt-0.5">1.84 Million Logs</div>
            <span className="text-[10.5px] text-[#287D4A] font-medium">SHA-256 Checksum Verified</span>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
            <span className="text-[#66727E] block text-[10.5px] uppercase font-semibold">Empirical Correlation</span>
            <div className="text-base font-bold text-[#287D4A] mt-0.5">98.4% with NABL Lab</div>
            <span className="text-[10.5px] text-[#66727E]">p &lt; 0.001 (Statistically Significant)</span>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
            <span className="text-[#66727E] block text-[10.5px] uppercase font-semibold">Determination</span>
            <div className="text-base font-bold text-[#123B63] mt-0.5">Recommended for Scale</div>
            <span className="text-[10.5px] text-[#287D4A] font-medium">Report #CWPRS-VAL-2026-089</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => setActiveTab('evidence-room')}
            className="bg-[#EBF2F7] hover:bg-[#DCE9F2] text-[#123B63] border border-[#C5D8E8] text-xs font-semibold px-3 py-1.5 rounded"
          >
            Inspect Evidence Room Records
          </button>
          <button
            onClick={() => setActiveTab('baseline-outcome')}
            className="bg-white hover:bg-[#F8FAFC] text-[#475467] border border-[#D9E0E7] text-xs font-semibold px-3 py-1.5 rounded"
          >
            Inspect Baseline Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
