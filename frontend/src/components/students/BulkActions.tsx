import React from 'react';
import { Download, BookOpen, Coffee, Trash2 } from 'lucide-react';
import { ActionType } from '../../types';
// export type ActionType = 'delete' | 'status' | 'export' | 'enroll' | 'services';
interface BulkActionsProps {
  selectedCount: number;
  onAction: (action: ActionType) => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({ selectedCount, onAction }) => (
  <div className="bg-[#1ABC9C]/10 p-4 rounded-lg mb-6 flex items-center justify-between">
    <span className="text-sm text-gray-700">
      {selectedCount} students selected
    </span>
    <div className="flex gap-2">
      <button
        onClick={() => onAction('export')}
        className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        <Download className="w-4 h-4 mr-1" />
        Export
      </button>
      <button
        onClick={() => onAction('enroll')}
        className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        <BookOpen className="w-4 h-4 mr-1" />
        Enroll
      </button>
      <button
        onClick={() => onAction('services')}
        className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        <Coffee className="w-4 h-4 mr-1" />
        Services
      </button>
      <button
        onClick={() => onAction('delete')}
        className="flex items-center px-3 py-1.5 text-sm bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
      >
        <Trash2 className="w-4 h-4 mr-1" />
        Delete
      </button>
    </div>
  </div>
);
