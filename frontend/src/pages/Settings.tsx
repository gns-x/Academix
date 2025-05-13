import  { useState } from 'react';
import {
  Globe,
  GraduationCap,
  Settings as SettingsIcon,
  DollarSign,
  Briefcase,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
} from 'lucide-react';

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  grades: string[];
  category: string;
  billingFrequency: 'monthly' | 'yearly' | 'one-time';
  autoEnroll: boolean;
  status: 'active' | 'inactive';
};

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [activeSection, setActiveSection] = useState('school-info');
  const [editingService, setEditingService] = useState<Service | null>(null);

  const tabs = [
    { id: 'general', name: 'General Settings', icon: SettingsIcon },
    { id: 'academic', name: 'Academic Settings', icon: GraduationCap },
    { id: 'services', name: 'Student Services', icon: Briefcase },
    { id: 'financial', name: 'Financial Settings', icon: DollarSign },
    { id: 'system', name: 'System Preferences', icon: Globe },
  ];

  const sections = {
    general: [
      { id: 'school-info', name: 'School Information' },
      { id: 'academic-year', name: 'Academic Year' },
      { id: 'branding', name: 'Branding' },
      { id: 'localization', name: 'Localization' },
    ],
    academic: [
      { id: 'grading', name: 'Grading System' },
      { id: 'class-config', name: 'Class Configuration' },
    ],
    services: [
      { id: 'service-config', name: 'Service Configuration' },
      { id: 'default-services', name: 'Default Services' },
      { id: 'service-categories', name: 'Service Categories' },
    ],
    financial: [
      { id: 'payment-config', name: 'Payment Configuration' },
      { id: 'discount-management', name: 'Discount Management' },
    ],
    system: [
      { id: 'access-control', name: 'User Access Control' },
      { id: 'notifications', name: 'Notification Settings' },
      { id: 'integrations', name: 'Integration Settings' },
    ],
  };

  // Mock services data
  const [services] = useState<Service[]>([
    {
      id: '1',
      name: 'School Bus Service',
      description: 'Daily transportation to and from school',
      price: 150,
      grades: ['All'],
      category: 'Transportation',
      billingFrequency: 'monthly',
      autoEnroll: false,
      status: 'active',
    },
    {
      id: '2',
      name: 'Lunch Program',
      description: 'Nutritious daily lunch service',
      price: 200,
      grades: ['All'],
      category: 'Meals',
      billingFrequency: 'monthly',
      autoEnroll: true,
      status: 'active',
    },
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <ServicesContent services={services} onEdit={setEditingService} />;
      default:
        return <SettingsForm section={activeSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your school's settings and configurations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <nav className="space-y-6">
              {tabs.map((tab) => (
                <div key={tab.id}>
                  <button
                    onClick={() => {
                      setActiveTab(tab.id);
                      setActiveSection(sections[tab.id][0].id);
                    }}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="mr-3 h-5 w-5" />
                    {tab.name}
                  </button>

                  {activeTab === tab.id && (
                    <div className="mt-2 space-y-1 pl-12">
                      {sections[tab.id].map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg ${
                            activeSection === section.id
                              ? 'text-blue-700 bg-blue-50'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {section.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <div className="bg-white rounded-xl shadow-sm">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Service Edit Modal */}
      {editingService && (
        <ServiceModal
          service={editingService}
          onClose={() => setEditingService(null)}
        />
      )}
    </div>
  );
}

function SettingsForm({ section }: { section: string }) {
  const renderSection = () => {
    switch (section) {
      case 'school-info':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                School Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="International Academy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="123 Education Street&#10;Academic City, AC 12345"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue="contact@academy.edu"
                />
              </div>
            </div>
          </div>
        );
      // Add other section renders here
      default:
        return (
          <div className="p-6">
            <p className="text-gray-500">Select a section to configure</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <form className="space-y-8">{renderSection()}</form>
    </div>
  );
}

function ServicesContent({
  services,
  onEdit,
}: {
  services: Service[];
  onEdit: (service: Service) => void;
}) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Services</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </button>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                Service
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Category
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Price
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Billing
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3">
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium text-gray-900">
                        {service.name}
                      </div>
                      <div className="text-gray-500">{service.description}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {service.category}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  ${service.price}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {service.billingFrequency}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      service.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(service)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ServiceModal({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-medium">Edit Service</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue={service.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue={service.category}
              >
                <option>Transportation</option>
                <option>Meals</option>
                <option>Activities</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue={service.description}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  className="block w-full pl-7 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  defaultValue={service.price}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Billing Frequency
              </label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue={service.billingFrequency}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="one-time">One-time</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Applicable Grades
            </label>
            <div className="mt-2 space-y-2">
              {['All Grades', 'Elementary', 'Middle School', 'High School'].map(
                (grade) => (
                  <label
                    key={grade}
                    className="inline-flex items-center mr-6"
                  >
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      defaultChecked={service.grades.includes(grade)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{grade}</span>
                  </label>
                )
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              defaultChecked={service.autoEnroll}
            />
            <label className="ml-2 text-sm text-gray-700">
              Auto-enroll new students
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
