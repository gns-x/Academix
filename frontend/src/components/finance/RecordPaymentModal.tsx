import React, { useState, useEffect } from 'react';
import { X, CreditCard, Receipt, FileText, User, Search, AlertCircle, XCircle } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  parent?: {
    id: string;
    name: string;
  };
  ServiceEnrollment: Array<{
    id: string;
    service: {
      name: string;
      period: string;
      baseCost: number;
    };
    customPrice: number;
  }>;
}

interface SelectedStudentEnrollment {
  studentId: string;
  enrollmentId: string;
}

interface PaymentData {
  amount: string;
  paymentMethod: string;
  paymentDate: string;
  notes: string;
  receiptNumber: string;
  payerName: string;
  payerRelation: string;
  paymentStatus: string;
  transactionReference?: string;
  chequeNumber?: string;
  bankName?: string;
}

interface RecordPaymentModalProps {
  onClose: () => void;
  onSubmit: (paymentData: any) => void;
}

export const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<SelectedStudentEnrollment[]>([]);
  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount: '',
    paymentMethod: 'CREDIT_CARD',
    paymentDate: new Date().toISOString().split('T')[0],
    notes: '',
    receiptNumber: generateReceiptNumber(),
    payerName: '',
    payerRelation: '',
    paymentStatus: 'COMPLETED',
    transactionReference: '',
    chequeNumber: '',
    bankName: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  function generateReceiptNumber() {
    const prefix = 'RCP';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await fetch('http://localhost:3000/students/students-with-service-enrollments?include=serviceEnrollments');
        if (!studentsResponse.ok) {
          throw new Error('Failed to fetch students');
        }
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);
      } catch (err) {
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalAmount = selectedStudents.reduce((sum, selected) => {
      const student = students.find(s => s.id === selected.studentId);
      const enrollment = student?.ServiceEnrollment.find(e => e.id === selected.enrollmentId);
      return sum + (enrollment?.service.baseCost || 0);
    }, 0);

    const submissionData = {
      students: selectedStudents.map(selected => ({
        studentId: selected.studentId,
        enrollmentId: selected.enrollmentId,
      })),
      ...paymentData,
      amount: totalAmount,
      timestamp: new Date().toISOString(),
    };
    onSubmit(submissionData);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEnrollmentSelect = (studentId: string, enrollmentId: string) => {
    setSelectedStudents(prev => {
      const isAlreadySelected = prev.some(
        s => s.studentId === studentId && s.enrollmentId === enrollmentId
      );
      if (isAlreadySelected) return prev;
      return [...prev, { studentId, enrollmentId }];
    });
  };

  const removeSelectedStudent = (studentId: string, enrollmentId: string) => {
    setSelectedStudents(prev =>
      prev.filter(s => !(s.studentId === studentId && s.enrollmentId === enrollmentId))
    );
  };

  const getParentFromSelectedStudents = () => {
    const selectedStudent = students.find(s => s.id === selectedStudents[0]?.studentId);
    return selectedStudent?.parent;
  };

  const renderPaymentMethodFields = () => {
    switch (paymentData.paymentMethod) {
      case 'CHEQUE':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cheque Number
              </label>
              <input
                type="text"
                required
                value={paymentData.chequeNumber}
                onChange={(e) => setPaymentData({ ...paymentData, chequeNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
                placeholder="Enter cheque number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                required
                value={paymentData.bankName}
                onChange={(e) => setPaymentData({ ...paymentData, bankName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
                placeholder="Enter bank name"
              />
            </div>
          </>
        );
      case 'BANK_TRANSFER':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Reference
            </label>
            <input
              type="text"
              required
              value={paymentData.transactionReference}
              onChange={(e) => setPaymentData({ ...paymentData, transactionReference: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
              placeholder="Enter transaction reference"
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1ABC9C]"></div>
            <p>Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = selectedStudents.reduce((sum, selected) => {
    const student = students.find(s => s.id === selected.studentId);
    const enrollment = student?.ServiceEnrollment.find(e => e.id === selected.enrollmentId);
    return sum + (enrollment?.service.baseCost || 0);
  }, 0);

  const parent = getParentFromSelectedStudents();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b z-10">
          <div className="flex items-center space-x-2">
            <Receipt className="w-6 h-6 text-[#1ABC9C]" />
            <h2 className="text-2xl font-semibold text-gray-900">Record Payment</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error ? (
          <div className="flex items-center space-x-2 text-red-600 mb-4 p-4 bg-red-50 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              {/* Student Search Section */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-[#1ABC9C]" />
                    <h3 className="text-lg font-medium text-gray-900">Student Selection</h3>
                  </div>
                  {selectedStudents.length > 0 && (
                    <div className="text-sm text-gray-600">
                      Total Amount: {totalAmount} MAD
                    </div>
                  )}
                </div>

                {/* Selected Students List */}
                {selectedStudents.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Students:</h4>
                    <div className="space-y-2">
                      {selectedStudents.map(({ studentId, enrollmentId }) => {
                        const student = students.find(s => s.id === studentId);
                        const enrollment = student?.ServiceEnrollment.find(e => e.id === enrollmentId);
                        return (
                          <div
                            key={`${studentId}-${enrollmentId}`}
                            className="flex items-center justify-between bg-[#1ABC9C]/5 p-2 rounded-md"
                          >
                            <div>
                              <span className="font-medium">{student?.name}</span>
                              <span className="text-sm text-gray-600 ml-2">
                                ({enrollment?.service.name} - {enrollment?.customPrice} MAD)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeSelectedStudent(studentId, enrollmentId)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search student by name..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchResults(true);
                    }}
                    onFocus={() => setShowSearchResults(true)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
                  />
                </div>

                {/* Search Results */}
                {showSearchResults && searchQuery && (
                  <div className="mt-2 border rounded-md shadow-sm overflow-hidden">
                    <div className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                      {filteredStudents.map((student) => (
                        <div key={student.id} className="p-3 hover:bg-gray-50">
                          <div className="font-medium text-gray-900 mb-1">{student.name}</div>
                          <div className="pl-4 space-y-1">
                            {student.ServiceEnrollment.map((enrollment) => (
                              <button
                                key={enrollment.id}
                                type="button"
                                onClick={() => handleEnrollmentSelect(student.id, enrollment.id)}
                                className={`w-full text-left text-sm p-1 rounded ${
                                  selectedStudents.some(
                                    s => s.studentId === student.id && s.enrollmentId === enrollment.id
                                  )
                                    ? 'bg-[#1ABC9C]/10 text-[#1ABC9C]'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                disabled={selectedStudents.some(
                                  s => s.studentId === student.id && s.enrollmentId === enrollment.id
                                )}
                              >
                                {enrollment.service.name} - {enrollment.customPrice} MAD ({enrollment.service.period})
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Details Section */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <CreditCard className="w-5 h-5 text-[#1ABC9C]" />
                  <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Receipt Number
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={paymentData.receiptNumber}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={paymentData.paymentMethod}
                      onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
                    >
                      <option value="CREDIT_CARD">Credit Card</option>
                      <option value="DEBIT_CARD">Debit Card</option>
                      <option value="BANK_TRANSFER">Bank Transfer</option>
                      <option value="CASH">Cash</option>
                      <option value="CHEQUE">Cheque</option>
                      <option value="DIGITAL_WALLET">Digital Wallet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Status
                    </label>
                    <select
                      value={paymentData.paymentStatus}
                      onChange={(e) => setPaymentData({ ...paymentData, paymentStatus: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
                    >
                      <option value="COMPLETED">Completed</option>
                      <option value="PENDING">Pending</option>
                      <option value="FAILED">Failed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Date
                    </label>
                    <input
                      type="date"
                      required
                      value={paymentData.paymentDate}
                      onChange={(e) => setPaymentData({ ...paymentData, paymentDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
                    />
                  </div>

                  {renderPaymentMethodFields()}
                </div>
              </div>

              {/* Payer Information Section */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="w-5 h-5 text-[#1ABC9C]" />
                  <h3 className="text-lg font-medium text-gray-900">Payer Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Parent Information
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={parent ? `${parent.name} (Parent)` : 'No parent information available'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes Section */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-[#1ABC9C]" />
                  <h3 className="text-lg font-medium text-gray-900">Additional Notes</h3>
                </div>
                <div>
                  <textarea
                    value={paymentData.notes}
                    onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
                    rows={3}
                    placeholder="Add any additional notes or comments about this payment"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 sticky bottom-0 bg-white pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1ABC9C] text-white rounded-md hover:bg-[#1ABC9C]/90 flex items-center space-x-2"
                disabled={selectedStudents.length === 0}
              >
                <Receipt className="w-4 h-4" />
                <span>Record Payment</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecordPaymentModal
