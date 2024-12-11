import React, { useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Comment } from '../../types/comment';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';
import { useScrollLock } from '../../hooks/useScrollLock';

interface CommentsModalProps {
  eventTitle: string;
  comments: Comment[];
  onClose: () => void;
  onAddComment: (author: string, content: string) => void;
}

export function CommentsModal({
  eventTitle,
  comments,
  onClose,
  onAddComment,
}: CommentsModalProps) {
  useScrollLock();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Comments</h2>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close comments"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-4">{eventTitle}</h3>

          <div className="mb-6">
            <CommentForm onSubmit={onAddComment} />
          </div>

          <div className="overflow-y-auto max-h-[50vh] pr-2">
            {comments.length > 0 ? (
              <CommentList comments={comments} />
            ) : (
              <p className="text-center text-gray-500 py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}