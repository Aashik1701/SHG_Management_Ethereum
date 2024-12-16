export interface SHG {
  id: string;
  name: string;
  members: number;
  balance: number;
  createdAt: Date;
  description?: string;
  location?: string;
}

export interface Member {
  id: string;
  name: string;
  walletAddress: string;
  role: 'admin' | 'member';
  joinedAt: Date;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  amount: number;
  proposer: string;
  status: 'pending' | 'approved' | 'rejected';
  votes: {
    for: number;
    against: number;
  };
  deadline: Date;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'loan';
  amount: number;
  from: string;
  to: string;
  description: string;
  timestamp: Date;
}