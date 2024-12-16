import React from 'react';
import { Menu, User, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="h-6 w-6 text-gray-500" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-gray-800">SHG Management</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="h-6 w-6 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <User className="h-6 w-6 text-gray-500" />
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
}