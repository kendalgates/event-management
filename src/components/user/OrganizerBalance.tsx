import React from 'react';
import { User } from '../../types/user';
import { DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { format } from 'date-fns';

interface OrganizerBalanceProps {
  user: User;
}

export function OrganizerBalance({ user }: OrganizerBalanceProps) {
  // Mock data - in a real app, this would come from the backend
  const balance = 12580.45;
  const recentTransactions = [
    {
      id: 1,
      type: 'credit',
      amount: 450.00,
      description: 'Ticket sales - Summer Music Festival',
      date: new Date('2024-03-15')
    },
    {
      id: 2,
      type: 'debit',
      amount: 250.00,
      description: 'Withdrawal to bank account',
      date: new Date('2024-03-10')
    }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <div className="text-sm text-indigo-600 mb-1">Current Balance</div>
        <div className="text-2xl font-bold text-indigo-700">
          ${balance.toLocaleString()}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Transactions</h4>
        <div className="space-y-2">
          {recentTransactions.map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                {transaction.type === 'credit' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-2" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500 mr-2" />
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {transaction.description}
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(transaction.date, 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
              <div className={`text-sm font-medium ${
                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
        <DollarSign className="w-4 h-4 mr-2" />
        Withdraw Funds
      </button>
    </div>
  );
}