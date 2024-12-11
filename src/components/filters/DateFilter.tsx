import React from 'react';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  onChange: (dateRange: { start: Date | null; end: Date | null }) => void;
}

export function DateFilter({ dateRange, onChange }: DateFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center text-gray-700">
        <Calendar className="w-4 h-4 mr-2" />
        <h3 className="font-medium">Date Range</h3>
      </div>
      
      <div className="space-y-2">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Start Date</label>
          <input
            type="date"
            value={dateRange.start?.toISOString().split('T')[0] || ''}
            onChange={(e) =>
              onChange({
                ...dateRange,
                start: e.target.value ? new Date(e.target.value) : null,
              })
            }
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">End Date</label>
          <input
            type="date"
            value={dateRange.end?.toISOString().split('T')[0] || ''}
            onChange={(e) =>
              onChange({
                ...dateRange,
                end: e.target.value ? new Date(e.target.value) : null,
              })
            }
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}