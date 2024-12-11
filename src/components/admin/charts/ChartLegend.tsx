import React from 'react';

interface ChartLegendProps {
  items: Array<{
    color: string;
    label: string;
  }>;
}

export function ChartLegend({ items }: ChartLegendProps) {
  return (
    <div className="flex justify-center space-x-6 mt-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-gray-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
}