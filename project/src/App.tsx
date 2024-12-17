import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import SHGCard from './components/shg/SHGCard';
import MemberList from './components/members/MemberList';
import ProposalCard from './components/proposals/ProposalCard';
import TransactionList from './components/transactions/TransactionList';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import styles from './Home.module.css';

const providerOptions = {
  // Add your provider options here if needed
};

const web3modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions,
});

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

const App: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const connectWallet = async () => {
    try {
      const provider = await web3modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const disconnectWallet = () => {
    web3modal.clearCachedProvider();
    setAccount(null);
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <Sidebar />
      
      <div className="flex-1">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Active SHG</h2>
              <SHGCard 
                shg={mockSHG} 
                onClick={() => console.log('SHG clicked')} 
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Members</h2>
              <MemberList 
                members={mockMembers}
                onRemoveMember={(id) => console.log('Remove member:', id)}
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Active Proposals</h2>
              <ProposalCard 
                proposal={mockProposal}
                onVote={(vote) => console.log('Vote:', vote)}
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
              <TransactionList transactions={mockTransactions} />
            </section>
          </div>
        </main>
      </div>

      <div className="relative">
        <button
          className={`fixed top-4 right-20 z-50 px-4 py-2 rounded-lg 
        ${account 
          ? 'bg-green-500 hover:bg-green-600' 
          : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors duration-200`}
          onClick={connectWallet}
        >
          {account ? 'Wallet Connected' : 'Connect Wallet'}
        </button>

        {account && (
          <button
        className="fixed top-3 right-5 z-4 px-4 py-2 rounded-lg 
          bg-red-500 hover:bg-red-600 text-white 
          transition-colors duration-200 flex items-center gap-2"
        onClick={disconnectWallet}
          >

        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m2 2 20 20"/>
          <path d="M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71"/>
          <path d="M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264"/>
        </svg>
          </button>
        )}

        <div className={`fixed top-4 right-20 z-40 text-sm
          ${account ? 'text-green-500' : 'text-red-500'}`}
        >
          {account ? `Connected: ${account.slice(0,6)}...${account.slice(-4)}` : 'Wallet not connected'}
        </div>
      </div>
    </div>
  );
};

export default App;