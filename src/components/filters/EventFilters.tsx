import React from 'react';
import { DateFilter } from './DateFilter';
import { CategoryFilter } from './CategoryFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { LocationFilter } from './LocationFilter';
import { Filter } from 'lucide-react';

interface FilterState {
  dateRange: { start: Date | null; end: Date | null };
  categories: string[];
  priceRange: { min: number; max: number };
  location: string;
}

interface EventFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
}

export function EventFilters({ filters, onFilterChange, onReset }: EventFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          Reset all
        </button>
      </div>

      <DateFilter
        dateRange={filters.dateRange}
        onChange={(dateRange) => onFilterChange({ dateRange })}
      />

      <CategoryFilter
        selectedCategories={filters.categories}
        onChange={(categories) => onFilterChange({ categories })}
      />

      <PriceRangeFilter
        priceRange={filters.priceRange}
        onChange={(priceRange) => onFilterChange({ priceRange })}
      />

      <LocationFilter
        location={filters.location}
        onChange={(location) => onFilterChange({ location })}
      />
    </div>
  );
}