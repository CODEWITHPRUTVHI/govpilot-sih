import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckSquare, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  UserCheck, 
  Save, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const EligibilityScreeningView: React.FC = () => {
  const { applications, updateScreening, setActiveTab, setSelectedStartupId } = useApp();

  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || 'APP-001');
  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const [checklist, setChecklist] = useState(selectedApp?.screeningChecklist || []);
  const [decision, setDecision] = useState<'PASS' | 'FAIL' | 'REVIEW_REQUIRED'>(selectedApp?.screeningStatus || 'PASS');
  const [reviewNote, setReviewNote] = useState(
    'All statutory prerequisites, DPIIT recognition, STQC hardware safety, and MeitY cloud compliance verified. Cleared for blinded expert committee scoring.'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggleCriterion = (criterionId: string) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === criterionId) {
        return {
          ...item,
          status: item.status === 'PASS' ? 'FAIL' : 'PASS'
        };
      }
      return item;
    }));
  };

  const handleSaveScreening = () => {
    updateScreening(selectedApp.id, decision, reviewNote);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Statutory Procurement Gate
            </span>
            <Badge variant="neutral" size="sm">Rule 149 & GFR 2017 Compliance</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Startup Eligibility & Statutory Screening
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Execute mandatory 8-point eligibility checklist verifying DPIIT registration, cybersecurity standards, lab certificates, and conflict-of-interest declarations.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('evaluation')}
          className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
        >
          Proceed to Blinded Evaluation
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main layout: Applicant selector (4 cols) & 8-point checklist (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Applicant Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="gov-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">Applicant Proposals</h2>
              <span className="text-xs text-[#66727E]">{applications.length} Submissions</span>
            </div>

            <div className="space-y-2">
              {applications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => {
                    setSelectedAppId(app.id);
                    setChecklist(app.screeningChecklist);
                    setDecision(app.screeningStatus);
                  }}
                  className={`p-3 rounded border text-left cursor-pointer transition-all ${
                    selectedAppId === app.id
                      ? 'bg-[#EBF2F7] border-[#123B63] text-[#123B63]'
                      : 'bg-white border-[#D9E0E7] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs">{app.startupName}</span>
                    <Badge 
                      variant={app.screeningStatus === 'PASS' ? 'success' : app.screeningStatus === 'FAIL' ? 'danger' : 'warning'} 
                      size="sm"
                    >
                      {app.screeningStatus}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-[#66727E] truncate">{app.solutionTitle}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D9E0E7]/60 text-[10.5px]">
                    <span className="text-[#66727E]">Cost: ₹{(app.proposedCost / 100000).toFixed(1)}L</span>
                    <span className="font-semibold text-[#123B63]">Eval: {app.averageEvaluationScore || 'Pending'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 8-point Checklist & Decision Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="gov-card p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-[#D9E0E7] gap-2">
              <div>
                <span className="text-xs text-[#66727E]">Active Applicant Review:</span>
                <h3 className="text-base font-bold text-[#123B63]">{selectedApp.startupName}</h3>
                <p className="text-xs text-[#475467]">{selectedApp.solutionTitle}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedStartupId(selectedApp.startupId);
                    setActiveTab('startup-profile');
                  }}
                  className="text-xs text-[#2F6F95] hover:text-[#123B63] font-semibold flex items-center gap-1"
                >
                  View Full Profile <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* 8-Point Statutory Checklist */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
                8-Point Statutory Screening Criteria
              </h4>

              <div className="space-y-2">
                {checklist.map((item) => {
                  const isPass = item.status === 'PASS';
                  return (
                    <div 
                      key={item.id}
                      className={`p-3 rounded border transition-colors flex items-start justify-between gap-3 text-xs ${
                        isPass ? 'bg-[#F9FCFA] border-[#BDE0CB]' : 'bg-[#FFF9F8] border-[#F6C0BB]'
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#17212B]">{item.criterion}</span>
                          <Badge variant={isPass ? 'success' : 'danger'} size="sm">
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-[11.5px] text-[#475467]">{item.description}</p>
                        <div className="flex items-center gap-2 text-[10.5px] text-[#66727E]">
                          <span className="font-medium text-[#123B63]">Verified Evidence:</span>
                          <span>{item.evidenceAttachment}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleCriterion(item.id)}
                        className={`text-xs px-2.5 py-1 rounded font-semibold shrink-0 border ${
                          isPass 
                            ? 'bg-white border-[#BDE0CB] text-[#1E6B3E] hover:bg-[#EAF5EE]' 
                            : 'bg-white border-[#F6C0BB] text-[#A31D14] hover:bg-[#FDF0EE]'
                        }`}
                      >
                        {isPass ? 'Pass' : 'Fail'} (Toggle)
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Official Decision Selector */}
            <div className="p-4 bg-[#F8FAFC] border border-[#D9E0E7] rounded space-y-3 pt-3">
              <h4 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
                Official Screening Determination
              </h4>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDecision('PASS')}
                  className={`py-2 px-3 rounded text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                    decision === 'PASS' 
                      ? 'bg-[#1E6B3E] text-white border-[#1E6B3E] shadow-xs' 
                      : 'bg-white border-[#D9E0E7] text-[#17212B] hover:bg-[#F0F4F8]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  PASS (Eligible)
                </button>

                <button
                  type="button"
                  onClick={() => setDecision('REVIEW_REQUIRED')}
                  className={`py-2 px-3 rounded text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                    decision === 'REVIEW_REQUIRED' 
                      ? 'bg-[#8C5900] text-white border-[#8C5900] shadow-xs' 
                      : 'bg-white border-[#D9E0E7] text-[#17212B] hover:bg-[#F0F4F8]'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                  Review Required
                </button>

                <button
                  type="button"
                  onClick={() => setDecision('FAIL')}
                  className={`py-2 px-3 rounded text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                    decision === 'FAIL' 
                      ? 'bg-[#A31D14] text-white border-[#A31D14] shadow-xs' 
                      : 'bg-white border-[#D9E0E7] text-[#17212B] hover:bg-[#F0F4F8]'
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  FAIL (Disqualified)
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Screening Officer Remarks & Justification *
                </label>
                <textarea
                  rows={2}
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  className="w-full bg-white border border-[#D9E0E7] text-xs text-[#17212B] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-[#66727E]">
                  Screening Authority: <strong>Shri Rajesh Patil, IAS</strong> (Joint Secretary)
                </div>

                <div className="flex items-center gap-2">
                  {savedSuccess && (
                    <span className="text-xs font-bold text-[#1E6B3E] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Saved & Recorded
                    </span>
                  )}
                  <button
                    onClick={handleSaveScreening}
                    className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2 rounded flex items-center gap-1.5 shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Record Official Screening
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
