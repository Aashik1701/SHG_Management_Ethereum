import React from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import SHGCard from './components/shg/SHGCard';
import MemberList from './components/members/MemberList';
import ProposalCard from './components/proposals/ProposalCard';
import TransactionList from './components/transactions/TransactionList';
import { useWallet } from './hooks/useWallet';

// Mock data
const mockSHG = {
  id: '1',
  name: 'Village Women Empowerment Group',
  members: 15,
  balance: 2.5,
  createdAt: new Date('2024-01-15'),
  description: 'Empowering women through financial inclusion',
  location: 'Rural District'
};

const mockMembers = [
  {
    id: '1',
    name: 'Alice Johnson',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    role: 'admin' as const,
    joinedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Sarah Smith',
    walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    role: 'member' as const,
    joinedAt: new Date('2024-01-15')
  }
];

const mockProposal = {
  id: '1',
  title: 'Community Garden Project',
  description: 'Fund to start a community garden for sustainable farming',
  amount: 1.5,
  proposer: '0x1234567890abcdef1234567890abcdef12345678',
  status: 'pending' as const,
  votes: { for: 8, against: 3 },
  deadline: new Date('2024-03-01'),
  createdAt: new Date('2024-02-01')
};

const mockTransactions = [
  {
    id: '1',
    type: 'deposit' as const,
    amount: 0.5,
    from: '0x1234567890abcdef1234567890abcdef12345678',
    to: '0xabcdef1234567890abcdef1234567890abcdef12',
    description: 'Monthly contribution',
    timestamp: new Date('2024-02-15')
  },
  {
    id: '2',
    type: 'loan' as const,
    amount: 1.0,
    from: '0xabcdef1234567890abcdef1234567890abcdef12',
    to: '0x1234567890abcdef1234567890abcdef12345678',
    description: 'Business expansion loan',
    timestamp: new Date('2024-02-10')
  }
];

function App() {
  const { account, connectWallet } = useWallet();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Active SHG</h2>
              <SHGCard 
                shg={mockSHG} 
                onClick={() => console.log('SHG clicked')} 
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Members</h2>
              <MemberList 
                members={mockMembers}
                onRemoveMember={(id) => console.log('Remove member:', id)}
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Proposals</h2>
              <ProposalCard 
                proposal={mockProposal}
                onVote={(vote) => console.log('Vote:', vote)}
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
              <TransactionList transactions={mockTransactions} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;