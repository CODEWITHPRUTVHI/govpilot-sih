import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Rocket, 
  CheckCircle2, 
  Clock, 
  FolderArchive, 
  Award, 
  FileText, 
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const StartupPortalView: React.FC = () => {
  const { pilots, applications, setActiveTab, currentUser } = useApp();

  const myPilot = pilots[0];
  const myApp = applications[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Startup Founder Cockpit
            </span>
            <Badge variant="purple" size="sm">DPIIT Recognized</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Welcome, {currentUser.name} (AquaSense Technologies)
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Manage your government pilot deliverables, monitor real-time testbed telemetry, and track milestone disbursements.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('evidence-room')}
            className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 shadow-xs"
          >
            <FolderArchive className="w-4 h-4" />
            Upload Pilot Deliverables
          </button>
        </div>
      </div>

      {/* Active Pilot Status Card */}
      <div className="gov-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#E6ECF1]">
          <div>
            <span className="text-[10.5px] text-[#66727E] uppercase font-bold">Active Sanctioned Pilot</span>
            <h2 className="text-base font-bold text-[#123B63] mt-0.5">{myPilot?.challengeTitle || (myPilot as any)?.title || 'Village Water Monitoring Pilot'}</h2>
            <p className="text-xs text-[#475467]">Under {myPilot?.department || 'Water Supply & Sanitation Department'} • Testbed: 50 Elevated Storage Reservoirs</p>
          </div>
          <Badge variant="success" size="lg">VALIDATION COMPLETE (READY FOR SCALE)</Badge>
        </div>

        {/* Milestone Disbursal Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
            <span className="text-[#66727E] block text-[10.5px] uppercase font-semibold">Sanctioned Grant</span>
            <div className="text-lg font-bold text-[#123B63] mt-0.5">₹{(((myPilot?.budgetAllocated || (myPilot as any)?.budget || 1500000)) / 100000).toFixed(2)} Lakh</div>
            <span className="text-[10.5px] text-[#287D4A] font-medium">100% Non-Dilutive Grant</span>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
            <span className="text-[#66727E] block text-[10.5px] uppercase font-semibold">Disbursed to Date</span>
            <div className="text-lg font-bold text-[#287D4A] mt-0.5">₹8.52 Lakh (75%)</div>
            <span className="text-[10.5px] text-[#66727E]">Final Tranche pending sign-off</span>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded">
            <span className="text-[#66727E] block text-[10.5px] uppercase font-semibold">Independent Validation</span>
            <div className="text-lg font-bold text-[#123B63] mt-0.5">CWPRS / QCI Certified</div>
            <span className="text-[10.5px] text-[#287D4A] font-medium">98.4% Empirical Correlation</span>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveTab('pilot-command')}
            className="bg-[#EBF2F7] hover:bg-[#DCE9F2] text-[#123B63] border border-[#C5D8E8] text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1"
          >
            <Activity className="w-3.5 h-3.5" />
            View Live Sensor Telemetry
          </button>
          <button
            onClick={() => setActiveTab('validation')}
            className="bg-[#EAF5EE] hover:bg-[#D4EBDC] text-[#1E6B3E] border border-[#BDE0CB] text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1"
          >
            <Award className="w-3.5 h-3.5" />
            Download Validation Certificate
          </button>
          <button
            onClick={() => setActiveTab('scale-simulator')}
            className="bg-white hover:bg-[#F8FAFC] text-[#475467] border border-[#D9E0E7] text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Statewide Scale Projections
          </button>
        </div>
      </div>
    </div>
  );
};
