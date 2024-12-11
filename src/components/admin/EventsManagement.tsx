import React, { useState } from 'react';
import { Event } from '../../types/event';
import { format } from 'date-fns';
import { Search, ArrowUpDown, Calendar } from 'lucide-react';
import { getEventImage } from '../../utils/imageUtils';

interface EventsManagementProps {
  events: Event[];
}

type SortField = 'title' | 'date' | 'status' | 'revenue';
type SortDirection = 'asc' | 'desc';
type EventStatus = 'all' | 'active' | 'completed' | 'canceled';

export function EventsManagement({ events }: EventsManagementProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<EventStatus>('all');
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({
    field: 'date',
    direction: 'desc'
  });

  const getEventStatus = (event: Event): EventStatus => {
    const now = new Date();
    if (event.remainingSpots === event.capacity) return 'canceled';
    if (new Date(event.date) < now) return 'completed';
    return 'active';
  };

  const getEventRevenue = (event: Event): number => {
    return (event.capacity - event.remainingSpots) * event.price;
  };

  const filteredAndSortedEvents = events
    .filter(event => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        return (
          event.title.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter(event => {
      // Status filter
      if (statusFilter === 'all') return true;
      return getEventStatus(event) === statusFilter;
    })
    .sort((a, b) => {
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      
      switch (sortConfig.field) {
        case 'title':
          return direction * a.title.localeCompare(b.title);
        case 'date':
          return direction * (new Date(a.date).getTime() - new Date(b.date).getTime());
        case 'status':
          return direction * getEventStatus(a).localeCompare(getEventStatus(b));
        case 'revenue':
          return direction * (getEventRevenue(a) - getEventRevenue(b));
        default:
          return 0;
      }
    });

  const handleSort = (field: SortField) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 hover:text-indigo-600"
    >
      <span>{children}</span>
      <ArrowUpDown className={`w-4 h-4 ${
        sortConfig.field === field ? 'text-indigo-600' : 'text-gray-400'
      }`} />
    </button>
  );

  const getStatusBadgeColor = (status: EventStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as EventStatus)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Events</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="date">Date</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="status">Status</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tickets
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="revenue">Revenue</SortButton>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedEvents.map(event => {
              const status = getEventStatus(event);
              const revenue = getEventRevenue(event);
              const ticketsSold = event.capacity - event.remainingSpots;

              return (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={getEventImage(event.imageUrl)}
                        alt={event.title}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-500">{event.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{format(new Date(event.date), 'PPP')}</div>
                    <div className="text-sm text-gray-500">{format(new Date(event.date), 'p')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(status)}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticketsSold} sold</div>
                    <div className="text-sm text-gray-500">{event.remainingSpots} remaining</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${revenue.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}