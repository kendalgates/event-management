import { User } from '../types/user';

export const canCreateEvent = (user: User | null): boolean => {
  return user?.role === 'organizer' || user?.role === 'admin';
};

export const canEditEvent = (user: User | null, eventOrganizerId: string): boolean => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return user.role === 'organizer' && user.id === eventOrganizerId;
};

export const canAccessAdminDashboard = (user: User | null): boolean => {
  return user?.role === 'admin';
};

export const canAccessOrganizerDashboard = (user: User | null): boolean => {
  return user?.role === 'organizer' || user?.role === 'admin';
};

export const canPurchaseTickets = (user: User | null): boolean => {
  return user?.role === 'attendee' || user?.role === 'admin';
};