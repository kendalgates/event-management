import React from 'react';
import { Event } from '../types/event';
import { Comment } from '../types/comment';
import { User } from '../types/user';
import { EventCard } from './EventCard';

interface EventListProps {
  events: Event[];
  comments: Comment[];
  user: User | null;
  onSelectEvent: (event: Event) => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (event: Event) => void;
  onCommentClick: (event: Event) => void;
}

export function EventList({
  events,
  comments,
  user,
  onSelectEvent,
  onEditEvent,
  onDeleteEvent,
  onCommentClick
}: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No events found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event}
          comments={comments}
          user={user}
          onSelect={onSelectEvent}
          onEdit={onEditEvent}
          onDelete={onDeleteEvent}
          onCommentClick={onCommentClick}
        />
      ))}
    </div>
  );
}