import React from 'react';
import { Plus } from 'lucide-react';

interface ServiceHeaderProps {
  onCreateNew: () => void;
}

export function ServiceHeader({ onCreateNew }: ServiceHeaderProps) {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Services</h1>
        <p className="text-gray-600 mt-1">Manage your service offerings and pricing</p>
      </div>
      <button
        onClick={onCreateNew}
        className="flex items-center px-4 py-2 bg-[#1ABC9C] text-white rounded-lg hover:bg-[#16a085] transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New Service
      </button>
    </div>
  );
}
