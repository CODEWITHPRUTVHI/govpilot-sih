import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileCheck2, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  TrendingUp, 
  ArrowRight,
  Layers,
  Lock,
  Zap,
  Building2,
  Users
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const ProcurementReadinessView: React.FC = () => {
  const { pilots, selectedPilotId, setActiveTab } = useApp();

  const pilot = pilots.find(p => p.id === selectedPilotId) || pilots[0];

  const dimensions = [
    {
      name: '1. Technical Scalability & Firmware Modularity',
      score: 10,
      max: 10,
      status: 'PASS',
      details: 'Tested concurrently across 50 nodes with MQTT cluster auto-scaling.',
      proof: 'Architecture Stress Test Report #ST-991'
    },
    {
      name: '2. Unit Economics & Price Volume Tapering',
      score: 9,
      max: 10,
      status: 'PASS',
      details: 'Capex drops from ₹12,000 to ₹8,500 per unit for orders > 500 units.',
      proof: 'Chartered Accountant Cost Certificate'
    },
    {
      name: '3. Manufacturing Capacity & Component Supply Chain',
      score: 9,
      max: 10,
      status: 'PASS',
      details: 'Pune manufacturing facility capable of delivering 400 sensors/month.',
      proof: 'Factory Audit by DIC Maharashtra'
    },
    {
      name: '4. Cybersecurity & MeitY Cloud Hosting',
      score: 10,
      max: 10,
      status: 'PASS',
      details: 'Hosted on NIC / ESDS cloud in Navi Mumbai; TLS 1.3 encryption.',
      proof: 'CERT-In Empaneled Security Audit Certificate'
    },
    {
      name: '5. Interoperability & MahaJal Open APIs',
      score: 9,
      max: 10,
      status: 'PASS',
      details: 'RESTful webhooks compatible with State Water Dashboard.',
      proof: 'API Schema Validation Certificate'
    },
    {
      name: '6. Field SLA & Rural Service Network',
      score: 8,
      max: 10,
      status: 'PASS',
      details: 'Zilla Parishad technician training complete; 48-hr replacement SLA.',
      proof: 'District Service Level Agreement'
    },
    {
      name: '7. Department Training & User Adoption',
      score: 9,
      max: 10,
      status: 'PASS',
      details: 'Marathi video modules and training provided to 50 Gram Sevaks.',
      proof: 'Training Attendance Logs'
    },
    {
      name: '8. Intellectual Property & Code Sovereignty',
      score: 10,
      max: 10,
      status: 'PASS',
      details: '100% Indian IP owned by AquaSense Technologies Pvt Ltd.',
      proof: 'Indian Patent Application #2024210089'
    },
    {
      name: '9. DPIIT & Public Procurement Rules',
      score: 9,
      max: 10,
      status: 'PASS',
      details: 'Complies with Maharashtra Innovation Procurement Policy & GFR Rule 149.',
      proof: 'DPIIT Certificate #DIPP89214'
    },
    {
      name: '10. Citizen Privacy & Data Localization',
      score: 9,
      max: 10,
      status: 'PASS',
      details: 'Zero personal citizen data stored; water telemetry strictly public utility data.',
      proof: 'Data Protection Officer Compliance Note'
    }
  ];

  const totalScore = dimensions.reduce((acc, curr) => acc + curr.score, 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Statutory Procurement Gate
            </span>
            <Badge variant="success" size="sm">Score: 92 / 100</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Procurement Readiness Assessment
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Comprehensive 10-dimension assessment determining statutory, technical, and operational suitability for statewide rollout.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('scale-decision')}
          className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
        >
          <TrendingUp className="w-4 h-4" />
          Proceed to Scale Decision & Simulator
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Summary Score Top Card */}
      <div className="gov-card p-6 bg-gradient-to-r from-white to-[#F0F6FA]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Overall Readiness Determination
            </span>
            <div className="flex items-center gap-3 mt-1">
              <h2 className="text-2xl font-bold text-[#123B63]">
                {totalScore} / 100 — READY FOR STATEWIDE SCALE
              </h2>
              <Badge variant="success" size="md">0 Critical Blockers</Badge>
            </div>
            <p className="text-xs text-[#475467] mt-1 max-w-2xl leading-relaxed">
              All 10 dimensions meet or exceed government thresholds. Cybersecurity, manufacturing capacity, and unit economics support Phase-1 scale across 12 priority districts.
            </p>
          </div>

          <div className="p-3 bg-white border border-[#D9E0E7] rounded text-center shrink-0">
            <span className="text-[10.5px] text-[#66727E] block uppercase font-semibold">Recommended Action</span>
            <span className="text-sm font-bold text-[#287D4A] block mt-0.5">Phase-1 Scale Sanction</span>
          </div>
        </div>
      </div>

      {/* 10 Dimension Table */}
      <div className="gov-card overflow-x-auto">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Evaluation Dimension</th>
              <th>Score (Max 10)</th>
              <th>Status</th>
              <th>Assessment Details</th>
              <th>Verified Statutory Proof</th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map((d, idx) => (
              <tr key={idx}>
                <td className="font-bold text-xs text-[#123B63] max-w-xs">{d.name}</td>
                <td>
                  <span className="font-bold text-xs text-[#123B63] bg-[#EBF2F7] px-2 py-0.5 rounded">
                    {d.score} / {d.max}
                  </span>
                </td>
                <td>
                  <Badge variant="success" size="sm">{d.status}</Badge>
                </td>
                <td className="text-xs text-[#334155] max-w-xs">{d.details}</td>
                <td className="text-xs text-[#475467] font-medium">{d.proof}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
