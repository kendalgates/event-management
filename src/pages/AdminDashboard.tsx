import React, { useState } from 'react';
import { DashboardStats } from '../components/admin/DashboardStats';
import { SalesChart } from '../components/admin/SalesChart';
import { UserManagement } from '../components/admin/UserManagement';
import { EventsManagement } from '../components/admin/EventsManagement';
import { Event } from '../types/event';
import { sampleUsers } from '../data/sampleData';

interface AdminDashboardProps {
  events: Event[];
}

export function AdminDashboard({ events }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'events'>('overview');

  const calculateStats = () => {
    const activeEvents = events.filter(
      event => new Date(event.date) >= new Date()
    ).length;

    const totalRevenue = events.reduce((sum, event) => {
      return sum + (event.capacity - event.remainingSpots) * event.price;
    }, 0);

    const ticketsSold = events.reduce((sum, event) => {
      return sum + (event.capacity - event.remainingSpots);
    }, 0);

    const totalAttendees = ticketsSold;

    return {
      totalRevenue,
      ticketsSold,
      totalAttendees,
      activeEvents,
    };
  };

  const stats = calculateStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage users, events, and view platform statistics
        </p>
      </div>

      <div className="mb-8">
        <nav className="flex space-x-4">
          {['overview', 'users', 'events'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === tab
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <>
          <DashboardStats {...stats} />
          <div className="mt-8">
            <SalesChart events={events} />
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <UserManagement users={sampleUsers} events={events} />
      )}

      {activeTab === 'events' && (
        <EventsManagement events={events} />
      )}
    </div>
  );
}