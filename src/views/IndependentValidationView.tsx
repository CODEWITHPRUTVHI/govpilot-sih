import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Lock, 
  Award, 
  ArrowRight, 
  AlertTriangle, 
  Save, 
  Printer, 
  Download,
  Building2,
  Calendar,
  UserCheck
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const IndependentValidationView: React.FC = () => {
  const { pilots, selectedPilotId, setActiveTab, currentUser } = useApp();

  const pilot = pilots.find(p => p.id === selectedPilotId) || pilots[0];

  const [validationStatus, setValidationStatus] = useState<'VALIDATED' | 'PARTIALLY_VALIDATED' | 'NOT_VALIDATED'>('VALIDATED');
  const [signedSuccess, setSignedSuccess] = useState(false);

  const [validationReport, setValidationReport] = useState({
    reportNumber: 'CWPRS-VAL-2026-089-WSSD',
    institution: 'Central Water and Power Research Station (CWPRS) & Quality Council of India (QCI)',
    leadValidator: 'Dr. K. S. Deshmukh, Chief Scientist (Hydraulic Instrumentation)',
    date: '24 March 2026',
    methodology: 'Third-party physical grab-sample chemical testing (120 samples) analyzed concurrently with 1.84M continuous edge telemetry readings across 50 ESR tanks in Amravati, Nashik, and Satara.',
    statCorrelation: '98.4% correlation with NABL laboratory spectrometry benchmarks (p < 0.001, statistically significant).',
    limitations: 'Optical lens window requires automated quartz wiper actuation under extreme monsoon river inflow turbidity (>100 NTU).',
    recommendation: 'Recommended for phased statewide public procurement across priority rural drinking water supply networks in Maharashtra.'
  });

  const handleSignReport = () => {
    setSignedSuccess(true);
    setTimeout(() => setSignedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Third-Party Quality Assurance
            </span>
            <Badge variant="success" size="sm">CWPRS / QCI Certified</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Independent Validation Report
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Statutory third-party empirical audit for Pilot <strong>{pilot.pilotCode}</strong> ({pilot.startupName}).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('procurement-readiness')}
            className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 shadow-xs transition-colors"
          >
            Procurement Readiness Assessment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Official Certificate Box */}
      <div className="gov-card p-6 sm:p-8 bg-[#FAFCFE] border-2 border-[#123B63] space-y-6">
        {/* Certificate Header */}
        <div className="text-center pb-6 border-b-2 border-[#123B63] space-y-1">
          <div className="flex justify-center items-center gap-2">
            <span className="text-xs font-bold text-[#123B63] uppercase tracking-widest">
              Government of Maharashtra • MSInS Innovation Sandbox
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#123B63] uppercase tracking-wide">
            Certificate of Independent Pilot Validation
          </h2>
          <p className="text-xs text-[#66727E] font-mono">
            Report Reference: {validationReport.reportNumber}
          </p>
        </div>

        {/* Validation Status Badge Center */}
        <div className="text-center py-2">
          <div className="inline-block p-3 px-6 bg-[#EAF5EE] border-2 border-[#287D4A] rounded text-[#1E6B3E]">
            <div className="text-xs font-bold uppercase tracking-widest">Official Determination</div>
            <div className="text-xl font-bold mt-0.5">STATUS: VALIDATED (READY FOR SCALE)</div>
          </div>
        </div>

        {/* Key Findings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-white border border-[#D9E0E7] rounded space-y-1">
            <span className="text-[10.5px] font-bold text-[#66727E] uppercase block">Independent Auditing Agency</span>
            <p className="font-semibold text-[#123B63]">{validationReport.institution}</p>
            <span className="text-[#66727E] text-[11px] block mt-0.5">Lead Validator: {validationReport.leadValidator}</span>
          </div>

          <div className="p-3.5 bg-white border border-[#D9E0E7] rounded space-y-1">
            <span className="text-[10.5px] font-bold text-[#66727E] uppercase block">Statistical Significance</span>
            <p className="font-semibold text-[#287D4A]">{validationReport.statCorrelation}</p>
            <span className="text-[#66727E] text-[11px] block mt-0.5">Confidence Interval: 99% (N = 120 samples)</span>
          </div>
        </div>

        {/* Methodology & Limitations */}
        <div className="space-y-3 text-xs">
          <div>
            <span className="font-bold text-[#123B63] block mb-1 uppercase text-[11px]">Audit Methodology & Protocol</span>
            <p className="text-[#17212B] bg-white p-3 rounded border border-[#D9E0E7] leading-relaxed">
              {validationReport.methodology}
            </p>
          </div>

          <div>
            <span className="font-bold text-[#123B63] block mb-1 uppercase text-[11px]">Identified Environmental Limitations</span>
            <p className="text-[#17212B] bg-white p-3 rounded border border-[#D9E0E7] leading-relaxed">
              {validationReport.limitations}
            </p>
          </div>

          <div>
            <span className="font-bold text-[#123B63] block mb-1 uppercase text-[11px]">Statutory Scale Recommendation</span>
            <p className="text-[#17212B] bg-[#EBF2F7] p-3 rounded border border-[#C5D8E8] leading-relaxed font-medium">
              {validationReport.recommendation}
            </p>
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="pt-6 border-t border-[#D9E0E7] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-[#123B63] flex items-center justify-center font-bold text-xs text-[#123B63] tracking-tighter">
              CWPRS
            </div>
            <div>
              <span className="font-bold text-[#123B63] block">Dr. K. S. Deshmukh</span>
              <span className="text-[#66727E] text-[11px]">Chief Scientist, CWPRS Pune</span>
              <span className="text-[10px] text-[#287D4A] font-mono block">Digitally Signed on 24-03-2026 11:00 AM</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {signedSuccess && (
              <span className="text-xs font-bold text-[#1E6B3E] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Seal & Sign Verified
              </span>
            )}
            <button
              onClick={handleSignReport}
              className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2 rounded flex items-center gap-1.5 shadow-xs"
            >
              <Lock className="w-3.5 h-3.5" />
              Re-Verify Digital Seal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
