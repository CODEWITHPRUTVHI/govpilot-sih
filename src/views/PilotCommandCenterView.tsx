import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FlaskConical, 
  Activity, 
  MapPin, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight,
  RefreshCw,
  Zap,
  ShieldCheck,
  Radio,
  FileCheck2
} from 'lucide-react';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Badge } from '../components/common/Badge';

export const PilotCommandCenterView: React.FC = () => {
  const { pilots, selectedPilotId, setActiveTab } = useApp();

  const pilot = pilots.find(p => p.id === selectedPilotId) || pilots[0];
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTank, setSelectedTank] = useState<'all' | 'alert'>('all');

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <div className="space-y-6">
      {/* 5-Step Stepper */}
      <WorkflowStepper />

      {/* Main Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-900 text-xs font-bold px-2.5 py-1 rounded-full mb-1">
              <span>🧪 Step 3 of 5</span>
              <span>•</span>
              <span>Live Village Testing</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              Live Test: AquaSense Sensors in 50 Village Tanks
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Testing smart water sensors in Solapur district villages for 90 days.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Syncing...' : 'Sync Data'}</span>
            </button>
            <button
              onClick={() => setActiveTab('baseline-outcome')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
            >
              <span>See Proof (Step 4)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 90-Day Test Progress Bar */}
        <div className="mt-5 p-4 bg-purple-50/60 rounded-xl border border-purple-100">
          <div className="flex items-center justify-between text-xs font-bold text-purple-950 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-700" />
              Test Duration: Day 68 of 90 (75% Done)
            </span>
            <span className="bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full text-[11px]">
              22 Days Remaining
            </span>
          </div>
          <div className="w-full bg-purple-200 h-3 rounded-full overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full transition-all" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      {/* 4 Live Sensor Status Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-[11px] font-bold text-gray-400 uppercase">Detection Speed</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">18 mins</div>
          <div className="text-[11px] text-gray-500 font-medium mt-0.5">Target was &lt;24 hours</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-[11px] font-bold text-gray-400 uppercase">Active Water Tanks</div>
          <div className="text-2xl font-black text-gray-900 mt-1">50 / 50</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-0.5">100% Sensors Online</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-[11px] font-bold text-gray-400 uppercase">Cost Per Village Test</div>
          <div className="text-2xl font-black text-blue-600 mt-1">₹270</div>
          <div className="text-[11px] text-gray-500 font-medium mt-0.5">Old cost was ₹450</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-[11px] font-bold text-gray-400 uppercase">Lab Verification</div>
          <div className="text-2xl font-black text-purple-600 mt-1">98.4% Match</div>
          <div className="text-[11px] text-purple-700 font-bold mt-0.5">CWPRS Pune Certified</div>
        </div>
      </div>

      {/* Live Village Tanks Matrix */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>Live Village Tank Sensors (Solapur District)</span>
            </h2>
            <p className="text-xs text-gray-500">
              Sensors transmit water purity data every 10 minutes over GSM IoT mesh.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">46 Normal 🟢</span>
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">3 Warning 🟡</span>
            <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">1 Auto-Alert 🔴</span>
          </div>
        </div>

        {/* Highlighted Alert Box */}
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚨</div>
            <div>
              <div className="text-xs font-black text-rose-900">
                Automatic Contamination Alert Triggered: Village Borgaon Tank #4
              </div>
              <div className="text-[11px] text-rose-700 font-medium mt-0.5">
                Turbidity spiked to 7.4 NTU. Auto-alert sent to Gram Sevak in 28 seconds. Inlet valve locked automatically.
              </div>
            </div>
          </div>
          <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0">
            Water Safe (Valve Locked)
          </span>
        </div>

        {/* Milestone Payment Tranches */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs font-black text-gray-900 uppercase tracking-wide mb-3 flex items-center justify-between">
            <span>4 Pilot Payment Stages (Pay Only When Milestones Pass)</span>
            <span className="text-emerald-700 font-bold">Total Budget: ₹14.2 Lakhs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-emerald-800">Stage 1 (Day 15)</span>
                <span className="text-xs font-bold text-emerald-700">✅ Paid ₹4.2L</span>
              </div>
              <div className="text-xs font-extrabold text-gray-900 mt-1">50 Sensors Installed</div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-emerald-800">Stage 2 (Day 30)</span>
                <span className="text-xs font-bold text-emerald-700">✅ Paid ₹3.5L</span>
              </div>
              <div className="text-xs font-extrabold text-gray-900 mt-1">Cloud Mesh Connected</div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-emerald-800">Stage 3 (Day 60)</span>
                <span className="text-xs font-bold text-emerald-700">✅ Paid ₹3.5L</span>
              </div>
              <div className="text-xs font-extrabold text-gray-900 mt-1">NABL Lab Correlation</div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-blue-800">Stage 4 (Day 90)</span>
                <span className="text-xs font-bold text-blue-700">⏳ ₹3.0L Final</span>
              </div>
              <div className="text-xs font-extrabold text-gray-900 mt-1">Final Statewide Report</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
