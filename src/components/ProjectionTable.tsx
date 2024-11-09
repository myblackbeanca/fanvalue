import React from 'react';

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

interface ProjectionTableProps {
  projections: Projection[];
}

const ProjectionTable: React.FC<ProjectionTableProps> = ({ projections }) => {
  if (!projections || projections.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Projections</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Fans</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fans</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MINY Sales</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merch</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projections.map((projection) => (
            <tr key={projection.month} className={projection.totalFans >= 1000 ? 'bg-green-50' : ''}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{projection.month}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{projection.newFans}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{projection.totalFans}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${projection.minySalesRevenue}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${projection.subscriptionRevenue}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${projection.eventRevenue}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${projection.merchRevenue}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${projection.totalRevenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectionTable;