import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import { Event } from "../types/event";
import { Comment } from "../types/comment";
import { User } from "../types/user";
import { format } from "date-fns";
import { EventActions } from "./EventActions";
import { CommentCount } from "./comments/CommentCount";
import { getEventImage } from "../utils/imageUtils";
import { canEditEvent } from "../utils/permissions";

interface EventCardProps {
  event: Event;
  comments: Comment[];
  user: User | null;
  onSelect: (event: Event) => void;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
  onCommentClick: (event: Event) => void;
}

export function EventCard({
  event,
  comments,
  user,
  onSelect,
  onEdit,
  onDelete,
  onCommentClick,
}: EventCardProps) {
  const soldOut = event.remainingSpots === 0;
  const eventComments = comments.filter(
    (comment) => comment.eventId === event.id
  );
  const showActions = canEditEvent(user, event.organizer);

  const handleCommentClick = () => {
    onCommentClick(event);
  };

  return (
    <div
      onClick={() => onSelect(event)}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer relative"
    >
      {showActions && (
        <EventActions
          onEdit={() => onEdit(event)}
          onDelete={() => onDelete(event)}
        />
      )}
      <img
        src={getEventImage(event.imageUrl)}
        alt={event.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = getEventImage(undefined);
        }}
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">
            {event.category}
          </span>
          {soldOut && (
            <span className="inline-block px-2 py-1 text-xs font-semibold text-red-600 bg-red-50 rounded-full">
              Sold Out
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{format(event.date, "PPP")}</span>
          </div>

          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.remainingSpots} spots left</span>
            </div>

            <div className="flex items-center text-gray-500">
              <Ticket className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">
                ${event.price.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t">
            <CommentCount
              count={eventComments.length}
              onClick={handleCommentClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
