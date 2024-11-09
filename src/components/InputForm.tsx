import React from 'react';
import { Users, DollarSign, Ticket, ShoppingBag, Percent } from 'lucide-react';

interface MonthlyData {
  fans: number;
  eventsPerMonth: number;
  ticketPrice: number;
  merchDropsPerMonth: number;
  merchPrice: number;
}

interface GlobalParams {
  salePrice: number;
  churnRate: number;
}

interface InputFormProps {
  monthlyData: MonthlyData[];
  globalParams: GlobalParams;
  setMonthlyData: (data: MonthlyData[]) => void;
  setGlobalParams: (params: GlobalParams) => void;
}

const InputForm: React.FC<InputFormProps> = ({ 
  monthlyData, 
  globalParams, 
  setMonthlyData, 
  setGlobalParams 
}) => {
  const handleDataChange = (month: number, field: keyof MonthlyData, value: number) => {
    const newData = [...monthlyData];
    newData[month] = { ...newData[month], [field]: value };
    setMonthlyData(newData);
  };

  return (
    <div className="space-y-8">
      <div className="revenue-card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Global Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm text-gray-600 mb-1">
              <DollarSign className="w-4 h-4 mr-2" />
              MINY Sale Price ($)
            </label>
            <input
              type="number"
              value={globalParams.salePrice}
              onChange={(e) => setGlobalParams({
                ...globalParams,
                salePrice: Number(e.target.value)
              })}
              className="form-input"
              min="4.99"
              step="0.01"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum: $4.99 (MINY Fee)</p>
          </div>

          <div>
            <label className="flex items-center text-sm text-gray-600 mb-1">
              <Percent className="w-4 h-4 mr-2" />
              Monthly Churn Rate (%)
            </label>
            <input
              type="number"
              value={globalParams.churnRate}
              onChange={(e) => setGlobalParams({
                ...globalParams,
                churnRate: Number(e.target.value)
              })}
              className="form-input"
              min="0"
              max="100"
              step="0.1"
            />
            <p className="text-xs text-gray-500 mt-1">Industry average: 5%</p>
          </div>
        </div>
      </div>

      <div className="revenue-card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Growth Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {monthlyData.map((data, month) => (
            <div key={month} className="glass-card rounded-xl p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Month {month + 1}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center text-sm text-gray-600 mb-1">
                    <Users className="w-4 h-4 mr-2" />
                    New Fans
                  </label>
                  <input
                    type="number"
                    value={data.fans}
                    onChange={(e) => handleDataChange(month, 'fans', Number(e.target.value))}
                    className="form-input"
                    min="0"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm text-gray-600 mb-1">
                    <Ticket className="w-4 h-4 mr-2" />
                    Events This Month
                  </label>
                  <input
                    type="number"
                    value={data.eventsPerMonth}
                    onChange={(e) => handleDataChange(month, 'eventsPerMonth', Number(e.target.value))}
                    className="form-input"
                    min="0"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm text-gray-600 mb-1">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Ticket Price ($)
                  </label>
                  <input
                    type="number"
                    value={data.ticketPrice}
                    onChange={(e) => handleDataChange(month, 'ticketPrice', Number(e.target.value))}
                    className="form-input"
                    min="0"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm text-gray-600 mb-1">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Merch Drops
                  </label>
                  <input
                    type="number"
                    value={data.merchDropsPerMonth}
                    onChange={(e) => handleDataChange(month, 'merchDropsPerMonth', Number(e.target.value))}
                    className="form-input"
                    min="0"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm text-gray-600 mb-1">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Merch Price ($)
                  </label>
                  <input
                    type="number"
                    value={data.merchPrice}
                    onChange={(e) => handleDataChange(month, 'merchPrice', Number(e.target.value))}
                    className="form-input"
                    min="0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputForm;