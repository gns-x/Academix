import { useState, useEffect } from 'react';
import { students } from '../../lib/api';
import { SearchBar } from './SearchBar';
import { StatsGrid } from './StatsGrid';
import { QuickActions } from './QuickActions';
import {
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Users
} from 'lucide-react';

interface Stat {
  name: string;
  value: string;
  icon: string;
  trend: string;
  color: string;
}

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  time: string;
  status?: string;
}

const recentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'enrollment',
    title: 'New student enrollment',
    time: '2 hours ago',
    status: 'pending'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment received',
    time: '3 hours ago',
    status: 'completed'
  },
  {
    id: '3',
    type: 'event',
    title: 'Parent-teacher meeting',
    time: '5 hours ago'
  }
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Staff Meeting',
    time: '09:00 AM',
    date: 'Today',
    attendees: 12
  },
  {
    id: '2',
    title: 'Parent Conference',
    time: '02:00 PM',
    date: 'Tomorrow',
    attendees: 24
  },
  {
    id: '3',
    title: 'Board Review',
    time: '11:00 AM',
    date: 'Thu, Mar 15',
    attendees: 8
  }
];

export function DashboardHome() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    const fetchStats = async () => {
      try {
        const data = await students.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Main Content */}
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-[#1ABC9C]/10 rounded-xl">
                <LayoutDashboard className="w-8 h-8 text-[#1ABC9C]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{greeting}, Hamza!</h1>
                <p className="mt-1 text-gray-500">Here's what's happening in your school today.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <SearchBar />
            <button className="px-4 py-2 bg-[#1ABC9C] text-white rounded-xl hover:bg-[#1ABC9C]/90 transition-all duration-200 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              New Student
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8">
          <StatsGrid stats={stats} />
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  {['Add New Student', 'Record Payment', 'Schedule Event', 'Generate Report'].map((action, index) => (
                    <button
                      key={index}
                      className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-between transition-colors group"
                    >
                      <span className="font-medium text-gray-700">{action}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                      {activity.status && (
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            activity.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {activity.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 bg-gray-50 rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <span className="px-3 py-1 bg-[#1ABC9C]/10 text-[#1ABC9C] rounded-full text-sm">
                          {event.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          {event.attendees} attendees
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
