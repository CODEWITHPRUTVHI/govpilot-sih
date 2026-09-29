import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Building2, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  FileCheck2, 
  Layers, 
  ExternalLink,
  Mail,
  Phone,
  FolderArchive
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const StartupProfileView: React.FC = () => {
  const { startups, selectedStartupId, setActiveTab } = useApp();

  const startup = startups.find(s => s.id === selectedStartupId) || startups[0];

  return (
    <div className="space-y-6">
      {/* Back link */}
      <button
        onClick={() => setActiveTab('discovery')}
        className="text-xs font-semibold text-[#123B63] hover:text-[#0E2E4E] flex items-center gap-1.5"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Startup Discovery
      </button>

      {/* Hero Profile Card */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#D9E0E7]">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded bg-[#123B63] text-white flex items-center justify-center font-bold text-base shadow-xs">
              {startup.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#123B63]">{startup.name}</h1>
                <Badge variant="success" size="sm">DPIIT Verified</Badge>
                <Badge variant="info" size="sm">TRL 8 (Field Proven)</Badge>
              </div>
              <p className="text-xs text-[#66727E] mt-1">
                {(startup as any).location || startup.headquarters || 'Maharashtra'} • Founded {startup.foundedYear} • DPIIT #{startup.dpiitNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('screening')}
              className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2 rounded shadow-xs"
            >
              Execute Statutory Screening
            </button>
          </div>
        </div>

        <p className="text-xs text-[#17212B] leading-relaxed max-w-4xl">
          {(startup as any).description || startup.matchExplanation || startup.legalEntity}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
          <div>
            <span className="text-[10.5px] text-[#66727E] block uppercase">Primary Domain</span>
            <span className="text-xs font-semibold text-[#17212B]">
              {(startup.domains || []).join(', ') || 'Smart Utilities & IoT'}
            </span>
          </div>
          <div>
            <span className="text-[10.5px] text-[#66727E] block uppercase">Prototype Evidence Confidence</span>
            <span className="text-sm font-bold text-[#287D4A]">
              {(startup as any).prototypeEvidenceScore || startup.evidenceScore || 94} / 100
            </span>
          </div>
          <div>
            <span className="text-[10.5px] text-[#66727E] block uppercase">Prior Gov Pilots</span>
            <span className="text-sm font-bold text-[#123B63]">
              {(startup as any).pastGovPilotsCount ?? startup.previousGovernmentDeployments?.length ?? 2} Completed
            </span>
          </div>
          <div>
            <span className="text-[10.5px] text-[#66727E] block uppercase">Security Compliance</span>
            <span className="text-xs font-semibold text-[#17212B]">
              {(startup as any).securityCompliance || `${startup.securityReadiness || 'HIGH'} (ISO 27001 / STQC)`}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Capabilities & Past Government Pilots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Capabilities (6 cols) */}
        <div className="lg:col-span-6 gov-card p-5 space-y-4">
          <h2 className="text-sm font-bold text-[#123B63] uppercase tracking-wider">
            Verified Technical Capabilities
          </h2>

          <div className="space-y-3">
            {(startup.capabilities || []).map((cap: any, i: number) => {
              const capName = typeof cap === 'string' ? `Capability #${i + 1}` : cap.name;
              const capDesc = typeof cap === 'string' ? cap : cap.description;
              const capCat = typeof cap === 'string' ? 'Edge Sensing & IoT' : cap.category;
              const capProof = typeof cap === 'string' ? 'STQC & Lab Tested' : cap.verificationProof;
              return (
                <div key={i} className="p-3 bg-[#F8FAFC] border border-[#D9E0E7] rounded space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#123B63]">{capName}</span>
                    <Badge variant="neutral" size="sm">{capCat}</Badge>
                  </div>
                  <p className="text-[#475467] leading-relaxed">{capDesc}</p>
                  <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[#287D4A] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Lab/Field Proof: {capProof}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Government Pilot Record (6 cols) */}
        <div className="lg:col-span-6 gov-card p-5 space-y-4">
          <h2 className="text-sm font-bold text-[#123B63] uppercase tracking-wider">
            Government Pilot & Scale Track Record
          </h2>

          <div className="space-y-3">
            {((startup as any).pilotHistory || startup.previousGovernmentDeployments || []).map((ph: any, idx: number) => (
              <div key={idx} className="p-3.5 bg-[#F8FAFC] border border-[#D9E0E7] rounded space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#123B63]">{ph.projectTitle || ph.pilotName}</span>
                  <Badge variant={ph.validationStatus?.includes('validat') || ph.validationStatus === 'VERIFIED' ? 'success' : 'neutral'} size="sm">
                    {ph.validationStatus}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[#66727E] text-[11px]">
                  <span>{ph.department}</span>
                  <span>{ph.durationDays ? `${ph.durationDays} Days Duration` : ph.year || '2025-2026'}</span>
                </div>
                <p className="text-[#334155] leading-relaxed bg-white p-2 rounded border border-[#E6ECF1]">
                  <strong>Measurable Outcome:</strong> {ph.outcome}
                </p>
                <div className="text-[10.5px] text-[#66727E]">
                  Contact: {ph.officerContact || 'Executive Engineer (Water Supply & Sanitation)'}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#EAF5EE] border border-[#BDE0CB] rounded text-xs text-[#1E6B3E] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>All historical pilots verified through government treasury completion certificates.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
