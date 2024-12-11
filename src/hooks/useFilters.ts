import { useState } from 'react';
import { Event } from '../types/event';

export interface FilterState {
  dateRange: { start: Date | null; end: Date | null };
  categories: string[];
  priceRange: { min: number; max: number };
  location: string;
}

const initialFilters: FilterState = {
  dateRange: { start: null, end: null },
  categories: [],
  priceRange: { min: 0, max: 1000 },
  location: ''
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const filterEvents = (events: Event[]): Event[] => {
    return events.filter(event => {
      // Date filter
      if (filters.dateRange.start && new Date(event.date) < filters.dateRange.start) return false;
      if (filters.dateRange.end && new Date(event.date) > filters.dateRange.end) return false;

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(event.category)) return false;

      // Price filter
      if (event.price < filters.priceRange.min || event.price > filters.priceRange.max) return false;

      // Location filter
      if (filters.location && !event.location.toLowerCase().includes(filters.location.toLowerCase())) return false;

      return true;
    });
  };

  return {
    filters,
    handleFilterChange,
    resetFilters,
    filterEvents
  };
}