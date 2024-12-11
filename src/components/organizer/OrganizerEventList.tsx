import React from 'react';
import { Event } from '../../types/event';
import { format } from 'date-fns';
import { getEventImage } from '../../utils/imageUtils';

interface OrganizerEventListProps {
  events: Event[];
}

export function OrganizerEventList({ events }: OrganizerEventListProps) {
  const sortedEvents = [...events].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Your Events</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {sortedEvents.map(event => (
          <div key={event.id} className="p-6">
            <div className="flex items-start space-x-4">
              <img
                src={getEventImage(event.imageUrl, 'small')}
                alt={event.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{format(event.date, 'PPP')}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {event.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {event.remainingSpots} spots left
                  </span>
                  <span className="text-sm text-gray-500">
                    ${event.price}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {event.capacity - event.remainingSpots} sold
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  ${((event.capacity - event.remainingSpots) * event.price).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}