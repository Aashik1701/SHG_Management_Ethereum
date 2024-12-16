import React from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import type { Proposal } from '../../types';

interface ProposalCardProps {
  proposal: Proposal;
  onVote: (vote: 'for' | 'against') => void;
}

export default function ProposalCard({ proposal, onVote }: ProposalCardProps) {
  const isActive = new Date() < proposal.deadline;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
      <p className="mt-2 text-gray-600">{proposal.description}</p>
      
      <div className="mt-4 space-y-3">
        <div className="flex items-center text-gray-600">
          <DollarSign className="h-5 w-5 mr-2" />
          <span>{proposal.amount} ETH</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="h-5 w-5 mr-2" />
          <span>Deadline: {proposal.deadline.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm">
          <span className="text-gray-500">Votes:</span>
          <span className="ml-2 text-green-600">For: {proposal.votes.for}</span>
          <span className="ml-2 text-red-600">Against: {proposal.votes.against}</span>
        </div>
        
        {isActive && (
          <div className="space-x-2">
            <button
              onClick={() => onVote('for')}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
            >
              Vote For
            </button>
            <button
              onClick={() => onVote('against')}
              className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
            >
              Vote Against
            </button>
          </div>
        )}
      </div>
    </div>
  );
}