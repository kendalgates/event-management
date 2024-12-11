import React from 'react';
import { DollarSign } from 'lucide-react';

interface PriceRangeFilterProps {
  priceRange: {
    min: number;
    max: number;
  };
  onChange: (priceRange: { min: number; max: number }) => void;
}

export function PriceRangeFilter({ priceRange, onChange }: PriceRangeFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center text-gray-700">
        <DollarSign className="w-4 h-4 mr-2" />
        <h3 className="font-medium">Price Range</h3>
      </div>
      
      <div className="space-y-2">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Min Price ($)</label>
          <input
            type="number"
            min="0"
            value={priceRange.min}
            onChange={(e) =>
              onChange({ ...priceRange, min: Number(e.target.value) })
            }
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Max Price ($)</label>
          <input
            type="number"
            min="0"
            value={priceRange.max}
            onChange={(e) =>
              onChange({ ...priceRange, max: Number(e.target.value) })
            }
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}