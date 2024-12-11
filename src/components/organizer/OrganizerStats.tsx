import React from 'react';
import { DollarSign, Ticket, Users, Calendar } from 'lucide-react';
import { StatCard } from '../admin/StatCard';

interface OrganizerStatsProps {
  totalRevenue: number;
  ticketsSold: number;
  totalAttendees: number;
  activeEvents: number;
}

export function OrganizerStats({
  totalRevenue,
  ticketsSold,
  totalAttendees,
  activeEvents,
}: OrganizerStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Revenue"
        value={`$${totalRevenue.toLocaleString()}`}
        icon={<DollarSign className="w-6 h-6 text-green-600" />}
        trend={+12.5}
      />
      <StatCard
        title="Tickets Sold"
        value={ticketsSold.toString()}
        icon={<Ticket className="w-6 h-6 text-blue-600" />}
        trend={+8.2}
      />
      <StatCard
        title="Total Attendees"
        value={totalAttendees.toString()}
        icon={<Users className="w-6 h-6 text-purple-600" />}
        trend={+15.3}
      />
      <StatCard
        title="Active Events"
        value={activeEvents.toString()}
        icon={<Calendar className="w-6 h-6 text-orange-600" />}
        trend={0}
      />
    </div>
  );
}