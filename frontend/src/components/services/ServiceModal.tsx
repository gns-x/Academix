import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Service, ServiceCategory, BillingFrequency } from '../../types';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onSave: (serviceData: Partial<Service>) => Promise<void>;
}

export function ServiceModal({ service, onClose, onSave }: ServiceModalProps) {
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    description: '',
    category: ServiceCategory.UNIFORM,
    baseCost: 0,
    billingFrequency: BillingFrequency.ONE_TIME,
    isActive: true,
  });

  useEffect(() => {
    if (service) {
      setFormData(service);
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                  {service ? 'Edit Service' : 'Create New Service'}
                </h3>
                <p className="text-sm text-gray-500">
                  {service ? 'Update the service details below' : 'Fill in the details to create a new service'}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Service Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#1ABC9C] focus:outline-none focus:ring-1 focus:ring-[#1ABC9C] sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#1ABC9C] focus:outline-none focus:ring-1 focus:ring-[#1ABC9C] sm:text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as ServiceCategory })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#1ABC9C] focus:outline-none focus:ring-1 focus:ring-[#1ABC9C] sm:text-sm"
                    >
                      {Object.values(ServiceCategory).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="billingFrequency" className="block text-sm font-medium text-gray-700">
                      Billing Frequency
                    </label>
                    <select
                      id="billingFrequency"
                      value={formData.billingFrequency}
                      onChange={(e) => setFormData({ ...formData, billingFrequency: e.target.value as BillingFrequency })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#1ABC9C] focus:outline-none focus:ring-1 focus:ring-[#1ABC9C] sm:text-sm"
                    >
                      {Object.values(BillingFrequency).map((frequency) => (
                        <option key={frequency} value={frequency}>
                          {frequency}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="baseCost" className="block text-sm font-medium text-gray-700">
                    Base Cost (MAD)
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">MAD</span>
                    </div>
                    <input
                      type="number"
                      id="baseCost"
                      value={formData.baseCost}
                      onChange={(e) => setFormData({ ...formData, baseCost: parseFloat(e.target.value) })}
                      className="block w-full rounded-md border border-gray-300 pl-12 py-2 focus:border-[#1ABC9C] focus:outline-none focus:ring-1 focus:ring-[#1ABC9C] sm:text-sm"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-[#1ABC9C] focus:ring-[#1ABC9C]"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                    Active Service
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-[#1ABC9C] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#16a085] sm:ml-3 sm:w-auto transition-all duration-200 transform hover:scale-105"
              >
                {service ? 'Update Service' : 'Create Service'}
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
