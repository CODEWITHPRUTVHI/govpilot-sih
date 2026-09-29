import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Building2, 
  Bell, 
  UserCheck, 
  ChevronDown, 
  Search, 
  Shield, 
  Briefcase, 
  Award, 
  CheckCheck, 
  Sliders,
  CheckCircle,
  Menu,
  PlayCircle,
  RotateCcw,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface HeaderProps {
  onToggleMobileNav?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileNav }) => {
  const { 
    currentRole, 
    setRole, 
    currentUser, 
    notifications, 
    markNotificationRead, 
    setActiveTab,
    challenges,
    startups,
    startGuidedTour,
    resetScenario
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleOptions: { role: UserRole; title: string; subtitle: string; emoji: string }[] = [
    {
      role: 'GOVERNMENT_OFFICER',
      title: 'Government Officer',
      subtitle: 'Water Supply & Sanitation Dept',
      emoji: '👨‍💼'
    },
    {
      role: 'STARTUP',
      title: 'Startup Founder',
      subtitle: 'AquaSense Technologies (DPIIT)',
      emoji: '🚀'
    },
    {
      role: 'EXPERT_EVALUATOR',
      title: 'Expert Judge / Evaluator',
      subtitle: 'Prof. Ananya Sharma, IIT Bombay',
      emoji: '🎓'
    },
    {
      role: 'INDEPENDENT_VALIDATOR',
      title: 'Lab Validator',
      subtitle: 'CWPRS & Quality Council of India',
      emoji: '🔬'
    },
    {
      role: 'PROGRAM_ADMIN',
      title: 'State Admin Director',
      subtitle: 'Maharashtra State Innovation Society',
      emoji: '👑'
    }
  ];

  const handleSelectRole = (r: UserRole) => {
    setRole(r);
    setRoleDropdownOpen(false);
    if (r === 'STARTUP') {
      setActiveTab('startup-portal');
    } else if (r === 'EXPERT_EVALUATOR') {
      setActiveTab('evaluator-portal');
    } else if (r === 'INDEPENDENT_VALIDATOR') {
      setActiveTab('validator-portal');
    } else if (r === 'PROGRAM_ADMIN') {
      setActiveTab('admin-portal');
    } else {
      setActiveTab('dashboard');
    }
  };

  const filteredChallenges = searchQuery.trim() 
    ? challenges.filter(c => c.title?.toLowerCase().includes(searchQuery.toLowerCase()) || c.challengeCode?.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const filteredStartups = searchQuery.trim()
    ? startups.filter(s => s.name?.toLowerCase().includes(searchQuery.toLowerCase()) || (s.domains || []).some(d => d.toLowerCase().includes(searchQuery.toLowerCase())))
    : [];

  const currentRoleInfo = roleOptions.find(r => r.role === currentRole) || roleOptions[0];

  return (
    <header className="bg-white border-b border-[#D9E0E7] sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-3">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onToggleMobileNav}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#123B63] to-[#1E568A] text-white rounded-xl flex items-center justify-center font-extrabold text-lg tracking-tight shadow-xs group-hover:scale-105 transition-transform">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-[#123B63] tracking-tight">GovPilot</span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full hidden sm:inline">
                  Maharashtra MSInS
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium hidden sm:block">
                Problem ➔ Pilot ➔ Scale
              </p>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-sm relative">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search problems, startups, water tests..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchResultsOpen(true);
              }}
              onFocus={() => setSearchResultsOpen(true)}
              className="w-full bg-gray-50 hover:bg-gray-100/80 focus:bg-white text-xs pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#123B63] focus:border-transparent text-gray-800 transition-colors"
            />
          </div>

          {/* Quick Search Dropdown */}
          {searchResultsOpen && searchQuery.trim().length > 0 && (
            <div className="absolute top-11 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-50 max-h-80 overflow-y-auto">
              <div className="text-[10px] font-bold text-gray-400 uppercase px-2 py-1">Problems</div>
              {filteredChallenges.length === 0 && <p className="text-xs text-gray-400 px-2 py-1">No problems found</p>}
              {filteredChallenges.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveTab('challenges');
                    setSearchResultsOpen(false);
                    setSearchQuery('');
                  }}
                  className="px-2 py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer text-xs flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-800 truncate">{c.title}</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">{c.challengeCode}</span>
                </div>
              ))}

              <div className="text-[10px] font-bold text-gray-400 uppercase px-2 py-1 mt-2">Startups</div>
              {filteredStartups.length === 0 && <p className="text-xs text-gray-400 px-2 py-1">No startups found</p>}
              {filteredStartups.map(s => (
                <div
                  key={s.id}
                  onClick={() => {
                    setActiveTab('startup-discovery');
                    setSearchResultsOpen(false);
                    setSearchQuery('');
                  }}
                  className="px-2 py-1.5 hover:bg-amber-50 rounded-lg cursor-pointer text-xs flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-800 truncate">{s.name}</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">{s.dpiitNumber}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Action Icons & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Guided Tour Button */}
          <button
            onClick={startGuidedTour}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-all hover:scale-102"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Interactive Demo Tour</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800">Alerts & Messages</span>
                  <span className="text-[10px] text-gray-500">{unreadCount} unread</span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.targetTab) setActiveTab(n.targetTab);
                        setNotifDropdownOpen(false);
                      }}
                      className={`px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-xs ${!n.read ? 'bg-blue-50/50 font-medium' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-bold text-gray-900">{n.title}</span>
                        <span className="text-[10px] text-gray-400 shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="text-gray-600 text-[11px] mt-0.5">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100/80 border border-blue-200 rounded-xl text-xs font-bold text-[#123B63] transition-all"
            >
              <span className="text-base">{currentRoleInfo.emoji}</span>
              <div className="text-left hidden md:block">
                <div className="text-xs leading-none font-bold">{currentRoleInfo.title}</div>
                <div className="text-[10px] text-blue-700/70 font-normal leading-tight mt-0.5">Switch Persona</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-blue-700 opacity-70" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl p-1.5 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide border-b border-gray-100 mb-1">
                  Switch Your Persona
                </div>
                <div className="space-y-1">
                  {roleOptions.map((opt) => (
                    <button
                      key={opt.role}
                      onClick={() => handleSelectRole(opt.role)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                        currentRole === opt.role 
                          ? 'bg-[#123B63] text-white font-bold' 
                          : 'hover:bg-gray-100 text-gray-800'
                      }`}
                    >
                      <span className="text-lg shrink-0">{opt.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold truncate">{opt.title}</div>
                        <div className={`text-[10.5px] truncate ${currentRole === opt.role ? 'text-blue-200' : 'text-gray-500'}`}>
                          {opt.subtitle}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
