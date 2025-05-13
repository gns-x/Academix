import { useState, useEffect } from 'react';
import axios from 'axios';
import { Service } from '../types';
import { ServiceModal } from '../components/services/ServiceModal';
import { ServiceHeader } from '../components/services/ServiceHeader';
import { SearchBar } from '../components/services/SearchBar';
import { ServiceTable } from '../components/services/ServiceTable';
import { EmptyState } from '../components/services/EmptyState';

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/services');
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (service: Service) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`http://localhost:3000/services/${service.id}`);
        fetchServices();
      } catch (error) {
        console.error('Failed to delete service:', error);
      }
    }
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <ServiceHeader onCreateNew={() => setShowCreateModal(true)} />

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1ABC9C]"></div>
          </div>
        ) : filteredServices.length > 0 ? (
          <ServiceTable
            services={filteredServices}
            onEdit={setEditingService}
            onDelete={handleDelete}
          />
        ) : (
          <EmptyState />
        )}

        {(showCreateModal || editingService) && (
          <ServiceModal
            service={editingService}
            onClose={() => {
              setShowCreateModal(false);
              setEditingService(null);
            }}
            onSave={async (serviceData) => {
              try {
                if (editingService) {
                  await axios.patch(`http://localhost:3000/services/${editingService.id}`, serviceData);
                } else {
                  await axios.post('http://localhost:3000/services', serviceData);
                }
                fetchServices();
                setShowCreateModal(false);
                setEditingService(null);
              } catch (error) {
                console.error('Failed to save service:', error);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
