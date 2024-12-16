import React from 'react';
import { Users, DollarSign } from 'lucide-react';
import type { SHG } from '../../types';

interface SHGCardProps {
  shg: SHG;
  onClick: () => void;
}

export default function SHGCard({ shg, onClick }: SHGCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-gray-900">{shg.name}</h3>
      
      <div className="mt-4 space-y-3">
        <div className="flex items-center text-gray-600">
          <Users className="h-5 w-5 mr-2" />
          <span>{shg.members} members</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <DollarSign className="h-5 w-5 mr-2" />
          <span>{shg.balance} ETH</span>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Created {shg.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
}