import React from 'react';
import { Users, UserMinus, UserPlus } from 'lucide-react';

interface FanMetricsProps {
  totalConnectedFans: number;
  totalChurnedFans: number;
  retainedFans: number;
}

const FanMetrics: React.FC<FanMetricsProps> = ({
  totalConnectedFans,
  totalChurnedFans,
  retainedFans
}) => {
  return (
    <div className="revenue-card">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Fan Engagement Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <UserPlus className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">{totalConnectedFans}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Connected Fans</h3>
          <p className="text-xs text-gray-500 mt-1">All-time fan connections</p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-indigo-500" />
            <span className="text-2xl font-bold text-gray-900">{retainedFans}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Active Fans</h3>
          <p className="text-xs text-gray-500 mt-1">Currently engaged fans</p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <UserMinus className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">{totalChurnedFans}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Churned Fans</h3>
          <p className="text-xs text-gray-500 mt-1">Lost fan connections</p>
        </div>
      </div>
    </div>
  );
};

export default FanMetrics;