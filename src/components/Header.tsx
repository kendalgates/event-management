import { Calendar, Search, LayoutDashboard, List } from "lucide-react";
import { User } from "../types/user";
import { canCreateEvent } from "../utils/permissions";
import { UserProfileDropdown } from "./user/UserProfileDropdown";

interface HeaderProps {
  onCreateClick: () => void;
  onViewChange: (view: "events" | "admin" | "organizer") => void;
  currentView: "events" | "admin" | "organizer";
  user: User | null;
  onAuthClick: () => void;
  onLogout: () => void;
}

export function Header({
  onCreateClick,
  onViewChange,
  currentView,
  user,
  onAuthClick,
  onLogout,
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              LocalEvents
            </span>
          </div>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex rounded-lg overflow-hidden">
              <button
                onClick={() => onViewChange("events")}
                className={`px-4 py-2 flex items-center text-sm font-medium ${
                  currentView === "events"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <List className="w-4 h-4 mr-2" />
                Events
              </button>

              {user?.role === "organizer" && (
                <button
                  onClick={() => onViewChange("organizer")}
                  className={`px-4 py-2 flex items-center text-sm font-medium ${
                    currentView === "organizer"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </button>
              )}

              {user?.role === "admin" && (
                <button
                  onClick={() => onViewChange("admin")}
                  className={`px-4 py-2 flex items-center text-sm font-medium ${
                    currentView === "admin"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Admin
                </button>
              )}
            </div>

            {canCreateEvent(user) && (
              <button
                onClick={onCreateClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Event
              </button>
            )}

            {user ? (
              <UserProfileDropdown user={user} onLogout={onLogout} />
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
