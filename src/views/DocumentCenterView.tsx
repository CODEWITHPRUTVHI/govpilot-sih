import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Lock, 
  CheckCircle2, 
  Printer,
  Calendar,
  Building2
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

export const DocumentCenterView: React.FC = () => {
  const { documents, setActiveTab } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [viewDocModal, setViewDocModal] = useState<any>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filteredDocs = documents.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
                          d.documentNumber.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || d.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleDownload = (doc: any) => {
    setDownloadSuccess(doc.id);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              Statutory Repository
            </span>
            <Badge variant="neutral" size="sm">{documents.length} Verified Artifacts</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Government Document & Artifact Center
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Centralized document vault housing Government Resolutions (GRs), controlled pilot agreements, NABL lab certificates, and independent audit reports.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="gov-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-[#66727E] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by document title, GR reference number..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs rounded pl-9 pr-3 py-2 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter documents by category"
              className="w-full bg-[#F7F9FB] border border-[#D9E0E7] text-xs rounded px-3 py-2 focus:bg-white focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="GOVERNMENT_RESOLUTION">Government Resolutions (GR)</option>
              <option value="PILOT_AGREEMENT">Pilot Agreements & Contracts</option>
              <option value="VALIDATION_REPORT">Independent Validation Reports</option>
              <option value="EVIDENCE_REPORT">Lab & Evidence Records</option>
              <option value="SANCTION_ORDER">Sanction Orders</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="gov-card overflow-x-auto">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Document Ref #</th>
              <th>Document Title & Description</th>
              <th>Category</th>
              <th>Issuing Authority</th>
              <th>Signed Date</th>
              <th>Security Seal</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="cursor-pointer" onClick={() => setViewDocModal(doc)}>
                <td className="font-bold text-xs text-[#123B63] whitespace-nowrap">
                  {doc.documentNumber}
                </td>
                <td className="max-w-xs">
                  <div className="font-bold text-xs text-[#17212B] line-clamp-1">{doc.title}</div>
                  <p className="text-[11px] text-[#66727E] line-clamp-1 mt-0.5">{doc.description}</p>
                </td>
                <td>
                  <Badge variant="neutral" size="sm">{doc.category.replace('_', ' ')}</Badge>
                </td>
                <td className="text-xs text-[#475467]">{doc.issuingAuthority}</td>
                <td className="text-xs text-[#66727E] whitespace-nowrap">{doc.date}</td>
                <td>
                  <span className="text-[10.5px] font-mono text-[#287D4A] flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Validated
                  </span>
                </td>
                <td className="text-right whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewDocModal(doc);
                    }}
                    className="bg-white border border-[#C5D8E8] hover:bg-[#EBF2F7] text-[#123B63] text-xs font-semibold px-2.5 py-1 rounded inline-flex items-center gap-1 shadow-xs mr-1"
                  >
                    <Eye className="w-3 h-3" />
                    Preview
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(doc);
                    }}
                    className="bg-[#123B63] hover:bg-[#0E2E4E] text-white text-xs font-semibold px-2.5 py-1 rounded inline-flex items-center gap-1 shadow-xs"
                  >
                    <Download className="w-3 h-3" />
                    {downloadSuccess === doc.id ? 'Saved' : 'PDF'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PDF-Style Document Viewer Modal */}
      {viewDocModal && (
        <Modal
          isOpen={!!viewDocModal}
          onClose={() => setViewDocModal(null)}
          title={`Document Preview: ${viewDocModal.documentNumber}`}
          subtitle={`${viewDocModal.title} — ${viewDocModal.issuingAuthority}`}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-[#66727E] font-mono">
                SHA-256: {viewDocModal.sha256Checksum}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(viewDocModal)}
                  className="bg-[#123B63] text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Verified PDF
                </button>
                <button
                  onClick={() => setViewDocModal(null)}
                  className="bg-white border border-[#D9E0E7] text-xs font-semibold px-3 py-1.5 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          }
        >
          <div className="p-6 bg-white border border-[#D9E0E7] shadow-sm rounded space-y-4 text-xs font-serif text-[#17212B]">
            <div className="text-center pb-4 border-b border-[#D9E0E7] space-y-1">
              <div className="font-bold text-sm uppercase tracking-widest text-[#123B63]">
                Government of Maharashtra
              </div>
              <div className="font-bold text-xs uppercase">{viewDocModal.issuingAuthority}</div>
              <div className="text-[11px] font-mono text-[#66727E]">Reference: {viewDocModal.documentNumber}</div>
            </div>

            <div className="py-2">
              <span className="font-bold block mb-1">Subject:</span>
              <p className="font-semibold text-[#123B63] text-sm">{viewDocModal.title}</p>
            </div>

            <div className="space-y-2 leading-relaxed">
              <p>{viewDocModal.description}</p>
              <p className="pt-2 text-[11.5px] text-[#475467]">
                This document is electronically generated and digitally signed in accordance with the Maharashtra Information Technology Regulations and Public Procurement Directives.
              </p>
            </div>

            <div className="pt-6 border-t border-[#D9E0E7] flex justify-between items-center text-[11px] text-[#66727E]">
              <div>Date of Issue: <strong>{viewDocModal.date}</strong></div>
              <div className="text-[#287D4A] font-bold">DIGITALLY SIGNED & VERIFIED</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
