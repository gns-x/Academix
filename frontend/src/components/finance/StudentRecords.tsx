import React, { useEffect, useState } from 'react';
import { Search, Filter, Download, Loader2, X, Mail, Phone, GraduationCap,  User, DollarSign, Wallet, PiggyBank, BookOpen, Clock, CheckCircle2,CalendarDays, BadgeCheck } from 'lucide-react';
import { fetchStudents } from '../../lib/api';

interface Student {
  id: string;
  name: string;
  cardId: string;
  email: string;
  grade: string;
  balance: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  photo?: string;
  externalCode?: string;
  parent?: {
    name: string;
    phone: string;
    email: string;
  };
  ServiceEnrollment?: Array<{
    service: {
      name: string;
      category: string;
    };
  }>;
}

interface StudentRecordsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setSelectedStudent: (student: Student | null) => void;
}

export const StudentRecords: React.FC<StudentRecordsProps> = ({
  searchTerm,
  setSearchTerm,
  setSelectedStudent,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudentDetails, setSelectedStudentDetails] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchStudents(searchTerm);
        setStudents(data);
      } catch (err) {
        setError('Failed to load student records');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(loadStudents, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const getPaymentStatus = (paidAmount: number) => {
    if (paidAmount <= 0) return { label: 'Unpaid', class: 'bg-red-100 text-red-800' };
    if (paidAmount <= 1000) return { label: 'Partial', class: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Paid', class: 'bg-green-100 text-green-800' };

  };

  const handleViewDetails = (student: Student) => {
    setSelectedStudentDetails(student);
    setIsModalOpen(true);
    setSelectedStudent(student);
  };

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const paginatedStudents = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#1ABC9C]/5 to-transparent">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                Student Financial Records
              </h3>
              <p className="text-sm text-gray-500">Manage and view student financial information</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-9 pr-4 py-2.5 w-full sm:w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="flex items-center justify-center px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <button className="flex items-center justify-center px-4 py-2.5 bg-[#1ABC9C] text-white rounded-lg hover:bg-[#1ABC9C]/90 transition-all duration-200 shadow-sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <Loader2 className="w-8 h-8 text-[#1ABC9C] animate-spin mb-2" />
              <p className="text-sm text-gray-500">Loading student records...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64 text-red-500">{error}</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Student Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Services
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Financial Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedStudents.map((student) => {
                    const status = getPaymentStatus(student.paidAmount);
                    return (
                      <tr key={student.id} className="hover:bg-gray-50 transition-all duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full bg-[#1ABC9C]/10 flex items-center justify-center border-2 border-[#1ABC9C]/20">
                              {student.photo ? (
                                <img
                                  src={student.photo}
                                  alt=""
                                  className="h-12 w-12 rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-[#1ABC9C] font-semibold text-lg">
                                  {student.name.charAt(0)}
                                </span>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900">
                                {student.name}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <span className="inline-block px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                                  ID: {student.externalCode}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Mail className="w-4 h-4 mr-1.5 text-gray-400" />
                            {student.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <GraduationCap className="w-4 h-4 mr-1.5 text-gray-400" />
                            Grade: {student.grade}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {student.ServiceEnrollment?.map((enrollment, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#1ABC9C]/10 text-[#1ABC9C] border border-[#1ABC9C]/20"
                              >
                                {enrollment.service.name}
                              </span>
                            )) || (
                              <span className="text-sm text-gray-500">No active services</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.class}`}>
                              {status.label}
                            </span>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <DollarSign className="w-4 h-4 mr-1.5 text-gray-400" />
                                <span className="text-gray-600">Total:</span>
                                <span className="ml-1 font-medium">{student.totalAmount.toLocaleString()} MAD</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Wallet className="w-4 h-4 mr-1.5 text-gray-400" />
                                <span className="text-gray-600">Paid:</span>
                                <span className="ml-1 font-medium text-green-600">{student.paidAmount.toLocaleString()} MAD</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <PiggyBank className="w-4 h-4 mr-1.5 text-gray-400" />
                                <span className="text-gray-600">Remaining:</span>
                                <span className="ml-1 font-medium text-red-600">{student.remainingAmount.toLocaleString()} MAD</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleViewDetails(student)}
                            className="inline-flex items-center px-3 py-1.5 bg-[#1ABC9C]/10 text-[#1ABC9C] rounded-lg hover:bg-[#1ABC9C]/20 transition-all duration-200"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, students.length)} of {students.length} entries
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Previous
                  </button>
                  <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Enhanced Student Details Modal */}
       {/* Enhanced Student Details Modal */}
       {isModalOpen && selectedStudentDetails && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div
            className="bg-white rounded-[2rem] shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full">
              {/* Left Sidebar */}
              <div className="w-80 bg-gray-50 p-8 border-r border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                      {selectedStudentDetails.photo ? (
                        <img
                          src={selectedStudentDetails.photo}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1ABC9C] to-[#16A085] flex items-center justify-center">
                          <span className="text-white font-bold text-5xl">
                            {selectedStudentDetails.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
                      <BadgeCheck className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-gray-900">{selectedStudentDetails.name}</h3>
                  <div className="mt-2 flex items-center justify-center space-x-2 text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    <span>Grade {selectedStudentDetails.grade}</span>
                  </div>

                  <div className="mt-6 w-full">
                    <div className="space-y-4">
                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-500 mb-1">Student ID</div>
                        <div className="font-semibold text-gray-900">{selectedStudentDetails.externalCode}</div>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-500 mb-1">Email</div>
                        <div className="font-semibold text-gray-900 break-all">{selectedStudentDetails.email}</div>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-500 mb-1">Enrollment Date</div>
                        <div className="font-semibold text-gray-900">Sept 2023</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="p-8 flex justify-between items-start border-b border-gray-100">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Student Profile</h2>
                    <p className="text-gray-500 mt-1">Manage student information and enrollment details</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8">
                  {/* Financial Overview */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Overview</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-[#1ABC9C]/5 via-[#1ABC9C]/10 to-transparent p-6 rounded-2xl border border-[#1ABC9C]/20">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-[#1ABC9C]/10 rounded-xl">
                            <DollarSign className="w-6 h-6 text-[#1ABC9C]" />
                          </div>
                          <span className="text-[#1ABC9C] text-sm font-medium">Total Amount</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          {selectedStudentDetails.totalAmount.toLocaleString()} MAD
                        </div>
                        <div className="mt-2 text-sm text-gray-500">Full program cost</div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50/50 via-green-50/30 to-transparent p-6 rounded-2xl border border-green-100">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-green-100 rounded-xl">
                            <Wallet className="w-6 h-6 text-green-600" />
                          </div>
                          <span className="text-green-600 text-sm font-medium">Amount Paid</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          {selectedStudentDetails.paidAmount.toLocaleString()} MAD
                        </div>
                        <div className="mt-2 text-sm text-green-600">
                          {((selectedStudentDetails.paidAmount / selectedStudentDetails.totalAmount) * 100).toFixed(1)}% completed
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50/50 via-blue-50/30 to-transparent p-6 rounded-2xl border border-blue-100">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-blue-100 rounded-xl">
                            <PiggyBank className="w-6 h-6 text-blue-600" />
                          </div>
                          <span className="text-blue-600 text-sm font-medium">Remaining</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          {selectedStudentDetails.remainingAmount.toLocaleString()} MAD
                        </div>
                        <div className="mt-2 text-sm text-blue-600">Due balance</div>
                      </div>
                    </div>
                  </div>

                  {/* Parent Information */}
                  {selectedStudentDetails.parent && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent Information</h3>
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                              <User className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg font-semibold text-gray-900">{selectedStudentDetails.parent.name}</h4>
                              <p className="text-gray-500">Primary Guardian</p>
                            </div>
                          </div>
                          <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                              <Phone className="w-5 h-5 text-gray-400 mr-3" />
                              <div>
                                <div className="text-sm text-gray-500">Phone Number</div>
                                <div className="text-gray-900">{selectedStudentDetails.parent.phone}</div>
                              </div>
                            </div>
                            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-gray-400 mr-3" />
                              <div>
                                <div className="text-sm text-gray-500">Email Address</div>
                                <div className="text-gray-900">{selectedStudentDetails.parent.email}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enrolled Services */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrolled Services</h3>
                    {selectedStudentDetails.ServiceEnrollment && selectedStudentDetails.ServiceEnrollment.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {selectedStudentDetails.ServiceEnrollment.map((enrollment, index) => (
                          <div key={index} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="flex items-center justify-between mb-4">
                              <div className="p-3 bg-[#1ABC9C]/10 rounded-xl">
                                <BookOpen className="w-6 h-6 text-[#1ABC9C]" />
                              </div>
                              <div className="flex items-center">
                                <span className="px-3 py-1 bg-[#1ABC9C]/10 rounded-full text-[#1ABC9C] text-sm font-medium">
                                  Active
                                </span>
                              </div>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{enrollment.service.name}</h4>
                            <p className="text-gray-500">{enrollment.service.category}</p>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex items-center text-sm text-gray-500">
                                <CalendarDays className="w-4 h-4 mr-2" />
                                Enrolled on Sept 1, 2023
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                          <BookOpen className="w-8 h-8 text-gray-400" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">No Active Services</h4>
                        <p className="text-gray-500">This student is not enrolled in any services yet.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      Last updated 2 hours ago
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200"
                      >
                        Close
                      </button>
                      <button className="px-6 py-2 bg-[#1ABC9C] text-white rounded-xl hover:bg-[#1ABC9C]/90 transition-all duration-200 flex items-center">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentRecords;
