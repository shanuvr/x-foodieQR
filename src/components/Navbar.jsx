import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load user from localStorage
  const checkUser = () => {
    try {
      const saved = localStorage.getItem('current_user');
      setCurrentUser(saved ? JSON.parse(saved) : null);
    } catch (e) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    checkUser();

    // Listen to custom storage event to update instantly when logged in/out
    window.addEventListener('storage', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('current_user');
    setCurrentUser(null);
    setIsDropdownOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link className="flex flex-col relative" to="/">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold tracking-tight text-gray-900">
                  Foodie<span className="text-primary">QR</span>
                </span>
                <svg className="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"></path>
                </svg>
                <span className="text-[11px] font-bold text-gray-400 absolute -top-1.5 -right-5">TM</span>
              </div>
              <span className="text-[11px] font-extrabold tracking-widest text-[#FFA500] uppercase -mt-0.5 leading-none">
                hunger's fest
              </span>
            </Link>
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center gap-4">
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 mr-4">
              <Link className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" to="/">Home</Link>
              <Link className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" to="/about">About</Link>
              <Link className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" to="/contact">Contact Us</Link>
            </div>
            
            {/* Cart Button (Always visible) */}
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative cursor-pointer" type="button">
              <span className="sr-only">View cart</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
            
            {/* Partner Button (Desktop) */}
            <Link 
              to="/register"
              className="hidden md:inline-flex items-center px-4 py-2 border border-primary text-sm font-medium rounded-md text-primary bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors cursor-pointer"
            >
              Partner With Us
            </Link>
            
            {/* User Profile Dropdown or Sign In (Desktop) */}
            {currentUser ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm transition-colors cursor-pointer border-2 border-white shadow shadow-orange-500/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="button"
                >
                  {currentUser.initials || 'US'}
                </button>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2.5 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-2.5 text-left animate-fade-in-down">
                      <div className="px-4 py-2 border-b border-slate-50 mb-1.5">
                        <p className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">{currentUser.email}</p>
                      </div>
                      
                      <Link
                        to="/"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 2.24a4.75 4.75 0 11-9.5 0 4.75 4.75 0 019.5 0z" />
                        </svg>
                        My Orders
                      </Link>
                      
                      <Link
                        to="/"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        Favorite Outlets
                      </Link>
                      
                      <hr className="border-slate-50 my-1.5" />
                      
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                      >
                        <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors cursor-pointer"
              >
                Sign In
              </Link>
            )}
            
            {/* Hamburger Button (Mobile Only with Morphing Animation) */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex md:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors cursor-pointer"
              type="button"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 relative flex items-center justify-center">
                <span className={`absolute h-0.5 w-5 bg-gray-500 rounded transition-all duration-300 ease-in-out transform ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`} />
                <span className={`absolute h-0.5 w-5 bg-gray-500 rounded transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute h-0.5 w-5 bg-gray-500 rounded transition-all duration-300 ease-in-out transform ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`} />
              </div>
            </button>
          </div>
          
        </div>
      </div>

      {/* Mobile Menu Panel with Slide-Down Transition */}
      <div 
        className={`md:hidden border-t border-gray-100 bg-white transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[350px] opacity-100 shadow-lg' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          <Link 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors" 
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors" 
            to="/about"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors" 
            to="/contact"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
          
          <div className="pt-4 pb-2 border-t border-gray-100 space-y-2">
            <Link 
              to="/register"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-primary text-base font-medium rounded-md text-primary bg-white hover:bg-orange-50 focus:outline-none transition-colors cursor-pointer"
            >
              Partner With Us
            </Link>
            
            {currentUser ? (
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <div className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-extrabold text-sm border-2 border-white shadow shadow-orange-500/10">
                    {currentUser.initials || 'US'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</p>
                    <p className="text-[9px] text-slate-400 font-semibold truncate mt-0.5">{currentUser.email}</p>
                  </div>
                </div>
                
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  My Orders
                </Link>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  Favorite Outlets
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full inline-flex justify-center items-center px-4 py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-base font-medium rounded-md text-rose-600 focus:outline-none transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors cursor-pointer"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
