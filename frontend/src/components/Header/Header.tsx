import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ setSidebarOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md pl-1 py-3 lg:pl-3">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="lg:hidden -ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex flex-1 items-center justify-end gap-x-4">
          <div className="relative">
            <button
              className="p-2 text-gray-400 hover:text-gray-500 relative"
              onClick={() => {/* Handle notifications */}}
            >
              <Bell className="h-6 w-6" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
          <UserMenu />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0"></div>
    </header>
  );
};
