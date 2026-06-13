import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-12 sm:pt-16 pb-8 sm:pb-12 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12 text-left">
          
          {/* Logo & Description — full width on mobile */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1 flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Foodie<span className="text-primary">QR</span>
              </span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"></path>
              </svg>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Connecting food lovers with the best local dining experiences. Discover, order, and enjoy with FoodieQR.
            </p>
            <div className="flex gap-3 sm:gap-4 mt-1 sm:mt-2">
              <a className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all transform hover:scale-110" href="#">
                <span className="sr-only">Facebook</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all transform hover:scale-110" href="#">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 sm:mb-8">Company</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link className="text-white hover:text-primary text-sm sm:text-base transition-colors" to="/about">About Us</Link>
              </li>
              <li>
                <Link className="text-white hover:text-primary text-sm sm:text-base transition-colors" to="/careers">Careers</Link>
              </li>
              <li>
                <Link className="text-white hover:text-primary text-sm sm:text-base transition-colors" to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 sm:mb-8">Legal</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link className="text-white hover:text-primary text-sm sm:text-base transition-colors" to="/disclaimer">Disclaimer</Link>
              </li>
              <li>
                <Link className="text-white hover:text-primary text-sm sm:text-base transition-colors" to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link className="text-white hover:text-primary text-sm sm:text-base transition-colors" to="/refund">Refund Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 sm:mb-8">Connect With</h3>
            <ul className="space-y-4 sm:space-y-5">
              <li>
                <a className="text-white hover:text-primary text-sm sm:text-base transition-colors flex items-center gap-3" href="tel:+15550000000">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                  +1 (555) 000-0000
                </a>
              </li>
              <li>
                <a className="text-white hover:text-primary text-sm sm:text-base transition-colors flex items-center gap-3" href="mailto:hello@foodieqr.com">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                  hello@foodieqr.com
                </a>
              </li>
            </ul>
          </div>

        </div>
        <div className="border-t border-white/5 text-center pt-6 sm:pt-8 flex justify-center">
          <div className="group relative flex items-center justify-center cursor-pointer select-none">
            {/* Hover Revealed Text - Absolute positioned above the copyright */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap text-primary text-[10px] sm:text-xs font-bold opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
              Powered by programers.in
            </div>
            
            {/* Copyright Text */}
            <p className="text-gray-500 text-xs sm:text-sm transition-colors duration-300 group-hover:text-gray-400">
              © 2026 FoodieQR. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
