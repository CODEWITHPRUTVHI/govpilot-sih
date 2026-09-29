import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  CheckCircle2, 
  IndianRupee, 
  Building2, 
  FileText, 
  Calculator, 
  Download, 
  ShieldCheck,
  Check,
  Sparkles,
  MapPin
} from 'lucide-react';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Badge } from '../components/common/Badge';

export const ScaleDecisionView: React.FC = () => {
  const { setActiveTab } = useApp();
  const [approved, setApproved] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const districts = [
    'Amravati', 'Solapur', 'Nashik', 'Satara', 'Aurangabad', 'Nanded',
    'Yavatmal', 'Chandrapur', 'Dhule', 'Jalgaon', 'Kolhapur', 'Sangli'
  ];

  return (
    <div className="space-y-6">
      {/* 5-Step Stepper */}
      <WorkflowStepper />

      {/* Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-900 text-xs font-bold px-2.5 py-1 rounded-full mb-1">
              <span>🏛️ Step 5 of 5</span>
              <span>•</span>
              <span>Statewide Scale & Buying</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              Approved: Scaling AquaSense to 12 Districts
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Because the 90-day village test passed, the government is expanding from 50 tanks to 2,400 village tanks!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('scale-simulator')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Savings Simulator</span>
            </button>
            <button
              onClick={() => setActiveTab('procurement-pathway')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Building2 className="w-4 h-4" />
              <span>Buy on GeM Portal ➔</span>
            </button>
          </div>
        </div>
      </div>

      {/* Big Visual Scale Summary Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl font-bold shrink-0">
            💰
          </div>
          <div>
            <div className="text-[11px] font-bold text-gray-400 uppercase">Annual Money Saved</div>
            <div className="text-2xl font-black text-gray-900 mt-0.5">₹1.54 Crore / yr</div>
            <div className="text-xs font-bold text-emerald-700 mt-0.5">Payback in 14 Months</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold shrink-0">
            🏘️
          </div>
          <div>
            <div className="text-[11px] font-bold text-gray-400 uppercase">Gram Panchayats (Villages)</div>
            <div className="text-2xl font-black text-gray-900 mt-0.5">2,400 Tanks</div>
            <div className="text-xs font-bold text-blue-700 mt-0.5">Across 12 Priority Districts</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl font-bold shrink-0">
            👨‍👩‍👧‍👦
          </div>
          <div>
            <div className="text-[11px] font-bold text-gray-400 uppercase">Citizens Protected</div>
            <div className="text-2xl font-black text-gray-900 mt-0.5">1.92 Million</div>
            <div className="text-xs font-bold text-purple-700 mt-0.5">Clean Water Guaranteed</div>
          </div>
        </div>
      </div>

      {/* 12 Districts Map & Approval Order Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
            <span>📍 12 Districts Approved for Phase 1 Expansion</span>
          </h3>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
            Ready for Purchase Order
          </span>
        </div>

        {/* District Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-6">
          {districts.map((d, i) => (
            <div
              key={d}
              className="bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-xl p-2.5 text-center transition-colors"
            >
              <div className="text-xs font-black text-gray-900">{d}</div>
              <div className="text-[10px] text-gray-500 font-medium mt-0.5">200 Tanks</div>
            </div>
          ))}
        </div>

        {/* Official Sign-off Box */}
        <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✍️</div>
            <div>
              <div className="text-xs font-black text-[#123B63]">
                Joint Secretary Official Order #GOM-WSSD-SCALE-2026-014
              </div>
              <div className="text-[11px] text-gray-600 mt-0.5">
                Authorized under Maharashtra Public Procurement Rules (Innovation Clause 14B for verified pilots).
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('documents')}
            className="bg-[#123B63] hover:bg-[#1D5E8C] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shrink-0 shadow-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download Order Doc</span>
          </button>
        </div>
      </div>
    </div>
  );
};
