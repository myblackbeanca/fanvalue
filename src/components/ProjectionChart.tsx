import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Projection {
  month: number;
  newFans: number;
  totalFans: number;
  minySalesRevenue: number;
  subscriptionRevenue: number;
  eventRevenue: number;
  merchRevenue: number;
  totalRevenue: number;
}

interface ProjectionChartProps {
  projections: Projection[];
}

const ProjectionChart: React.FC<ProjectionChartProps> = ({ projections }) => {
  if (!projections || projections.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Projections</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projections}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
            <YAxis yAxisId="left" label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Fans', angle: 90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="minySalesRevenue"
              name="MINY Sales"
              stroke="#8884d8"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="subscriptionRevenue"
              name="Subscription"
              stroke="#82ca9d"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="eventRevenue"
              name="Events"
              stroke="#ffc658"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="merchRevenue"
              name="Merch"
              stroke="#ff7300"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalFans"
              name="Total Fans"
              stroke="#ff0000"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectionChart;