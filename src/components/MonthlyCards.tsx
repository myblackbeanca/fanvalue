import React from 'react';
import { DollarSign, Users, Ticket, ShoppingBag, Crown, TrendingUp } from 'lucide-react';

interface Projection {
  month: number;
  newFans: number;
  totalFans: number;
  minySalesRevenue: number;
  subscriptionRevenue: number;
  eventRevenue: number;
  merchRevenue: number;
  totalRevenue: number;
  isPrediction: boolean;
}

interface MonthlyCardsProps {
  projections: Projection[];
}

const MonthlyCards: React.FC<MonthlyCardsProps> = ({ projections }) => {
  const totalRevenue = projections.reduce((sum, p) => sum + p.totalRevenue, 0);
  const firstThousandFansMonth = projections.findIndex(p => p.totalFans >= 1000) + 1;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Monthly Projections</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Projected Revenue</p>
          <p className="text-2xl font-bold text-indigo-600">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projections.map((projection) => (
          <div
            key={projection.month}
            className={`revenue-card ${
              projection.totalFans >= 1000 ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200' : ''
            } ${projection.month === firstThousandFansMonth ? 'ring-2 ring-green-500' : ''}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Month {projection.month}
                  {projection.isPrediction && 
                    <span className="ml-2 text-xs text-indigo-600">(Year {Math.ceil(projection.month / 12)})</span>
                  }
                </h3>
                {projection.month === firstThousandFansMonth && (
                  <span className="text-xs text-green-600 font-medium">🎉 1000 Fans Milestone!</span>
                )}
              </div>
              {projection.totalFans >= 1000 && (
                <Crown className="w-6 h-6 text-indigo-600" />
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Fans</span>
                </div>
                <span className="font-medium text-gray-900">
                  +{projection.newFans} new / {projection.totalFans.toLocaleString()} total
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span>MINY Sales</span>
                </div>
                <span className="font-medium text-gray-900">
                  ${projection.minySalesRevenue.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Crown className="w-5 h-5 mr-2" />
                  <span>Exclusive</span>
                </div>
                <span className="font-medium text-gray-900">
                  ${projection.subscriptionRevenue.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Ticket className="w-5 h-5 mr-2" />
                  <span>Events</span>
                </div>
                <span className="font-medium text-gray-900">
                  ${projection.eventRevenue.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  <span>Merch</span>
                </div>
                <span className="font-medium text-gray-900">
                  ${projection.merchRevenue.toLocaleString()}
                </span>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Total Revenue</span>
                  <span className="font-bold text-indigo-600">
                    ${projection.totalRevenue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyCards;