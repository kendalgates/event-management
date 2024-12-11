import React from 'react';

interface StatsSummaryProps {
  revenue: number;
  tickets: number;
  events: number;
}

export function StatsSummary({ revenue, tickets, events }: StatsSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      <div className="text-center">
        <div className="text-2xl font-bold text-indigo-600">
          ${revenue.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">Total Revenue</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">
          {tickets.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">Total Tickets</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-amber-600">{events}</div>
        <div className="text-sm text-gray-500">Total Events</div>
      </div>
    </div>
  );
}