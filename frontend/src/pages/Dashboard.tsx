import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Header } from '../components/Header/Header';
import { DashboardHome } from '../components/Dashboard/DashboardHome';
import { Students } from './Students';
import { Finance } from './Finance';
import { Relatives } from './Relatives';
import { SettingsPage } from './Settings';
import { Teachers } from './Teachers';
import { Services } from './Services';
import { BulkStudentUpload } from './BulkStudentUpload';

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={true} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="lg:pl-72 flex flex-col flex-1">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/students" element={<Students />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/relatives" element={<Relatives />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/services" element={<Services />} />
                <Route path="/bulk" element={<BulkStudentUpload />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
