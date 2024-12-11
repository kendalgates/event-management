import React from 'react';
import { User } from '../../types/user';
import { CreditCard, Plus } from 'lucide-react';

interface PaymentInfoProps {
  user: User;
}

export function PaymentInfo({ user }: PaymentInfoProps) {
  const savedCards = [
    { last4: '4242', brand: 'Visa', expMonth: 12, expYear: 2024 },
    { last4: '8888', brand: 'Mastercard', expMonth: 3, expYear: 2025 }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
      <div className="space-y-3">
        {savedCards.map((card, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {card.brand} •••• {card.last4}
                </div>
                <div className="text-xs text-gray-500">
                  Expires {card.expMonth}/{card.expYear}
                </div>
              </div>
            </div>
            <button className="text-sm text-red-600 hover:text-red-700">Remove</button>
          </div>
        ))}
        <button className="flex items-center w-full p-3 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg">
          <Plus className="w-5 h-5 mr-2" />
          Add New Card
        </button>
      </div>
    </div>
  );
}