import { useState, useEffect } from "react";
import { Event } from "./types/event"; // Import the existing Event type
import { Header } from "./components/Header";
import { EventList } from "./components/EventList";
import { EventModal } from "./components/EventModal";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { PurchaseTicketModal } from "./components/PurchaseTicketModal";
import { CommentsModal } from "./components/comments/CommentsModal";
import { EventFilters } from "./components/filters/EventFilters";
import { AdminDashboard } from "./pages/AdminDashboard";
import { OrganizerDashboard } from "./pages/OrganizerDashboard";
import { AuthModal } from "./components/auth/AuthModal";
import { useEvents } from "./hooks/useEvents";
import { useComments } from "./hooks/useComments";
import { useFilters } from "./hooks/useFilters";
import { useAuth } from "./hooks/useAuth";
import { canAccessAdminDashboard } from "./utils/permissions";

export default function App() {
  // State Management
  const [currentView, setCurrentView] = useState<
    "events" | "admin" | "organizer"
  >("events");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    event: Event | null;
  }>({
    isOpen: false,
    mode: "create",
    event: null,
  });
  const [purchaseModal, setPurchaseModal] = useState<{
    isOpen: boolean;
    event: Event | null;
  }>({
    isOpen: false,
    event: null,
  });
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    event: Event | null;
  }>({
    isOpen: false,
    event: null,
  });
  const [commentModal, setCommentModal] = useState<{
    isOpen: boolean;
    event: Event | null;
  }>({
    isOpen: false,
    event: null,
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Custom Hooks
  const { events, addEvent, updateEvent, deleteEvent, purchaseTickets } =
    useEvents();
  const { comments, addComment } = useComments();
  const { filters, handleFilterChange, resetFilters, filterEvents } =
    useFilters();
  const { user, isAuthenticated, login, signup, logout } = useAuth();

  // Reset view to events when logging out
  useEffect(() => {
    if (!isAuthenticated) {
      setCurrentView("events");
    }
  }, [isAuthenticated]);

  // Filter events
  const filteredEvents = filterEvents(events);

  // Event Handlers
  const handleCreateEvent = (eventData: Omit<Event, "id">) => {
    if (!user) return;
    addEvent(eventData);
    setModalState({ isOpen: false, mode: "create", event: null });
  };

  const handleUpdateEvent = (eventData: Omit<Event, "id">) => {
    if (modalState.event) {
      updateEvent(modalState.event.id, eventData);
      setModalState({ isOpen: false, mode: "create", event: null });
    }
  };

  const handleDeleteEvent = () => {
    if (deleteModal.event) {
      deleteEvent(deleteModal.event.id);
      setDeleteModal({ isOpen: false, event: null });
    }
  };

  const handlePurchaseTickets = (eventId: string, quantity: number) => {
    purchaseTickets(eventId, quantity);
    setPurchaseModal({ isOpen: false, event: null });
  };

  const handleAddComment = (
    eventId: string,
    author: string,
    content: string
  ) => {
    addComment(eventId, author, content);
  };

  const handleLogout = () => {
    logout();
    setCurrentView("events");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCreateClick={() =>
          setModalState({ isOpen: true, mode: "create", event: null })
        }
        onViewChange={setCurrentView}
        currentView={currentView}
        user={user}
        onAuthClick={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {currentView === "events" ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Upcoming Events
            </h1>
            <p className="mt-2 text-gray-600">
              Discover and join amazing local events in your community
            </p>
          </div>

          <div className="flex gap-8">
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-8">
                <EventFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={resetFilters}
                />
              </div>
            </div>

            <div className="flex-1">
              <EventList
                events={filteredEvents}
                comments={comments}
                user={user}
                onSelectEvent={(event) =>
                  setPurchaseModal({ isOpen: true, event })
                }
                onEditEvent={(event) =>
                  setModalState({ isOpen: true, mode: "edit", event })
                }
                onDeleteEvent={(event) =>
                  setDeleteModal({ isOpen: true, event })
                }
                onCommentClick={(event) =>
                  setCommentModal({ isOpen: true, event })
                }
              />
            </div>
          </div>
        </main>
      ) : currentView === "admin" && canAccessAdminDashboard(user) ? (
        <AdminDashboard events={events} />
      ) : currentView === "organizer" && user?.role === "organizer" ? (
        <OrganizerDashboard user={user} events={events} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            You don't have access to this section.
          </p>
        </div>
      )}

      {modalState.isOpen && (
        <EventModal
          mode={modalState.mode}
          event={modalState.event}
          onClose={() =>
            setModalState({ isOpen: false, mode: "create", event: null })
          }
          onSave={
            modalState.mode === "create" ? handleCreateEvent : handleUpdateEvent
          }
        />
      )}

      {purchaseModal.isOpen && purchaseModal.event && (
        <PurchaseTicketModal
          event={purchaseModal.event}
          onClose={() => setPurchaseModal({ isOpen: false, event: null })}
          onPurchase={handlePurchaseTickets}
        />
      )}

      {deleteModal.isOpen && deleteModal.event && (
        <DeleteConfirmationModal
          eventTitle={deleteModal.event.title}
          onConfirm={handleDeleteEvent}
          onCancel={() => setDeleteModal({ isOpen: false, event: null })}
        />
      )}

      {commentModal.isOpen && commentModal.event && (
        <CommentsModal
          eventTitle={commentModal.event.title}
          comments={comments.filter(
            (c) => c.eventId === commentModal.event?.id
          )}
          onClose={() => setCommentModal({ isOpen: false, event: null })}
          onAddComment={(author, content) =>
            handleAddComment(commentModal.event!.id, author, content)
          }
        />
      )}

      {authModalOpen && (
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onLogin={login}
          onSignup={signup}
        />
      )}
    </div>
  );
}
