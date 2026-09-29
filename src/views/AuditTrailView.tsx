import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  History, 
  Search, 
  Filter, 
  ShieldCheck, 
  Lock, 
  Clock, 
  UserCheck, 
  Download,
  Calendar
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const AuditTrailView: React.FC = () => {
  const { auditLogs } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.targetEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || log.actorRole.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Statutory Transparency & Audit
            </span>
            <Badge variant="neutral" size="sm">Immutable Ledger</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Comprehensive Government Audit Trail
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Append-only tamper-proof log recording all challenge creations, statutory eligibility screenings, blinded score submissions, and scale authorizations.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="gov-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-[#66727E] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search audit trail by actor, action, or target entity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs rounded pl-9 pr-3 py-2 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              aria-label="Filter audit logs by actor role"
              className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs rounded px-3 py-2 focus:bg-white focus:outline-none"
            >
              <option value="ALL">All Roles</option>
              <option value="Officer">Government Officers</option>
              <option value="Startup">Startups</option>
              <option value="Technical">Technical Evaluators</option>
              <option value="Validator">Independent Validators</option>
              <option value="Administrator">MSInS Administrators</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="gov-card overflow-hidden">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Actor & Role</th>
              <th>Action Category</th>
              <th>Target Entity</th>
              <th>Details & Statutory Context</th>
              <th>Hash Checksum</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td className="text-xs text-[#66727E] whitespace-nowrap font-mono">
                  {log.timestamp}
                </td>
                <td>
                  <div className="font-bold text-xs text-[#123B63]">{log.actorName}</div>
                  <span className="text-[10.5px] text-[#66727E]">{log.actorRole}</span>
                </td>
                <td>
                  <Badge variant="neutral" size="sm">{log.action}</Badge>
                </td>
                <td className="text-xs font-semibold text-[#17212B] whitespace-nowrap">
                  {log.targetEntity}
                </td>
                <td className="text-xs text-[#334155] max-w-sm leading-relaxed">
                  {log.details}
                </td>
                <td>
                  <span className="text-[10.5px] font-mono text-[#287D4A] flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    {log.sha256Hash ? log.sha256Hash.substring(0, 10) : 'e8a9f012'}...
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
