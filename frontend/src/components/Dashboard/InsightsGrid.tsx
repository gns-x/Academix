import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const insights = [
  {
    title: 'Finance Overview',
    stats: [
      { label: 'Total Balance', value: '62,166,920.00', icon: DollarSign, trend: '+5%', color: 'text-green-500' },
      { label: 'Paid Amount', value: '49,331,405.83', icon: TrendingUp, trend: '+12%', color: 'text-green-500' },
      { label: 'Outstanding', value: '12,835,514.17', icon: TrendingDown, trend: '-20.7%', color: 'text-red-500' },
    ],
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Attendance Statistics',
    stats: [
      { label: 'Present Today', value: '92%', trend: '+3%', color: 'text-green-500' },
      { label: 'Late Arrivals', value: '5%', trend: '-2%', color: 'text-blue-500' },
      { label: 'Absences', value: '3%', trend: '-1%', color: 'text-red-500' },
    ],
    color: 'from-purple-500 to-pink-600',
  },
];

export const InsightsGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {insights.map((insight, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className={`bg-gradient-to-r ${insight.color} px-6 py-4`}>
            <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {insight.stats.map((stat, statIdx) => (
                <div key={statIdx} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  <div className={`text-xs font-medium ${stat.color} mt-1`}>{stat.trend}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
