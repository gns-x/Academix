import React from 'react';
import { X } from 'lucide-react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isMobile?: boolean;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen, isMobile = false }: SidebarProps) => {
  const sidebarContent = (
    <div className="flex flex-col flex-grow bg-gradient-to-br from-[#1E293B] via-[#2A3F54] to-[#1F2937]">
      <div className="flex h-24 items-center justify-center px-6 py-8">
        <Logo />
      </div>
      <Navigation />
    </div>
  );

  if (isMobile) {
    return (
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col">
          {sidebarContent}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
      {sidebarContent}
    </div>
  );
};
