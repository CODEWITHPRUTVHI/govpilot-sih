import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calculator, 
  IndianRupee, 
  Users, 
  TrendingUp, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  Sliders
} from 'lucide-react';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Badge } from '../components/common/Badge';

export const ScaleSimulatorView: React.FC = () => {
  const { setActiveTab } = useApp();

  // Simulator Inputs
  const [districtsCount, setDistrictsCount] = useState<number>(12);
  const [tanksPerDistrict, setTanksPerDistrict] = useState<number>(200);

  // Derived Calculations
  const totalTanks = districtsCount * tanksPerDistrict;
  const populationServed = totalTanks * 2150; 
  const annualBaselineCost = totalTanks * 450 * 12; // Old way: ₹450 / mo
  const annualStartupCost = totalTanks * 270 * 12;  // Startup way: ₹270 / mo
  const annualSavingsINR = annualBaselineCost - annualStartupCost;
  const savingsCrores = (annualSavingsINR / 10000000).toFixed(2);
  const paybackMonths = 14;

  const handleReset = () => {
    setDistrictsCount(12);
    setTanksPerDistrict(200);
  };

  return (
    <div className="space-y-6">
      {/* 5-Step Stepper */}
      <WorkflowStepper />

      {/* Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-900 text-xs font-bold px-2.5 py-1 rounded-full mb-1">
              <Sliders className="w-3.5 h-3.5" />
              <span>Public Exchequer Scale Simulator</span>
              <span>•</span>
              <span>Financial Impact Model</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              Statewide Scale & Fiscal Savings Projections
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Simulate recurring expenditure savings and beneficiary coverage across Maharashtra's 36 districts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={() => setActiveTab('scale-decision')}
              className="bg-[#123B63] hover:bg-[#1D5E8C] text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
            >
              <span>Back to Scale Decision</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Big Live Result Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Savings Card */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-5 rounded-2xl shadow-md">
          <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">
            Total Money Saved Every Year
          </div>
          <div className="text-3xl sm:text-4xl font-black mt-1">
            ₹{savingsCrores} Crore
          </div>
          <div className="text-xs text-emerald-100 font-bold mt-1">
            Payback in {paybackMonths} Months
          </div>
        </div>

        {/* Tanks Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
            Active Village Tanks
          </div>
          <div className="text-3xl sm:text-4xl font-black text-gray-900 mt-1">
            {totalTanks.toLocaleString()}
          </div>
          <div className="text-xs text-blue-700 font-bold mt-1">
            Across {districtsCount} Districts
          </div>
        </div>

        {/* Citizens Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
            Citizens Protected
          </div>
          <div className="text-3xl sm:text-4xl font-black text-gray-900 mt-1">
            {(populationServed / 100000).toFixed(2)} Lakh
          </div>
          <div className="text-xs text-purple-700 font-bold mt-1">
            Clean drinking water 24/7
          </div>
        </div>
      </div>

      {/* Sliders Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <h2 className="text-base font-black text-gray-900 mb-6 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-600" />
          <span>Adjust District Deployment Parameters</span>
        </h2>

        <div className="space-y-6 max-w-3xl">
          {/* Slider 1 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-800">
                Number of Districts in Maharashtra
              </label>
              <span className="text-sm font-black text-[#123B63] bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                {districtsCount} Districts (out of 36)
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={36}
              step={1}
              value={districtsCount}
              onChange={(e) => setDistrictsCount(parseInt(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#123B63]"
            />
            <div className="flex justify-between text-[11px] text-gray-400 font-semibold">
              <span>1 District (Pilot)</span>
              <span>12 Districts (Approved Phase 1)</span>
              <span>36 Districts (All Maharashtra)</span>
            </div>
          </div>

          {/* Slider 2 */}
          <div className="space-y-2 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-800">
                Tanks Monitored per District
              </label>
              <span className="text-sm font-black text-[#123B63] bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                {tanksPerDistrict} Village Tanks
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={500}
              step={25}
              value={tanksPerDistrict}
              onChange={(e) => setTanksPerDistrict(parseInt(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#123B63]"
            />
            <div className="flex justify-between text-[11px] text-gray-400 font-semibold">
              <span>50 Tanks</span>
              <span>200 Tanks (Standard)</span>
              <span>500 Tanks (Max)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
