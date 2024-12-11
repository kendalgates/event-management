import React from 'react';
import { UserCircle, Users, Building2 } from 'lucide-react';
import { UserRole } from '../../types/user';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

export function RoleSelector({ selectedRole, onChange }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <button
        type="button"
        onClick={() => onChange('attendee')}
        className={`p-4 border rounded-lg text-center ${
          selectedRole === 'attendee'
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <UserCircle className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
        <span className="block text-sm font-medium">Attendee</span>
        <span className="text-xs text-gray-500">Join and attend events</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('organizer')}
        className={`p-4 border rounded-lg text-center ${
          selectedRole === 'organizer'
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <Building2 className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
        <span className="block text-sm font-medium">Organizer</span>
        <span className="text-xs text-gray-500">Create and manage events</span>
      </button>
    </div>
  );
}