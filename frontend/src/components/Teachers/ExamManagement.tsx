import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Upload,
  Clock,
  Shield,
  Settings as SettingsIcon,
  ChevronDown,
  FileText,
  CheckCircle,
  AlertCircle,
  Brain,
  BarChart3,
  Users,
  Lock,
} from 'lucide-react';
import { format } from 'date-fns';

interface Exam {
  id: string;
  title: string;
  subject: string;
  date: Date;
  duration: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  totalQuestions: number;
  totalMarks: number;
}

const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Midterm Mathematics Exam',
    subject: 'Mathematics',
    date: new Date('2024-03-20'),
    duration: '2 hours',
    status: 'scheduled',
    totalQuestions: 50,
    totalMarks: 100,
  },
  {
    id: '2',
    title: 'Physics Final',
    subject: 'Physics',
    date: new Date('2024-03-25'),
    duration: '3 hours',
    status: 'draft',
    totalQuestions: 40,
    totalMarks: 80,
  },
];

export function ExamManagement() {
  const [activeTab, setActiveTab] = useState('exams');
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Management</h1>
          <p className="mt-1 text-sm text-gray-500">Create and manage your exams with AI assistance</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Exam
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: FileText, label: 'Total Exams', value: '24', color: 'bg-blue-500' },
          { icon: CheckCircle, label: 'Completed', value: '18', color: 'bg-green-500' },
          { icon: Clock, label: 'Upcoming', value: '6', color: 'bg-yellow-500' },
          { icon: Brain, label: 'AI Generated', value: '12', color: 'bg-purple-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-6 px-6">
            {[
              { id: 'exams', label: 'Exams', icon: FileText },
              { id: 'questions', label: 'Question Bank', icon: BookOpen },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'settings', label: 'Settings', icon: SettingsIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-4 border-b-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'exams' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex items-center justify-between">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search exams..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <div className="flex space-x-4">
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Status
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Subject
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Exams List */}
              <div className="space-y-4">
                {mockExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                        <p className="text-sm text-gray-500">{exam.subject}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            exam.status === 'scheduled'
                              ? 'bg-yellow-100 text-yellow-800'
                              : exam.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : exam.status === 'completed'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                        </span>
                        <button className="text-gray-400 hover:text-gray-500">
                          <SettingsIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {format(exam.date, 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="text-sm font-medium text-gray-900">{exam.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Questions</p>
                        <p className="text-sm font-medium text-gray-900">{exam.totalQuestions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Marks</p>
                        <p className="text-sm font-medium text-gray-900">{exam.totalMarks}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Question
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    <Upload className="h-5 w-5 mr-2" />
                    Import Questions
                  </button>
                </div>
                <div className="flex space-x-4">
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Type
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Difficulty
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Question Bank content would go here */}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Analytics content would go here */}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Lock,
                    title: 'Browser Lockdown',
                    description: 'Prevent students from accessing other applications during exams',
                    enabled: true,
                  },
                  {
                    icon: Users,
                    title: 'Identity Verification',
                    description: 'Verify student identity using AI-powered face recognition',
                    enabled: false,
                  },
                  // Add more security features
                ].map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-lg p-3">
                          <feature.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={feature.enabled} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
