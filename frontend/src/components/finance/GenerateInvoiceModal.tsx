import React, { useState } from 'react';
import { X } from 'lucide-react';

interface GenerateInvoiceModalProps {
  student: { id: string; name: string };
  onClose: () => void;
  onSubmit: (invoiceData: any) => void;
}

export const GenerateInvoiceModal: React.FC<GenerateInvoiceModalProps> = ({
  student,
  onClose,
  onSubmit,
}) => {
  const [invoiceData, setInvoiceData] = useState({
    items: [{ description: '', amount: '', quantity: '1' }],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
  });

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', amount: '', quantity: '1' }],
    });
  };

  const removeItem = (index: number) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedItems = invoiceData.items.map(item => ({
      ...item,
      amount: parseFloat(item.amount),
      quantity: parseInt(item.quantity),
    }));
    onSubmit({
      studentId: student.id,
      items: processedItems,
      dueDate: invoiceData.dueDate,
      notes: invoiceData.notes,
    });
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((total, item) => {
      return total + (parseFloat(item.amount) || 0) * (parseInt(item.quantity) || 0);
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Generate Invoice</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name
              </label>
              <input
                type="text"
                value={student.name}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                required
                value={invoiceData.dueDate}
                onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Invoice Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="text-sm text-[#1ABC9C] hover:text-[#1ABC9C]/90"
              >
                + Add Item
              </button>
            </div>

            {invoiceData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-3">
                <div className="col-span-5">
                  <input
                    type="text"
                    required
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    placeholder="Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    required
                    value={item.amount}
                    onChange={(e) => updateItem(index, 'amount', e.target.value)}
                    placeholder="Amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    required
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                    placeholder="Qty"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
                  />
                </div>
                <div className="col-span-2">
                  {invoiceData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <div className="text-right">
                <span className="text-sm text-gray-500">Total Amount:</span>
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'MAD'
                  }).format(calculateTotal())}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={invoiceData.notes}
              onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
              rows={3}
              placeholder="Add any additional notes"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1ABC9C] text-white rounded-md hover:bg-[#1ABC9C]/90"
            >
              Generate Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
