import React, { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [selectedType, setSelectedType] = useState('All Types');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [location, setLocation] = useState('');
  const [detecting, setDetecting] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const locationContainerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('foodieqr_recent_locations');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    } else {
      const defaults = ['HITEC City, Hyderabad', 'Madhapur, Hyderabad', 'Gachibowli, Hyderabad'];
      setRecentSearches(defaults);
      localStorage.setItem('foodieqr_recent_locations', JSON.stringify(defaults));
    }
  }, []);

  const saveToRecentSearches = (locText) => {
    if (!locText || !locText.trim()) return;
    const trimmed = locText.trim();
    let recents = JSON.parse(localStorage.getItem('foodieqr_recent_locations') || '[]');
    recents = recents.filter(item => item.toLowerCase() !== trimmed.toLowerCase());
    recents.unshift(trimmed);
    recents = recents.slice(0, 5);
    localStorage.setItem('foodieqr_recent_locations', JSON.stringify(recents));
    setRecentSearches(recents);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (location && location.trim()) {
      saveToRecentSearches(location);
    }
    setLocationDropdownOpen(false);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setDetecting(true);
    setLocation("Detecting location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocoding using Nominatim OpenStreetMap API
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
          .then(res => res.json())
          .then(data => {
            const address = data.address;
            const city = address.city || address.town || address.village || address.suburb || "Hyderabad";
            const road = address.road || address.suburb || "HITEC City";
            const formatted = `${road}, ${city}`;
            setLocation(formatted);
            saveToRecentSearches(formatted);
            setDetecting(false);
            setLocationDropdownOpen(false);
          })
          .catch(err => {
            console.error("Geocoding failed, using fallback location", err);
            setTimeout(() => {
              const fallback = "HITEC City, Hyderabad";
              setLocation(fallback);
              saveToRecentSearches(fallback);
              setDetecting(false);
              setLocationDropdownOpen(false);
            }, 1000);
          });
      },
      (error) => {
        console.error("Geolocation error:", error);
        setTimeout(() => {
          const fallback = "Secunderabad, Hyderabad";
          setLocation(fallback);
          saveToRecentSearches(fallback);
          setDetecting(false);
          setLocationDropdownOpen(false);
        }, 800);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const options = ['All Types', 'Restaurant', 'Bakery', 'Cool Bar'];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (locationContainerRef.current && !locationContainerRef.current.contains(event.target)) {
        setLocationDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 tracking-tight leading-tight animate-fade-in-up">
          Find the Best Food Near You
        </h1>
        <p className="mt-2 text-sm sm:text-base md:text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in-up-delay">
          Discover restaurants, cafes and offers near you.
        </p>
      </div>

      {/* Ultra-Responsive Single-Row Search Bar */}
      <div className="absolute -bottom-8 md:-bottom-16 left-0 w-full px-4 sm:px-6 lg:px-8 z-40">
        <div className="max-w-4xl mx-auto bg-white md:bg-white/95 md:backdrop-blur-md rounded-xl shadow-xl p-1.5 md:p-2 border border-white/20">
          <form className="flex flex-row items-center w-full" onSubmit={handleSearch}>
            
            {/* Location Input */}
            <div ref={locationContainerRef} className="flex-[2] flex flex-row items-center px-2 py-1.5 md:px-6 md:py-4 min-w-0 gap-2 relative">
              <div className="hidden sm:block flex-shrink-0">
                <svg aria-hidden="true" className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" fillRule="evenodd"></path>
                </svg>
              </div>
              <div className="flex-grow text-left min-w-0">
                <label className="hidden md:block text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider" htmlFor="location">Location</label>
                <div className="flex items-center gap-2">
                  <input 
                    className="block w-full border-none focus:ring-0 p-0 text-gray-900 text-xs sm:text-sm md:text-lg font-medium placeholder-gray-400 bg-transparent focus:outline-none truncate" 
                    id="location" 
                    name="location" 
                    placeholder="Where are you?" 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setLocationDropdownOpen(true)}
                    disabled={detecting}
                    autoComplete="off"
                  />
                </div>
              </div>

              {locationDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-100/85 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] z-50 py-2.5 overflow-hidden animate-fade-in text-left">
                  {/* Use Current Location Action */}
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={detecting}
                    className="w-full flex items-center gap-3 px-4 py-3 text-xs sm:text-sm font-bold text-orange-500 hover:text-orange-600 hover:bg-orange-50/40 transition-colors cursor-pointer border-b border-slate-100"
                  >
                    {detecting ? (
                      <svg className="h-4 w-4 animate-spin text-orange-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span>{detecting ? "Detecting location..." : "Use current location"}</span>
                  </button>

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="pt-2">
                      <div className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Recent Searches
                      </div>
                      {recentSearches.map((search, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setLocation(search);
                            setLocationDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                        >
                          <svg className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="truncate">{search}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Vertical Divider */}
            <div className="h-8 md:h-12 w-px bg-gray-200 flex-shrink-0"></div>
            
            {/* Restaurant Type Dropdown */}
            <div ref={dropdownRef} className="flex-[1.5] flex items-center px-2 py-1.5 md:px-6 md:py-4 min-w-0 relative">
              <div className="hidden sm:block flex-shrink-0 mr-2 md:mr-3">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
              <div className="flex-grow text-left min-w-0 relative">
                <label className="hidden md:block text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider select-none">Cuisine</label>
                <input type="hidden" name="type" value={selectedType} />
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full text-left flex items-center justify-between p-0 text-gray-900 text-xs sm:text-sm md:text-lg font-medium bg-transparent border-none focus:outline-none cursor-pointer truncate"
                >
                  <span className="truncate">{selectedType}</span>
                  <svg className={`ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 transition-transform shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </button>

                {/* Styled Custom Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute left-0 right-0 mt-3 md:mt-4 w-44 sm:w-56 bg-white border border-slate-100/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] z-50 py-1.5 overflow-hidden animate-fade-in text-left">
                    {options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSelectedType(option);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm font-bold text-left transition-colors cursor-pointer ${
                          selectedType === option 
                            ? 'text-primary bg-orange-50/40' 
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span>{option}</span>
                        {selectedType === option && (
                          <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
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
