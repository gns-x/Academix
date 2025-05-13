import React, { useState } from 'react';
import { X, Cake, Mail, Phone, MapPin, GraduationCap, BookOpen, Calendar, Bus, Coffee } from 'lucide-react';

interface StudentDetailsModalProps {
  student: any;
  onClose: () => void;
}

export const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ student, onClose }) => {
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
                  src={student.photo}
                  alt=""
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {student.name}
                  </h3>
                  <div className="mt-1 text-sm text-gray-500">
                    Student ID: {student.externalCode}
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
                        Born {new Date(student.dateOfBirth).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{student.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{student.phone}</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-gray-600">{student.address}</span>
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
                            unknown Father
                          {/* {student.parent.name} */}
                        </div>
                        <div className="text-sm text-gray-500">
                            'Zamel'
                          {/* {student.parents.father.occupation} */}
                        </div>
                        <div className="text-sm text-gray-500">
                            '+666 333 999'
                          {/* {student.parents.father.phone} */}
                        </div>
                        <div className="text-sm text-gray-500">
                            'parent@email.com'
                          {/* {student.parents.father.email} */}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Mother</p>
                      <div className="mt-1 space-y-2">
                        <div className="text-sm text-gray-600">
                            unknown Mother
                          {/* {student.parent.name} */}
                        </div>
                        <div className="text-sm text-gray-500">
                            '9ahba'
                          {/* {student.parents.mother.occupation} */}
                        </div>
                        <div className="text-sm text-gray-500">
                            '+666 333 999'
                          {/* {student.parents.mother.phone} */}
                        </div>
                        <div className="text-sm text-gray-500">
                            'mother@email.com'
                          {/* {student.parents.mother.email} */}
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
                        {/* Grade {student.academic.grade} - Section {student.academic.section} */}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        {/* Roll Number: {student.academic.rollNumber} */}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        {/* Admission Date: {new Date(student.academic.admissionDate).toLocaleDateString()} */}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    Enrolled Services
                  </h4>
                  <div className="space-y-3">
                    {student.services.map((service: any, index: any) => (
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
                    {student.payments.map((payment: any) => (
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
