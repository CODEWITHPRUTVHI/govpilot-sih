import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Target, 
  FlaskConical, 
  FolderArchive, 
  MoreHorizontal,
  X,
  Search,
  Award,
  Scale,
  ShieldCheck,
  TrendingUp,
  FileText,
  History,
  Calculator,
  CheckSquare
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, currentRole } = useApp();

  const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'challenges', label: 'Challenges', icon: <Target className="w-4 h-4" /> },
    { id: 'discovery', label: 'Startup Discovery', icon: <Search className="w-4 h-4" /> },
    { id: 'screening', label: 'Eligibility Screening', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'evaluation', label: 'Expert Evaluation', icon: <Award className="w-4 h-4" /> },
    { id: 'pilot-command', label: 'Pilot Command Center', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'evidence-room', label: 'Evidence Engine', icon: <FolderArchive className="w-4 h-4" /> },
    { id: 'baseline-outcome', label: 'Baseline vs Outcome', icon: <Scale className="w-4 h-4" /> },
    { id: 'validation', label: 'Independent Validation', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'procurement-readiness', label: 'Procurement Readiness', icon: <FileText className="w-4 h-4" /> },
    { id: 'scale-decision', label: 'Scale Decisions', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'scale-simulator', label: 'Scale Simulator', icon: <Calculator className="w-4 h-4" /> },
    { id: 'contract-milestones', label: 'Contracts & Milestones', icon: <FileText className="w-4 h-4" /> },
    { id: 'documents', label: 'Document Center', icon: <FileText className="w-4 h-4" /> },
    { id: 'audit-trail', label: 'Audit Trail', icon: <History className="w-4 h-4" /> }
  ];

  const handleSelect = (id: string) => {
    setActiveTab(id);
    onClose();
  };

  return (
    <>
      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={onClose}
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-4 bg-[#123B63] text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">GovPilot Navigation</h3>
                <p className="text-[11px] text-blue-200">Government of Maharashtra</p>
              </div>
              <button 
                onClick={onClose}
                className="p-1 text-blue-200 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {allNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs text-left ${
                    activeTab === item.id 
                      ? 'bg-[#123B63] text-white font-semibold' 
                      : 'text-[#17212B] hover:bg-[#F0F4F8]'
                  }`}
                >
                  <span className={activeTab === item.id ? 'text-white' : 'text-[#475467]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Navigation on Mobile */}
      <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#D9E0E7] z-30 flex items-center justify-around py-1 px-2 shadow-lg">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] ${
            activeTab === 'dashboard' ? 'text-[#123B63] font-bold' : 'text-[#66727E]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] ${
            activeTab === 'challenges' ? 'text-[#123B63] font-bold' : 'text-[#66727E]'
          }`}
        >
          <Target className="w-4 h-4 mb-0.5" />
          Challenges
        </button>
        <button
          onClick={() => setActiveTab('pilot-command')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] ${
            activeTab === 'pilot-command' ? 'text-[#123B63] font-bold' : 'text-[#66727E]'
          }`}
        >
          <FlaskConical className="w-4 h-4 mb-0.5" />
          Pilots
        </button>
        <button
          onClick={() => setActiveTab('evidence-room')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] ${
            activeTab === 'evidence-room' ? 'text-[#123B63] font-bold' : 'text-[#66727E]'
          }`}
        >
          <FolderArchive className="w-4 h-4 mb-0.5" />
          Evidence
        </button>
        <button
          onClick={() => setActiveTab('scale-decision')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] ${
            activeTab === 'scale-decision' ? 'text-[#123B63] font-bold' : 'text-[#66727E]'
          }`}
        >
          <TrendingUp className="w-4 h-4 mb-0.5" />
          Scale
        </button>
      </nav>
    </>
  );
};
