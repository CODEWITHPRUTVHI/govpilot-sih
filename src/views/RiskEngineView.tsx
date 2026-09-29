import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Layers, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Filter,
  Plus
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

export const RiskEngineView: React.FC = () => {
  const { pilots, selectedPilotId } = useApp();

  const pilot = pilots.find(p => p.id === selectedPilotId) || pilots[0];

  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [risks, setRisks] = useState([
    {
      id: 'RSK-01',
      category: 'CYBERSECURITY' as const,
      risk: 'Firmware tampering or rogue MQTT payload injection on remote rural tank nodes.',
      severity: 'MEDIUM' as const,
      mitigation: 'Hardware root of trust (ATECC608A chip) with asymmetric elliptic-curve device certificate pinning.',
      status: 'MITIGATED' as const,
      residualRisk: 'LOW',
      owner: 'State Security Officer'
    },
    {
      id: 'RSK-02',
      category: 'VENDOR_LOCK_IN' as const,
      risk: 'Proprietary telemetry schema preventing secondary hardware vendor integration during future expansions.',
      severity: 'HIGH' as const,
      mitigation: 'MahaJal standardized open REST/MQTT API schema with Apache 2.0 interface license stipulated in pilot agreement.',
      status: 'MITIGATED' as const,
      residualRisk: 'LOW',
      owner: 'Joint Secretary (IT)'
    },
    {
      id: 'RSK-03',
      category: 'DATA_PRIVACY' as const,
      risk: 'Exposure of municipal water consumption or critical drinking reservoir locations.',
      severity: 'LOW' as const,
      mitigation: 'Strictly aggregated utility data; GPS coordinates mapped only within encrypted state intranet.',
      status: 'MITIGATED' as const,
      residualRisk: 'VERY_LOW',
      owner: 'Data Protection Officer'
    },
    {
      id: 'RSK-04',
      category: 'SCALABILITY' as const,
      risk: 'Startup manufacturing capacity bottleneck under statewide procurement order (> 2,000 units).',
      severity: 'MEDIUM' as const,
      mitigation: 'Verified manufacturing tie-up with Tier-1 EMS provider in Chakan (Pune) capable of 800 units/mo.',
      status: 'MITIGATED' as const,
      residualRisk: 'LOW',
      owner: 'Procurement Cell'
    },
    {
      id: 'RSK-05',
      category: 'OPERATIONAL' as const,
      risk: 'Gram Sevak turnover or lack of technician response to optical sensor maintenance alerts.',
      severity: 'MEDIUM' as const,
      mitigation: 'District Zilla Parishad SLA with dedicated roving field support engineer for every 50 Gram Panchayats.',
      status: 'IN_PROGRESS' as const,
      residualRisk: 'MEDIUM',
      owner: 'Superintending Engineer (Amravati)'
    }
  ]);

  const [newRisk, setNewRisk] = useState({
    category: 'OPERATIONAL' as const,
    risk: '',
    severity: 'MEDIUM' as const,
    mitigation: '',
    owner: ''
  });

  const handleAddRisk = () => {
    if (!newRisk.risk) return;
    setRisks([...risks, {
      id: `RSK-0${risks.length + 1}`,
      category: newRisk.category,
      risk: newRisk.risk,
      severity: newRisk.severity,
      mitigation: newRisk.mitigation,
      status: 'IN_PROGRESS',
      residualRisk: 'LOW',
      owner: newRisk.owner || 'Department Officer'
    }]);
    setAddModalOpen(false);
  };

  const filteredRisks = risks.filter(r => filterSeverity === 'ALL' || r.severity === filterSeverity);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Governance & Risk Mitigation
            </span>
            <Badge variant="neutral" size="sm">0 Fatal Residual Risks</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Government Risk Assessment & Mitigation Register
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Rigorous risk evaluation across cybersecurity, vendor lock-in, data sovereignty, hardware failure, and rural operational continuity.
          </p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Identified Risk
        </button>
      </div>

      {/* Risk Matrix Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="gov-card p-4">
          <span className="text-[#66727E] uppercase font-bold text-[10.5px] block">Total Assessed Risks</span>
          <div className="text-2xl font-bold text-[#123B63] mt-1">{risks.length} Items</div>
          <p className="text-[#287D4A] font-medium mt-1">100% Tracked with Mitigations</p>
        </div>

        <div className="gov-card p-4">
          <span className="text-[#66727E] uppercase font-bold text-[10.5px] block">High Inherent Risks</span>
          <div className="text-2xl font-bold text-[#A66A00] mt-1">1 Item</div>
          <p className="text-[#66727E] mt-1">Vendor Lock-In (Open API Mitigated)</p>
        </div>

        <div className="gov-card p-4">
          <span className="text-[#66727E] uppercase font-bold text-[10.5px] block">Mitigated to Low Residual</span>
          <div className="text-2xl font-bold text-[#287D4A] mt-1">4 Items</div>
          <p className="text-[#66727E] mt-1">Zero Fatal Vulnerabilities</p>
        </div>

        <div className="gov-card p-4">
          <span className="text-[#66727E] uppercase font-bold text-[10.5px] block">Cybersecurity Status</span>
          <div className="text-2xl font-bold text-[#123B63] mt-1">CERT-In Compliant</div>
          <p className="text-[#287D4A] font-medium mt-1">MeitY Cloud Approved</p>
        </div>
      </div>

      {/* Risk Table */}
      <div className="gov-card overflow-hidden">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Risk ID & Category</th>
              <th>Identified Risk Scenario</th>
              <th>Inherent Severity</th>
              <th>Enforced Statutory Mitigation Plan</th>
              <th>Residual Risk</th>
              <th>Mitigation Status</th>
              <th>Risk Owner</th>
            </tr>
          </thead>
          <tbody>
            {filteredRisks.map((r) => (
              <tr key={r.id}>
                <td className="whitespace-nowrap">
                  <div className="font-bold text-xs text-[#123B63]">{r.id}</div>
                  <Badge variant="neutral" size="sm">{r.category}</Badge>
                </td>
                <td className="max-w-xs text-xs text-[#17212B] font-medium">{r.risk}</td>
                <td>
                  <Badge variant={r.severity === 'HIGH' ? 'danger' : r.severity === 'MEDIUM' ? 'warning' : 'info'} size="sm">
                    {r.severity}
                  </Badge>
                </td>
                <td className="max-w-xs text-xs text-[#334155]">{r.mitigation}</td>
                <td>
                  <Badge variant="success" size="sm">{r.residualRisk}</Badge>
                </td>
                <td>
                  <Badge variant={r.status === 'MITIGATED' ? 'success' : 'warning'} size="sm">
                    {r.status.replace('_', ' ')}
                  </Badge>
                </td>
                <td className="text-xs text-[#66727E] whitespace-nowrap">{r.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Risk Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Identified Risk to Register"
        subtitle="Log potential statutory, technical, or field operational risks."
        maxWidth="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setAddModalOpen(false)} className="bg-white border text-xs px-3 py-2 rounded">Cancel</button>
            <button onClick={handleAddRisk} className="bg-[#123B63] text-white text-xs px-4 py-2 rounded">Log Risk</button>
          </div>
        }
      >
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold mb-1">Risk Description *</label>
            <input 
              type="text" 
              value={newRisk.risk} 
              onChange={e => setNewRisk({ ...newRisk, risk: e.target.value })} 
              className="w-full border p-2 rounded" 
              placeholder="e.g. Battery degradation under high ambient summer temperature" 
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select 
                value={newRisk.category} 
                onChange={e => setNewRisk({ ...newRisk, category: e.target.value as any })}
                className="w-full border p-2 rounded"
              >
                <option value="CYBERSECURITY">Cybersecurity</option>
                <option value="VENDOR_LOCK_IN">Vendor Lock-In</option>
                <option value="DATA_PRIVACY">Data Privacy</option>
                <option value="SCALABILITY">Scalability</option>
                <option value="OPERATIONAL">Operational</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Severity</label>
              <select 
                value={newRisk.severity} 
                onChange={e => setNewRisk({ ...newRisk, severity: e.target.value as any })}
                className="w-full border p-2 rounded"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Mitigation Strategy *</label>
            <textarea 
              rows={2} 
              value={newRisk.mitigation} 
              onChange={e => setNewRisk({ ...newRisk, mitigation: e.target.value })} 
              className="w-full border p-2 rounded" 
              placeholder="e.g. Integrate LiFePO4 battery chemistry with over-temperature cutoff" 
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
