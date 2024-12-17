import React, { useState } from 'react';
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
  // Example provider options
  metamask: {
    display: {
      name: 'MetaMask',
      description: 'Connect to your MetaMask wallet',
    },
    package: true, // metaMask doesn't require a package, just use 'true'
  },
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
  const [loading, setLoading] = useState<boolean>(false);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const provider = await web3modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="relative">
  <div
    style={{
      position: 'absolute',
      top: '0px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column', // Stack items vertically
      alignItems: 'flex-end',   // Align to the right
    }}
  >
    <button
      className={styles.connectButton}
      onClick={connectWallet}
      disabled={loading}
    >
      {loading ? 'Connecting...' : account ? 'Wallet Connected' : 'Connect Wallet'}
    </button>

    <div
      style={{
        fontSize: '14px',
        color: account ? 'green' : 'red',
        marginTop: '8px', // Add some space between the button and the message
      }}
    >
      {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Wallet not connected'}
    </div>
  </div>
</div>
</div>
  );
};

export default App;
