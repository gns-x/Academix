import React, { useState, useEffect } from 'react';
import { X, FileText, User, Search, XCircle, Download, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Student {
  id: string;
  name: string;
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

interface SelectedService {
  studentId: string;
  enrollmentIds: string[];
}

interface ExportReportModalProps {
  onClose: () => void;
  onExport: (data: { students: SelectedService[] }) => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  onClose,
  onExport,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the JWT token from localStorage
        // const token = localStorage.getItem('jwt_token');

        // if (!token) {
        //   throw new Error('Authentication token not found');
        // }

        const response = await fetch('http://localhost:3000/students/students-with-service-enrollments?include=serviceEnrollments', {
          headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          throw new Error('Session expired. Please log in again.');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load student data. Please try again.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleServiceToggle = (studentId: string, enrollmentId: string) => {
    setSelectedServices(prev => {
      const studentIndex = prev.findIndex(s => s.studentId === studentId);

      if (studentIndex === -1) {
        // Add new student with service
        return [...prev, { studentId, enrollmentIds: [enrollmentId] }];
      }

      const student = prev[studentIndex];
      const newEnrollmentIds = student.enrollmentIds.includes(enrollmentId)
        ? student.enrollmentIds.filter(id => id !== enrollmentId)
        : [...student.enrollmentIds, enrollmentId];

      if (newEnrollmentIds.length === 0) {
        // Remove student if no services selected
        return prev.filter(s => s.studentId !== studentId);
      }

      // Update student's services
      return [
        ...prev.slice(0, studentIndex),
        { ...student, enrollmentIds: newEnrollmentIds },
        ...prev.slice(studentIndex + 1)
      ];
    });
  };

  const handleExport = async () => {
    if (selectedServices.length === 0) {
      setError('Please select at least one student and service');
      return;
    }

    try {
      setLoading(true);
    //   const token = localStorage.getItem('jwt_token');

    //   if (!token) {
    //     throw new Error('Authentication token not found');
    //   }

      const response = await fetch('http://localhost:3000/reports/financial', {
        method: 'POST',
        headers: {
        //   'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ students: selectedServices }),
      });

      if (response.status === 401) {
        throw new Error('Session expired. Please log in again.');
      }

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      // Handle PDF response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `financial-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Report exported successfully');
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to export report';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-[#1ABC9C]" />
            <h2 className="text-2xl font-semibold text-gray-900">Export Financial Report</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 mb-4 p-4 bg-red-50 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Selected Services Summary */}
          {selectedServices.length > 0 && (
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Services:</h3>
              <div className="space-y-2">
                {selectedServices.map(({ studentId, enrollmentIds }) => {
                  const student = students.find(s => s.id === studentId);
                  return (
                    <div key={studentId} className="bg-[#1ABC9C]/5 p-3 rounded-md">
                      <div className="font-medium text-gray-900">{student?.name}</div>
                      <div className="mt-1 pl-4 space-y-1">
                        {enrollmentIds.map(enrollmentId => {
                          const enrollment = student?.ServiceEnrollment.find(e => e.id === enrollmentId);
                          return (
                            <div key={enrollmentId} className="flex items-center justify-between text-sm">
                              <span>{enrollment?.service.name}</span>
                              <button
                                onClick={() => handleServiceToggle(studentId, enrollmentId)}
                                className="text-gray-500 hover:text-red-500"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Student Search */}
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
            <div className="border rounded-md shadow-sm overflow-hidden">
              <div className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="p-3 hover:bg-gray-50">
                    <div className="font-medium text-gray-900 mb-1">{student.name}</div>
                    <div className="pl-4 space-y-1">
                      {student.ServiceEnrollment.map((enrollment) => {
                        const isSelected = selectedServices.some(
                          s => s.studentId === student.id && s.enrollmentIds.includes(enrollment.id)
                        );
                        return (
                          <button
                            key={enrollment.id}
                            onClick={() => handleServiceToggle(student.id, enrollment.id)}
                            className={`w-full text-left text-sm p-1 rounded ${
                              isSelected
                                ? 'bg-[#1ABC9C]/10 text-[#1ABC9C]'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {enrollment.service.name} - {enrollment.service.period}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            disabled={loading}
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-[#1ABC9C] text-white rounded-md hover:bg-[#1ABC9C]/90 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedServices.length === 0 || loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
