import React, { useState } from 'react';
import { User } from '../../types/user';

interface NotificationSettingsProps {
  user: User;
}

export function NotificationSettings({ user }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    eventReminders: true,
    promotionalEmails: false,
    ticketUpdates: true
  });

  const handleChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Email Preferences</h3>
      <div className="space-y-3">
        {Object.entries(settings).map(([key, value]) => (
          <label key={key} className="flex items-center">
            <input
              type="checkbox"
              checked={value}
              onChange={() => handleChange(key as keyof typeof settings)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}