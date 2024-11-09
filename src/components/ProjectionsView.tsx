import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ProjectionChart from './ProjectionChart';
import MonthlyCards from './MonthlyCards';
import RevenuePieChart from './RevenuePieChart';
import RevenueSummary from './RevenueSummary';
import FanMetrics from './FanMetrics';

interface ProjectionsViewProps {
  projections: any[];
  onBack: () => void;
}

const ProjectionsView: React.FC<ProjectionsViewProps> = ({ projections, onBack }) => {
  const annualRevenue = {
    sales: projections.slice(0, 12).reduce((sum, p) => sum + p.minySalesRevenue, 0),
    exclusive: projections.slice(0, 12).reduce((sum, p) => sum + p.subscriptionRevenue, 0),
    events: projections.slice(0, 12).reduce((sum, p) => sum + p.eventRevenue, 0),
    merch: projections.slice(0, 12).reduce((sum, p) => sum + p.merchRevenue, 0)
  };

  const latestMetrics = projections[projections.length - 1];

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Parameters</span>
        </button>
      </div>

      <FanMetrics
        totalConnectedFans={latestMetrics.totalConnectedFans}
        totalChurnedFans={latestMetrics.totalChurnedFans}
        retainedFans={latestMetrics.retainedFans}
      />

      <RevenueSummary projections={projections} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="revenue-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Overview</h2>
          <ProjectionChart projections={projections} />
        </div>
        <div className="revenue-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Distribution</h2>
          <RevenuePieChart data={annualRevenue} />
        </div>
      </div>

      <MonthlyCards projections={projections} />
    </div>
  );
};

export default ProjectionsView;