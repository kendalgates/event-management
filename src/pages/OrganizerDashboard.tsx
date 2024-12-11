import React from 'react';
import { OrganizerStats } from '../components/organizer/OrganizerStats';
import { OrganizerEventList } from '../components/organizer/OrganizerEventList';
import { AttendeeList } from '../components/organizer/AttendeeList';
import { Event } from '../types/event';
import { User } from '../types/user';

interface OrganizerDashboardProps {
  user: User;
  events: Event[];
}

export function OrganizerDashboard({ user, events }: OrganizerDashboardProps) {
  // Filter events for this organizer
  const organizerEvents = events.filter(event => event.organizer === user.id);

  // Calculate stats
  const stats = {
    totalRevenue: organizerEvents.reduce((sum, event) => {
      return sum + (event.capacity - event.remainingSpots) * event.price;
    }, 0),
    ticketsSold: organizerEvents.reduce((sum, event) => {
      return sum + (event.capacity - event.remainingSpots);
    }, 0),
    totalAttendees: organizerEvents.reduce((sum, event) => {
      return sum + (event.capacity - event.remainingSpots);
    }, 0),
    activeEvents: organizerEvents.filter(event => new Date(event.date) >= new Date()).length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user.name}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your events and view performance metrics
        </p>
      </div>

      <OrganizerStats {...stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <OrganizerEventList events={organizerEvents} />
        </div>
        <div>
          <AttendeeList events={organizerEvents} />
        </div>
      </div>
    </div>
  );
}