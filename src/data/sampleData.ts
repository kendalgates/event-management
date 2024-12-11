import { User, UserRole } from '../types/user';
import { Event } from '../types/event';
import { Comment } from '../types/comment';

// Sample Users
export const sampleUsers: User[] = [
  // Admin
  {
    id: 'admin1',
    email: 'admin@localevents.com',
    name: 'System Admin',
    role: 'admin',
    createdAt: new Date('2024-01-01')
  },
  // Organizers
  {
    id: 'org1',
    email: 'sarah@musicfest.com',
    name: 'Sarah Johnson',
    role: 'organizer',
    organizationName: 'Music Fest Productions',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'org2',
    email: 'mike@foodevents.com',
    name: 'Mike Anderson',
    role: 'organizer',
    organizationName: 'Culinary Events Co',
    createdAt: new Date('2024-01-20')
  },
  {
    id: 'org3',
    email: 'emma@artspace.com',
    name: 'Emma Roberts',
    role: 'organizer',
    organizationName: 'Art Space Gallery',
    createdAt: new Date('2024-01-25')
  },
  // Attendees
  {
    id: 'att1',
    email: 'alex@example.com',
    name: 'Alex Thompson',
    role: 'attendee',
    createdAt: new Date('2024-02-01')
  },
  {
    id: 'att2',
    email: 'lisa@example.com',
    name: 'Lisa Chen',
    role: 'attendee',
    createdAt: new Date('2024-02-05')
  }
];

// Sample Events
export const sampleEvents: Event[] = [
  // Sarah's Events (Music)
  {
    id: 'evt1',
    title: 'Summer Music Festival',
    description: 'A day of live music featuring local and international artists',
    date: new Date('2024-06-15'),
    location: 'Central Park',
    price: 45,
    capacity: 500,
    remainingSpots: 167,
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    organizer: 'org1',
    category: 'festival'
  },
  {
    id: 'evt2',
    title: 'Jazz Night',
    description: 'An evening of smooth jazz and fine dining',
    date: new Date('2024-04-20'),
    location: 'Blue Note Club',
    price: 35,
    capacity: 100,
    remainingSpots: 25,
    imageUrl: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f',
    organizer: 'org1',
    category: 'concert'
  },
  {
    id: 'evt3',
    title: 'Rock Concert',
    description: 'Local rock bands showcase',
    date: new Date('2024-05-10'),
    location: 'City Arena',
    price: 30,
    capacity: 200,
    remainingSpots: 89,
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    organizer: 'org1',
    category: 'concert'
  },

  // Mike's Events (Food)
  {
    id: 'evt4',
    title: 'Food & Wine Festival',
    description: 'Taste the best local wines and cuisine',
    date: new Date('2024-07-01'),
    location: 'Riverside Gardens',
    price: 65,
    capacity: 300,
    remainingSpots: 89,
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    organizer: 'org2',
    category: 'festival'
  },
  {
    id: 'evt5',
    title: 'Cooking Workshop',
    description: 'Learn to cook authentic Italian pasta',
    date: new Date('2024-04-25'),
    location: 'Culinary Institute',
    price: 85,
    capacity: 20,
    remainingSpots: 5,
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d',
    organizer: 'org2',
    category: 'workshop'
  },
  {
    id: 'evt6',
    title: 'Street Food Fair',
    description: 'Experience diverse street food culture',
    date: new Date('2024-06-20'),
    location: 'Downtown Square',
    price: 25,
    capacity: 400,
    remainingSpots: 156,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    organizer: 'org2',
    category: 'festival'
  },

  // Emma's Events (Art)
  {
    id: 'evt7',
    title: 'Art Exhibition',
    description: 'Contemporary art showcase featuring local artists',
    date: new Date('2024-05-15'),
    location: 'Art Space Gallery',
    price: 15,
    capacity: 150,
    remainingSpots: 42,
    imageUrl: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e',
    organizer: 'org3',
    category: 'community'
  },
  {
    id: 'evt8',
    title: 'Photography Workshop',
    description: 'Learn portrait photography techniques',
    date: new Date('2024-04-30'),
    location: 'Photo Studio',
    price: 120,
    capacity: 15,
    remainingSpots: 3,
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d',
    organizer: 'org3',
    category: 'workshop'
  },
  {
    id: 'evt9',
    title: 'Art & Wine Night',
    description: 'Paint and sip event for beginners',
    date: new Date('2024-05-25'),
    location: 'Creative Space',
    price: 55,
    capacity: 30,
    remainingSpots: 12,
    imageUrl: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb',
    organizer: 'org3',
    category: 'workshop'
  }
];

// Sample Comments
export const sampleComments: Comment[] = [
  {
    id: 'com1',
    eventId: 'evt1',
    author: 'Lisa Chen',
    content: 'Looking forward to this festival! The lineup looks amazing.',
    createdAt: new Date('2024-03-01')
  },
  {
    id: 'com2',
    eventId: 'evt1',
    author: 'Alex Thompson',
    content: 'Will there be food vendors at the event?',
    createdAt: new Date('2024-03-02')
  },
  {
    id: 'com3',
    eventId: 'evt4',
    author: 'Lisa Chen',
    content: 'The food selection looks incredible!',
    createdAt: new Date('2024-03-03')
  },
  {
    id: 'com4',
    eventId: 'evt7',
    author: 'Alex Thompson',
    content: 'Excited to see the local artists showcase.',
    createdAt: new Date('2024-03-04')
  }
];

// Sample Credentials
export const sampleCredentials = {
  admin: {
    email: 'admin@localevents.com',
    password: 'admin123'
  },
  sarah: {
    email: 'sarah@musicfest.com',
    password: 'sarah123'
  },
  mike: {
    email: 'mike@foodevents.com',
    password: 'mike1234'
  },
  emma: {
    email: 'emma@artspace.com',
    password: 'emma1234'
  },
  alex: {
    email: 'alex@example.com',
    password: 'alex1234'
  },
  lisa: {
    email: 'lisa@example.com',
    password: 'lisa1234'
  }
};