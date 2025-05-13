import React from 'react';
import { ChevronDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface FinancialInsightsProps {
  showInsights: boolean;
  setShowInsights: (show: boolean) => void;
  insights: any[];
}

export const FinancialInsights: React.FC<FinancialInsightsProps> = ({
  showInsights,
  setShowInsights,
  insights,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setShowInsights(!showInsights)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Financial Insights</h3>
          <p className="text-sm text-gray-500">
            View detailed analytics and trends
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transform transition-transform ${
            showInsights ? 'rotate-180' : ''
          }`}
        />
      </button>

      {showInsights && (
        <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((section, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-xl p-4 space-y-4"
            >
              <h4 className="font-medium text-gray-900">{section.title}</h4>
              {section.stats.map((stat, statIdx) => (
                <div
                  key={statIdx}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-600">{stat.label}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {stat.value}
                    </span>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500 ml-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500 ml-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
