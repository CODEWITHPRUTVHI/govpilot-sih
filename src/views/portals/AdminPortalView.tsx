import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  FileText, 
  ArrowRight,
  Clock,
  Award
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AdminPortalView: React.FC = () => {
  const { challenges, pilots, applications, setActiveTab, currentUser } = useApp();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Statewide Administration
            </span>
            <Badge variant="purple" size="sm">MSInS Command Center</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Welcome, {currentUser.name} (Program Director)
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Oversee public innovation procurement lifecycle across 36 districts and all Maharashtra state government departments.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('analytics')}
            className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 shadow-xs"
          >
            <TrendingUp className="w-4 h-4" />
            Executive Analytics
          </button>
        </div>
      </div>

      {/* Program Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="gov-card p-4">
          <span className="text-[#66727E] block text-[10.5px] uppercase font-bold">Active Challenges</span>
          <div className="text-2xl font-bold text-[#123B63] mt-1">{challenges.length} Challenges</div>
          <p className="text-[#287D4A] font-medium mt-1">Across 5 State Departments</p>
        </div>

        <div className="gov-card p-4">
          <span className="text-[#66727E] block text-[10.5px] uppercase font-bold">Active Testbed Pilots</span>
          <div className="text-2xl font-bold text-[#2F6F95] mt-1">{pilots.length} Pilots</div>
          <p className="text-[#66727E] mt-1">₹4.8 Cr Sanctioned Grants</p>
        </div>

        <div className="gov-card p-4">
          <span className="text-[#66727E] block text-[10.5px] uppercase font-bold">Validated for Scale</span>
          <div className="text-2xl font-bold text-[#287D4A] mt-1">1 Solution</div>
          <p className="text-[#287D4A] font-medium mt-1">12 Priority Districts Sanctioned</p>
        </div>

        <div className="gov-card p-4">
          <span className="text-[#66727E] block text-[10.5px] uppercase font-bold">Statutory Integrity</span>
          <div className="text-2xl font-bold text-[#123B63] mt-1">100% Audited</div>
          <p className="text-[#287D4A] font-medium mt-1">Immutable Log Active</p>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="gov-card p-4 space-y-2 cursor-pointer hover:border-[#123B63] transition-colors" onClick={() => setActiveTab('audit-trail')}>
          <h3 className="font-bold text-xs text-[#123B63]">Statutory Audit Trail</h3>
          <p className="text-xs text-[#66727E]">Inspect immutable timestamped action ledger across all users and departments.</p>
        </div>

        <div className="gov-card p-4 space-y-2 cursor-pointer hover:border-[#123B63] transition-colors" onClick={() => setActiveTab('procurement-pathway')}>
          <h3 className="font-bold text-xs text-[#123B63]">Procurement Framework Rules</h3>
          <p className="text-xs text-[#66727E]">Review Maharashtra Innovation Procurement Policy and GeM Startup Runway directives.</p>
        </div>

        <div className="gov-card p-4 space-y-2 cursor-pointer hover:border-[#123B63] transition-colors" onClick={() => setActiveTab('documents')}>
          <h3 className="font-bold text-xs text-[#123B63]">State Document Repository</h3>
          <p className="text-xs text-[#66727E]">Access all Government Resolutions (GRs), pilot agreements, and sanction orders.</p>
        </div>
      </div>
    </div>
  );
};
