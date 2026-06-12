import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

export default function Orders() {
  // Static initial order data
  const [orders, setOrders] = useState([
    {
      id: 'FQR-8823',
      table: 'Table 04',
      time: '8 mins ago',
      status: 'Preparing', // Pending, Preparing, Ready, Served
      items: [
        { name: 'Truffle Burrata', quantity: 2, note: '' },
        { name: 'Pan-Seared Salmon', quantity: 1, note: 'Lemon butter sauce on the side, no asparagus' },
        { name: 'Artisan Cocktail', quantity: 2, note: '' }
      ],
      total: 4500
    },
    {
      id: 'FQR-8824',
      table: 'Table 12',
      time: '15 mins ago',
      status: 'Pending',
      items: [
        { name: 'Lamb Rogan Josh', quantity: 2, note: 'Medium spice' },
        { name: 'Sparkling Water', quantity: 3, note: 'Served cold with lime' }
      ],
      total: 3950
    },
    {
      id: 'FQR-8821',
      table: 'Table 08',
      time: '25 mins ago',
      status: 'Ready',
      items: [
        { name: 'Truffle Burrata', quantity: 1, note: '' },
        { name: 'Vintage Red Wine', quantity: 2, note: '' }
      ],
      total: 3250
    }
  ]);

  // Dropdown open states by order index
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Status mapping for colors and styling
  const statusConfig = {
    Pending: {
      label: 'Pending',
      bgClass: 'bg-rose-50 text-rose-600 border-rose-100',
      dotClass: 'bg-rose-500',
      progressClass: 'w-1/4 bg-rose-500'
    },
    Preparing: {
      label: 'Preparing',
      bgClass: 'bg-amber-50 text-amber-600 border-amber-100',
      dotClass: 'bg-amber-500',
      progressClass: 'w-2/4 bg-amber-500'
    },
    Ready: {
      label: 'Ready to Serve',
      bgClass: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      dotClass: 'bg-emerald-500',
      progressClass: 'w-3/4 bg-emerald-500'
    },
    Served: {
      label: 'Served',
      bgClass: 'bg-slate-50 text-slate-500 border-slate-100',
      dotClass: 'bg-slate-400',
      progressClass: 'w-full bg-slate-400'
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setOpenDropdownId(null);
  };

  // Helper counters
  const totalActive = orders.filter(o => o.status !== 'Served').length;
  const preparingCount = orders.filter(o => o.status === 'Preparing').length;
  const readyCount = orders.filter(o => o.status === 'Ready').length;
  const pendingCount = orders.filter(o => o.status === 'Pending').length;

  return (
    <AdminLayout>
      <div className="font-sans text-slate-800 text-left">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kitchen Display System
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Monitor orders, update preparation stages, and manage table service.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Live Connection Established
            </span>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Orders</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-800">{totalActive}</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</span>
            <span className="text-2xl sm:text-3xl font-black text-rose-500">{pendingCount}</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preparing</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-500">{preparingCount}</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ready to Serve</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-500">{readyCount}</span>
          </div>
        </div>

        {/* Active KDS Order Grid */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 md:gap-6">
          {orders.map((order) => {
            const config = statusConfig[order.status];
            const isDropdownOpen = openDropdownId === order.id;

            return (
              <div 
                key={order.id} 
                className={`bg-white rounded-2xl border shadow-sm flex flex-col justify-between overflow-visible transition-all duration-300 relative w-full md:max-w-[320px] ${
                  order.status === 'Served' ? 'border-slate-150 opacity-60' : 'border-slate-200 hover:shadow-lg'
                }`}
              >
                {/* Top Status Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-t-2xl overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${config.progressClass}`} />
                </div>

                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between overflow-visible">
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-col">
                        <span className="text-sm md:text-lg lg:text-xl font-black text-slate-900">{order.table}</span>
                        <span className="text-[9px] md:text-[11px] font-semibold text-slate-400">{order.id}</span>
                      </div>
                      <span className="text-[10px] md:text-[12px] font-medium text-slate-400 flex items-center gap-1">
                        ⏱ {order.time}
                      </span>
                    </div>

                    {/* Badge Status */}
                    <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[9px] md:text-[11px] font-extrabold ${config.bgClass} mb-4`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
                      {config.label}
                    </div>

                    {/* Order Items List */}
                    <div className="space-y-3 mb-4">
                      <h4 className="text-[9px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">
                        Order Details
                      </h4>
                      <div className="space-y-2.5">
                        {order.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="text-slate-700 text-xs md:text-sm lg:text-[15px]">
                            <div className="flex items-start justify-between">
                              <span className="font-semibold">{item.name}</span>
                              <span className="bg-slate-100 text-slate-800 font-bold px-1.5 py-0.5 rounded text-[9px] md:text-[11px]">
                                x{item.quantity}
                              </span>
                            </div>
                            {item.note && (
                              <p className="text-[9px] md:text-[11px] text-rose-500 bg-rose-50/50 px-2 py-1 rounded-lg border border-rose-100/50 mt-1 font-medium">
                                ✎ Note: {item.note}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer / Dropdown Action */}
                  <div className="border-t border-slate-100 pt-4 mt-auto relative overflow-visible">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] md:text-[11px] font-bold text-slate-400">Total Price</span>
                      <span className="font-extrabold text-slate-900 text-xs md:text-sm lg:text-[17px]">₹{order.total}</span>
                    </div>

                    {/* Dropdown Container */}
                    <div className="relative w-full overflow-visible">
                      <button
                        onClick={() => setOpenDropdownId(isDropdownOpen ? null : order.id)}
                        className="w-full flex items-center justify-between px-2.5 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-[10px] md:text-xs lg:text-[13px] font-bold text-slate-700 transition-all cursor-pointer"
                      >
                        <span>Change Status</span>
                        <svg 
                          className={`w-3.5 h-3.5 text-slate-500 transform transition-transform duration-250 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute left-0 bottom-full mb-2 w-full bg-white border border-slate-200 shadow-xl rounded-xl z-50 overflow-hidden py-1.5 animate-slideUp">
                          {Object.keys(statusConfig).map((statusKey) => (
                            <button
                              key={statusKey}
                              onClick={() => handleStatusChange(order.id, statusKey)}
                              className={`w-full flex items-center gap-1.5 px-3 py-2 text-left text-[10px] md:text-xs lg:text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors ${
                                order.status === statusKey ? 'bg-slate-50/50 text-orange-500' : ''
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[statusKey].dotClass}`} />
                              {statusConfig[statusKey].label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </AdminLayout>
  );
}
