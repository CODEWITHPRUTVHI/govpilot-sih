import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Challenge } from '../types';
import { 
  Target, 
  Plus, 
  Search, 
  ChevronRight, 
  Building2, 
  MapPin, 
  IndianRupee, 
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users
} from 'lucide-react';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Badge } from '../components/common/Badge';

export const ChallengesView: React.FC = () => {
  const { challenges, setActiveTab, setSelectedChallengeId } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [themeFilter, setThemeFilter] = useState('ALL');

  const filteredChallenges = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
                          c.challengeCode.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesTheme = themeFilter === 'ALL' || c.theme === themeFilter;
    return matchesSearch && matchesTheme;
  });

  const getThemeEmoji = (theme: string) => {
    if (!theme) return '💡';
    const t = theme.toUpperCase();
    if (t.includes('WATER')) return '💧';
    if (t.includes('AGRI')) return '🌾';
    if (t.includes('HEALTH')) return '🏥';
    if (t.includes('URBAN') || t.includes('MOBILITY')) return '🚌';
    if (t.includes('EDU')) return '🎓';
    return '💡';
  };

  return (
    <div className="space-y-6">
      {/* 5-Step Stepper */}
      <WorkflowStepper />

      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full mb-1">
            <span>🎯 Step 1 of 5</span>
            <span>•</span>
            <span>Problem Definition</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            Problems Waiting for Startup Solutions
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Government departments post clear challenges with targets (e.g. speed, cost, accuracy).
          </p>
        </div>

        <button
          onClick={() => setActiveTab('create-challenge')}
          className="bg-[#123B63] hover:bg-[#1D5E8C] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post a New Problem</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setThemeFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              themeFilter === 'ALL'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            All Problems ({challenges.length})
          </button>
          <button
            onClick={() => setThemeFilter('WATER_SANITATION')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
              themeFilter === 'WATER_SANITATION'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50'
            }`}
          >
            <span>💧 Water & Sanitation</span>
          </button>
          <button
            onClick={() => setThemeFilter('AGRICULTURE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
              themeFilter === 'AGRICULTURE'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-emerald-50'
            }`}
          >
            <span>🌾 Agriculture</span>
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-white text-xs pl-9 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#123B63]"
          />
        </div>
      </div>

      {/* Visual Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChallenges.map((challenge) => {
          const isPrimary = challenge.challengeCode === 'CH-MH-2026-014';
          return (
            <div
              key={challenge.id}
              className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isPrimary 
                  ? 'border-blue-300 ring-2 ring-blue-500/20 shadow-md' 
                  : 'border-gray-200 hover:border-blue-200 hover:shadow-xs'
              }`}
            >
              <div>
                {/* Card Top Pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getThemeEmoji(challenge.theme)}</span>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {challenge.challengeCode}
                      </span>
                      <div className="text-[11px] font-bold text-gray-600 truncate max-w-[200px]">
                        {challenge.department}
                      </div>
                    </div>
                  </div>

                  {isPrimary ? (
                    <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping"></span>
                      Active 90-Day Test
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Open for Applications
                    </span>
                  )}
                </div>

                {/* Challenge Title */}
                <h3 className="text-base font-extrabold text-gray-900 leading-snug">
                  {challenge.title}
                </h3>

                {/* Problem in 1 Sentence */}
                <p className="text-xs text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {challenge.problemStatement}
                </p>

                {/* Target Metrics Pill Boxes */}
                <div className="grid grid-cols-2 gap-2 mt-4 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Target Goal</div>
                    <div className="text-xs font-bold text-emerald-700 mt-0.5 line-clamp-1">
                      {(challenge as any).targetOutcomeMetric || challenge.expectedOutcome || 'Faster & Cheaper'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Pilot Budget</div>
                    <div className="text-xs font-bold text-gray-900 mt-0.5">
                      ₹{(((challenge.pilotBudget || (challenge as any).pilotBudgetINR || 1500000)) / 100000).toFixed(1)} Lakhs
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                <div className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>
                    {challenge.district || 
                     (Array.isArray((challenge as any).districts) ? (challenge as any).districts.join(', ') : 'Maharashtra')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedChallengeId(challenge.id);
                      setActiveTab('challenge-detail');
                    }}
                    className="text-xs font-bold text-gray-700 hover:text-[#123B63] px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setSelectedChallengeId(challenge.id);
                      setActiveTab('startup-discovery');
                    }}
                    className="bg-[#123B63] hover:bg-[#1D5E8C] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <span>Match Startups</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
