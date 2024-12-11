import React from 'react';
import { MessageCircle } from 'lucide-react';

interface CommentCountProps {
  count: number;
  onClick: () => void;
}

export function CommentCount({ count, onClick }: CommentCountProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
    >
      <MessageCircle className="w-4 h-4 mr-1" />
      <span className="text-sm">
        {count} {count === 1 ? 'comment' : 'comments'}
      </span>
    </button>
  );
}