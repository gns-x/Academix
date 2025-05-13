import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Service } from '../../types';

interface ServiceTableRowProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

export function ServiceTableRow({ service, onEdit, onDelete }: ServiceTableRowProps) {
  return (
    <tr className="hover:bg-gray-50/50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{service.name}</div>
        <div className="text-sm text-gray-500">{service.description}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 transition-all duration-200 hover:bg-blue-200">
          {service.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-medium">{service.baseCost} MAD</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{service.billingFrequency}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
            service.isActive
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          }`}
        >
          {service.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onEdit(service)}
          className="text-indigo-600 hover:text-indigo-900 mr-4 p-2 hover:bg-indigo-50 rounded-full transition-all duration-200"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(service)}
          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
