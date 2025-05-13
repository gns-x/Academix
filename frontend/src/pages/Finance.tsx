import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { StudentDetailsModal } from '../components/finance/StudentDetailsModal';
import { FinancialDashboard } from '../components/finance/FinancialDashboard';
import { FinancialReports } from '../components/finance/FinancialReports';
import { StudentRecords } from '../components/finance/StudentRecords';
import { mockFinancialData, mockStudentRecords } from '../data/mockData';

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

export function Finance() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showFinancials, setShowFinancials] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MAD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )} */}

      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => setShowFinancials(!showFinancials)}
          className="w-full px-6 py-4 flex items-center justify-between text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
        >
          <span>Financial Overview</span>
          {showFinancials ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>

        {showFinancials && (
          <div className="p-6 space-y-6 border-t">
            <FinancialDashboard
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          mockFinancialData={mockFinancialData}
          formatCurrency={formatCurrency}
          selectedStudent={selectedStudent}
        />

            <FinancialReports />
          </div>
        )}
      </div>

      <StudentRecords
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSelectedStudent={setSelectedStudent}
        />
    </div>
  );
}

export default Finance;
