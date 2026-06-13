import React, { useState } from 'react';
import SuperAdminLayout from '../../layouts/SuperAdminLayout';

export default function SuperAdminAnalytics() {
  const [timeframe, setTimeframe] = useState('30days');

  // Mock data for graphs
  const stats = {
    '7days': {
      revenue: [1200, 1500, 1800, 2200, 2000, 2500, 3100],
      scans: [450, 520, 600, 580, 630, 710, 850],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      totalRevenue: '₹15,300',
      totalScans: '4,340',
      conversion: '8.4%'
    },
    '30days': {
      revenue: [6000, 8000, 9500, 11000, 13400, 15800, 18200, 22000, 20500, 24000],
      scans: [2300, 2500, 3100, 3200, 3400, 3900, 4200, 4800, 4650, 5100],
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      totalRevenue: '₹168,500',
      totalScans: '37,150',
      conversion: '9.2%'
    }
  };

  const currentData = stats[timeframe];
  const maxRevenue = Math.max(...currentData.revenue);
  const maxScans = Math.max(...currentData.scans);

  const logs = [
    { id: 1, action: 'Table QR Scanned', details: 'Table #8 at Cafe Niloufer', time: '1 min ago' },
    { id: 2, action: 'Order Dispatched', details: 'Order #392 at Gourmet Central Kitchen (KDS synced)', time: '4 mins ago' },
    { id: 3, action: 'Payment Settled', details: 'txn_9021 Premium plan renewal', time: '12 mins ago' },
    { id: 4, action: 'Account Registered', details: 'Olive Bistro requested onboard approval', time: '1 hour ago' },
    { id: 5, action: 'Category Deleted', details: 'Buffet category removed by Super Admin', time: '3 hours ago' },
  ];

  return (
    <SuperAdminLayout>
      <div className="space-y-8 pb-12 text-left">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Platform Analytics</h1>
            <p className="text-slate-500 text-sm mt-1">Monitor QR scans velocity, monthly recurring revenue collection, and user metrics.</p>
          </div>
          
          {/* Timeframe Toggles */}
          <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setTimeframe('7days')}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                timeframe === '7days'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeframe('30days')}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                timeframe === '30days'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>

        {/* Quick totals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Gross Income Collected</span>
            <span className="text-xl font-black text-slate-800 mt-1 block">{currentData.totalRevenue}</span>
          </div>
          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Menu Scans</span>
            <span className="text-xl font-black text-orange-500 mt-1 block">{currentData.totalScans} scans</span>
          </div>
          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Scan-to-Order Conversion</span>
            <span className="text-xl font-black text-emerald-500 mt-1 block">{currentData.conversion}</span>
          </div>
        </div>

        {/* Custom Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Revenue Chart */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Revenue Collection Growth</h3>
              <p className="text-[11px] text-slate-400 font-semibold">Tiers and registration payouts over selected timeline.</p>
            </div>
            
            {/* Chart Container */}
            <div className="h-[200px] flex items-end justify-between gap-1 pt-6 px-2">
              {currentData.revenue.map((val, idx) => {
                const heightPercent = (val / maxRevenue) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 group">
                    {/* Tooltip value */}
                    <span className="text-[8px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1 rounded mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{val}
                    </span>
                    {/* Bar */}
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[24px] bg-gradient-to-t from-orange-500 to-amber-400 rounded-t-md group-hover:from-orange-600 group-hover:to-amber-500 transition-colors shadow-sm"
                    />
                    {/* Label */}
                    <span className="text-[10px] font-bold text-slate-400 mt-2 block">{currentData.labels[idx]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scans Chart */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Total QR Menu Scans</h3>
              <p className="text-[11px] text-slate-400 font-semibold">Volume of table visitors accessing food menus via QR cards.</p>
            </div>

            {/* Chart Container */}
            <div className="h-[200px] flex items-end justify-between gap-1 pt-6 px-2">
              {currentData.scans.map((val, idx) => {
                const heightPercent = (val / maxScans) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 group">
                    <span className="text-[8px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1 rounded mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {val}
                    </span>
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[24px] bg-gradient-to-t from-slate-800 to-slate-600 rounded-t-md group-hover:from-slate-950 group-hover:to-slate-750 transition-colors shadow-sm"
                    />
                    <span className="text-[10px] font-bold text-slate-400 mt-2 block">{currentData.labels[idx]}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Live Logs */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Real-time Platform Action Log</h3>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Live platform transactions and scan events streaming globally.</p>
          </div>

          <div className="divide-y divide-slate-50 text-xs">
            {logs.map((item) => (
              <div key={item.id} className="py-3.5 flex justify-between items-center gap-4">
                <div className="flex gap-3 items-center">
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">{item.action}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{item.details}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-bold">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SuperAdminLayout>
  );
}
