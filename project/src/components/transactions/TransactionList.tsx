import React from 'react';
import { ArrowUpRight, ArrowDownRight, Banknote } from 'lucide-react';
import type { Transaction } from '../../types';

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownRight className="h-5 w-5 text-green-500" />;
      case 'withdrawal':
        return <ArrowUpRight className="h-5 w-5 text-red-500" />;
      case 'loan':
        return <Banknote className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    From: {transaction.from.slice(0, 6)}...{transaction.from.slice(-4)}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    To: {transaction.to.slice(0, 6)}...{transaction.to.slice(-4)}
                  </p>
                </div>
                <div>
                  <div className={`text-sm font-medium ${
                    transaction.type === 'deposit' ? 'text-green-600' :
                    transaction.type === 'withdrawal' ? 'text-red-600' :
                    'text-blue-600'
                  }`}>
                    {transaction.type === 'withdrawal' ? '-' : '+'}
                    {transaction.amount} ETH
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.timestamp.toLocaleString()}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}