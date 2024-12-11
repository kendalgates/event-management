import React, { useState } from 'react';
import { X, Ticket, AlertCircle } from 'lucide-react';
import { Event } from '../types/event';

interface PurchaseTicketModalProps {
  event: Event;
  onClose: () => void;
  onPurchase: (eventId: string, quantity: number) => void;
}

export function PurchaseTicketModal({ event, onClose, onPurchase }: PurchaseTicketModalProps) {
  const [quantity, setQuantity] = useState(1);
  const maxTickets = Math.min(event.remainingSpots, 10); // Limit to 10 tickets per purchase

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPurchase(event.id, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Purchase Tickets</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
          <p className="text-gray-600 mt-1">{event.location}</p>
        </div>

        {event.remainingSpots === 0 ? (
          <div className="flex items-center p-4 mb-6 bg-red-50 text-red-800 rounded-lg">
            <AlertCircle className="w-5 h-5 mr-2" />
            <p>Sorry, this event is sold out!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Tickets
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {[...Array(maxTickets)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'ticket' : 'tickets'}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-500">
                {event.remainingSpots} spots remaining
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price per ticket</span>
                <span className="font-medium">${event.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${(event.price * quantity).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Ticket className="w-4 h-4 mr-2" />
                Purchase Tickets
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}