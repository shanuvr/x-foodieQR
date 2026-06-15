import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HotelListings() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeImageIndices, setActiveImageIndices] = useState({});

  const restaurants = [
    {
      id: 1,
      name: "Paradise Biryani - Secunderabad",
      stars: 4,
      location: "Secunderabad, Hyderabad - 1.2 km from center",
      subLocation: "50 m from Secunderabad Metro Station • 200 m from Railway Station",
      badges: [
        { text: "Best Biryani", type: "pink-outline", icon: "diamond" },
        { text: "Top Rated", type: "outline" }
      ],
      features: [
        "Legendary Hyderabadi Dum Biryani since 1953",
        "Highly recommended for families and groups"
      ],
      promoTags: ["Flat 20% Off on Dine-in"],
      ratingScore: "4.5",
      ratingText: "Excellent",
      reviews: "12,450 reviews",
      locationScore: "4.8 Location score",
      pricingLabel: "For two people",
      oldPrice: "Rs. 800",
      discount: "-25%",
      price: "Rs. 600",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=800"
      ],
      amenities: ["WiFi", "Parking", "AC", "Pure Veg"],
      awardBadge: "Foodie Award"
    },
    {
      id: 2,
      name: "Absolute Barbecues - Gachibowli",
      stars: 5,
      location: "Gachibowli, Hyderabad - 8.3 km to center",
      subLocation: "1.4 km from Hitech City • 2.2 km from Shilparamam",
      badges: [
        { text: "Booked 48 times today", type: "red-text" }
      ],
      features: [
        "Wish Grill live kitchen concept with custom toppings",
        "Unlimited buffet starting at Rs. 699 per head"
      ],
      promoTags: ["Limited Time Offer."],
      appliedCoupons: ["Rs. 200 coupon applied", "MEGA SALE"],
      ratingScore: "4.7",
      ratingText: "Superb",
      reviews: "8,555 reviews",
      locationScore: "4.5 Location score",
      pricingLabel: "For two people",
      oldPrice: "Rs. 1,600",
      discount: "-12%",
      price: "Rs. 1,400",
      images: [
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=800"
      ],
      amenities: ["Parking", "AC", "Bar", "WiFi", "Non Veg"],
      awardBadge: "Best Buffet"
    },
    {
      id: 3,
      name: "Bawarchi Restaurant - RTC X Roads",
      stars: 4,
      location: "RTC X Roads, Hyderabad - 3.5 km from center",
      subLocation: "300 m from RTC X Roads Metro Station • Near Sandhya Theatre",
      badges: [
        { text: "Famous Biryani", type: "outline" }
      ],
      features: [
        "Original Bawarchi serving authentic Hyderabadi flavor",
        "A must-visit food heritage site in Hyderabad"
      ],
      promoTags: ["Dine-in Special Offer"],
      ratingScore: "4.3",
      ratingText: "Very Good",
      reviews: "24,800 reviews",
      locationScore: "4.6 Location score",
      pricingLabel: "For two people",
      oldPrice: "Rs. 700",
      discount: "-15%",
      price: "Rs. 595",
      images: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800"
      ],
      amenities: ["Parking", "AC", "WiFi", "Non Veg"],
      awardBadge: "Legendary Outlet"
    }
  ];

  const handleNextImage = (e, restaurantId, imagesLength) => {
    e.stopPropagation();
    setActiveImageIndices(prev => {
      const curr = prev[restaurantId] || 0;
      return { ...prev, [restaurantId]: (curr + 1) % imagesLength };
    });
  };

  const handlePrevImage = (e, restaurantId, imagesLength) => {
    e.stopPropagation();
    setActiveImageIndices(prev => {
      const curr = prev[restaurantId] || 0;
      return { ...prev, [restaurantId]: (curr - 1 + imagesLength) % imagesLength };
    });
  };

  // Helper function to render SVG icons for amenities
  const renderAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'WiFi':
        return (
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a9.5 9.5 0 0114.142 0M6.228 6.228a14.5 14.5 0 0120.544 0" />
          </svg>
        );
      case 'Parking':
        return (
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      case 'AC':
        return (
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        );
      case 'Pure Veg':
        return (
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 border border-green-600 flex items-center justify-center p-0.5" title="Pure Veg">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-600 rounded-full"></span>
          </span>
        );
      case 'Non Veg':
        return (
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 border border-[#e12d5b] flex items-center justify-center p-0.5" title="Non Veg">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#e12d5b] rounded-full"></span>
          </span>
        );
      case 'Bar':
        return (
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Shared filter content used in both sidebar and mobile drawer
  const filterContent = (
    <>
      {/* Rating */}
      <div className="mb-5">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Rating</h4>
        <div className="space-y-1.5">
          {["4.5+", "4.0+", "3.5+", "3.0+"].map((rating) => (
            <label key={rating} className="flex items-center gap-2.5 cursor-pointer group">
              <input className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {rating}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Food Preference */}
      <div className="mb-5">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Food Preference</h4>
        <div className="space-y-1.5">
          {["Pure Veg", "Non Veg"].map((pref) => (
            <label key={pref} className="flex items-center gap-2.5 cursor-pointer group">
              <input className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">{pref}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Amenities */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Amenities</h4>
        <div className="space-y-1.5">
          {["Parking", "WiFi", "AC", "Bar"].map((amenity) => (
            <label key={amenity} className="flex items-center gap-2.5 cursor-pointer group">
              <input className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section className="max-w-[1320px] mx-auto px-2 sm:px-4 mt-16 md:mt-32 pb-16">
      
      {/* Section Header with Filter Button on Mobile */}
      <div className="sticky top-20 lg:relative lg:top-0 bg-white z-30 py-4 mb-6 flex justify-between items-center text-left border-b border-gray-100 lg:border-none -mx-2 px-4 sm:mx-0 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Popular Restaurants Near You</h2>
        <button
          onClick={() => setFilterOpen(true)}
          className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm cursor-pointer"
          type="button"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
          Filter
        </button>
      </div>
      
      {/* Mobile Filter Drawer (Slide-in from right) */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${
          filterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setFilterOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          filterOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
          <button
            onClick={() => setFilterOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow px-5 py-5 overflow-y-auto">
          {filterContent}
        </div>

        <div className="flex-shrink-0 p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
          <button
            onClick={() => setFilterOpen(false)}
            className="flex-1 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 transition-colors cursor-pointer"
            type="button"
          >
            Clear All
          </button>
          <button
            onClick={() => setFilterOpen(false)}
            className="flex-1 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer"
            type="button"
          >
            Apply Filters
          </button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4 text-left">
        
        {/* Desktop Sidebar (Hidden on mobile) */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
              {filterContent}
            </div>
          </div>
        </aside>
        
        {/* Cards Area */}
        <div className="flex-1 min-w-0 space-y-4">
          {restaurants.map((restaurant, index) => {
            const activeImageIndex = activeImageIndices[restaurant.id] || 0;
            return (
              <div 
                key={restaurant.id} 
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                className="bg-white rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden flex flex-row font-sans h-[150px] sm:h-[270px] cursor-pointer hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/30 transition-all duration-300 ease-out animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
              >
                
                {/* Banner Top Removed */}
                
                <div className="flex flex-row h-full w-full">
                  
                  {/* Left: Image (Agoda style large image) */}
                  <div className="relative w-[115px] sm:w-[260px] md:w-[280px] flex-shrink-0 h-full group cursor-pointer overflow-hidden">
                    
                    {/* Sliding Image Track */}
                    <div 
                      className="flex h-full w-full transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                    >
                      {restaurant.images.map((imgUrl, idx) => (
                        <div key={idx} className="w-full h-full flex-shrink-0">
                          <img 
                            alt={`${restaurant.name} ${idx + 1}`} 
                            className="w-full h-full object-cover select-none" 
                            src={imgUrl} 
                          />
                        </div>
                      ))}
                    </div>
                    
                    {/* Award Badge Absolute */}
                    {restaurant.awardBadge && (
                      <div className="absolute top-1.5 left-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[7px] sm:text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full flex items-center gap-1 shadow-md border border-white/25">
                        <svg className="w-2 h-2 sm:w-3 sm:h-3 text-amber-100" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {restaurant.awardBadge}
                      </div>
                    )}

                    {/* Favorite Icon */}
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-2 right-2 sm:bottom-auto sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500 transition-colors z-10"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </button>

                    {/* Carousel Navigation - Left Arrow */}
                    <div className="absolute inset-y-0 left-2 hidden sm:flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => handlePrevImage(e, restaurant.id, restaurant.images.length)}
                        className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md text-gray-700 cursor-pointer"
                        type="button"
                        aria-label="Previous Image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                    </div>

                    {/* Carousel Navigation - Right Arrow */}
                    <div className="absolute inset-y-0 right-2 hidden sm:flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => handleNextImage(e, restaurant.id, restaurant.images.length)}
                        className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md text-gray-700 cursor-pointer"
                        type="button"
                        aria-label="Next Image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>

                    {/* Image Count Bottom Left */}
                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 text-white text-[9px] sm:text-[11px] px-1.5 py-0.5 rounded font-medium tracking-wide">
                      {activeImageIndex + 1}/{restaurant.images.length}
                    </div>
                  </div>
                  
                  {/* Middle & Right Content Wrapper */}
                  <div className="flex-grow flex flex-row p-2 sm:p-4 gap-2 sm:gap-4 h-full min-w-0">
                    
                    {/* Middle: Info */}
                    <div className="flex-grow min-w-0 flex flex-col justify-between">
                      <div>
                        {/* Title & Mobile Rating Pill Row */}
                        <div className="flex items-start justify-between gap-1.5 mb-0.5 sm:mb-1">
                          <h3 className="text-xs sm:text-[21px] font-bold text-gray-900 leading-tight cursor-pointer hover:text-[#2b6be3] transition-colors line-clamp-2">{restaurant.name}</h3>
                          
                          {/* Mobile Rating Badge */}
                          <div className="sm:hidden flex items-center gap-0.5 bg-[#e9f0fa] text-[#2b6be3] px-1.5 py-0.5 rounded shrink-0">
                            <span className="font-extrabold text-[9px]">{restaurant.ratingScore}</span>
                            <span className="text-[8px] font-semibold">★</span>
                          </div>
                        </div>
                        
                        {/* Stars & Reviews Count Row */}
                        <div className="flex items-center gap-1.5 mb-1 sm:mb-2 flex-wrap">
                          {/* Stars */}
                          <div className="flex text-[#f5a623] shrink-0">
                            {[...Array(restaurant.stars)].map((_, i) => (
                              <svg key={i} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          {/* Mobile Review Count */}
                          <span className="text-gray-400 text-[8px] font-semibold sm:hidden truncate">
                            ({restaurant.reviews.split(' ')[0]} reviews)
                          </span>
                        </div>

                        {/* Location Data */}
                        <div className="flex items-start gap-1 mb-1 sm:mb-2.5 text-[9px] sm:text-[13px] min-w-0">
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2b6be3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <div className="leading-tight min-w-0 flex-grow">
                            <div className="text-[#2b6be3] font-semibold hover:underline cursor-pointer truncate">{restaurant.location.split(' - ')[0]}</div>
                            <div className="text-gray-400 text-[8px] sm:text-[12px] sm:text-gray-500 truncate mt-0.5">{restaurant.subLocation}</div>
                          </div>
                        </div>

                        {/* Amenities Row */}
                        <div className="flex flex-wrap gap-1 sm:gap-2.5 mb-1.5 sm:mb-2.5 text-[8px] sm:text-[12px] text-gray-500">
                          {restaurant.amenities.map((amenity) => (
                            <div key={amenity} className="flex items-center gap-0.5 bg-gray-50 px-1 py-0.5 rounded border border-gray-100">
                              {renderAmenityIcon(amenity)}
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>

                        {/* Badges */}
                        <div className="hidden sm:flex flex-wrap gap-1 mt-1 sm:mt-1.5 text-[9px] sm:text-[11px]">
                          {restaurant.badges.map((badge, idx) => (
                            <div key={idx} className={`px-1 py-0.5 rounded-sm flex items-center gap-0.5 ${
                              badge.type === 'outline' ? 'border border-gray-300 text-gray-600' :
                              badge.type === 'pink-outline' ? 'border border-[#e12d5b] text-[#e12d5b]' :
                              badge.type === 'red-text' ? 'text-[#e12d5b] font-medium' : ''
                            }`}>
                              {badge.icon === 'diamond' && (
                                <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M2.166 6.942l7.086 10.63a1 1 0 001.5 0l7.086-10.63A1 1 0 0017.5 5.5h-15a1 1 0 00-.334 1.442z" />
                                </svg>
                              )}
                              {badge.text}
                            </div>
                          ))}
                        </div>

                        {/* Description Features */}
                        <div className="hidden sm:block mt-2 space-y-0.5">
                          {restaurant.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[12px] text-gray-600 leading-snug">
                              <div className="text-[#2b6be3] mt-0.5 text-[10px]">✦</div>
                              {feat}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Promo Tags Bottom Left */}
                      <div className="hidden sm:flex flex-wrap gap-1 mt-1.5 sm:mt-2.5">
                        {restaurant.promoTags.map((tag, idx) => (
                          <span key={idx} className="bg-[#e9f0fa] text-[#2b6be3] text-[9px] sm:text-[12px] px-1.5 py-0.5 rounded-sm font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Rating & Pricing (Hidden on Mobile) */}
                    <div className="hidden sm:flex w-[210px] flex-col justify-between items-end border-l border-gray-100 pl-3 text-right shrink-0">
                      
                      {/* Ratings Top Right */}
                      <div className="flex flex-col items-end w-full cursor-pointer group">
                        <div className="flex items-center justify-end mb-0.5">
                          <span className="text-[#2b6be3] font-bold text-[17px] group-hover:underline">{restaurant.ratingScore} {restaurant.ratingText}</span>
                        </div>
                        <div className="text-gray-500 text-[11px] mb-0.5 group-hover:underline">{restaurant.reviews}</div>
                        <div className="text-gray-900 font-bold text-[12px]">{restaurant.locationScore}</div>
                      </div>

                      {/* Pricing Bottom Right (Commented Out) */}
                      {/* 
                      <div className="flex flex-col items-end w-full mt-1.5">
                        {restaurant.appliedCoupons && restaurant.appliedCoupons.map((coupon, idx) => (
                          <div key={idx} className={`text-[9px] sm:text-[11px] px-1 py-0.5 rounded-sm mb-0.5 ${
                            idx === 0 ? 'bg-[#e5f5e5] text-[#1e8b24] font-medium' : 'bg-[#fff0f0] text-[#e12d5b] font-bold'
                          } ${idx > 0 ? 'hidden sm:block' : ''}`}>
                            {idx === 1 && '⬇ '} {coupon}
                          </div>
                        ))}
                        
                        {!restaurant.appliedCoupons && (
                           <div className="text-gray-500 text-[9px] sm:text-[11px] mt-0.5 mb-0.5">{restaurant.pricingLabel}</div>
                        )}
                        
                        <div className="flex items-center justify-end gap-1 mb-0.5 mt-0.5 text-[10px] sm:text-[13px]">
                          <span className="text-gray-400 line-through text-[10px] sm:text-[13px]">{restaurant.oldPrice}</span>
                          <span className="text-[#e12d5b] font-bold text-[10px] sm:text-[14px]">{restaurant.discount}</span>
                        </div>
                        
                        <div className="text-[#e12d5b] text-[17px] sm:text-[28px] font-bold leading-none mb-0.5">
                          {restaurant.price}
                        </div>
                        
                        <div className="text-gray-400 text-[8px] sm:text-[10px] mt-0.5 mb-1">
                          Before taxes and fees
                        </div>
                      </div>
                      */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
