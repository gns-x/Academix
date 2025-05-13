import React, { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  UserPlus,
  Users,
  Search,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Shield,
  CheckCircle,
} from 'lucide-react';

// Mock data - replace with your actual data source
const mockGuardians = [
  {
    id: 1,
    first_name: 'Jane',
    last_name: 'Smith',
    relationship: 'Mother',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA',
    emergency_priority: 1,
    communication_preferences: ['email', 'phone'],
    legal_authority: true
  },
  {
    id: 2,
    first_name: 'John',
    last_name: 'Smith',
    relationship: 'Father',
    email: 'john.smith@example.com',
    phone: '+1 (555) 987-6543',
    address: '123 Main St, Anytown, USA',
    emergency_priority: 2,
    communication_preferences: ['phone', 'sms'],
    legal_authority: true
  },
];

export function GuardianForm() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof mockGuardians>([]);
  const [selectedGuardian, setSelectedGuardian] = useState<(typeof mockGuardians)[0] | null>(null);

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
    handleSubmit,
  } = useFormContext();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = mockGuardians.filter(guardian =>
      `${guardian.first_name} ${guardian.last_name}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSelectGuardian = (guardian: typeof mockGuardians[0]) => {
    setSelectedGuardian(guardian);
    // Pre-fill form with guardian data
    Object.entries(guardian).forEach(([key, value]) => {
      if (key !== 'id') {
        setValue(key, value);
      }
    });
    setSearchResults([]);
    setSearchQuery(`${guardian.first_name} ${guardian.last_name}`);
  };

  const handleAddNew = () => {
    setSelectedGuardian(null);
    setShowForm(true);
    setSearchQuery('');
    setSearchResults([]);
    // Reset form fields
    ['first_name', 'last_name', 'email', 'phone', 'address', 'relationship',
     'emergency_priority', 'communication_preferences', 'legal_authority', 'documents']
      .forEach(field => setValue(field, field === 'emergency_priority' ? 1 : ''));
  };

  if (!showForm) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Users className="w-6 h-6 mr-2 text-blue-600" />
            Guardian Information
          </h2>

          {/* Search Section */}
          <div className="space-y-6">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search for existing guardian..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors duration-200"
                />
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
                  {searchResults.map((guardian) => (
                    <button
                      key={guardian.id}
                      onClick={() => handleSelectGuardian(guardian)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center justify-between group transition-colors duration-200"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {guardian.first_name} {guardian.last_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {guardian.relationship} • {guardian.email}
                        </p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedGuardian ? (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-blue-900">Selected Guardian</h3>
                  <button
                    onClick={() => setSelectedGuardian(null)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-1">
                  <p className="text-blue-900">
                    {selectedGuardian.first_name} {selectedGuardian.last_name}
                  </p>
                  <p className="text-sm text-blue-800">
                    {selectedGuardian.relationship} • {selectedGuardian.email}
                  </p>
                  <p className="text-sm text-blue-800">
                    {selectedGuardian.phone}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={handleAddNew}
                  className="w-full flex items-center justify-center space-x-2 bg-white border-2 border-dashed border-blue-300 rounded-lg py-3 px-4 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-colors duration-200"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Add New Guardian</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Rest of the form remains the same as in your current implementation
  // Only shown when adding a new guardian
  return (
    <div className="space-y-8">
      {/* Form Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-xl font-semibold text-gray-900">
          New Guardian Information
        </h2>
        <button
          onClick={() => setShowForm(false)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Back to search
        </button>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {/* Personal Information Section */}
        <div className="col-span-2 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                {...register('first_name')}
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.first_name && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.first_name.message?.toString()}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                {...register('last_name')}
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.last_name && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.last_name.message?.toString()}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                Email Address
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                {...register('phone')}
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.phone && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phone.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="col-span-2 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Address Information
          </h3>
          <div className="space-y-2">
            <textarea
              {...register('address')}
              rows={3}
              className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter complete address..."
            />
            {errors.address && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.address.message?.toString()}
              </p>
            )}
          </div>
        </div>

        {/* Relationship & Priority Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Relationship to Student
            </label>
            <select
              {...register('relationship')}
              className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select relationship...</option>
              {['Mother', 'Father', 'Grandmother', 'Grandfather', 'Aunt', 'Uncle', 'Legal Guardian', 'Other'].map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
            {errors.relationship && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.relationship.message?.toString()}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Emergency Priority
            </label>
            <select
              {...register('emergency_priority', { valueAsNumber: true })}
              className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5].map((priority) => (
                <option key={priority} value={priority}>
                  Priority {priority} {priority === 1 ? '(Primary Contact)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Communication & Legal Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Communication Preferences
            </label>
            <div className="space-y-2">
              {['Email', 'Phone', 'SMS'].map((method) => (
                <label key={method} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                  <input
                    type="checkbox"
                    {...register('communication_preferences')}
                    value={method.toLowerCase()}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                {...register('legal_authority')}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="space-y-1">
                <span className="text-sm font-medium text-gray-900 flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Legal Authority Confirmation
                </span>
                <span className="text-xs text-gray-500 block">
                  I confirm that I have legal authority over the student and can make decisions on their behalf.
                </span>
              </div>
            </label>
            {errors.legal_authority && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.legal_authority.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
