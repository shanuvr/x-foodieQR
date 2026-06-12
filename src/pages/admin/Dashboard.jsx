import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Welcome back, John! Here's what's happening today.</p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-orange-500/20 transition-all">
            Download Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Orders', value: '1,248', change: '+12.5%', isUp: true },
            { label: 'Revenue', value: '$12,400', change: '+8.2%', isUp: true },
            { label: 'Active Menus', value: '4', change: '0%', isUp: true },
            { label: 'Total Reviews', value: '452', change: '-2.4%', isUp: false },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
              <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-extrabold text-slate-900">{stat.value}</span>
                <span className={`text-xs font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder for more content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[400px] flex items-center justify-center">
          <p className="text-slate-400 font-medium">Chart/Data Placeholder</p>
        </div>
      </div>
    </AdminLayout>
  );
}
