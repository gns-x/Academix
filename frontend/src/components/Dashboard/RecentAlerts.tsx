import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'error';
  message: string;
  time: string;
}

export function RecentAlerts() {
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      message: 'Low attendance in Grade 10-A today',
      time: '10 minutes ago'
    },
    {
      id: '2',
      type: 'info',
      message: 'New curriculum update available',
      time: '1 hour ago'
    },
    {
      id: '3',
      type: 'error',
      message: 'Server maintenance scheduled',
      time: '2 hours ago'
    }
  ];

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h2>
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 flex items-start gap-4">
            <div className={`mt-1 p-1 rounded-full ${
              alert.type === 'warning' ? 'bg-orange-50' :
              alert.type === 'error' ? 'bg-red-50' : 'bg-blue-50'
            }`}>
              <AlertTriangle className={`w-4 h-4 ${
                alert.type === 'warning' ? 'text-orange-600' :
                alert.type === 'error' ? 'text-red-600' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <p className="text-sm text-gray-900">{alert.message}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{alert.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
