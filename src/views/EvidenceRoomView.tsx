import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FolderArchive, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Eye, 
  Lock, 
  Filter, 
  Sparkles,
  ArrowRight,
  Database,
  Plus
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

export const EvidenceRoomView: React.FC = () => {
  const { pilots, selectedPilotId, uploadEvidence, setActiveTab } = useApp();

  const pilot = pilots.find(p => p.id === selectedPilotId) || pilots[0];
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [inspectModalOpen, setInspectModalOpen] = useState(false);
  const [activeEvidence, setActiveEvidence] = useState<any>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // New Evidence Upload State
  const [newEvidence, setNewEvidence] = useState({
    title: 'NABL Certified Re-Testing Batch #4 (Satara Tanks)',
    category: 'PERFORMANCE' as const,
    fileType: 'PDF' as const,
    fileSize: '3.4 MB',
    summary: 'Third-party NABL water lab chemical validation comparing 120 grab samples with real-time optical sensor readings.',
    metricsSupported: 'Detection accuracy & zero false-negative threshold verification',
    source: 'State Public Health Water Testing Laboratory, Pune',
    confidenceRating: 98
  });

  const categories = [
    { key: 'ALL', label: 'All Evidence Records' },
    { key: 'PERFORMANCE', label: 'Performance & Accuracy' },
    { key: 'COST', label: 'Financial & Unit Cost' },
    { key: 'USAGE', label: 'Field Usage & Adoption' },
    { key: 'RELIABILITY', label: 'Hardware Reliability' },
    { key: 'FEEDBACK', label: 'Gram Panchayat Resolutions' },
    { key: 'SECURITY', label: 'STQC & Cloud Security' }
  ];

  const evidenceItems = pilot?.evidenceList || (pilot as any)?.evidenceRecords || [];

  const filteredRecords = evidenceItems.filter((e: any) => {
    if (selectedCategory === 'ALL') return true;
    const cat = (e.category || '').toUpperCase();
    return cat === selectedCategory || cat.includes(selectedCategory);
  });

  const handleUploadSubmit = () => {
    if (pilot?.id) {
      uploadEvidence(pilot.id, newEvidence);
    }
    setUploadModalOpen(false);
  };

  const handleInspect = (ev: any) => {
    setActiveEvidence(ev);
    setInspectModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Immutable Evidence Engine
            </span>
            <Badge variant="neutral" size="sm">SHA-256 Checksum Verified</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Evidence Room: {pilot?.challengeTitle || (pilot as any)?.title || 'Field Pilot'}
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Cryptographically logged telemetry streams, NABL certified lab assays, and field resolution certificates powering the independent validation decision.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Upload Field Evidence
          </button>
          <button
            onClick={() => setActiveTab('baseline-outcome')}
            className="bg-[#EBF2F7] hover:bg-[#DCE9F2] text-[#123B63] border border-[#C5D8E8] text-xs font-semibold px-3.5 py-2.5 rounded flex items-center gap-1.5 transition-colors"
          >
            Baseline vs Outcome Matrix
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Evidence Confidence Summary Box */}
      <div className="gov-card p-5 bg-gradient-to-r from-white to-[#F8FAFC]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#287D4A]" />
              <h3 className="text-base font-bold text-[#123B63]">
                Prototype Evidence Confidence: 96 / 100 (HIGH RIGOR)
              </h3>
            </div>
            <p className="text-xs text-[#475467] max-w-2xl leading-relaxed">
              Calculated across 5 independent evidence dimensions: continuous telemetry dataset volume (1.84M readings), NABL laboratory correlation (98.4%), and 100% verified Gram Panchayat operational sign-offs.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#EAF5EE] border border-[#BDE0CB] p-3 rounded text-center">
              <span className="text-[10.5px] text-[#1E6B3E] font-semibold block uppercase">Lab Validation</span>
              <span className="text-lg font-bold text-[#1E6B3E]">98.4%</span>
            </div>
            <div className="bg-[#EBF2F7] border border-[#C5D8E8] p-3 rounded text-center">
              <span className="text-[10.5px] text-[#123B63] font-semibold block uppercase">Telemetry Logs</span>
              <span className="text-lg font-bold text-[#123B63]">1.84M Rows</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-[#D9E0E7] pb-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setSelectedCategory(c.key)}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              selectedCategory === c.key
                ? 'bg-[#123B63] text-white shadow-xs'
                : 'bg-white border border-[#D9E0E7] text-[#475467] hover:bg-[#F8FAFC]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Evidence Table */}
      <div className="gov-card overflow-x-auto">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Evidence Title & Summary</th>
              <th>Category</th>
              <th>Supported Metric / KPI</th>
              <th>Verification Source</th>
              <th>File Type & Size</th>
              <th>Confidence</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((ev: any) => (
              <tr key={ev.id} className="cursor-pointer" onClick={() => handleInspect(ev)}>
                <td className="max-w-xs">
                  <div className="font-bold text-xs text-[#123B63] line-clamp-1">{ev.title}</div>
                  <p className="text-[11px] text-[#66727E] line-clamp-1 mt-0.5">{ev.summary || ev.reviewNotes || ev.metricName}</p>
                </td>
                <td>
                  <Badge variant="neutral" size="sm">{ev.category}</Badge>
                </td>
                <td className="text-xs text-[#334155] max-w-[200px] truncate">{ev.metricsSupported || ev.metricName || 'Accuracy Verification'}</td>
                <td className="text-xs text-[#475467]">{ev.source}</td>
                <td className="text-xs text-[#66727E] whitespace-nowrap">
                  <span className="font-bold text-[#123B63]">{ev.fileType}</span> ({ev.fileSize})
                </td>
                <td>
                  <span className="font-bold text-xs text-[#287D4A] bg-[#EAF5EE] px-2 py-0.5 rounded border border-[#BDE0CB]">
                    {ev.confidenceRating || ev.confidenceScore || 95}%
                  </span>
                </td>
                <td className="text-right whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInspect(ev);
                    }}
                    className="bg-white border border-[#C5D8E8] hover:bg-[#EBF2F7] text-[#123B63] text-xs font-semibold px-2.5 py-1 rounded inline-flex items-center gap-1 shadow-xs"
                  >
                    <Eye className="w-3 h-3" />
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspect Evidence Modal */}
      {activeEvidence && (
        <Modal
          isOpen={inspectModalOpen}
          onClose={() => setInspectModalOpen(false)}
          title={`Evidence Record: ${activeEvidence.title}`}
          subtitle={`Uploaded on ${activeEvidence.uploadedAt || activeEvidence.date || '2026-06-15'} by ${activeEvidence.source}`}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] text-[#66727E] flex items-center gap-1 font-mono">
                <Lock className="w-3.5 h-3.5 text-[#287D4A]" /> SHA-256: {(activeEvidence.sha256Hash || activeEvidence.hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4').substring(0, 18)}...
              </span>
              <button
                onClick={() => setInspectModalOpen(false)}
                className="bg-[#123B63] text-white text-xs font-semibold px-4 py-2 rounded shadow-xs"
              >
                Close Inspector
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="bg-[#F8FAFC] p-3 rounded border border-[#D9E0E7] space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10.5px] text-[#66727E] block uppercase">Category</span>
                  <span className="font-semibold text-[#123B63]">{activeEvidence.category}</span>
                </div>
                <div>
                  <span className="text-[10.5px] text-[#66727E] block uppercase">Verification Rigor</span>
                  <span className="font-bold text-[#287D4A]">{activeEvidence.confidenceRating || activeEvidence.confidenceScore || 97}% Confidence</span>
                </div>
              </div>
              <div>
                <span className="text-[10.5px] text-[#66727E] block uppercase">Executive Summary</span>
                <p className="text-[#17212B] leading-relaxed mt-0.5">{activeEvidence.summary || activeEvidence.reviewNotes || activeEvidence.baselineValue}</p>
              </div>
            </div>

            {/* Simulated Data Snippet */}
            <div className="border border-[#D9E0E7] rounded overflow-hidden">
              <div className="bg-[#123B63] text-white p-2.5 flex items-center justify-between font-mono text-[11px]">
                <span>Telemetry Sample Stream (CSV format)</span>
                <span>Record Count: 1,842,910 rows</span>
              </div>
              <div className="p-3 bg-[#1E293B] text-green-400 font-mono text-[11px] overflow-x-auto space-y-1">
                <div>timestamp,sensor_id,location,turbidity_ntu,residual_chlorine_ppm,ph,status</div>
                <div>2026-03-24T08:12:00Z,ESR-AMR-04,Achalpur,1.12,0.48,7.2,NORMAL</div>
                <div>2026-03-24T08:13:00Z,ESR-AMR-04,Achalpur,1.14,0.47,7.2,NORMAL</div>
                <div>2026-03-24T08:14:00Z,ESR-NSK-12,Nandgaon,4.82,0.08,6.8,ANOMALY_ALARM</div>
                <div>2026-03-24T08:15:00Z,ESR-STR-01,Karad,0.92,0.51,7.3,NORMAL</div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Evidence Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload New Field Evidence Record"
        subtitle="Attach validated NABL reports, CSV telemetry dumps, or Zilla Parishad expenditure receipts."
        maxWidth="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setUploadModalOpen(false)}
              className="bg-white border border-[#D9E0E7] text-[#17212B] text-xs font-semibold px-3 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleUploadSubmit}
              className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2 rounded shadow-xs"
            >
              Submit to Evidence Room
            </button>
          </div>
        }
      >
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-[#17212B] mb-1">Evidence Title *</label>
            <input
              type="text"
              value={newEvidence.title}
              onChange={(e) => setNewEvidence({ ...newEvidence, title: e.target.value })}
              className="w-full bg-[#F7F9FB] border border-[#D9E0E7] rounded p-2 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#17212B] mb-1">Category *</label>
              <select
                value={newEvidence.category}
                onChange={(e) => setNewEvidence({ ...newEvidence, category: e.target.value as any })}
                className="w-full bg-[#F7F9FB] border border-[#D9E0E7] rounded p-2 focus:bg-white"
              >
                <option value="PERFORMANCE">Performance & Accuracy</option>
                <option value="COST">Financial & Cost</option>
                <option value="USAGE">Usage & Adoption</option>
                <option value="RELIABILITY">Reliability</option>
                <option value="FEEDBACK">Feedback</option>
                <option value="SECURITY">Security</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#17212B] mb-1">Verification Source *</label>
              <input
                type="text"
                value={newEvidence.source}
                onChange={(e) => setNewEvidence({ ...newEvidence, source: e.target.value })}
                className="w-full bg-[#F7F9FB] border border-[#D9E0E7] rounded p-2 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#17212B] mb-1">Supported Metric / Key Takeaway *</label>
            <input
              type="text"
              value={newEvidence.metricsSupported}
              onChange={(e) => setNewEvidence({ ...newEvidence, metricsSupported: e.target.value })}
              className="w-full bg-[#F7F9FB] border border-[#D9E0E7] rounded p-2 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#17212B] mb-1">Summary Description *</label>
            <textarea
              rows={2}
              value={newEvidence.summary}
              onChange={(e) => setNewEvidence({ ...newEvidence, summary: e.target.value })}
              className="w-full bg-[#F7F9FB] border border-[#D9E0E7] rounded p-2 focus:bg-white"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
