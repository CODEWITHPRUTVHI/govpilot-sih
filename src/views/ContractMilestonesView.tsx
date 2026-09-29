import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  IndianRupee, 
  Lock, 
  Building2, 
  Calendar, 
  Download, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const ContractMilestonesView: React.FC = () => {
  const { pilots, selectedPilotId, updateMilestoneStatus, setActiveTab, currentUser } = useApp();

  const pilot = pilots.find(p => p.id === selectedPilotId) || pilots[0];

  const [verifyConfirmation, setVerifyConfirmation] = useState<string | null>(null);

  const handleVerify = (milestoneId: string) => {
    updateMilestoneStatus(pilot.id, milestoneId, 'VERIFIED');
    setVerifyConfirmation(milestoneId);
    setTimeout(() => setVerifyConfirmation(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Controlled Pilot Agreement
            </span>
            <Badge variant="neutral" size="sm">GOM-WSSD-PILOT-2026-089</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Contracts & Milestone Payment Verification
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Manage legally binding pilot milestones and gate government treasury disbursements based on empirical deliverable verification.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('pilot-command')}
            className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 shadow-xs"
          >
            Go to Pilot Command Center
          </button>
        </div>
      </div>

      {/* Contract Metadata Card */}
      <div className="gov-card p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10.5px] text-[#66727E] block uppercase font-medium">Contract Reference</span>
            <span className="text-xs font-bold text-[#123B63]">GOM-WSSD-PILOT-2026-089</span>
          </div>
          <div>
            <span className="text-[10.5px] text-[#66727E] block uppercase font-medium">Startup Vendor</span>
            <span className="text-xs font-bold text-[#17212B]">{pilot.startupName}</span>
          </div>
          <div>
            <span className="text-[10.5px] text-[#66727E] block uppercase font-medium">Total Sanctioned Grant</span>
            <span className="text-xs font-bold text-[#287D4A]">₹{(pilot.budget / 100000).toFixed(2)} Lakh</span>
          </div>
          <div>
            <span className="text-[10.5px] text-[#66727E] block uppercase font-medium">Disbursement Progress</span>
            <span className="text-xs font-bold text-[#123B63]">75% Disbursed (3/4 Milestones)</span>
          </div>
        </div>
      </div>

      {/* Milestones Gating List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#123B63] uppercase tracking-wider">
          Milestone Verification & Disbursement Schedule
        </h3>

        {pilot.milestones.map((m, idx) => {
          const isVerified = m.status === 'VERIFIED';
          const isSubmitted = m.status === 'SUBMITTED_FOR_REVIEW';
          const isJustVerified = verifyConfirmation === m.id;

          return (
            <div 
              key={m.id}
              className={`gov-card p-5 border transition-all ${
                isVerified ? 'border-[#BDE0CB] bg-[#FAFCFB]' : isSubmitted ? 'border-[#FADBAA] bg-[#FEFCFA]' : 'border-[#D9E0E7]'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#E6ECF1]">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#123B63] text-white flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#123B63]">{m.title}</h4>
                    <span className="text-[11px] text-[#66727E]">Target Timeline: Due by Day {m.dueDays}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#123B63]">
                    ₹{(m.paymentAmount / 100000).toFixed(2)} Lakh ({m.paymentPercentage}%)
                  </span>
                  <Badge variant={isVerified ? 'success' : isSubmitted ? 'warning' : 'neutral'} size="sm">
                    {m.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3 text-xs">
                <div className="md:col-span-8 space-y-2">
                  <div>
                    <span className="font-semibold text-[#475467] block mb-0.5">Required Deliverables & Objective Criteria:</span>
                    <p className="text-[#17212B] leading-relaxed">{m.deliverables}</p>
                  </div>
                  {m.evidenceLink && (
                    <div className="text-[11px] text-[#2F6F95] font-medium flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Verified Artifact: {m.evidenceLink}</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-4 flex flex-col justify-between items-start md:items-end gap-2 border-t md:border-t-0 md:border-l border-[#E6ECF1] pt-2 md:pt-0 md:pl-4">
                  <div>
                    {isVerified ? (
                      <div className="text-[11px] text-[#1E6B3E] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Treasury Voucher #{m.treasuryVoucherNumber || 'GOM-TR-8819'}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-[#8C5900] font-medium">
                        Payment Blocked Until Officer Verification
                      </span>
                    )}
                  </div>

                  {!isVerified && (
                    <button
                      onClick={() => handleVerify(m.id)}
                      className="bg-[#287D4A] hover:bg-[#20633B] text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verify Deliverable & Release Tranche
                    </button>
                  )}

                  {isJustVerified && (
                    <span className="text-xs font-bold text-[#1E6B3E]">Tranche Cleared!</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
