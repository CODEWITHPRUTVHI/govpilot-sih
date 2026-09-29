import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  Award, 
  Building2, 
  MapPin, 
  Users 
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const AnalyticsView: React.FC = () => {
  const { challenges, pilots, applications } = useApp();

  const deptMetrics = [
    { name: 'Water Supply & Sanitation', challenges: 8, pilots: 5, scaled: 3, budget: '₹4.8 Cr' },
    { name: 'Public Health Department', challenges: 6, pilots: 4, scaled: 2, budget: '₹3.6 Cr' },
    { name: 'Agriculture & Horticulture', challenges: 5, pilots: 3, scaled: 2, budget: '₹2.9 Cr' },
    { name: 'Urban Development & Smart Cities', challenges: 7, pilots: 4, scaled: 3, budget: '₹5.2 Cr' },
    { name: 'Energy & New Renewable Energy', challenges: 4, pilots: 2, scaled: 1, budget: '₹2.1 Cr' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#D9E0E7] rounded-md p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2F6F95] uppercase tracking-wider">
              State Innovation Intelligence
            </span>
            <Badge variant="success" size="sm">GovPilot Analytics Engine</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            Procurement & Innovation Impact Analytics
          </h1>
          <p className="text-xs text-[#66727E] mt-1 leading-relaxed">
            Statewide aggregate metrics measuring cycle time compression, pilot-to-scale conversion rate, and net treasury savings.
          </p>
        </div>
      </div>

      {/* Top Impact KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="gov-card p-4 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#66727E] uppercase font-bold text-[10.5px]">Avg Time-to-Pilot</span>
            <Clock className="w-4 h-4 text-[#2F6F95]" />
          </div>
          <div className="text-2xl font-bold text-[#123B63]">48 Days</div>
          <div className="text-[11px] text-[#287D4A] font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>88% faster than 14.2-mo legacy tender</span>
          </div>
        </div>

        <div className="gov-card p-4 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#66727E] uppercase font-bold text-[10.5px]">Pilot-to-Scale Conversion</span>
            <Award className="w-4 h-4 text-[#287D4A]" />
          </div>
          <div className="text-2xl font-bold text-[#287D4A]">68.4%</div>
          <p className="text-[11px] text-[#66727E]">vs 8.1% legacy pilot conversion</p>
        </div>

        <div className="gov-card p-4 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#66727E] uppercase font-bold text-[10.5px]">Net State Savings</span>
            <IndianRupee className="w-4 h-4 text-[#123B63]" />
          </div>
          <div className="text-2xl font-bold text-[#123B63]">₹14.8 Crore</div>
          <p className="text-[11px] text-[#287D4A] font-medium">Realized recurring opex reduction</p>
        </div>

        <div className="gov-card p-4 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#66727E] uppercase font-bold text-[10.5px]">Startup Inclusivity</span>
            <Users className="w-4 h-4 text-[#123B63]" />
          </div>
          <div className="text-2xl font-bold text-[#123B63]">91.2%</div>
          <p className="text-[11px] text-[#66727E]">First-time public vendors</p>
        </div>
      </div>

      {/* Department Breakdown Table */}
      <div className="gov-card p-5 space-y-4">
        <h3 className="text-sm font-bold text-[#123B63] uppercase tracking-wider">
          Innovation Adoption by Maharashtra Government Departments
        </h3>

        <div className="overflow-hidden border border-[#D9E0E7] rounded">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Structured Challenges</th>
                <th>Active Pilots</th>
                <th>Scaled Solutions</th>
                <th>Sanctioned Budget</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {deptMetrics.map((dm, idx) => (
                <tr key={idx}>
                  <td className="font-bold text-xs text-[#123B63]">{dm.name}</td>
                  <td className="text-xs font-semibold text-[#17212B]">{dm.challenges}</td>
                  <td className="text-xs font-semibold text-[#2F6F95]">{dm.pilots}</td>
                  <td className="text-xs font-bold text-[#287D4A]">{dm.scaled}</td>
                  <td className="text-xs font-bold text-[#123B63]">{dm.budget}</td>
                  <td>
                    <Badge variant="success" size="sm">ACTIVE</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
