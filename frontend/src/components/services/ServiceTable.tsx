import { Service } from '../../types';
import { ServiceTableRow } from './ServiceTableRow';

interface ServiceTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

export function ServiceTable({ services, onEdit, onDelete }: ServiceTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Service Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Base Cost
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Billing Frequency
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <ServiceTableRow
                key={service.id}
                service={service}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
