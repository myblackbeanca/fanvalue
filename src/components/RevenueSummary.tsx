import React from 'react';
import { Download } from 'lucide-react';

interface Projection {
  month: number;
  newFans: number;
  totalFans: number;
  minySalesRevenue: number;
  minyFeeRevenue: number;
  subscriptionRevenue: number;
  minySubscriptionRevenue: number;
  eventRevenue: number;
  merchRevenue: number;
  artistTotalRevenue: number;
  minyTotalRevenue: number;
  totalRevenue: number;
}

interface RevenueSummaryProps {
  projections: Projection[];
}

const RevenueSummary: React.FC<RevenueSummaryProps> = ({ projections }) => {
  const yearOneProjections = projections.slice(0, 12);
  const yearTwoProjections = projections.slice(12);

  const calculateTotals = (data: Projection[]) => ({
    minySales: data.reduce((sum, p) => sum + p.minySalesRevenue, 0),
    minyFees: data.reduce((sum, p) => sum + p.minyFeeRevenue, 0),
    subscription: data.reduce((sum, p) => sum + p.subscriptionRevenue, 0),
    minySubscription: data.reduce((sum, p) => sum + p.minySubscriptionRevenue, 0),
    events: data.reduce((sum, p) => sum + p.eventRevenue, 0),
    merch: data.reduce((sum, p) => sum + p.merchRevenue, 0),
    artistTotal: data.reduce((sum, p) => sum + p.artistTotalRevenue, 0),
    minyTotal: data.reduce((sum, p) => sum + p.minyTotalRevenue, 0),
    total: data.reduce((sum, p) => sum + p.totalRevenue, 0),
  });

  const yearOneTotals = calculateTotals(yearOneProjections);
  const yearTwoTotals = calculateTotals(yearTwoProjections);

  const downloadCSV = () => {
    const headers = [
      'Month',
      'New Fans',
      'Total Fans',
      'MINY Sales Revenue (Artist)',
      'MINY Fee Revenue',
      'Subscription Revenue (Artist)',
      'Subscription Revenue (MINY)',
      'Event Revenue',
      'Merch Revenue',
      'Artist Total Revenue',
      'MINY Total Revenue',
      'Total Revenue'
    ];

    const rows = projections.map(p => [
      p.month,
      p.newFans,
      p.totalFans,
      p.minySalesRevenue,
      p.minyFeeRevenue,
      p.subscriptionRevenue,
      p.minySubscriptionRevenue,
      p.eventRevenue,
      p.merchRevenue,
      p.artistTotalRevenue,
      p.minyTotalRevenue,
      p.totalRevenue
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'miny_revenue_projections.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="revenue-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Revenue Summary</h2>
        <button
          onClick={downloadCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg
          hover:bg-indigo-700 transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          <span>Download CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[
          { title: 'Year 1', data: yearOneTotals },
          { title: 'Year 2', data: yearTwoTotals }
        ].map(({ title, data }) => (
          <div key={title} className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm text-gray-600">Artist Revenue</div>
                <div className="text-sm font-medium text-gray-900 text-right">
                  ${data.artistTotal.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">MINY Sales</div>
                <div className="text-xs text-gray-700 text-right">
                  ${data.minySales.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Subscription</div>
                <div className="text-xs text-gray-700 text-right">
                  ${data.subscription.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Events</div>
                <div className="text-xs text-gray-700 text-right">
                  ${data.events.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Merchandise</div>
                <div className="text-xs text-gray-700 text-right">
                  ${data.merch.toLocaleString()}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm text-gray-600">MINY Revenue</div>
                  <div className="text-sm font-medium text-gray-900 text-right">
                    ${data.minyTotal.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">MINY Fees</div>
                  <div className="text-xs text-gray-700 text-right">
                    ${data.minyFees.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Subscription Share</div>
                  <div className="text-xs text-gray-700 text-right">
                    ${data.minySubscription.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm font-semibold text-gray-900">Total Revenue</div>
                  <div className="text-sm font-bold text-indigo-600 text-right">
                    ${data.total.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueSummary;