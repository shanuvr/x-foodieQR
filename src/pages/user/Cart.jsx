import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('foodieqr_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [diningOption, setDiningOption] = useState(() => {
    return localStorage.getItem('foodieqr_dining_option') || 'dine-in';
  });
  const [tableNumber, setTableNumber] = useState(() => {
    return localStorage.getItem('foodieqr_table_number') || 'Table 1';
  });
  const [specialNotes, setSpecialNotes] = useState('');

  // Redirect to login if user is not authenticated
  useEffect(() => {
    const user = localStorage.getItem('current_user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('foodieqr_dining_option', diningOption);
    window.dispatchEvent(new Event('dining-option-update'));
  }, [diningOption]);

  useEffect(() => {
    localStorage.setItem('foodieqr_table_number', tableNumber);
    window.dispatchEvent(new Event('dining-option-update'));
  }, [tableNumber]);

  useEffect(() => {
    const handleSync = () => {
      setDiningOption(localStorage.getItem('foodieqr_dining_option') || 'dine-in');
      setTableNumber(localStorage.getItem('foodieqr_table_number') || 'Table 1');
    };
    window.addEventListener('dining-option-update', handleSync);
    return () => window.removeEventListener('dining-option-update', handleSync);
  }, []);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('foodieqr_cart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cart-update'));
  }, [cartItems]);

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

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handlePlaceOrder = () => {
    const user = localStorage.getItem('current_user');
    if (!user) {
      alert("Please log in to place an order.");
      navigate('/login');
      return;
    }
    setShowOrderSuccessModal(true);
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.priceValue * item.qty), 0);
  const gst = Math.round(subtotal * 0.05);
  const serviceCharge = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst + serviceCharge;

  return (
    <UserLayout>
      <div className="min-h-[85vh] bg-slate-50 font-sans py-5 sm:py-10 relative overflow-hidden">
        {/* Background blobs for premium feel */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2" />

        <div className="max-w-[1240px] mx-auto px-2.5 sm:px-6 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-slate-400 mb-4 sm:mb-6">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>•</span>
            <span className="text-slate-600 font-bold">Checkout Cart</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Cart items */}
            <div className="lg:col-span-2 bg-white border border-[#d9c3ac] shadow-md rounded-2xl p-4 sm:p-7 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 sm:mb-6">
                <div>
                  <h1 className="text-lg sm:text-2xl font-extrabold text-slate-800 tracking-tight">Your Cart</h1>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-semibold mt-1">
                    Items will be prepared instantly and served directly to your table.
                  </p>
                </div>
                {cartItems.length > 0 && (
                  <button 
                    onClick={handleClearCart}
                    className="text-[10px] sm:text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-rose-100/50 transition-all cursor-pointer"
                  >
                    Empty Cart
                  </button>
                )}
              </div>

              {cartItems.length === 0 ? (
                /* Empty Cart State */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-24 h-24 rounded-full bg-orange-50 border border-orange-100/60 flex items-center justify-center text-orange-500 mb-5 animate-pulse">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Your cart is currently empty</h3>
                  <p className="text-sm text-slate-500 max-w-xs mt-2 leading-relaxed font-semibold">
                    Browse our digital menus, add your favorite cuisines, and scan to order instantly!
                  </p>
                  <Link 
                    to="/" 
                    className="mt-5 sm:mt-6 inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    Explore Popular Outlets
                  </Link>
                </div>
              ) : (
                /* Cart Items List */
                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      
                      {/* Name & Veg/NonVeg Info */}
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <span className={`w-3 h-3 border shrink-0 flex items-center justify-center p-[2px] mt-1 ${item.veg ? 'border-green-600' : 'border-red-600'}`}>
                          <span className={`w-full h-full rounded-full ${item.veg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                        </span>
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-800 text-xs sm:text-base truncate leading-snug">{item.name}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[11px] sm:text-xs text-orange-500 font-bold">{item.price}</span>
                            <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold">• Prep: 15-20 min</span>
                          </div>
                        </div>
                      </div>

                      {/* Controls and Total Block */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 shrink-0 w-full sm:w-auto">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/60 rounded-xl p-1">
                          <button 
                            onClick={() => handleDecrement(item.id)}
                            className="w-6 h-6 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-200 rounded text-xs transition-all cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-5 text-center font-extrabold text-[11px] sm:text-xs text-slate-800">{item.qty}</span>
                          <button 
                            onClick={() => handleIncrement(item.id)}
                            className="w-6 h-6 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-200 rounded text-xs transition-all cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total Price */}
                        <div className="w-16 text-right">
                          <span className="font-extrabold text-[#855400] text-xs sm:text-base">
                            ₹{(item.priceValue * item.qty).toLocaleString()}
                          </span>
                        </div>

                        {/* Remove Button */}
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1.5 cursor-pointer"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Checkout & Billing */}
            {cartItems.length > 0 && (
              <aside className="lg:col-span-1 space-y-6 w-full">
                
                {/* Dining Preferences Card */}
                <div className="bg-white border border-[#d9c3ac] shadow-md rounded-2xl p-4 sm:p-6 text-left relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500" />
                  
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 mt-1">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    Dining Option
                  </h3>

                  {/* Toggle Selector */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 border border-slate-200 rounded-xl mb-4">
                    <button
                      type="button"
                      onClick={() => setDiningOption('dine-in')}
                      className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        diningOption === 'dine-in'
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      Dine In
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiningOption('takeaway')}
                      className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        diningOption === 'takeaway'
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      Takeaway
                    </button>
                  </div>

                  {/* Conditional Table Selector */}
                  {diningOption === 'dine-in' ? (
                    <div className="space-y-3 animate-fade-in text-left">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Select Table Number</label>
                        <select
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-orange-500 transition-colors"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={`Table ${i + 1}`}>Table #{i + 1}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-[10px] sm:text-xs text-amber-800 font-semibold leading-relaxed animate-fade-in">
                      📍 Pick up your food directly from the counter when your order status changes to "Ready for Pickup".
                    </div>
                  )}

                  {/* Special notes */}
                  <div className="mt-3">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Special Instructions</label>
                    <textarea
                      placeholder="e.g. Less spicy, extra cheese, no onions..."
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Bill details card */}
                <div className="bg-white border border-[#d9c3ac] shadow-md rounded-2xl p-4 sm:p-6 text-left relative overflow-hidden">
                  {/* Premium visual top border */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500" />
                  
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base mb-4 sm:mb-5 flex items-center gap-2 border-b border-gray-100 pb-3 mt-1">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    Order Summary
                  </h3>

                  <div className="space-y-2.5 sm:space-y-3.5 text-[11px] sm:text-xs font-semibold text-gray-500">
                    <div className="flex justify-between items-center">
                      <span>Subtotal</span>
                      <span className="font-bold text-gray-800 text-xs sm:text-sm">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>GST (5%)</span>
                      <span className="font-bold text-gray-800 text-xs sm:text-sm">₹{gst.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Service Charge (5%)</span>
                      <span className="font-bold text-gray-800 text-xs sm:text-sm">₹{serviceCharge.toLocaleString()}</span>
                    </div>
                    <hr className="my-4 border-dashed border-slate-200" />
                    <div className="flex justify-between items-end text-slate-900">
                      <div>
                        <span className="text-xs sm:text-sm font-extrabold block text-gray-800">Total Payable</span>
                        <span className="text-[8px] sm:text-[9px] text-gray-400 font-semibold">(incl. all taxes)</span>
                      </div>
                      <span className="text-base sm:text-2xl font-black text-orange-600">₹{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handlePlaceOrder}
                    className="w-full mt-5 py-2 sm:py-3 bg-gradient-to-r from-[#FFA500] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-xs sm:text-base transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    {diningOption === 'dine-in' ? 'Book Seat' : 'Place Order'}
                  </button>
                  <p className="text-center text-[10px] font-bold text-emerald-600 mt-3 flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Instantly synced to kitchen panel
                  </p>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>

      {/* Order Success Confirmation Modal */}
      {showOrderSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-[460px] overflow-hidden border border-[#d9c3ac] shadow-2xl flex flex-col p-5 sm:p-6 text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-500 mx-auto mb-4 animate-bounce">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            
            <h3 className="font-extrabold text-lg sm:text-[24px] text-gray-900 leading-tight">
              {diningOption === 'dine-in' ? 'Seat Booked & Order Placed!' : 'Order Placed Successfully!'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-2 leading-relaxed">
              {diningOption === 'dine-in'
                ? `Your seat at ${tableNumber} is booked and the order has been dispatched directly to the kitchen display panel. Chef and kitchen staff have started preparing your meal!`
                : 'Your takeaway order has been dispatched directly to the kitchen display panel. Chef and kitchen staff have started preparing your meal!'}
            </p>

            <div className="bg-[#fff8ed] border border-[#d9c3ac]/40 rounded-xl p-3.5 sm:p-4 my-4 sm:my-5 text-left">
              <h4 className="font-bold text-[#855400] text-xs uppercase tracking-wider mb-2">
                Order Summary ({diningOption === 'dine-in' ? `Dine-in • ${tableNumber}` : 'Takeaway'})
              </h4>
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
                  navigate('/');
                }}
                className="w-full py-2.5 sm:py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm sm:text-base shadow-md transition-colors cursor-pointer"
              >
                Track Order Status
              </button>
              <button 
                onClick={() => {
                  setShowOrderSuccessModal(false);
                  handleClearCart();
                  navigate('/');
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
