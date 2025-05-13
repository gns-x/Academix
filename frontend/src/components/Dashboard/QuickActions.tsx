import React from 'react';
import { Calendar, DollarSign, LineChart, Users } from 'lucide-react';

interface QuickAction {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export function QuickActions() {
  const quickActions: QuickAction[] = [
    {
      id: '1',
      name: 'Add Student',
      description: 'Register a new student',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Schedule Class',
      description: 'Create or modify schedules',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      id: '3',
      name: 'Fee Collection',
      description: 'Manage student fees',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      id: '4',
      name: 'Academic Reports',
      description: 'View & generate reports',
      icon: <LineChart className="w-6 h-6" />,
      color: 'bg-orange-500'
    }
  ];

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 group"
          >
            <div className={`w-12 h-12 rounded-lg ${action.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              {action.icon}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">{action.name}</h3>
              <p className="text-sm text-gray-500">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
