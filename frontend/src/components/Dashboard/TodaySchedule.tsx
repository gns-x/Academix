import React from 'react';

interface Schedule {
  time: string;
  class: string;
  subject: string;
  teacher: string;
  room: string;
}

export function TodaySchedule() {
  const schedules: Schedule[] = [
    { time: '08:00 AM', class: 'Grade 10-A', subject: 'Mathematics', teacher: 'John Smith', room: '301' },
    { time: '09:30 AM', class: 'Grade 11-B', subject: 'Physics', teacher: 'Sarah Johnson', room: '405' },
    { time: '11:00 AM', class: 'Grade 9-C', subject: 'English', teacher: 'Michael Brown', room: '201' },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedules.map((schedule, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.teacher}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
