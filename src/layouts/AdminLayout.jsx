import React, { useState } from 'react';
import SideBar from '../components/admin/SideBar';

export default function AdminLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <SideBar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      <main className="flex-1 min-w-0 overflow-hidden flex flex-col relative">
        {/* Mobile Header with Hamburger Menu */}
        <div className="lg:hidden h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
             <span className="font-extrabold text-slate-800 tracking-tight text-lg">Foodie<span className="text-orange-500">QR</span></span>
          </div>
          
          <div className="w-10"></div> {/* Spacer for flex balance */}
        </div>
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}