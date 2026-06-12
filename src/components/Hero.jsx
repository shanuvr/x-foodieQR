import React from 'react';

export default function Hero() {
  return (
    <section className="relative bg-gray-900 min-h-[300px] sm:min-h-[360px] md:h-[500px] w-full flex flex-col justify-center">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          alt="Restaurant setting" 
          className="w-full h-full object-cover" 
          src="/restaurant-interior.jpg" 
        />
        <div aria-hidden="true" className="absolute inset-0 hero-overlay"></div>
      </div>
      
      {/* Text Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-14 md:pt-16 md:pb-32">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 tracking-tight leading-tight">
          Find the Best Food Near You
        </h1>
        <p className="mt-2 text-sm sm:text-base md:text-xl text-gray-200 max-w-2xl mx-auto">
          Discover restaurants, cafes and offers near you.
        </p>
      </div>

      {/* Ultra-Responsive Single-Row Search Bar */}
      <div className="absolute -bottom-8 md:-bottom-16 left-0 w-full px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto bg-white md:bg-white/95 md:backdrop-blur-md rounded-xl shadow-xl p-1.5 md:p-2 border border-white/20">
          <form className="flex flex-row items-center w-full" onSubmit={(e) => e.preventDefault()}>
            
            {/* Location Input */}
            <div className="flex-[2] flex items-center px-2 py-1.5 md:px-6 md:py-4 min-w-0">
              <div className="hidden sm:block flex-shrink-0 mr-2 md:mr-3">
                <svg aria-hidden="true" className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" fillRule="evenodd"></path>
                </svg>
              </div>
              <div className="flex-grow text-left min-w-0">
                <label className="hidden md:block text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider" htmlFor="location">Location</label>
                <input 
                  className="block w-full border-none focus:ring-0 p-0 text-gray-900 text-xs sm:text-sm md:text-lg font-medium placeholder-gray-400 bg-transparent focus:outline-none truncate" 
                  id="location" 
                  name="location" 
                  placeholder="Where are you?" 
                  type="text" 
                />
              </div>
            </div>
            
            {/* Vertical Divider */}
            <div className="h-8 md:h-12 w-px bg-gray-200 flex-shrink-0"></div>
            
            {/* Restaurant Type Dropdown */}
            <div className="flex-[1.5] flex items-center px-2 py-1.5 md:px-6 md:py-4 min-w-0">
              <div className="hidden sm:block flex-shrink-0 mr-2 md:mr-3">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
              <div className="flex-grow text-left min-w-0">
                <label className="hidden md:block text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider" htmlFor="type">Cuisine</label>
                <select 
                  className="block w-full border-none focus:ring-0 p-0 text-gray-900 text-xs sm:text-sm md:text-lg font-medium bg-transparent appearance-none cursor-pointer focus:outline-none truncate" 
                  id="type" 
                  name="type"
                >
                  <option>All Types</option>
                  <option>Restaurant</option>
                  <option>Bakery</option>
                  <option>Cool Bar</option>
                </select>
              </div>
            </div>
            
            {/* Search Button */}
            <div className="flex-shrink-0 p-1">
              <button 
                className="flex items-center justify-center h-10 w-10 md:h-auto md:w-auto md:py-3.5 md:px-8 rounded-lg shadow-md text-sm md:text-base font-bold text-white bg-primary hover:bg-primary-hover transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer" 
                type="submit"
                aria-label="Search"
              >
                <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
                <span className="hidden md:inline ml-2">Search</span>
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </section>
  );
}
