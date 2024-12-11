import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationFilterProps {
  location: string;
  onChange: (location: string) => void;
}

export function LocationFilter({ location, onChange }: LocationFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center text-gray-700">
        <MapPin className="w-4 h-4 mr-2" />
        <h3 className="font-medium">Location</h3>
      </div>
      
      <input
        type="text"
        placeholder="Search by location..."
        value={location}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}