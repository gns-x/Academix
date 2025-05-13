import React from 'react';
import { ConfirmationDialogProps } from '../../types';

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type
}) => {
  if (!isOpen) return null;

  const colors = {
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    danger: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className={`p-4 ${colors[type]} rounded-t-lg border-b`}>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-600">{message}</p>
        </div>
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md
              ${type === 'danger' ? 'bg-red-600 hover:bg-red-700' :
                type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700' :
                'bg-blue-600 hover:bg-blue-700'}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
