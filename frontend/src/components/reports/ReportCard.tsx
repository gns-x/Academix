import React from 'react';
import { ReportCardProps } from '../../types';

export const ReportCard: React.FC<ReportCardProps> = ({ title, icon: Icon, description, onClick }) => (
  <button
    onClick={onClick}
    className="p-4 bg-white rounded-lg border border-gray-200 hover:border-[#1ABC9C] hover:shadow-md transition-all"
  >
    <div className="flex items-start space-x-3">
      <div className="p-2 bg-[#1ABC9C]/10 rounded-lg">
        <Icon className="w-6 h-6 text-[#1ABC9C]" />
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  </button>
);
