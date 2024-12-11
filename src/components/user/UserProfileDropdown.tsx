import React, { useState, useRef } from 'react';
import { User, Settings, Bell, CreditCard, LogOut, Calendar, DollarSign } from 'lucide-react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { UserRole } from '../../types/user';
import { RecentlyAttendedEvents } from './RecentlyAttendedEvents';
import { PaymentInfo } from './PaymentInfo';
import { NotificationSettings } from './NotificationSettings';
import { AccountSettings } from './AccountSettings';
import { OrganizerBalance } from './OrganizerBalance';

interface UserProfileDropdownProps {
  user: User;
  onLogout: () => void;
}

export function UserProfileDropdown({ user, onLogout }: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'payments' | 'events' | 'balance'>('account');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const tabs = [
    {
      id: 'account',
      label: 'Account Settings',
      icon: Settings,
      component: AccountSettings,
      roles: ['attendee', 'organizer', 'admin'] as UserRole[]
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      component: NotificationSettings,
      roles: ['attendee', 'organizer', 'admin'] as UserRole[]
    },
    {
      id: 'payments',
      label: 'Payment Methods',
      icon: CreditCard,
      component: PaymentInfo,
      roles: ['attendee'] as UserRole[]
    },
    {
      id: 'events',
      label: 'Recent Events',
      icon: Calendar,
      component: RecentlyAttendedEvents,
      roles: ['attendee'] as UserRole[]
    },
    {
      id: 'balance',
      label: 'Account Balance',
      icon: DollarSign,
      component: OrganizerBalance,
      roles: ['organizer'] as UserRole[]
    }
  ];

  const availableTabs = tabs.filter(tab => tab.roles.includes(user.role));
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
      >
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-indigo-600" />
        </div>
        <span className="text-sm font-medium text-gray-700">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-4 border-b">
            <div className="font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
            {user.organizationName && (
              <div className="text-sm text-gray-500">{user.organizationName}</div>
            )}
          </div>

          <div className="grid grid-cols-5 gap-0.5 p-1">
            {availableTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex flex-col items-center p-2 text-sm rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-4">
            {ActiveComponent && <ActiveComponent user={user} />}
          </div>

          <div className="p-2 border-t">
            <button
              onClick={onLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}