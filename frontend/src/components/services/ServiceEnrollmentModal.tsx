import React, { useState, useEffect } from 'react';
import { X, Search, Filter, Check, AlertCircle, Package } from 'lucide-react';
import axios from 'axios';
import { Service, BillingCycle, ServiceCategory } from '../../types';

interface ServiceEnrollmentModalProps {
  studentIds: string[];
  onClose: () => void;
  onSuccess: () => void;
}

export function ServiceEnrollmentModal({ studentIds, onClose, onSuccess }: ServiceEnrollmentModalProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'ALL'>('ALL');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    billingCycle: 'ADVANCE' as BillingCycle,
    autoRenew: false
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/services');
      setServices(response.data.filter((service: Service) => service.isActive));
    } catch (error) {
      setError('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      setError('Please select at least one service');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const enrollmentPromises = selectedServices.map(serviceId =>
        axios.post('http://localhost:3000/service-enrollments', {
          serviceId,
          studentIds,
          billingCycle: formData.billingCycle,
          autoRenew: formData.autoRenew,
          startDate: new Date()
        })
      );

      await Promise.all(enrollmentPromises);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to enroll in services');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ['ALL', ...Object.values(ServiceCategory)];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1ABC9C]"></div>
            <p>Loading services...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Package className="w-6 h-6 text-[#1ABC9C]" />
              <h2 className="text-xl font-semibold text-gray-900">
                Service Enrollment
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-[#1ABC9C]/10 text-[#1ABC9C]">
                {studentIds.length} students selected
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-[calc(100vh-200px)]">
          <div className="flex-1 overflow-hidden">
            {/* Search and Filters */}
            <div className="p-6 border-b bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
                  />
                </div>
                <div className="sm:w-64 flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as ServiceCategory | 'ALL')}
                    className="flex-1 border border-gray-300 rounded-lg py-2 px-3 focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0) + category.slice(1).toLowerCase().replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`relative cursor-pointer rounded-lg border p-4 transition-all ${
                      selectedServices.includes(service.id)
                        ? 'border-[#1ABC9C] bg-[#1ABC9C]/5'
                        : 'border-gray-200 hover:border-[#1ABC9C]/50'
                    }`}
                  >
                    {selectedServices.includes(service.id) && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-5 h-5 text-[#1ABC9C]" />
                      </div>
                    )}
                    <h3 className="font-medium text-gray-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#1ABC9C]">
                        {service.baseCost}/{service.billingFrequency.toLowerCase()} MAD
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {service.category.toLowerCase().replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Billing Cycle
                    </label>
                    <select
                      value={formData.billingCycle}
                      onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value as BillingCycle })}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
                    >
                      <option value="ADVANCE">Advance</option>
                      <option value="ARREARS">Arrears</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Auto-renew
                    </label>
                    <div className="flex items-center h-10">
                      <input
                        type="checkbox"
                        checked={formData.autoRenew}
                        onChange={(e) => setFormData({ ...formData, autoRenew: e.target.checked })}
                        className="rounded border-gray-300 text-[#1ABC9C] focus:ring-[#1ABC9C]"
                      />
                      <span className="ml-2 text-sm text-gray-600">Enable automatic renewal</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || selectedServices.length === 0}
                  className="px-4 py-2 bg-[#1ABC9C] text-white rounded-lg hover:bg-[#16a085] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? 'Enrolling...' : `Enroll in ${selectedServices.length} Services`}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
