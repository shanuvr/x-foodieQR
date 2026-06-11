import React, { useState } from 'react';
import hotel1 from '../assets/hotel1.png';
import hotel2 from '../assets/hotel2.png';

export default function HotelListings() {
  const [filterOpen, setFilterOpen] = useState(false);

  const hotels = [
    {
      id: 1,
      name: "Grand Palace Hotel",
      stars: "★★★★★",
      distance: "5.2 km to center",
      amenities: ["WiFi", "Parking"],
      badge: "Newly built in 2024",
      badgeColor: "bg-primary",
      rating: "8.5 Excellent",
      reviews: "1,240 reviews",
      offer: "FREE CANCELLATION",
      offerColor: "text-green-600 font-medium",
      oldPrice: "Rs. 7,262",
      price: "Rs. 3,139",
      buttonText: "Book Now",
      buttonStyle: "bg-primary text-white hover:bg-primary-hover",
      image: hotel1
    },
    {
      id: 2,
      name: "Sea View Resort",
      stars: "★★★★",
      distance: "9.2 km to center",
      amenities: ["WiFi"],
      badge: "Promoted",
      badgeColor: "bg-blue-600",
      rating: "9.1 Superb",
      reviews: "850 reviews",
      offer: "Only 5 left!",
      offerColor: "text-red-500 font-bold",
      oldPrice: "Rs. 3,500",
      price: "Rs. 1,759",
      buttonText: "Sign In",
      buttonStyle: "border border-primary text-primary hover:bg-orange-50",
      image: hotel2
    },
    {
      id: 4,
      name: "River Side Boutique",
      stars: "★★★★",
      distance: "2.1 km to center",
      amenities: ["WiFi", "Parking"],
      badge: "Eco-Friendly",
      badgeColor: "bg-green-600",
      rating: "8.9 Great",
      reviews: "420 reviews",
      offer: "BREAKFAST INCLUDED",
      offerColor: "text-green-600 font-medium",
      oldPrice: "Rs. 5,200",
      price: "Rs. 2,899",
      buttonText: "Book Now",
      buttonStyle: "bg-primary text-white hover:bg-primary-hover",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
    }
  ];

  // Shared filter content used in both sidebar and mobile drawer
  const filterContent = (
    <>
      {/* Star Rating */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Star Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <label key={stars} className="flex items-center gap-3 cursor-pointer group">
              <input className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary" type="checkbox" />
              <span className="text-gray-600 group-hover:text-gray-900">{stars} Star{stars > 1 ? 's' : ''}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Amenities */}
      <div>
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Amenities</h4>
        <div className="space-y-2">
          {["Parking", "WiFi", "Toilet", "AC"].map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
              <input className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary" type="checkbox" />
              <span className="text-gray-600 group-hover:text-gray-900">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-32 pb-16 lg:px-24">
      
      {/* Section Header with Filter Button on Mobile */}
      <div className="flex justify-between items-center mb-8 text-left">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Popular Restaurants Near You</h2>
        <button
          onClick={() => setFilterOpen(true)}
          className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors cursor-pointer"
          type="button"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
          Filter
        </button>
      </div>
      
      {/* Mobile Filter Drawer (Slide-in from right) */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${
          filterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setFilterOpen(false)}
      ></div>

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          filterOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Filters</h3>
          <button
            onClick={() => setFilterOpen(false)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-6 overflow-y-auto h-[calc(100%-73px)]">
          {filterContent}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 text-left">
        
        {/* Desktop Sidebar (Hidden on mobile) */}
        <aside className="hidden lg:block lg:col-span-1 space-y-8">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
              {filterContent}
            </div>
          </div>
        </aside>
        
        {/* Cards Area */}
        <div className="lg:col-span-3">
          <div className="space-y-4 sm:space-y-6">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="flex flex-row bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                
                {/* Image */}
                <div className="relative w-28 sm:w-40 md:w-48 flex-shrink-0">
                  <img 
                    alt={hotel.name} 
                    className="w-full h-full object-cover" 
                    src={hotel.image} 
                  />
                  {hotel.badge && (
                    <div className={`absolute top-1 left-1 sm:top-2 sm:left-2 ${hotel.badgeColor} text-white text-[8px] sm:text-[10px] font-bold px-1 py-0.5 sm:px-1.5 rounded`}>
                      {hotel.badge}
                    </div>
                  )}
                </div>
                
                {/* Details */}
                <div className="flex-grow flex flex-col justify-between p-2.5 sm:p-4 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight truncate">{hotel.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-primary text-[10px] sm:text-xs">{hotel.stars}</span>
                        <span className="text-[8px] sm:text-[10px] text-gray-400 ml-1 hidden sm:inline">{hotel.distance}</span>
                      </div>
                      <div className="hidden sm:flex gap-2 mt-2">
                        {hotel.amenities.map((amenity) => (
                          <div key={amenity} className="flex items-center gap-1 text-[10px] text-gray-500">
                            {amenity === "WiFi" && (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a9.5 9.5 0 0114.142 0M6.228 6.228a14.5 14.5 0 0120.544 0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                              </svg>
                            )}
                            {amenity === "Parking" && (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                              </svg>
                            )}
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <div className="text-[10px] sm:text-xs font-bold text-primary">{hotel.rating}</div>
                      <div className="text-[8px] sm:text-[10px] text-gray-400 hidden sm:block">{hotel.reviews}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end mt-2 sm:mt-2">
                    <div className={`text-[8px] sm:text-[10px] ${hotel.offerColor} hidden sm:block`}>{hotel.offer}</div>
                    <div className="text-right">
                      <div className="text-[8px] sm:text-[10px] text-gray-400 line-through">{hotel.oldPrice}</div>
                      <div className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-none">{hotel.price}</div>
                      <button className={`mt-1 sm:mt-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs font-bold transition-colors cursor-pointer ${hotel.buttonStyle}`}>
                        {hotel.buttonText}
                      </button>
                    </div>
                  </div>
                  
                </div>
                
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
