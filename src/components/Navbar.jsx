import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link className="flex items-center gap-2 relative" to="/">
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                Foodie<span className="text-primary">QR</span>
              </span>
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"></path>
              </svg>
              <span className="text-[10px] font-bold text-gray-400 absolute -top-1 -right-4">TM</span>
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
            <button className="hidden md:inline-flex items-center px-4 py-2 border border-primary text-sm font-medium rounded-md text-primary bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors cursor-pointer" type="button">
              Partner With Us
            </button>
            
            {/* Sign In Button (Desktop) */}
            <button className="hidden md:inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors cursor-pointer" type="button">
              Sign In
            </button>
            
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
            <button 
              className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-primary text-base font-medium rounded-md text-primary bg-white hover:bg-orange-50 focus:outline-none transition-colors cursor-pointer" 
              type="button"
            >
              Partner With Us
            </button>
            <button 
              className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors cursor-pointer" 
              type="button"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
