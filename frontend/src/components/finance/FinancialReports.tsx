import React from 'react';
import { PieChart, Building2, CreditCard, FileText, Wallet, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export const FinancialReports: React.FC = () => {
  return (
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

      {/* Payment Status Distribution */}
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
  );
};
