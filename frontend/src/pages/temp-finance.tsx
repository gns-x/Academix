import  { useState } from 'react';
import {
  TrendingUp,
  Users,
  Clock,
  Download,
  Filter,
  Send,
  FileText,
  CreditCard,
  Building2,
  Wallet,
  ChevronDown,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  Phone,
  Mail,
  MapPin,
  Cake,
  GraduationCap,
  Bus,
  Coffee,
  BookOpen,
} from 'lucide-react';

// Mock data for demonstration
const mockFinancialData = {
  currentMonth: {
    revenue: 125000,
    outstanding: 15000,
    collectionRate: 89,
    trend: +12.5
  },
  currentQuarter: {
    revenue: 380000,
    outstanding: 42000,
    collectionRate: 91,
    trend: +8.3
  },
  currentYear: {
    revenue: 1250000,
    outstanding: 150000,
    collectionRate: 88,
    trend: +15.2
  },
  quickStats: {
    totalStudents: 2300,
    activePayments: 1850,
    pendingPayments: 450
  }
};

// Enhanced mock data with more student details
const mockStudentRecords = [
  {
    id: 'STU001',
    personalInfo: {
      name: 'Emma Thompson',
      dateOfBirth: '2010-05-15',
      gender: 'Female',
      address: '123 School Street, Cityville, ST 12345',
      email: 'emma.t@school.com',
      phone: '+1 234-567-8901',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    academic: {
      grade: '10',
      section: 'A',
      rollNumber: '1001',
      admissionDate: '2020-09-01',
      currentYear: '2023-2024'
    },
    parents: {
      father: {
        name: 'Robert Thompson',
        occupation: 'Software Engineer',
        email: 'robert.t@email.com',
        phone: '+1 234-567-8902',
        address: '123 School Street, Cityville, ST 12345'
      },
      mother: {
        name: 'Sarah Thompson',
        occupation: 'Doctor',
        email: 'sarah.t@email.com',
        phone: '+1 234-567-8903',
        address: '123 School Street, Cityville, ST 12345'
      }
    },
    services: ['Tuition', 'Transportation', 'Cafeteria'],
    financial: {
      totalDue: 12500,
      amountPaid: 10000,
      balance: 2500,
      status: 'Partial',
      nextDueDate: '2024-04-15',
      paymentPlan: 'Monthly',
      scholarshipDetails: 'Merit Scholarship - 10%'
    },
    payments: [
      {
        id: 'PAY001',
        date: '2024-03-01',
        amount: 5000,
        method: 'Bank Transfer',
        status: 'Completed',
        details: {
          transactionId: 'TRX123456',
          bankName: 'Chase Bank',
          accountDetails: '****4567'
        }
      },
      {
        id: 'PAY002',
        date: '2024-02-01',
        amount: 5000,
        method: 'Cheque',
        status: 'Cleared',
        details: {
          chequeNumber: 'CHQ789012',
          bankName: 'Wells Fargo',
          issueDate: '2024-01-28'
        }
      }
    ]
  },
  // Add more mock data as needed
];

// Student Details Modal Component
const StudentDetailsModal = ({ student, onClose }) => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Student Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'personal'
                ? 'border-[#1ABC9C] text-[#1ABC9C]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'academic'
                ? 'border-[#1ABC9C] text-[#1ABC9C]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Academic Details
          </button>
          <button
            onClick={() => setActiveTab('financial')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'financial'
                ? 'border-[#1ABC9C] text-[#1ABC9C]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Financial Information
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="flex items-start space-x-6">
                <img
                  src={student.personalInfo.photo}
                  alt=""
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {student.personalInfo.name}
                  </h3>
                  <div className="mt-1 text-sm text-gray-500">
                    Student ID: {student.id}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    Personal Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Cake className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        Born {new Date(student.personalInfo.dateOfBirth).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{student.personalInfo.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{student.personalInfo.phone}</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-gray-600">{student.personalInfo.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    Parent Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Father</p>
                      <div className="mt-1 space-y-2">
                        <div className="text-sm text-gray-600">
                          {student.parents.father.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.parents.father.occupation}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.parents.father.phone}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.parents.father.email}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Mother</p>
                      <div className="mt-1 space-y-2">
                        <div className="text-sm text-gray-600">
                          {student.parents.mother.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.parents.mother.occupation}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.parents.mother.phone}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.parents.mother.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    Academic Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <GraduationCap className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        Grade {student.academic.grade} - Section {student.academic.section}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        Roll Number: {student.academic.rollNumber}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        Admission Date: {new Date(student.academic.admissionDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    Enrolled Services
                  </h4>
                  <div className="space-y-3">
                    {student.services.map((service, index) => (
                      <div key={index} className="flex items-center text-sm">
                        {service === 'Transportation' ? (
                          <Bus className="w-4 h-4 text-gray-400 mr-2" />
                        ) : service === 'Cafeteria' ? (
                          <Coffee className="w-4 h-4 text-gray-400 mr-2" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                        )}
                        <span className="text-gray-600">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    Financial Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Total Due:</span>
                      <span className="font-medium text-gray-900">
                        ${student.financial.totalDue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Amount Paid:</span>
                      <span className="font-medium text-green-600">
                        ${student.financial.amountPaid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Balance:</span>
                      <span className="font-medium text-red-600">
                        ${student.financial.balance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Next Due Date:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(student.financial.nextDueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    Payment History
                  </h4>
                  <div className="space-y-4">
                    {student.payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="bg-gray-50 rounded-lg p-3 text-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">
                            ${payment.amount.toLocaleString()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium
                            ${payment.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {payment.status}
                          </span>
                        </div>
                        <div className="text-gray-500">
                          {new Date(payment.date).toLocaleDateString()} via {payment.method}
                        </div>
                        <div className="text-gray-500">
                          {payment.method === 'Bank Transfer'
                            ? `Transaction ID: ${payment.details.transactionId}`
                            : `Cheque Number: ${payment.details.chequeNumber}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Close
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#1ABC9C]/90 rounded-lg">
            Print Details
          </button>
        </div>
      </div>
    </div>
  );
};

export function Finance() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedPaymentView, setSelectedPaymentView] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showInsights, setShowInsights] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const insights = [
    {
      title: 'Revenue Insights',
      stats: [
        { label: 'Monthly Growth', value: '+15%', trend: 'up' },
        { label: 'YoY Growth', value: '+32%', trend: 'up' },
        { label: 'Average Transaction', value: '$850', trend: 'up' }
      ]
    },
    {
      title: 'Collection Insights',
      stats: [
        { label: 'Collection Rate', value: '92%', trend: 'up' },
        { label: 'Overdue Payments', value: '8%', trend: 'down' },
        { label: 'Recovery Rate', value: '85%', trend: 'up' }
      ]
    },
    {
      title: 'Service Utilization',
      stats: [
        { label: 'Transportation', value: '75%', trend: 'up' },
        { label: 'Cafeteria', value: '82%', trend: 'up' },
        { label: 'Extra Activities', value: '45%', trend: 'up' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {/* Insights Dropdown */}
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

      {/* Financial Dashboard Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Revenue Overview Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-sm border-gray-200 rounded-lg focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
            >
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(mockFinancialData[
                    selectedPeriod === 'month' ? 'currentMonth' :
                    selectedPeriod === 'quarter' ? 'currentQuarter' : 'currentYear'
                  ].revenue)}
                </p>
              </div>
              <div className="flex items-center text-green-500">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">
                  +{mockFinancialData[
                    selectedPeriod === 'month' ? 'currentMonth' :
                    selectedPeriod === 'quarter' ? 'currentQuarter' : 'currentYear'
                  ].trend}%
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Collection Rate</p>
                <p className="text-lg font-semibold text-gray-900">
                  {mockFinancialData[
                    selectedPeriod === 'month' ? 'currentMonth' :
                    selectedPeriod === 'quarter' ? 'currentQuarter' : 'currentYear'
                  ].collectionRate}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Outstanding</p>
                <p className="text-lg font-semibold text-red-600">
                  {formatCurrency(mockFinancialData[
                    selectedPeriod === 'month' ? 'currentMonth' :
                    selectedPeriod === 'quarter' ? 'currentQuarter' : 'currentYear'
                  ].outstanding)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Statistics Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {mockFinancialData.quickStats.totalStudents}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            </div>

            <div className="h-px bg-gray-100" />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Active Payments</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {mockFinancialData.quickStats.activePayments}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            </div>

            <div className="h-px bg-gray-100" />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Pending Payments</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {mockFinancialData.quickStats.pendingPayments}
                  </p>
                </div>
              </div>
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            </div>
          </div>
        </div>

        {/* Payment Actions Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-[#1ABC9C]/10 rounded-lg mb-2">
                <CreditCard className="w-5 h-5 text-[#1ABC9C]" />
              </div>
              <span className="text-sm font-medium text-gray-700">Record Payment</span>
            </button>

            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-purple-100 rounded-lg mb-2">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Generate Invoice</span>
            </button>

            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-blue-100 rounded-lg mb-2">
                <Send className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Send Reminder</span>
            </button>

            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-orange-100 rounded-lg mb-2">
                <Download className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Financial Reports Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Distribution Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Distribution</h3>
            <button className="text-sm text-[#1ABC9C] hover:text-[#1ABC9C]/80">
              View Details
            </button>
          </div>
          <div className="relative">
            <PieChart className="w-full h-48 text-gray-200" />
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#1ABC9C] rounded-full mr-2" />
                  <span className="text-sm text-gray-600">Tuition Fees</span>
                </div>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                  <span className="text-sm text-gray-600">Transportation</span>
                </div>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
                  <span className="text-sm text-gray-600">Cafeteria</span>
                </div>
                <span className="text-sm font-medium">15%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Status Distribution */} {/* Payment Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Payment Status</h3>
            <button className="text-sm text-[#1ABC9C] hover:text-[#1ABC9C]/80">
              View Details
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Paid</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">65%</span>
                <div className="w-24 h-2 bg-gray-100 rounded-full">
                  <div className="w-2/3 h-full bg-green-500 rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-sm text-gray-600">Partial</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">25%</span>
                <div className="w-24 h-2 bg-gray-100 rounded-full">
                  <div className="w-1/4 h-full bg-yellow-500 rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">10%</span>
                <div className="w-24 h-2 bg-gray-100 rounded-full">
                  <div className="w-1/12 h-full bg-red-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Analytics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
            <button className="text-sm text-[#1ABC9C] hover:text-[#1ABC9C]/80">
              View Details
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Building2 className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">Bank Transfer</span>
              </div>
              <span className="text-sm font-medium">45%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-purple-500 mr-2" />
                <span className="text-sm text-gray-600">Credit Card</span>
              </div>
              <span className="text-sm font-medium">30%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Cheque</span>
              </div>
              <span className="text-sm font-medium">15%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Wallet className="w-5 h-5 text-orange-500 mr-2" />
                <span className="text-sm text-gray-600">Cash</span>
              </div>
              <span className="text-sm font-medium">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Student Financial Records */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
              Student Financial Records
            </h3>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <button className="flex items-center justify-center px-4 py-2 bg-[#1ABC9C] text-white rounded-lg hover:bg-[#1ABC9C]/90">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent/Guardian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Services
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Financial Summary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Payment
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockStudentRecords.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={student.personalInfo.photo}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.personalInfo.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {student.id}
                        </div>
                      </div>
                    </div>
                  </td>
                 <td className="px-6 py-4 whitespace-nowrap">
  <div className="space-y-2">
    <div>
      <div className="text-sm font-medium text-gray-900">Father</div>
      <div className="text-sm text-gray-700">{student.parents.father.name}</div>
      <div className="text-sm text-gray-500">{student.parents.father.phone}</div>
    </div>
    <div className="border-t border-gray-100 pt-2">
      <div className="text-sm font-medium text-gray-900">Mother</div>
      <div className="text-sm text-gray-700">{student.parents.mother.name}</div>
      <div className="text-sm text-gray-500">{student.parents.mother.phone}</div>
    </div>
  </div>
</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {student.services.map((service, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Total Due: ${student.financial.totalDue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Paid: ${student.financial.amountPaid.toLocaleString()}
                    </div>
                    <div className="text-sm text-red-600">
                      Balance: ${student.financial.balance.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${student.financial.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        student.financial.status === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {student.financial.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(student.financial.nextDueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="text-[#1ABC9C] hover:text-[#1ABC9C]/80"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to {mockStudentRecords.length} of {mockStudentRecords.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
