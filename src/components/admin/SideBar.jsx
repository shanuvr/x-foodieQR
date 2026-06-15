import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function SideBar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(() => 
    location.pathname.includes('/admin/menu') ? 'Menu Management' : ''
  );

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: DashboardIcon },
    { name: 'Profile', path: '/admin/profile', icon: ProfileIcon },
    { name: 'My Plan', path: '/admin/my-plan', icon: PlanIcon },
    { name: 'Orders', path: '/admin/orders', icon: OrdersIcon },
    { 
      name: 'Menu Management', 
      path: '/admin/menu', 
      icon: MenuIcon,
      subItems: [
        { name: 'Add Category', path: '/admin/menu/category' },
        { name: 'Add Menu', path: '/admin/menu/add' },
        { name: 'Upload', path: '/admin/menu/upload' },
      ]
    },
    { name: 'QR Center', path: '/admin/qr', icon: QrIcon },
    { name: 'Templates', path: '/admin/templates', icon: TemplateIcon },
    { name: 'Reviews', path: '/admin/reviews', icon: ReviewsIcon },
    { name: 'Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <>


      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-[260px] bg-slate-900 flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Area */}
        <div className="p-6 flex items-center justify-between border-b border-slate-800/60">
          <Link className="flex items-center gap-2 relative w-fit" to="/">
            <span className="text-2xl font-bold tracking-tight text-white">
              Foodie<span className="text-orange-500">QR</span>
            </span>
            <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"></path>
            </svg>
            <span className="text-[10px] font-bold text-gray-400 absolute -top-1 -right-4">TM</span>
          </Link>
          <button 
            className="lg:hidden p-2 -mr-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-3 mt-2">
            Main Menu
          </div>
          
          {menuItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            const isDropdownOpen = openDropdown === item.name;

            if (item.subItems) {
              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => setOpenDropdown(isDropdownOpen ? '' : item.name)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all group ${
                      isActive || isDropdownOpen
                        ? 'bg-slate-800/80 text-white'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon isActive={isActive || isDropdownOpen} />
                      {item.name}
                    </div>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-white' : 'text-slate-500 group-hover:text-slate-300'}`} 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen ? 'max-h-48 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-11 pr-3 py-1 space-y-1">
                      {item.subItems.map(subItem => {
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <NavLink
                            key={subItem.name}
                            to={subItem.path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center w-full py-2 px-3 rounded-lg text-[12px] font-medium transition-colors ${
                              isSubActive 
                                ? 'bg-orange-500/10 text-orange-400' 
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-3 transition-all ${isSubActive ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-slate-600 group-hover:bg-slate-500'}`} />
                            {subItem.name}
                          </NavLink>
                        )
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all group ${
                  isActive 
                    ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <item.icon isActive={isActive} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Area */}
        <div className="p-4 border-t border-slate-800/60">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-bold text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

// SVGs mapped to components for clean code
const DashboardIcon = ({ isActive }) => (
  <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const OrdersIcon = ({ isActive }) => (
  <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const MenuIcon = ({ isActive }) => (
  <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const QrIcon = ({ isActive }) => (
  <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
);

const TemplateIcon = ({ isActive }) => (
  <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const ReviewsIcon = ({ isActive }) => (
  <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const SettingsIcon = ({ isActive }) => (
  <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ProfileIcon = ({ isActive }) => (
  <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PlanIcon = ({ isActive }) => (
  <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
