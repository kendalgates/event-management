import { useState } from "react";
import { Event } from "../../types/event";
import { format } from "date-fns";
import { getEventImage } from "../../utils/imageUtils";
import { Download, Mail } from "lucide-react";
import { exportAttendeesToCSV } from "../../utils/exportUtils";

interface OrganizerEventListProps {
  events: Event[];
}

export function OrganizerEventList({ events }: OrganizerEventListProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const sortedEvents = [...events].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  // Mock attendee data - in a real app, this would come from the backend
  const getEventAttendees = (_eventId: string) => {
    const mockAttendees = [
      {
        name: "John Smith",
        email: "john.smith@example.com",
        ticketCount: 2,
        purchaseDate: new Date("2024-03-01"),
        ticketType: "Regular",
        totalPaid: 90.0,
      },
      {
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        ticketCount: 1,
        purchaseDate: new Date("2024-03-02"),
        ticketType: "VIP",
        totalPaid: 150.0,
      },
      {
        name: "Michael Brown",
        email: "michael.brown@example.com",
        ticketCount: 3,
        purchaseDate: new Date("2024-03-03"),
        ticketType: "Regular",
        totalPaid: 135.0,
      },
      {
        name: "Sarah Davis",
        email: "sarah.davis@example.com",
        ticketCount: 2,
        purchaseDate: new Date("2024-03-04"),
        ticketType: "Regular",
        totalPaid: 90.0,
      },
    ];
    return mockAttendees;
  };

  const handleExportEmails = (event: Event) => {
    const attendees = getEventAttendees(event.id);
    exportAttendeesToCSV(attendees, event);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Your Events</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {sortedEvents.map((event) => (
          <div key={event.id} className="p-6">
            <div className="flex items-start space-x-4">
              <img
                src={getEventImage(event.imageUrl)}
                alt={event.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {format(event.date, "PPP")}
                </p>
                <p className="mt-1 text-sm text-gray-500">{event.location}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {event.category}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Total Capacity: {event.capacity}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Available: {event.remainingSpots}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {event.capacity - event.remainingSpots} sold
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  $
                  {(
                    (event.capacity - event.remainingSpots) *
                    event.price
                  ).toLocaleString()}
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleExportEmails(event)}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export Attendees
                  </button>
                  <button
                    onClick={() =>
                      setSelectedEvent(
                        selectedEvent === event.id ? null : event.id
                      )
                    }
                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100"
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    View Attendees
                  </button>
                </div>
              </div>
            </div>

            {selectedEvent === event.id && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Attendee List
                </h4>
                <div className="space-y-2">
                  {getEventAttendees(event.id).map((attendee, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm"
                    >
                      <div>
                        <span className="text-gray-900">{attendee.name}</span>
                        <span className="text-gray-500 ml-2">
                          ({attendee.ticketCount} tickets)
                        </span>
                      </div>
                      <span className="text-gray-500">{attendee.email}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
