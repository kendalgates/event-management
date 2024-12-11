import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface EventActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function EventActions({ onEdit, onDelete }: EventActionsProps) {
  const handleClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className="absolute top-4 right-4 flex space-x-2">
      <button
        onClick={(e) => handleClick(e, onEdit)}
        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        title="Edit event"
      >
        <Edit2 className="w-4 h-4 text-gray-600" />
      </button>
      <button
        onClick={(e) => handleClick(e, onDelete)}
        className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
        title="Delete event"
      >
        <Trash2 className="w-4 h-4 text-red-600" />
      </button>
    </div>
  );
}