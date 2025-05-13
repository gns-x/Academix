import React from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ChevronRight
} from 'lucide-react';

interface Stat {
  name: string;
  value: string;
  icon: string;
  trend: string;
  color: string;
}

interface StatsGridProps {
  stats: Stat[];
}

const statConfigs = {
  'Total Students': {
    icon: Users,
    color: 'from-blue-600 to-blue-400',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    trend: '+12.5%',
    description: 'Active enrollments'
  },
  'Total Teachers': {
    icon: GraduationCap,
    color: 'from-emerald-600 to-emerald-400',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    trend: '+4.3%',
    description: 'Teaching staff'
  },
  'Active Courses': {
    icon: BookOpen,
    color: 'from-violet-600 to-violet-400',
    lightColor: 'bg-violet-50',
    textColor: 'text-violet-600',
    trend: '+8.7%',
    description: 'Running programs'
  },
  'Revenue': {
    icon: DollarSign,
    color: 'from-amber-600 to-amber-400',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    trend: '+15.3%',
    description: 'Monthly earnings'
  },
};

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const config = statConfigs[stat.name as keyof typeof statConfigs] || {
          icon: DollarSign,
          color: 'from-gray-600 to-gray-400',
          lightColor: 'bg-gray-50',
          textColor: 'text-gray-600',
          trend: '+0%',
          description: 'No description'
        };
        const isUp = config.trend.startsWith('+');

        return (
          <div key={stat.name} className="group relative">
            <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${config.lightColor}`}>
                    <config.icon className={`h-6 w-6 ${config.textColor}`} />
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </h3>
                    <div
                      className={`flex items-center ${
                        isUp ? 'text-emerald-600' : 'text-rose-600'
                      } text-sm font-medium`}
                    >
                      {isUp ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {config.trend}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {config.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${config.color} transition-all duration-500`}
                      style={{
                        width: `${Math.random() * 40 + 60}%`,
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
