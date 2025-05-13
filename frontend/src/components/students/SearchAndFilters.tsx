import React from 'react';
import { Search, RefreshCw, Grid, LayoutList } from 'lucide-react';
import { ViewMode, Filters } from '../../types';

interface SearchAndFiltersProps {
  searchTerm: string;
  filters: Filters;
  viewMode: ViewMode;
  onSearchChange: (value: string) => void;
  onFilterChange: (filters: Filters) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onReset: () => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  filters,
  viewMode,
  onSearchChange,
  onFilterChange,
  onViewModeChange,
  onReset
}) => (
  <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ABC9C]"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <select
        className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C]"
        value={filters.grade}
        onChange={(e) => onFilterChange({ ...filters, grade: e.target.value })}
      >
        <option value="">All Grades</option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={String(i + 1)}>Grade {i + 1}</option>
        ))}
      </select>

      <select
        className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C]"
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Graduated">Graduated</option>
      </select>

      <select
        className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C]"
        value={filters.year}
        onChange={(e) => onFilterChange({ ...filters, year: e.target.value })}
      >
        <option value="">All Years</option>
        <option value="2023-2024">2023-2024</option>
        <option value="2022-2023">2022-2023</option>
      </select>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded-md ${
            viewMode === 'list'
              ? 'bg-[#1ABC9C] text-white'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <LayoutList className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded-md ${
            viewMode === 'grid'
              ? 'bg-[#1ABC9C] text-white'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Grid className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={onReset}
        className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900"
      >
        <RefreshCw className="w-4 h-4 mr-1" />
        Reset
      </button>
    </div>
  </div>
);
