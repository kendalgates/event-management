import React from 'react';
import { Event } from '../../types/event';
import { format } from 'date-fns';

interface AttendeeListProps {
  events: Event[];
}

interface Attendee {
  name: string;
  email: string;
  eventTitle: string;
  purchaseDate: Date;
  ticketCount: number;
}

// Simulated attendee data - in a real app, this would come from the backend
const generateAttendees = (events: Event[]): Attendee[] => {
  const attendees: Attendee[] = [];
  const names = ['John Smith', 'Emma Wilson', 'Michael Brown', 'Sarah Davis', 'David Lee'];
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];

  events.forEach(event => {
    const soldTickets = event.capacity - event.remainingSpots;
    if (soldTickets > 0) {
      const attendeeCount = Math.min(soldTickets, Math.floor(Math.random() * 3) + 1);
      for (let i = 0; i < attendeeCount; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const email = `${name.toLowerCase().replace(' ', '.')}@${domains[Math.floor(Math.random() * domains.length)]}`;
        attendees.push({
          name,
          email,
          eventTitle: event.title,
          purchaseDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          ticketCount: Math.floor(Math.random() * 3) + 1
        });
      }
    }
  });

  return attendees.sort((a, b) => b.purchaseDate.getTime() - a.purchaseDate.getTime());
};

export function AttendeeList({ events }: AttendeeListProps) {
  const attendees = generateAttendees(events);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Attendees</h2>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {attendees.map((attendee, index) => (
          <div key={index} className="p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {attendee.name}
                </p>
                <p className="text-sm text-gray-500 truncate">{attendee.email}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {attendee.eventTitle} • {attendee.ticketCount} ticket{attendee.ticketCount > 1 ? 's' : ''}
                </p>
              </div>
              <div className="text-right text-xs text-gray-500">
                {format(attendee.purchaseDate, 'MMM d')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}