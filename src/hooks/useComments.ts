import { useState } from 'react';
import { Comment } from '../types/comment';
import { generateCommentId } from '../utils/commentUtils';
import { sampleComments } from '../data/sampleData';

export function useComments() {
  const [comments, setComments] = useState<Comment[]>(sampleComments);

  const addComment = (eventId: string, author: string, content: string) => {
    const newComment: Comment = {
      id: generateCommentId(),
      eventId,
      author,
      content,
      createdAt: new Date()
    };
    setComments(prev => [...prev, newComment]);
  };

  return {
    comments,
    addComment
  };
}