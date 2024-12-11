import React from 'react';
import { User } from '../../types/user';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface RecentlyAttendedEventsProps {
  user: User;
}

export function RecentlyAttendedEvents({ user }: RecentlyAttendedEventsProps) {
  // Mock data - in a real app, this would come from the backend
  const recentEvents = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: new Date('2024-06-15'),
      ticketCount: 2
    },
    {
      id: 2,
      title: 'Food & Wine Festival',
      date: new Date('2024-07-01'),
      ticketCount: 1
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Recently Attended Events</h3>
      <div className="space-y-3">
        {recentEvents.map(event => (
          <div key={event.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-900">{event.title}</div>
              <div className="text-xs text-gray-500">
                {format(event.date, 'PPP')} • {event.ticketCount} ticket{event.ticketCount > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}