import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Sparkles, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Check, 
  X, 
  SlidersHorizontal, 
  Award, 
  FlaskConical, 
  Scale,
  Droplets,
  Cpu
} from 'lucide-react';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Badge } from '../components/common/Badge';

export const StartupDiscoveryView: React.FC = () => {
  const { startups, setActiveTab, setSelectedStartupId, applications } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubTab, setSelectedSubTab] = useState<'match' | 'screening' | 'evaluation'>('match');

  const filteredStartups = startups.filter(s => {
    const q = searchQuery.toLowerCase();
    const nameMatch = s.name?.toLowerCase().includes(q);
    const taglineMatch = (s as any).tagline?.toLowerCase()?.includes(q) || s.matchExplanation?.toLowerCase()?.includes(q);
    const domainMatch = (s.domains || []).some(d => d.toLowerCase().includes(q));
    const capMatch = (s.capabilities || []).some(c => typeof c === 'string' && c.toLowerCase().includes(q));
    return nameMatch || taglineMatch || domainMatch || capMatch;
  });

  return (
    <div className="space-y-6">
      {/* 5-Step Stepper */}
      <WorkflowStepper />

      {/* Header & Sub-Tabs */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full mb-1">
              <Search className="w-3.5 h-3.5" />
              <span>Stage 2 of 5</span>
              <span>•</span>
              <span>DPIIT Startup Discovery & Screening</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              Evaluated Startups for Rural Water Contamination Challenge
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Verified DPIIT-recognized startups with field-deployable solutions screened under state procurement guidelines.
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl shrink-0 flex-wrap">
            <button
              onClick={() => setSelectedSubTab('match')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedSubTab === 'match'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              1. Matched ({startups.length})
            </button>
            <button
              onClick={() => setActiveTab('eligibility-screening')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 hover:text-gray-900 transition-all hover:bg-white/50 flex items-center gap-1"
            >
              <span>2. Eligibility Screening</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setActiveTab('expert-evaluation')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 hover:text-gray-900 transition-all hover:bg-white/50 flex items-center gap-1"
            >
              <span>3. Evaluator Scoring</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search startups by name, IoT tech, water sensors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#123B63] focus:bg-white"
          />
        </div>
      </div>

      {/* Startups Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStartups.map((startup) => {
          const isAquaSense = startup.id === 'ST-001';
          return (
            <div
              key={startup.id}
              className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isAquaSense
                  ? 'border-amber-300 ring-2 ring-amber-500/30 shadow-md bg-gradient-to-b from-amber-50/20 to-white'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-xs'
              }`}
            >
              <div>
                {/* Top Pill: Match Score */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    {isAquaSense ? <Droplets className="w-5 h-5 text-blue-600" /> : <Cpu className="w-5 h-5 text-gray-600" />}
                  </div>
                  {isAquaSense ? (
                    <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      94% Top Match
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-700 font-bold text-xs px-2.5 py-1 rounded-full">
                      81% Match
                    </span>
                  )}
                </div>

                {/* Startup Name */}
                <h3 className="text-base font-black text-gray-900 leading-tight">
                  {startup.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {(startup as any).city || startup.headquarters || 'Maharashtra'}
                  </span>
                  <span className="text-[10px] bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded">
                    DPIIT Verified
                  </span>
                </div>

                {/* 1-Line Tagline */}
                <p className="text-xs text-gray-600 mt-2.5 leading-relaxed font-medium line-clamp-2">
                  {(startup as any).tagline || startup.matchExplanation || (startup.capabilities && startup.capabilities[0]) || ''}
                </p>

                {/* Key Technology Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {(startup.domains || []).map((dom, i) => (
                    <span key={i} className="text-[10px] bg-gray-100 text-gray-700 font-bold px-2 py-0.5 rounded-md">
                      {dom}
                    </span>
                  ))}
                  <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded-md">
                    {(startup as any).trlStage || 'TRL 8 (Field Proven)'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setSelectedStartupId(startup.id);
                    setActiveTab('startup-profile');
                  }}
                  className="text-xs font-bold text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Profile
                </button>

                {isAquaSense ? (
                  <button
                    onClick={() => {
                      setActiveTab('pilot-command');
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <span>Selected for Live Test</span>
                    <FlaskConical className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedStartupId(startup.id);
                      setActiveTab('eligibility-screening');
                    }}
                    className="bg-[#123B63] hover:bg-[#1D5E8C] text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <span>Review Application</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
