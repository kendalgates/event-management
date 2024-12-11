import React from 'react';
import { Event } from '../../types/event';
import { format } from 'date-fns';

interface UpcomingEventsListProps {
  events: Event[];
}

export function UpcomingEventsList({ events }: UpcomingEventsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
          <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">View All</a>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {events.map(event => (
          <div key={event.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {format(event.date, 'PPP')} • {event.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {event.remainingSpots} spots left
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  ${event.price} per ticket
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}