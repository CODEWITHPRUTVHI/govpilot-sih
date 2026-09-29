import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Scale, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const ProcurementPathwayView: React.FC = () => {
  const { setActiveTab } = useApp();

  const pathways = [
    {
      id: 'PW-1',
      title: 'GeM Startup Runway (Direct GFR Rule 149 Exception)',
      badge: 'Recommended for DPIIT Startups',
      badgeVariant: 'success' as const,
      applicableRule: 'Government e-Marketplace (GeM) Startup Runway & General Financial Rules (GFR) 2017 Rule 149(viii)',
      threshold: 'Orders up to ₹5 Crore for validated innovative products with relaxed prior turnover/experience criteria.',
      prerequisites: 'DPIIT certificate + Successful government pilot completion certificate + Independent validation report.',
      processingTime: '7 - 14 Days',
      status: 'AVAILABLE'
    },
    {
      id: 'PW-2',
      title: 'MSInS Innovation Sandbox Framework Contract',
      badge: 'State Innovation Framework',
      badgeVariant: 'info' as const,
      applicableRule: 'Maharashtra State Innovative Startup Policy 2018 (Section 4.2 - Public Procurement Directives)',
      threshold: 'Rate contract empanelment allowing any Maharashtra department or Zilla Parishad to issue direct work orders.',
      prerequisites: 'Sanction by MSInS Steering Committee + 10-Dimension Procurement Readiness score ≥ 80/100.',
      processingTime: '15 - 21 Days',
      status: 'AVAILABLE'
    },
    {
      id: 'PW-3',
      title: 'Proprietary Article Certificate (PAC) Procurement',
      badge: 'Sole-Source Technical Monopoly',
      badgeVariant: 'warning' as const,
      applicableRule: 'GFR 2017 Rule 166 (Single Source Procurement for Patented / Proprietary Innovations)',
      threshold: 'No monetary cap with departmental financial advisor concurrence.',
      prerequisites: 'Granted Indian Patent / Design Registration + Technical committee justification of uniqueness.',
      processingTime: '30 Days',
      status: 'ELIGIBLE_WITH_PATENT'
    },
    {
      id: 'PW-4',
      title: 'Swiss Challenge Innovation Tender',
      badge: 'Open Counter-Bid Window',
      badgeVariant: 'neutral' as const,
      applicableRule: 'Maharashtra Infrastructure Development Enabling Framework (MIDEF)',
      threshold: 'Large infrastructure or multi-district rollouts > ₹10 Crore.',
      prerequisites: 'Detailed Project Report (DPR) + Right of First Refusal (ROFR) granted to pilot startup.',
      processingTime: '45 - 60 Days',
      status: 'ALTERNATIVE'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Legal & Statutory Navigation
            </span>
            <Badge variant="neutral" size="sm">GFR 2017 & GoM Procurement Rules</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Procurement Pathways & Legal Enablement
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Statutory routes allowing government departments to legally procure validated startup innovations without getting blocked by legacy turnover prerequisites.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('scale-decision')}
          className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 shadow-xs shrink-0"
        >
          Scale Decision Workspace
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Advisory Notice Box */}
      <div className="p-4 bg-[#EAF5EE] border border-[#BDE0CB] rounded-md text-xs text-[#1E6B3E] space-y-1">
        <div className="flex items-center gap-2 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Statutory Procurement Exemption for DPIIT Recognized Startups</span>
        </div>
        <p className="text-[#334155] leading-relaxed">
          Under Department of Expenditure Office Memorandum (F.20/2/2014-PPD(Pt.)) and Maharashtra State Innovation Policy, all state departments are authorized to relax condition of prior turnover and prior experience in all public procurements for DPIIT recognized startups subject to meeting quality and technical specifications.
        </p>
      </div>

      {/* Pathways List */}
      <div className="space-y-4">
        {pathways.map((pw) => (
          <div key={pw.id} className="gov-card p-5 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#E6ECF1]">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-[#123B63]">{pw.title}</h3>
                <Badge variant={pw.badgeVariant} size="sm">{pw.badge}</Badge>
              </div>
              <span className="text-xs text-[#66727E] font-medium">Estimated Sanction Timeline: {pw.processingTime}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[10.5px] text-[#66727E] block uppercase font-medium">Applicable Law / Rule</span>
                <p className="text-[#17212B] font-medium mt-0.5">{pw.applicableRule}</p>
              </div>
              <div>
                <span className="text-[10.5px] text-[#66727E] block uppercase font-medium">Procurement Threshold</span>
                <p className="text-[#17212B] font-medium mt-0.5">{pw.threshold}</p>
              </div>
              <div>
                <span className="text-[10.5px] text-[#66727E] block uppercase font-medium">Required Validation Artifacts</span>
                <p className="text-[#17212B] font-medium mt-0.5">{pw.prerequisites}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
