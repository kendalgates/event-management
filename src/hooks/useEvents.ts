import { useState, useEffect } from 'react';
import { Event } from '../types/event';
import { generateEventId } from '../utils/eventUtils';
import { sampleEvents } from '../data/sampleData';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>(sampleEvents);

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent = {
      ...eventData,
      id: generateEventId(),
      remainingSpots: eventData.capacity
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: string, eventData: Omit<Event, 'id'>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...eventData, id } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const purchaseTickets = (eventId: string, quantity: number) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId
        ? { ...event, remainingSpots: event.remainingSpots - quantity }
        : event
    ));
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    purchaseTickets
  };
}