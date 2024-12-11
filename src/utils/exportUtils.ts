import { format } from 'date-fns';
import { Event } from '../types/event';

interface Attendee {
  name: string;
  email: string;
  ticketCount: number;
  purchaseDate: Date;
  ticketType: string;
  totalPaid: number;
}

export function exportAttendeesToCSV(attendees: Attendee[], event: Event) {
  // Define CSV headers
  const headers = [
    'Name',
    'Email',
    'Ticket Type',
    'Number of Tickets',
    'Total Paid',
    'Purchase Date'
  ];

  // Convert attendees to CSV rows
  const rows = attendees.map(attendee => [
    attendee.name,
    attendee.email,
    attendee.ticketType,
    attendee.ticketCount,
    `$${attendee.totalPaid.toFixed(2)}`,
    format(attendee.purchaseDate, 'yyyy-MM-dd')
  ]);

  // Add headers as first row
  const csvContent = [
    headers,
    ...rows
  ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${event.title.toLowerCase().replace(/\s+/g, '-')}-attendees.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}