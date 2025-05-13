import React from 'react';
import {
  User, Mail, Calendar, Phone, MapPin, Briefcase, CreditCard,
  BookOpen, Bus, Coffee, DollarSign, Clock, Activity, X,
  GraduationCap, BadgeCheck, ChevronRight, Building2, CalendarDays,
  CreditCard as PaymentCard, Shield, Users, Award
} from 'lucide-react';

interface StudentProfileProps {
  student: any; // Replace with proper type
  onClose: () => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-7xl rounded-[2rem] shadow-2xl overflow-hidden">
        <div className="flex h-[85vh]">
          {/* Left Sidebar */}
          <div className="w-96 bg-gray-50 border-r border-gray-100 flex flex-col">
            {/* Profile Header */}
            <div className="p-8 text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-xl mx-auto">
                  <img
                    src={student.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=1ABC9C&color=fff`}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
                  <BadgeCheck className="w-5 h-5" />
                </div>
              </div>

              <h1 className="mt-6 text-2xl font-bold text-gray-900">{student.name}</h1>
              <div className="mt-2 flex items-center justify-center space-x-2 text-gray-600">
                <GraduationCap className="w-4 h-4" />
                <span>Grade {student.grade} {student.Section && `• Section ${student.Section}`}</span>
              </div>

              <div className="mt-6 flex items-center justify-center space-x-3">
                <span className="px-3 py-1 bg-[#1ABC9C]/10 rounded-full text-[#1ABC9C] text-sm font-medium">
                  Active Student
                </span>
                <span className="px-3 py-1 bg-blue-50 rounded-full text-blue-600 text-sm font-medium">
                  {student.academicYear || '2023-2024'}
                </span>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="px-8 flex-1 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Student ID</div>
                  <div className="font-semibold text-gray-900">{student.externalCode}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Email Address</div>
                  <div className="font-semibold text-gray-900 break-all">{student.email}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Date of Birth</div>
                  <div className="font-semibold text-gray-900">
                    {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'Not specified'}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Gender</div>
                  <div className="font-semibold text-gray-900">{student.gender || 'Not specified'}</div>
                </div>
              </div>
            </div>

            {/* Profile Actions */}
            <div className="p-6 border-t border-gray-100">
              <button className="w-full px-4 py-2.5 bg-[#1ABC9C] text-white rounded-xl hover:bg-[#1ABC9C]/90 transition-all duration-200 flex items-center justify-center">
                <Shield className="w-5 h-5 mr-2" />
                Update Profile
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-8 flex justify-between items-center border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Student Information</h2>
                <p className="text-gray-500 mt-1">Complete profile and academic details</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {/* Financial Overview */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <PaymentCard className="w-5 h-5 mr-2 text-[#1ABC9C]" />
                  Financial Overview
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-[#1ABC9C]/5 via-[#1ABC9C]/10 to-transparent p-6 rounded-2xl border border-[#1ABC9C]/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-[#1ABC9C]/10 rounded-xl">
                        <DollarSign className="w-6 h-6 text-[#1ABC9C]" />
                      </div>
                      <span className="text-[#1ABC9C] text-sm font-medium">Current Balance</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{student.balance}</div>
                    <div className="mt-2 text-sm text-gray-500">Available funds</div>
                  </div>

                  {student.PaymentPlan && (
                    <div className="bg-gradient-to-br from-blue-50/50 via-blue-50/30 to-transparent p-6 rounded-2xl border border-blue-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="text-blue-600 text-sm font-medium">Payment Plan</span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">{student.PaymentPlan.planType}</div>
                      <div className="mt-2 text-sm text-blue-600">Active plan</div>
                    </div>
                  )}

                  <div className="bg-gradient-to-br from-purple-50/50 via-purple-50/30 to-transparent p-6 rounded-2xl border border-purple-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <Activity className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-purple-600 text-sm font-medium">Payment Status</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">Active</div>
                    <div className="mt-2 text-sm text-purple-600">All payments up to date</div>
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              {student.parent && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-[#1ABC9C]" />
                    Parent Information
                  </h3>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-[#1ABC9C]/10 flex items-center justify-center">
                          <User className="w-6 h-6 text-[#1ABC9C]" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-semibold text-gray-900">{student.parent.name}</h4>
                          <p className="text-gray-500">Primary Guardian</p>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                          <Phone className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm text-gray-500">Phone Number</div>
                            <div className="text-gray-900">{student.parent.phone}</div>
                          </div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                          <Mail className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm text-gray-500">Email Address</div>
                            <div className="text-gray-900">{student.parent.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                          <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm text-gray-500">Address</div>
                            <div className="text-gray-900">{student.parent.address}</div>
                          </div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                          <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm text-gray-500">Occupation</div>
                            <div className="text-gray-900">{student.parent.occupation || 'Not specified'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Services & Subscriptions */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-[#1ABC9C]" />
                  Services & Subscriptions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {student.ServiceEnrollment?.map((enrollment: any) => (
                    <div key={enrollment.id} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-[#1ABC9C]/10 rounded-xl">
                          {enrollment.service.category === 'TRANSPORTATION' && <Bus className="w-6 h-6 text-[#1ABC9C]" />}
                          {enrollment.service.category === 'CAFETERIA' && <Coffee className="w-6 h-6 text-[#1ABC9C]" />}
                          {enrollment.service.category === 'EXTRACURRICULAR' && <BookOpen className="w-6 h-6 text-[#1ABC9C]" />}
                        </div>
                        <div className="flex items-center">
                          <span className="px-3 py-1 bg-[#1ABC9C]/10 rounded-full text-[#1ABC9C] text-sm font-medium">
                            Active
                          </span>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{enrollment.service.name}</h4>
                      <p className="text-gray-500">{enrollment.service.category}</p>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-lg font-bold text-gray-900">
                          ${enrollment.customPrice || enrollment.service.baseCost}
                          <span className="text-sm text-gray-500 font-normal">
                            /{enrollment.service.billingFrequency}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarDays className="w-4 h-4 mr-2" />
                          Active
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-[#1ABC9C]" />
                  Recent Transactions
                </h3>
                <div className="space-y-4">
                  {student.Transaction?.slice(0, 3).map((transaction: any) => (
                    <div key={transaction.id} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-[#1ABC9C]/10 rounded-xl">
                          <DollarSign className="w-5 h-5 text-[#1ABC9C]" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{transaction.Product.name}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Clock className="w-4 h-4 mr-1.5" />
                            {new Date(transaction.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {transaction.amount.toFixed(2)} MAD
                        </div>
                        <div className="text-sm text-green-600">Completed</div>
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
};

export default StudentProfile;
