import SideNav from '../ui/dashboard/sidenav';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* Sidebar */}
      <div className="w-full flex-none md:w-64 md:h-screen md:overflow-y-auto">
        <SideNav />
      </div>
      
      {/* Main Content */}
      <div className="flex-grow p-6 bg-gradient-to-r from-green-100 to-green-300 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
}