import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      try {
        const saved = localStorage.getItem('foodieqr_orders');
        setOrders(saved ? JSON.parse(saved) : []);
      } catch (e) {
        setOrders([]);
      }
    };
    fetchOrders();

    // Sync if updated in another tab/component
    window.addEventListener('orders-update', fetchOrders);
    return () => window.removeEventListener('orders-update', fetchOrders);
  }, []);

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 font-sans text-left">
        {/* Header */}
        <div className="border-b border-gray-100 pb-6 mb-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Orders</h1>
            <p className="text-sm text-gray-500 mt-1 font-semibold">Track and view your active and past dining reservations & takeaways.</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
          >
            ← Back to Menu
          </button>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#d9c3ac]/45 p-8 sm:p-12 text-center max-w-md mx-auto shadow-sm flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800">No Orders Placed Yet</h3>
            <p className="text-xs text-slate-400 font-semibold mt-2 max-w-[240px] leading-relaxed">
              It looks like you haven't placed any orders or table bookings. Head over to our restaurants to order now!
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 px-6 py-2.5 bg-[#FFA500] hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-500/10 cursor-pointer active:scale-95"
            >
              Order Food
            </button>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-[#d9c3ac]/40 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                
                {/* Order Top Banner */}
                <div className="bg-[#fffcf7] px-4 py-4 sm:px-6 border-b border-[#d9c3ac]/30 flex flex-wrap justify-between items-center gap-3">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Reference</p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-800">#{order.id}</p>
                  </div>
                  <div className="space-y-0.5 sm:text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Placed On</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700">{order.date}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold px-3 py-1 bg-amber-100 text-amber-700 border border-amber-200/50 rounded-full uppercase tracking-wider animate-pulse">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Details Body */}
                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Left Column: Restaurant Info & Items */}
                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{order.restaurantName}</h3>
                      <p className="text-[11px] font-semibold text-slate-400 mt-0.5 flex items-center gap-1.5">
                        <span className="capitalize">{order.diningOption}</span>
                        {order.tableNumber && ` • Table: ${order.tableNumber}`}
                        {order.arrivalTime && ` • Time: ${order.arrivalTime}`}
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-slate-50 pt-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs font-semibold text-slate-600">
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            {item.name} <span className="text-slate-400 font-bold ml-1">x{item.qty}</span>
                          </span>
                          <span className="text-slate-700 font-bold">₹{(item.priceValue * item.qty).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Calculations Breakdown */}
                  <div className="md:col-span-4 bg-slate-50 rounded-xl p-4 flex flex-col justify-between border border-slate-100">
                    <div className="space-y-1.5 text-[11px] font-semibold text-slate-500">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span>₹{Math.round(order.grandTotal * 0.9).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax & Fees</span>
                        <span>₹{Math.round(order.grandTotal * 0.1).toLocaleString()}</span>
                      </div>
                      <hr className="my-2 border-dashed border-slate-200" />
                      <div className="flex justify-between text-xs sm:text-sm font-extrabold text-slate-900">
                        <span className="text-slate-800">Total Charged</span>
                        <span className="text-orange-600">₹{order.grandTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
