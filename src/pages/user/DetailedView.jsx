import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import RestaurantMenu from '../../components/RestaurantMenu';

export default function DetailedView() {
  const [profile, setProfile] = useState({
    website: 'www.google.com',
    instagram: 'https://instagram.com/',
    kitchenName: 'Novotel Signature Restaurant'
  });

  useEffect(() => {
    const saved = localStorage.getItem('admin_profile_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile(prev => ({
          ...prev,
          website: parsed.website || prev.website,
          instagram: parsed.instagram || prev.instagram,
          kitchenName: parsed.kitchenName || prev.kitchenName
        }));
      } catch (e) {
        console.error('Failed to load profile in DetailedView', e);
      }
    }
  }, []);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);

  const handleAddItem = (item) => {
    const priceValue = parseInt(item.price.replace(/[^\d]/g, ''), 10) || 0;
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      } else {
        return [...prevItems, { id: item.id, name: item.name, price: item.price, priceValue, veg: item.veg, qty: 1 }];
      }
    });
  };

  const handleIncrement = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item => item.id === itemId ? { ...item, qty: item.qty + 1 } : item)
    );
  };

  const handleDecrement = (itemId) => {
    setCartItems(prevItems =>
      prevItems
        .map(item => item.id === itemId ? { ...item, qty: item.qty - 1 } : item)
        .filter(item => item.qty > 0)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handlePlaceOrder = () => {
    setShowOrderSuccessModal(true);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.priceValue * item.qty), 0);
  const gst = Math.round(subtotal * 0.05);
  const serviceCharge = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst + serviceCharge;

  const galleryImages = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmQCxBfnbAwz-DOBrLkB3cXDcuvS6Cj8t5D6__skPO-WtlmKfKFcIcR2WAuYmdEge6BrH7IvW2GboNU5l5ObX_Du9xcRghQdzcbdZ1wuLBAh5kgQmx_XNVwpKNVX_3z8e8NBxXjwticEdX5TOJMvenw8xro3OS7VND5h68qpgjFKhx-G4WUL-l0grR0zWC1VbkNFO2b3V2W_BRPuc9DlDxDyoGLQfdfS7JkL8-08lO5bNRd44dUdupB-zfudYmNeAU4hf0kzSHlcVV",
      alt: "Novotel Hyderabad Convention Centre Exterior"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1RTJ6vD61wzzWVrdyYHKC4CGjR48ywdj8YnTI6Ttp6SSzvUViyLSX_Blv4Cv2nW6dkRAMJy_N6-0boOkO23QQDhUW0BRcIp2n42NCPpUzkEyVa4oVLtq1jJfqfZwgEodptygnGPYGWM276Zp9gNWCVGNzqUkXW_LbAd9mzcvUb8jW1UhGs4YxTB74uBAtiIsUyx7CM3ApYSB99XIJX9sMi8FJk_tkjA3e5JHOAd-yz9-GhJAMO5FK2N3d8yDz7wAutjB5wmB7vMB4",
      alt: "Executive Suite Bedroom"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdZpxumZhZbIDDyYUprxQ6o-JcvDAzIzXQUlAythF6IC1lx9I_4ABGRHu9e6lLsBCmpcOObccKLeJp3ouNyauS7OcyMjqrnAsJ66a31OtusNujQU_94XYG1Zf9BQhnBWxupVhWZ2firieCFIMlpiNVUt-UuMymtnfC738zfSbR1S0rQiixHsUlxlTeI1pZpp1f0-cP-YvhFnemgHraAI0V9R7KQUimaQoBQH0vRGkRKkjGlXHKGszV_O_OxfCoXt3rIYklXngKPiHb",
      alt: "Outdoor Pool Close-up"
    },
    {
      src: "https://lh3.googleusercontent.com/aida/AP1WRLsaXzB3okdKoG_Q0IHr2jnBQvcY358jKwMaCJQkM1Bd00xLJJUbvZziuzbIJJ2d8_BeUuQxBzZSwHjjEtLEiDLzJeXHymYuWJ1pVib1c1jDBe0EWkPzclO2Bn6awSKSxusV1mXHGA8IN3EPnfce5SS3M2NKYYzHNv6yJmRsZCOjJxQeoY4WCO81GopHotB-8beK9Ddn7H7AYwr8QY7MkudwsDQLnzU7dWbqdnGoANcS9KXxcTVCLkMG4dzz",
      alt: "Modern Lobby Lounge"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNYXHjq9CCgqOG45Ixfk0UyX04pE8PAKXT7cgV9zfA0jtU9WjRxD6z3VoVTwjECmAnSvSEgKixTGSog9rgkToBd5fzKK4Is-WvRQPiY68na-mK_DNlfhImykTlD3ZAFp3C9ywmPwrD-8Oj0H-y-qabRDwRkVBKQcEBEhZFX5l1mRsYqXR3rR3MigxP85y58uYucmIYljyND70nqVR6XxfPeapXAdBOjN1ocyrghLF_mSchZdAf9oUkkU5QVINEMBxmRAXqSAnMoJQM",
      alt: "Fine Dining Restaurant Interior"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOMiQ65A2b8uXRXxkxkr1te75HhLZ4Fd_eVuMN4OBkp2Zs-aZxQSQ0QVAdLN6YtrM8GuE-lWTjYsDPkkxZ9yLFuBmbJbGRv_YSHzsNwJCbTPShNgD5cIIlZJiWZ83lrcei-TzZJyiMLXvAf_L0KiPIGFCOE5fbnN8U2Uh-D8eKLgC8FtfB3r8iUk0lE0XEVbkUTifa_zqU88l-2iq5uGnPztDLjDCNjjdWHuSZVKFyzN7R2q1QmeDUa3M-AxJXdxBEutFTuIRnRlOT",
      alt: "Serviced Apartment Kitchen"
    }
  ];

  const renderLiveBillCard = () => (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#d9c3ac] shadow-md flex flex-col min-w-0">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">Live Bill</h3>
          <p className="text-[10px] text-gray-500 font-semibold mt-0.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse animate-duration-1000"></span>
            Table #4 • Live Connection
          </p>
        </div>
        {cartItems.length > 0 && (
          <button 
            onClick={handleClearCart}
            className="text-[10px] sm:text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded transition-colors cursor-pointer border border-rose-100"
          >
            Clear Bill
          </button>
        )}
      </div>

      {/* Card Body / Items List */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#fff8ed] border border-[#d9c3ac]/40 flex items-center justify-center text-[#855400] mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h4 className="font-bold text-gray-800 text-sm">Your bill is empty</h4>
          <p className="text-xs text-gray-500 max-w-[180px] mt-1 leading-normal font-semibold">Add delicious items from the menu to start your order.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-2 border-b border-gray-50 pb-2 last:border-0 last:pb-0">
              <div className="min-w-0 flex-grow">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 border shrink-0 flex items-center justify-center p-[1px] ${item.veg ? 'border-green-600' : 'border-red-600'}`}>
                    <span className={`w-full h-full rounded-full ${item.veg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                  </span>
                  <p className="font-bold text-gray-800 text-xs sm:text-sm truncate leading-tight">{item.name}</p>
                </div>
                <p className="text-[10px] text-[#855400] font-bold mt-0.5">{item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-1.5 shrink-0 bg-slate-50 border border-slate-200/60 rounded-lg p-0.5">
                <button 
                  onClick={() => handleDecrement(item.id)}
                  className="w-5 h-5 flex items-center justify-center text-gray-600 font-bold hover:bg-slate-200 rounded text-xs transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="w-4 text-center font-extrabold text-xs text-gray-800">{item.qty}</span>
                <button 
                  onClick={() => handleIncrement(item.id)}
                  className="w-5 h-5 flex items-center justify-center text-gray-600 font-bold hover:bg-slate-200 rounded text-xs transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Item Total Price */}
              <div className="w-16 text-right shrink-0">
                <span className="font-extrabold text-[#855400] text-xs sm:text-sm">
                  ₹{(item.priceValue * item.qty).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calculations block */}
      {cartItems.length > 0 && (
        <>
          <hr className="my-3 border-gray-100" />
          <div className="space-y-1.5 text-xs font-semibold text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-gray-800">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span className="font-bold text-gray-800">₹{gst.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Charge (5%)</span>
              <span className="font-bold text-gray-800">₹{serviceCharge.toLocaleString()}</span>
            </div>
            <hr className="my-2 border-dashed border-gray-200" />
            <div className="flex justify-between text-sm sm:text-base font-extrabold text-gray-900">
              <span className="text-[#855400]">Total Bill</span>
              <span className="text-orange-600">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={handlePlaceOrder}
            className="w-full mt-4 py-2.5 sm:py-3 bg-[#FFA500] hover:bg-orange-600 text-white rounded-lg font-bold text-sm sm:text-base transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 sm:w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Place Order
          </button>
          <p className="text-center text-[9px] font-bold text-emerald-600 mt-2">✓ Order will be instantly synced to KDS kitchen panel</p>
        </>
      )}
    </div>
  );

  const renderAmenitiesCard = () => (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#d9c3ac] shadow-md">
      <h3 className="font-bold text-[14px] sm:text-[16px] text-gray-900 mb-3 sm:mb-4 pb-2 border-b border-gray-100">Amenities</h3>
      <div className="grid grid-cols-3 sm:grid-cols-2 gap-y-3 gap-x-2">
        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
          <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#855400] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 16.25a6 6 0 017.5 0m-9.75-2.25a9.75 9.75 0 0112 0m-14.25-2.25a13.5 13.5 0 0116.5 0M12 18.75h.007v.008H12v-.008z" />
          </svg>
          <span className="text-[11px] sm:text-xs font-semibold text-gray-600">Free WiFi</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
          <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#855400] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.5 5.25h3a2.25 2.25 0 010 4.5h-3V7.5zm0 9V7.5H9v9h1.5z" />
          </svg>
          <span className="text-[11px] sm:text-xs font-semibold text-gray-600">Valet Parking</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
          <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#855400] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2" />
            <path d="M5 14a6 6 0 008.5 5.5m.5 1.5v-7M9 9h6v3" />
          </svg>
          <span className="text-[11px] sm:text-xs font-semibold text-gray-600">Accessible</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
          <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#855400] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18m-3-6L6 18M6 6l12 12" />
          </svg>
          <span className="text-[11px] sm:text-xs font-semibold text-gray-600">Air Conditioned</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
          <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#855400] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-[11px] sm:text-xs font-semibold text-gray-600">Bar</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
          <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#855400] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 10l12-3M9 19a3 3 0 11-6 0 3 3 0 016 0zm12-3a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-[11px] sm:text-xs font-semibold text-gray-600">Live Music</span>
        </div>
      </div>
    </div>
  );

  return (
    <UserLayout>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 font-sans">
        
        {/* Sticky Sub-Navbar */}
        <nav className="sticky top-20 z-40 bg-white border-b border-gray-200 flex items-center gap-6 sm:gap-8 px-2 sm:px-4 mb-6 overflow-x-auto whitespace-nowrap shadow-sm scrollbar-none">
          <a className="py-4 font-bold text-sm text-[#855400] border-b-2 border-[#ffa500] transition-all" href="#overview">Overview</a>
          <a className="py-4 font-bold text-sm text-gray-500 hover:text-[#855400] transition-all" href="#menu">Menu</a>
          <button 
            onClick={() => setShowReviewsModal(true)}
            className="py-4 font-bold text-sm text-gray-500 hover:text-[#855400] transition-all cursor-pointer"
          >
            Reviews
          </button>
          <button 
            onClick={() => setShowLocationModal(true)}
            className="py-4 font-bold text-sm text-gray-500 hover:text-[#855400] transition-all cursor-pointer"
          >
            Location
          </button>
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=17.456,78.375" 
            target="_blank" 
            rel="noreferrer"
            className="py-4 font-bold text-sm text-gray-500 hover:text-[#855400] transition-all cursor-pointer"
          >
            Get Directions
          </a>
        </nav>

        {/* Mobile Swipeable Gallery (Agoda style responsive slider) */}
        <div className="md:hidden relative w-full mb-8 z-20">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth h-[240px] sm:h-[300px] w-full gap-3 rounded-xl">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setActivePhotoIndex(idx)}
                className="w-[85vw] sm:w-[70vw] flex-shrink-0 snap-center relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer"
              >
                <img 
                  alt={img.alt} 
                  className="w-full h-full object-cover" 
                  src={img.src} 
                />
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded font-medium backdrop-blur-sm border border-white/10">
                  {idx + 1}/{galleryImages.length}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Photos Gallery Layout (Agoda exact 7-image grid) */}
        <div className="hidden md:grid md:grid-cols-12 gap-3 h-[350px] mb-8 relative z-20">
          
          {/* Column 1: Large Featured Image (approx 45% width) */}
          <div 
            onClick={() => setActivePhotoIndex(0)}
            className="col-span-1 md:col-span-6 relative group overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-200 h-full cursor-pointer"
          >
            <img 
              alt="Novotel Hyderabad Convention Centre Exterior" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmQCxBfnbAwz-DOBrLkB3cXDcuvS6Cj8t5D6__skPO-WtlmKfKFcIcR2WAuYmdEge6BrH7IvW2GboNU5l5ObX_Du9xcRghQdzcbdZ1wuLBAh5kgQmx_XNVwpKNVX_3z8e8NBxXjwticEdX5TOJMvenw8xro3OS7VND5h68qpgjFKhx-G4WUL-l0grR0zWC1VbkNFO2b3V2W_BRPuc9DlDxDyoGLQfdfS7JkL8-08lO5bNRd44dUdupB-zfudYmNeAU4hf0kzSHlcVV"
            />
            {/* Centered See all photos button at the bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex(0);
                }}
                className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full text-blue-600 text-xs font-bold shadow-lg hover:bg-white transition-all cursor-pointer border border-gray-100"
              >
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812-1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                See all photos
              </button>
            </div>
          </div>

          {/* Right 3 columns of smaller images (hidden on mobile for responsive cleanliness) */}
          <div className="hidden md:grid col-span-6 grid-cols-3 gap-3 h-full">
            
            {/* Column 2: 2 stacked images (Guest Room & Suite Desk) */}
            <div className="grid grid-rows-2 gap-3 h-full">
              {/* Top: Bed */}
              <div 
                onClick={() => setActivePhotoIndex(1)}
                className="relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 h-full group cursor-pointer"
              >
                <img 
                  alt="Executive Suite Bedroom" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1RTJ6vD61wzzWVrdyYHKC4CGjR48ywdj8YnTI6Ttp6SSzvUViyLSX_Blv4Cv2nW6dkRAMJy_N6-0boOkO23QQDhUW0BRcIp2n42NCPpUzkEyVa4oVLtq1jJfqfZwgEodptygnGPYGWM276Zp9gNWCVGNzqUkXW_LbAd9mzcvUb8jW1UhGs4YxTB74uBAtiIsUyx7CM3ApYSB99XIJX9sMi8FJk_tkjA3e5JHOAd-yz9-GhJAMO5FK2N3d8yDz7wAutjB5wmB7vMB4"
                />
              </div>
              {/* Bottom: Desk sitting area */}
              <div 
                onClick={() => setActivePhotoIndex(1)}
                className="relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 h-full group cursor-pointer"
              >
                <img 
                  alt="Sitting Area" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1RTJ6vD61wzzWVrdyYHKC4CGjR48ywdj8YnTI6Ttp6SSzvUViyLSX_Blv4Cv2nW6dkRAMJy_N6-0boOkO23QQDhUW0BRcIp2n42NCPpUzkEyVa4oVLtq1jJfqfZwgEodptygnGPYGWM276Zp9gNWCVGNzqUkXW_LbAd9mzcvUb8jW1UhGs4YxTB74uBAtiIsUyx7CM3ApYSB99XIJX9sMi8FJk_tkjA3e5JHOAd-yz9-GhJAMO5FK2N3d8yDz7wAutjB5wmB7vMB4"
                />
              </div>
            </div>

            {/* Column 3: 2 stacked images (Pool close-up & Lobby lounge) */}
            <div className="grid grid-rows-2 gap-3 h-full">
              {/* Top: Pool close-up */}
              <div 
                onClick={() => setActivePhotoIndex(2)}
                className="relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 h-full group cursor-pointer"
              >
                <img 
                  alt="Outdoor Pool Close-up" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdZpxumZhZbIDDyYUprxQ6o-JcvDAzIzXQUlAythF6IC1lx9I_4ABGRHu9e6lLsBCmpcOObccKLeJp3ouNyauS7OcyMjqrnAsJ66a31OtusNujQU_94XYG1Zf9BQhnBWxupVhWZ2firieCFIMlpiNVUt-UuMymtnfC738zfSbR1S0rQiixHsUlxlTeI1pZpp1f0-cP-YvhFnemgHraAI0V9R7KQUimaQoBQH0vRGkRKkjGlXHKGszV_O_OxfCoXt3rIYklXngKPiHb"
                />
              </div>
              {/* Bottom: Lobby lounge */}
              <div 
                onClick={() => setActivePhotoIndex(3)}
                className="relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 h-full group cursor-pointer"
              >
                <img 
                  alt="Modern Lobby Lounge" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida/AP1WRLsaXzB3okdKoG_Q0IHr2jnBQvcY358jKwMaCJQkM1Bd00xLJJUbvZziuzbIJJ2d8_BeUuQxBzZSwHjjEtLEiDLzJeXHymYuWJ1pVib1c1jDBe0EWkPzclO2Bn6awSKSxusV1mXHGA8IN3EPnfce5SS3M2NKYYzHNv6yJmRsZCOjJxQeoY4WCO81GopHotB-8beK9Ddn7H7AYwr8QY7MkudwsDQLnzU7dWbqdnGoANcS9KXxcTVCLkMG4dzz"
                />
              </div>
            </div>

            {/* Column 4: 2 stacked images (Restaurant & Kitchen table) */}
            <div className="grid grid-rows-2 gap-3 h-full">
              {/* Top: Restaurant */}
              <div 
                onClick={() => setActivePhotoIndex(4)}
                className="relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 h-full group cursor-pointer"
              >
                <img 
                  alt="Fine Dining Restaurant Interior" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNYXHjq9CCgqOG45Ixfk0UyX04pE8PAKXT7cgV9zfA0jtU9WjRxD6z3VoVTwjECmAnSvSEgKixTGSog9rgkToBd5fzKK4Is-WvRQPiY68na-mK_DNlfhImykTlD3ZAFp3C9ywmPwrD-8Oj0H-y-qabRDwRkVBKQcEBEhZFX5l1mRsYqXR3rR3MigxP85y58uYucmIYljyND70nqVR6XxfPeapXAdBOjN1ocyrghLF_mSchZdAf9oUkkU5QVINEMBxmRAXqSAnMoJQM"
                />
              </div>
              {/* Bottom: Serviced apartment */}
              <div 
                onClick={() => setActivePhotoIndex(5)}
                className="relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 h-full group cursor-pointer"
              >
                <img 
                  alt="Serviced Apartment Kitchen" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOMiQ65A2b8uXRXxkxkr1te75HhLZ4Fd_eVuMN4OBkp2Zs-aZxQSQ0QVAdLN6YtrM8GuE-lWTjYsDPkkxZ9yLFuBmbJbGRv_YSHzsNwJCbTPShNgD5cIIlZJiWZ83lrcei-TzZJyiMLXvAf_L0KiPIGFCOE5fbnN8U2Uh-D8eKLgC8FtfB3r8iUk0lE0XEVbkUTifa_zqU88l-2iq5uGnPztDLjDCNjjdWHuSZVKFyzN7R2q1QmeDUa3M-AxJXdxBEutFTuIRnRlOT"
                />
              </div>
            </div>

          </div>
          
        </div>

        {/* Menu Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-2">
            <RestaurantMenu onAddItem={handleAddItem} />
            
            {/* Mobile/Tablet Live Bill (hidden on desktop) */}
            <div className="lg:hidden mt-8">
              {renderLiveBillCard()}
            </div>

            {/* Mobile/Tablet Amenities (hidden on desktop) */}
            <div className="lg:hidden mt-6">
              {renderAmenitiesCard()}
            </div>

            <section className="py-12 border-t border-[#d9c3ac] mt-12" id="overview">
              <h2 className="font-bold text-[24px] text-[#212529] mb-6">About Us</h2>
              <p className="text-[16px] text-[#534433] leading-relaxed">Welcome to {profile.kitchenName || 'Novotel Signature Restaurant'}, where culinary art meets timeless hospitality in the heart of Hyderabad. Our kitchen is led by award-winning chefs dedicated to crafting an exceptional dining experience. We blend authentic local heritage with contemporary global cooking techniques, selecting only the finest organic produce and sustainably sourced ingredients. Whether you are hosting a celebratory family dinner or a sophisticated business lunch, our warm ambience and curated menus promise to make every visit truly memorable.</p>

              {/* Dynamic Website & Instagram Links */}
              <div className="flex flex-wrap gap-4 mt-6">
                {profile.website && (
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-500/10 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                    </svg>
                    Visit Website
                  </a>
                )}
                {profile.instagram && (
                  <a 
                    href={profile.instagram} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 bg-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    Instagram Profile
                  </a>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar (Responsive Layout) */}
          <aside className="lg:col-span-1 self-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:space-y-6 lg:gap-0 lg:pt-40">
            {/* Desktop Live Bill Card (hidden on mobile/tablet) */}
            <div className="hidden lg:block">
              {renderLiveBillCard()}
            </div>
            
            {/* Desktop Amenities Card (hidden on mobile/tablet) */}
            <div className="hidden lg:block">
              {renderAmenitiesCard()}
            </div>
          </aside>
        </div>

      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-white text-3xl font-light hover:text-gray-300 cursor-pointer z-50 w-12 h-12 flex items-center justify-center bg-black/40 rounded-full border border-white/10"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex(null);
            }}
          >
            ✕
          </button>

          {/* Left Arrow */}
          <button 
            className="absolute left-6 text-white hover:text-gray-300 cursor-pointer z-50 w-12 h-12 flex items-center justify-center bg-black/40 rounded-full border border-white/10"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button 
            className="absolute right-6 text-white hover:text-gray-300 cursor-pointer z-50 w-12 h-12 flex items-center justify-center bg-black/40 rounded-full border border-white/10"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Image */}
          <div 
            className="max-w-[90vw] max-h-[80vh] flex items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              alt={galleryImages[activePhotoIndex].alt} 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10" 
              src={galleryImages[activePhotoIndex].src} 
            />
          </div>

          {/* Image caption and counter */}
          <div className="mt-4 text-center text-white" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-semibold">{galleryImages[activePhotoIndex].alt}</p>
            <p className="text-xs text-gray-400 mt-1">{activePhotoIndex + 1} of {galleryImages.length}</p>
          </div>
        </div>
      )}

      {/* Reviews Modal */}
      {showReviewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-[520px] overflow-hidden border border-[#d9c3ac] shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0 bg-gray-50">
              <div className="text-left">
                <h3 className="font-bold text-[#212529] text-[20px] sm:text-[22px] leading-tight">Customer Reviews</h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <div className="flex text-[#f5a623]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-700">4.7 out of 5</span>
                  <span className="text-xs text-gray-400 font-semibold">• 12,450 ratings</span>
                </div>
              </div>
              <button 
                onClick={() => setShowReviewsModal(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer border border-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Content / List of Reviews */}
            <div className="p-5 overflow-y-auto flex-grow text-left space-y-6">
              {[
                {
                  name: "Aditya Rao",
                  initials: "AR",
                  rating: 5,
                  date: "1 week ago",
                  text: "Absolutely phenomenal dining experience! The Truffle Burrata was incredibly fresh and rich. The lamb rogan josh was cooked to perfection and had the perfect balance of authentic Kashmiri spices. The service was top-notch and the atmosphere was lovely. Will definitely visit again!"
                },
                {
                  name: "Priya Sharma",
                  initials: "PS",
                  rating: 4,
                  date: "2 weeks ago",
                  text: "We ordered the butter chicken and the wild mushroom risotto. The butter chicken was velvety and delicious, and the risotto had a wonderful earthy truffle aroma. The place is beautiful, perfect for family dinners. Valet parking was quick."
                },
                {
                  name: "Marcus Vance",
                  initials: "MV",
                  rating: 5,
                  date: "3 weeks ago",
                  text: "Beautiful ambience and excellent food quality! The saffron risotto paired with pan-seared salmon was exquisite. Highly recommend sitting by the window for the best views. A premium experience all around."
                }
              ].map((rev, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-5 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#fff8ed] border border-[#d9c3ac]/60 flex items-center justify-center font-bold text-[#855400] text-sm">
                        {rev.initials}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-gray-800 text-sm">{rev.name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="flex text-[#f5a623]">
                            {[...Array(rev.rating)].map((_, i) => (
                              <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            {[...Array(5 - rev.rating)].map((_, i) => (
                              <svg key={i} className="w-3 h-3 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400 font-semibold">{rev.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 leading-relaxed pl-13">{rev.text}</p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end flex-shrink-0">
              <button 
                onClick={() => setShowReviewsModal(false)}
                className="px-5 py-2.5 bg-[#FFA500] hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Close Reviews
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-[520px] overflow-hidden border border-[#d9c3ac] shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0 bg-gray-50">
              <div className="text-left">
                <h3 className="font-bold text-[#212529] text-[20px] sm:text-[22px] leading-tight">Restaurant Location</h3>
                <p className="text-xs text-gray-500 font-semibold mt-1">Kondapur, HITEC City, Hyderabad</p>
              </div>
              <button 
                onClick={() => setShowLocationModal(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer border border-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto flex-grow text-left space-y-5">
              
              {/* Interactive OpenStreetMap Iframe */}
              <div className="relative w-full h-[220px] bg-gray-100 rounded-xl overflow-hidden shadow-inner border border-[#d9c3ac]/30">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=78.365%2C17.445%2C78.385%2C17.465&amp;layer=mapnik&amp;marker=17.456%2C78.375"
                  className="rounded-xl"
                  title="HITEC City Map"
                ></iframe>
              </div>

              {/* Address Details */}
              <div className="space-y-3 text-left">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#fff8ed] border border-[#d9c3ac]/60 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#855400]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Address</h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mt-0.5">
                      P.O Bag 1101, HITEC City, Kondapur, Hyderabad, 500081, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#fff8ed] border border-[#d9c3ac]/60 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#855400]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v-7.5m-6 3h12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Connectivity & Parking</h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mt-0.5">
                      • 800 meters from HITEC City Metro Station (5-min walk)<br />
                      • Free valet parking available for all dine-in guests<br />
                      • 200 meters from cyber towers main junction
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#fff8ed] border border-[#d9c3ac]/60 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#855400]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Nearby Landmarks</h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mt-0.5">
                      • Shilparamam Cultural Society (1.2 km)<br />
                      • Hyderabad International Convention Centre (HICC) (2.5 km)<br />
                      • DLF Cyber City (1.8 km)
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center flex-shrink-0">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=17.456,78.375" 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 bg-[#fff8ed] border border-[#d9c3ac] text-[#855400] rounded-lg text-xs font-bold hover:bg-[#855400] hover:text-white transition-colors cursor-pointer"
              >
                Get Directions
              </a>
              <button 
                onClick={() => setShowLocationModal(false)}
                className="px-5 py-2.5 bg-[#FFA500] hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Close Location
              </button>
            </div>

          </div>
        </div>
      )}
      {/* Order Success Confirmation Modal */}
      {showOrderSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-[460px] overflow-hidden border border-[#d9c3ac] shadow-2xl flex flex-col p-6 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-500 mx-auto mb-4 animate-bounce">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            
            <h3 className="font-extrabold text-[22px] sm:text-[24px] text-gray-900 leading-tight">Order Placed Successfully!</h3>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-2 leading-relaxed">
              Your table order has been dispatched directly to the kitchen display panel. Chef and kitchen staff have started preparing your meal!
            </p>

            <div className="bg-[#fff8ed] border border-[#d9c3ac]/40 rounded-xl p-4 my-5 text-left">
              <h4 className="font-bold text-[#855400] text-xs uppercase tracking-wider mb-2">Order Summary (Table #4)</h4>
              <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs font-semibold text-gray-700">
                    <span className="truncate max-w-[240px]">• {item.name} <span className="text-gray-400 font-bold">x{item.qty}</span></span>
                    <span className="font-extrabold text-[#855400]">₹{(item.priceValue * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <hr className="my-2.5 border-dashed border-[#d9c3ac]/60" />
              <div className="flex justify-between text-xs font-bold text-gray-900">
                <span>Total Amount Charged</span>
                <span className="text-orange-600 font-extrabold text-sm">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button 
                onClick={() => {
                  setShowOrderSuccessModal(false);
                  handleClearCart();
                }}
                className="w-full py-2.5 sm:py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm sm:text-base shadow-md transition-colors cursor-pointer"
              >
                Track Order Status
              </button>
              <button 
                onClick={() => {
                  setShowOrderSuccessModal(false);
                  handleClearCart();
                }}
                className="w-full py-2 text-gray-500 hover:text-gray-700 font-bold text-xs hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}
