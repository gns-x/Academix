import React, { useState } from 'react';
import { ChevronDown, UserCircle, Settings, LogOut } from 'lucide-react';

export const UserMenu = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-3"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        <img
          src="https://lh3.googleusercontent.com/a/ACg8ocKnzzoihzqX3aYf21p0xFc7vuFYney_QcQSnwzWkWuKxN_QjkE=s288-c-no"
          alt=""
          className="h-9 w-9 rounded-full"
        />
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-700">Hamza Hadioui</p>
          <p className="text-xs text-gray-500">Moul Chi</p>
        </div>
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </button>

      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 ring-1 ring-black ring-opacity-5">
          <a href="#profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <UserCircle className="mr-3 h-5 w-5 text-gray-400" />
            Profile
          </a>
          <a href="#settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <Settings className="mr-3 h-5 w-5 text-gray-400" />
            Settings
          </a>
          <a href="#logout" className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100">
            <LogOut className="mr-3 h-5 w-5 text-red-400" />
            Sign out
          </a>
        </div>
      )}
    </div>
  );
};
