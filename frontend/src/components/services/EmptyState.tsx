import React from 'react';
import { Package } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <Package className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new service or try a different search term.
      </p>
    </div>
  );
}
