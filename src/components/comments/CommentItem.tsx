import React from 'react';
import { UserCircle } from 'lucide-react';
import { Comment } from '../../types/comment';
import { formatCommentDate } from '../../utils/commentUtils';

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex space-x-3 p-4 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0">
        <UserCircle className="w-10 h-10 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">{comment.author}</p>
          <span className="text-sm text-gray-500">{formatCommentDate(comment.createdAt)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{comment.content}</p>
      </div>
    </div>
  );
}