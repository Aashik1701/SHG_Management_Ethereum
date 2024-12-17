"use client";

import { Menu, User, Bell } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle.tsx'; // Adjust the import path as needed

export default function Navbar() {
  return (
    <nav className="border-b px-4 py-2.5 bg-background">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button className="p-2 hover:bg-accent rounded-lg">
            <Menu className="h-6 w-6 text-muted-foreground" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-foreground brand-text">SHG Management</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="p-2 hover:bg-accent rounded-lg">
            <Bell className="h-6 w-6 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-accent rounded-lg">
            <User className="h-6 w-6 text-muted-foreground" />
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-colors">
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
}