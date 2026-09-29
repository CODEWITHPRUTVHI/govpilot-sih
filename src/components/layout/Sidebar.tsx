import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Target, 
  Search, 
  FlaskConical, 
  Scale, 
  TrendingUp, 
  Calculator, 
  Layers, 
  BarChart3, 
  FileText, 
  History,
  Sparkles,
  Award,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, currentRole, challenges, pilots, applications } = useApp();

  const activeChallengesCount = challenges.filter(c => c.status !== 'COMPLETED' && c.status !== 'CANCELLED').length;
  const activePilotsCount = pilots.filter(p => p.status === 'ACTIVE' || p.status === 'AWAITING_VALIDATION').length;
  const pendingScreeningCount = applications.filter(a => a.screeningStatus === 'PENDING').length;

  const coreWorkflowSteps = [
    { 
      id: 'challenges', 
      aliases: ['challenges', 'create-challenge', 'challenge-detail'], 
      label: '1. Problems', 
      sublabel: 'Post issues to fix',
      icon: <Target className="w-4 h-4" />, 
      badge: activeChallengesCount,
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    { 
      id: 'startup-discovery', 
      aliases: ['startup-discovery', 'discovery', 'startup-profile', 'eligibility-screening', 'screening', 'expert-evaluation', 'evaluation'], 
      label: '2. Pick Startup', 
      sublabel: 'Find & review startups',
      icon: <Search className="w-4 h-4" />, 
      badge: pendingScreeningCount ? `${pendingScreeningCount} new` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    { 
      id: 'pilot-command', 
      aliases: ['pilot-command', 'contract-milestones'], 
      label: '3. Live Test', 
      sublabel: '50-village test run',
      icon: <FlaskConical className="w-4 h-4" />, 
      badge: `${activePilotsCount} Active`,
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    { 
      id: 'baseline-outcome', 
      aliases: ['baseline-outcome', 'validation', 'evidence-room'], 
      label: '4. See Proof', 
      sublabel: 'Before vs After results',
      icon: <Scale className="w-4 h-4" />, 
      badge: '98% Pass',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    { 
      id: 'scale-decision', 
      aliases: ['scale-decision', 'procurement-readiness', 'procurement-pathway'], 
      label: '5. Buy & Scale', 
      sublabel: 'Gov approval & rollout',
      icon: <TrendingUp className="w-4 h-4" />, 
      badge: 'Ready',
      badgeColor: 'bg-sky-100 text-sky-800'
    }
  ];

  const toolsItems = [
    { id: 'dashboard', aliases: ['dashboard'], label: 'Overview Board', sublabel: 'Summary at a glance', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'scale-simulator', aliases: ['scale-simulator'], label: 'Savings Simulator', sublabel: 'Calculate saved crores', icon: <Calculator className="w-4 h-4" /> },
    { id: 'risk-engine', aliases: ['risk-engine'], label: 'Risk Radar', sublabel: 'Check safety & rules', icon: <Layers className="w-4 h-4" /> },
    { id: 'analytics', aliases: ['analytics'], label: 'Charts & Impact', sublabel: 'Statewide graphs', icon: <BarChart3 className="w-4 h-4" /> }
  ];

  const recordItems = [
    { id: 'documents', aliases: ['documents'], label: 'Certificates & Files', sublabel: 'Lab & legal docs', icon: <FileText className="w-4 h-4" /> },
    { id: 'audit-trail', aliases: ['audit-trail'], label: 'Action History', sublabel: 'Who approved what', icon: <History className="w-4 h-4" /> }
  ];

  // Role shortcut badge
  const getRolePortalTab = () => {
    switch (currentRole) {
      case 'STARTUP': return { id: 'startup-portal', label: 'Startup View' };
      case 'EXPERT_EVALUATOR': return { id: 'evaluator-portal', label: 'Judge / Evaluator View' };
      case 'INDEPENDENT_VALIDATOR': return { id: 'validator-portal', label: 'Lab Validator View' };
      case 'PROGRAM_ADMIN': return { id: 'admin-portal', label: 'State Admin View' };
      default: return null;
    }
  };

  const rolePortal = getRolePortalTab();

  const renderNavGroup = (items: typeof coreWorkflowSteps) => {
    return items.map((item) => {
      const isActive = item.aliases.includes(activeTab) || item.id === activeTab;
      return (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all relative ${
            isActive
              ? 'bg-gradient-to-r from-[#0F3460] to-[#1A5276] text-white shadow-md font-semibold'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-blue-300 rounded-r-full opacity-60" />
          )}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className={`p-1.5 rounded-lg ${
              isActive ? 'bg-white/20 text-white' : 'text-gray-500 bg-gray-100'
            }`}>
              {item.icon}
            </span>
            <div className="truncate">
              <div className="text-xs font-bold leading-tight">{item.label}</div>
              <div className={`text-[10.5px] truncate ${isActive ? 'text-blue-200' : 'text-gray-400'}`}>
                {item.sublabel}
              </div>
            </div>
          </div>
          {item.badge && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
              isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-gray-100 text-gray-700'
            }`}>
              {item.badge}
            </span>
          )}
        </button>
      );
    });
  };

  return (
    <aside aria-label="Sidebar Navigation" className="w-64 bg-white border-r border-[#E1E8F0] flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Role workspace banner if non-government */}
      {rolePortal && (
        <div className="p-3 bg-blue-50/70 border-b border-blue-100">
          <button
            onClick={() => setActiveTab(rolePortal.id)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-between transition-colors ${
              activeTab === rolePortal.id 
                ? 'bg-[#123B63] text-white' 
                : 'bg-white text-[#123B63] border border-blue-200 hover:bg-blue-50'
            }`}
          >
            <span>🎭 {rolePortal.label}</span>
            <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">Active</span>
          </button>
        </div>
      )}

      {/* Main navigation links */}
      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
        {/* Section 1: The 5 Easy Steps */}
        <div>
          <div className="px-2 pb-1.5 text-[11px] font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            5 Easy Steps
          </div>
          <div className="space-y-1">
            {renderNavGroup(coreWorkflowSteps)}
          </div>
        </div>

        {/* Section 2: Interactive Tools */}
        <div className="pt-2 border-t border-gray-100">
          <div className="px-2 pb-1.5 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            Tools & Insights
          </div>
          <div className="space-y-1">
            {renderNavGroup(toolsItems as any)}
          </div>
        </div>

        {/* Section 3: Records */}
        <div className="pt-2 border-t border-gray-100">
          <div className="px-2 pb-1.5 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            Records & Proof
          </div>
          <div className="space-y-1">
            {renderNavGroup(recordItems as any)}
          </div>
        </div>
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-[#F8FAFD] to-[#F0F5FA]">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F3460] to-[#1E8BC3] flex items-center justify-center text-white text-xs font-black shadow-sm">
            G
          </div>
          <div>
            <div className="text-xs font-extrabold text-gray-800 leading-tight">GovPilot</div>
            <div className="text-[10px] text-gray-400">Maharashtra · MSInS v1.0</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10.5px] text-emerald-700 font-semibold">All systems operational</span>
        </div>
      </div>
    </aside>
  );
};
