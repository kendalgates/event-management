export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  price: number;
  capacity: number;
  remainingSpots: number;
  imageUrl: string;
  organizer: string;
  category: 'community' | 'festival' | 'concert' | 'workshop';
}