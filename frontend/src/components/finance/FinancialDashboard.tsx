import React, { useState } from 'react';
import { TrendingUp, Users, CheckCircle, Clock, ArrowUpRight, ArrowDownRight, Download, Send, FileText, CreditCard } from 'lucide-react';
import { payments } from '../../lib/api';
import { RecordPaymentModal } from './RecordPaymentModal';
import { GenerateInvoiceModal } from './GenerateInvoiceModal';
import { ExportReportModal } from './ExportReportModal';
import { toast } from 'react-hot-toast';

interface PaymentData {
  students: Array<{
    studentId: string;
    enrollmentId: string;
  }>;
  amount: number;
  paymentMethod: PaymentType;
  paymentDate: string;
  notes?: string;
  receiptNumber: string;
  paymentStatus: PaymentStatus;
  transactionReference?: string;
  chequeNumber?: string;
  bankName?: string;
}

enum PaymentType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH = 'CASH',
  CHEQUE = 'CHEQUE',
  DIGITAL_WALLET = 'DIGITAL_WALLET',
}

enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

interface FinancialDashboardProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  mockFinancialData: any;
  formatCurrency: (amount: number) => string;
}

export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({
  selectedPeriod,
  setSelectedPeriod,
  mockFinancialData,
  formatCurrency,
}) => {
  const [showRecordPayment, setShowRecordPayment] = useState(false);
  const [showGenerateInvoice, setShowGenerateInvoice] = useState(false);
  const [showExportReport, setShowExportReport] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRecordPayment = async (paymentData: PaymentData) => {
    try {
      setIsSubmitting(true);
      const result = await payments.record(paymentData);
      toast.success('Payment recorded successfully');
      setShowRecordPayment(false);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to record payment';
      toast.error(message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateInvoice = async (invoiceData: any) => {
    try {
      const response = await fetch('/api/payments/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate invoice');
      }

      const result = await response.json();
      console.log('Invoice generated:', result);
      setShowGenerateInvoice(false);
      toast.success('Invoice generated successfully');
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast.error('Failed to generate invoice');
    }
  };

  const handleExportReport = async (data: { students: Array<{ studentId: string; enrollmentIds: string[] }> }) => {
    try {
      const blob = await reports.generateFinancial(data);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'financial-report.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setShowExportReport(false);
      toast.success('Report exported successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to export report';
      toast.error(message);
    }
  };

  return (
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

      {/* Quick Actions Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowRecordPayment(true)}
            disabled={isSubmitting}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-2 bg-[#1ABC9C]/10 rounded-lg mb-2">
              <CreditCard className="w-5 h-5 text-[#1ABC9C]" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {isSubmitting ? 'Recording...' : 'Record Payment'}
            </span>
          </button>

          <button
            onClick={() => setShowGenerateInvoice(true)}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
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

          <button
            onClick={() => setShowExportReport(true)}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-orange-100 rounded-lg mb-2">
              <Download className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Export Report</span>
          </button>
        </div>
      </div>

      {showRecordPayment && (
        <RecordPaymentModal
          onClose={() => setShowRecordPayment(false)}
          onSubmit={handleRecordPayment}
          isSubmitting={isSubmitting}
        />
      )}

      {showGenerateInvoice && (
        <GenerateInvoiceModal
          onClose={() => setShowGenerateInvoice(false)}
          onSubmit={handleGenerateInvoice}
        />
      )}

      {showExportReport && (
        <ExportReportModal
          onClose={() => setShowExportReport(false)}
          onExport={handleExportReport}
        />
      )}
    </div>
  );
};
