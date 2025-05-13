import React, { useState } from 'react';
import {
  UserCircle,
  BookOpen,
  Users,
  MessageCircle,
  FileText,
  Clock,
  Settings,
  Upload,
  PlusCircle,
  Bell,
  CheckCircle2,
  FileEdit,
  BookCheck,
  MessageSquare,
  Plus,
  Search,
  Shield,
  ChevronDown,
  Brain,
  BarChart3,
  Lock,
  Mail,
  Phone,
  Award,
  Calendar,
  GraduationCap,
  Briefcase,
  MapPin,
  Heart,
  AlertCircle,
  User,
  FileSpreadsheet,
  BookOpenCheck,
  UserPlus,
  Filter,
  Download,
  MoreVertical,
} from 'lucide-react';
import { format } from 'date-fns';

// Mock data for demonstration
const teacherData = {
  id: "1",
  name: "Dr. Sarah Parker",
  email: "sarah.parker@academix.edu",
  phone: "+1 (555) 123-4567",
  subject: "Mathematics",
  qualification: "Ph.D. in Mathematics",
  department: "Science & Mathematics",
  joinDate: "2020-09-01",
  address: "123 Academic Lane, Education City, EC 12345",
  certifications: ["Advanced Teaching Certificate", "Digital Education Specialist"],
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  emergencyContact: {
    name: "John Parker",
    relation: "Spouse",
    phone: "+1 (555) 987-6543"
  },
  expertise: ["Calculus", "Linear Algebra", "Statistics", "Mathematical Modeling"],
  achievements: [
    { title: "Teacher of the Year 2023", date: "2023-05-15" },
    { title: "Research Publication in Mathematics Education", date: "2023-08-20" },
  ],
};

const classes = [
  { id: 1, name: "Advanced Mathematics", grade: "12th", students: 25, time: "9:00 AM - 10:30 AM", room: "Room 301", attendance: 92 },
  { id: 2, name: "Calculus", grade: "11th", students: 28, time: "11:00 AM - 12:30 PM", room: "Room 302", attendance: 88 },
  { id: 3, name: "Algebra", grade: "10th", students: 30, time: "2:00 PM - 3:30 PM", room: "Room 303", attendance: 95 },
];

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
    title: 'Final Calculus Assessment',
    subject: 'Mathematics',
    date: new Date('2024-03-25'),
    duration: '3 hours',
    status: 'draft',
    totalQuestions: 40,
    totalMarks: 80,
  },
];

const recentActivities = [
  { type: 'class', text: 'Completed Advanced Mathematics lecture', time: '2 hours ago' },
  { type: 'exam', text: 'Published Calculus mid-term results', time: '4 hours ago' },
  { type: 'meeting', text: 'Attended department meeting', time: 'Yesterday' },
];

export function Teachers() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(teacherData);
  const [examActiveTab, setExamActiveTab] = useState('exams');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const quickStats = [
    { label: 'Teaching Hours', value: '18', icon: Clock, color: 'bg-blue-500' },
    { label: 'Total Students', value: '83', icon: Users, color: 'bg-green-500' },
    { label: 'Courses', value: '3', icon: BookOpen, color: 'bg-purple-500' },
    { label: 'Avg. Rating', value: '4.8', icon: Award, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header with Quick Actions */}
      <div className="bg-white shadow-sm rounded-xl mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <img
                  src={profileData.image}
                  alt={profileData.name}
                  className="relative h-20 w-20 rounded-full ring-4 ring-white object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                <div className="flex items-center mt-1 space-x-4">
                  <span className="flex items-center text-sm text-gray-500">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    {profileData.subject}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {profileData.department}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </button>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <Settings className="h-4 w-4 mr-2" />
                Manage
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6 mt-6">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className={`${stat.color} rounded-lg p-2`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm rounded-xl mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'profile', name: 'Profile', icon: UserCircle },
              { id: 'classes', name: 'Classes', icon: Users },
              { id: 'exams', name: 'Exams', icon: FileText },
              { id: 'schedule', name: 'Schedule', icon: Calendar },
              { id: 'documents', name: 'Documents', icon: FileSpreadsheet },
              { id: 'performance', name: 'Performance', icon: BarChart3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Main Profile Information */}
            <div className="col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      <FileEdit className="h-4 w-4 mr-1" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Full Name</label>
                          <input
                            type="text"
                            defaultValue={profileData.name}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            defaultValue={profileData.email}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone</label>
                          <input
                            type="tel"
                            defaultValue={profileData.phone}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Department</label>
                          <input
                            type="text"
                            defaultValue={profileData.department}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                          type="text"
                          defaultValue={profileData.address}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="text-sm text-gray-900">{profileData.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Phone</p>
                            <p className="text-sm text-gray-900">{profileData.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Address</p>
                            <p className="text-sm text-gray-900">{profileData.address}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Briefcase className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Department</p>
                            <p className="text-sm text-gray-900">{profileData.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-4">
                          <GraduationCap className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Qualification</p>
                            <p className="text-sm text-gray-900">{profileData.qualification}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Join Date</p>
                            <p className="text-sm text-gray-900">{format(new Date(profileData.joinDate), 'MMM dd, yyyy')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Emergency Contact</h2>
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 rounded-lg p-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Name</p>
                          <p className="text-sm text-gray-900">{profileData.emergencyContact.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Relation</p>
                          <p className="text-sm text-gray-900">{profileData.emergencyContact.relation}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone</p>
                          <p className="text-sm text-gray-900">{profileData.emergencyContact.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expertise & Skills */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Expertise & Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {profileData.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Certifications */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Certifications</h2>
                  <div className="space-y-4">
                    {profileData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="bg-green-100 rounded-lg p-2">
                          <Award className="h-5 w-5 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-700">{cert}</span>
                      </div>
                    ))}
                    <button className="w-full mt-4 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Certification
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h2>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-blue-100 rounded-lg p-2">
                          {activity.type === 'class' ? (
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          ) : activity.type === 'exam' ? (
                            <FileText className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Users className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">{activity.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Achievements</h2>
                  <div className="space-y-4">
                    {profileData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-yellow-100 rounded-lg p-2">
                          <Award className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">{achievement.title}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(achievement.date), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="space-y-6">
            {/* Class Overview */}
            <div className="grid grid-cols-3 gap-6">
              {classes.map((cls) => (
                <div key={cls.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
                        <p className="text-sm text-gray-500">Grade {cls.grade}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {cls.students} Students
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {cls.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {cls.room}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        {cls.attendance}% Attendance
                      </div>
                    </div>
                    <div className="mt-6 flex space-x-3">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Take Attendance
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Class Button */}
            <div className="flex justify-center">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                <Plus className="h-4 w-4 mr-2" />
                Add New Class
              </button>
            </div>
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="space-y-6">
            {/* Exam Management Header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Exam Management</h2>
                <p className="mt-1 text-sm text-gray-500">Create and manage your exams</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Exam
              </button>
            </div>

            {/* Exam Stats */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Total Exams', value: '24', icon: FileText, color: 'bg-blue-500' },
                { label: 'Completed', value: '18', icon: CheckCircle2, color: 'bg-green-500' },
                { label: 'Upcoming', value: '6', icon: Clock, color: 'bg-yellow-500' },
                { label: 'Average Score', value: '78%', icon: BarChart3, color: 'bg-purple-500' },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center">
                    <div className={`${stat.color} rounded-lg p-3`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Exam List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Exams</h3>
                  <div className="flex space-x-4">
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockExams.map((exam) => (
                    <div
                      key={exam.id}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 rounded-lg p-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{exam.title}</h4>
                          <p className="text-sm text-gray-500">
                            {format(exam.date, 'MMM dd, yyyy')} • {exam.duration}
                          </p>
                        </div>
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
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
