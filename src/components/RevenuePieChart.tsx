import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface RevenuePieChartProps {
  data: {
    sales: number;
    exclusive: number;
    events: number;
    merch: number;
  };
}

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EC4899'];

const RevenuePieChart: React.FC<RevenuePieChartProps> = ({ data }) => {
  const chartData = [
    { name: 'MINY Sales', value: data.sales },
    { name: 'MINY Exclusive', value: data.exclusive },
    { name: 'Events', value: data.events },
    { name: 'Merchandise', value: data.merch },
  ];

  const formatCurrency = (value: number) => 
    value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const total = Object.values(data).reduce((sum, value) => sum + value, 0);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div className="h-[300px]">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500">Total Annual Revenue</p>
        <p className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [formatCurrency(value), 'Revenue']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenuePieChart;