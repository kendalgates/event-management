import React from 'react';
import { Tag } from 'lucide-react';

const CATEGORIES = [
  { id: 'community', label: 'Community' },
  { id: 'festival', label: 'Festival' },
  { id: 'concert', label: 'Concert' },
  { id: 'workshop', label: 'Workshop' },
];

interface CategoryFilterProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export function CategoryFilter({ selectedCategories, onChange }: CategoryFilterProps) {
  const handleChange = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center text-gray-700">
        <Tag className="w-4 h-4 mr-2" />
        <h3 className="font-medium">Categories</h3>
      </div>
      
      <div className="space-y-2">
        {CATEGORIES.map((category) => (
          <label key={category.id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleChange(category.id)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">{category.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}