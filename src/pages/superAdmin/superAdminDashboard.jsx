import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../../layouts/SuperAdminLayout';

export default function SuperAdminDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [usersCount, setUsersCount] = useState(1450);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'HICC Cafe reported a payment dispute for transaction txn_9021', time: '10 mins ago' },
    { id: 2, type: 'critical', message: 'Server latency peaked at 450ms during lunch hours', time: '2 hours ago' },
    { id: 3, type: 'info', message: 'System backup completed successfully', time: '5 hours ago' }
  ]);

  // Initial Seed for partner restaurants
  useEffect(() => {
    const saved = localStorage.getItem('super_admin_restaurants');
    if (saved) {
      setRestaurants(JSON.parse(saved));
    } else {
      const seedData = [
        { id: '1', name: 'Gourmet Central Kitchen', owner: 'Sarah Jenkins', plan: 'Premium', status: 'Active', location: 'Jubilee Hills, Hyd', date: '2026-06-10', email: 'sarah@gourmet.com' },
        { id: '2', name: 'Paradise Biryani', owner: 'Mohammad Ali', plan: 'Standard', status: 'Trial', location: 'Hitech City, Hyd', date: '2026-06-11', email: 'ali@paradise.com' },
        { id: '3', name: 'Cafe Niloufer', owner: 'Aamer Anwar', plan: 'Gold', status: 'Active', location: 'Red Hills, Hyd', date: '2026-06-12', email: 'aamer@niloufer.com' },
        { id: '4', name: 'Absolute Barbecues', owner: 'Vikram Mehta', plan: 'Platinum', status: 'Expired', location: 'Gachibowli, Hyd', date: '2026-06-08', email: 'vikram@ab.com' },
        { id: '5', name: 'Olive Bistro', owner: 'Sanjay Dutt', plan: 'Premium', status: 'Pending Approval', location: 'Durgam Cheruvu, Hyd', date: '2026-06-13', email: 'sanjay@olive.com' },
      ];
      localStorage.setItem('super_admin_restaurants', JSON.stringify(seedData));
      setRestaurants(seedData);
    }
  }, []);

  const handleApprove = (id) => {
    const updated = restaurants.map(r => r.id === id ? { ...r, status: 'Active' } : r);
    localStorage.setItem('super_admin_restaurants', JSON.stringify(updated));
    setRestaurants(updated);
  };

  const handleReject = (id) => {
    const updated = restaurants.map(r => r.id === id ? { ...r, status: 'Rejected' } : r);
    localStorage.setItem('super_admin_restaurants', JSON.stringify(updated));
    setRestaurants(updated);
  };

  const pendingRegistrations = restaurants.filter(r => r.status === 'Pending Approval');
  const activeCount = restaurants.filter(r => r.status === 'Active' || r.status === 'Trial').length;
  
  // Calculate mock total MRR based on plans
  const calculateMRR = () => {
    let total = 0;
    restaurants.forEach(r => {
      if (r.status === 'Active') {
        if (r.plan === 'Standard') total += 200;
        if (r.plan === 'Premium') total += 400;
        if (r.plan === 'Gold') total += 600;
        if (r.plan === 'Platinum') total += 800;
      }
    });
    return total;
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8 pb-12 text-left">
        
        {/* Title */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Super Admin Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Platform overview metrics, server diagnostics, and pending approval workflows.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Total Partner Restaurants */}
          <div className="bg-gradient-to-br from-[#FFA500] to-orange-600 p-6 rounded-2xl text-white shadow-md shadow-orange-500/10 flex flex-col justify-between h-[140px] relative overflow-hidden">
            <div className="absolute right-2 -bottom-2 opacity-15">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-100">Partners (Active/Trial)</p>
            <h3 className="text-3xl font-black">{activeCount} / {restaurants.length}</h3>
            <p className="text-[10px] font-bold text-orange-200">Across Hyderabad Outlets</p>
          </div>

          {/* Card 2: MRR Revenue */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-white shadow-md flex flex-col justify-between h-[140px] relative overflow-hidden">
            <div className="absolute right-2 -bottom-2 opacity-15 text-orange-500">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-bold">Monthly Recurring Revenue</p>
            <h3 className="text-3xl font-black text-orange-500">₹{calculateMRR().toLocaleString()}</h3>
            <p className="text-[10px] font-semibold text-slate-500">Excluding 5% transaction commissions</p>
          </div>

          {/* Card 3: Platform Users */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl text-slate-800 shadow-sm flex flex-col justify-between h-[140px] relative overflow-hidden">
            <div className="absolute right-2 -bottom-2 opacity-10 text-slate-400">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-bold">Total Platform Users</p>
            <h3 className="text-3xl font-black text-slate-900">{usersCount.toLocaleString()}</h3>
            <p className="text-[10px] font-bold text-emerald-600">↑ 12% growth this week</p>
          </div>

          {/* Card 4: Platform Diagnostics */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl text-slate-800 shadow-sm flex flex-col justify-between h-[140px] relative overflow-hidden">
            <div className="absolute right-2 -bottom-2 opacity-10 text-slate-400">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-bold">Open Alerts / Flags</p>
            <h3 className="text-3xl font-black text-rose-600">{alerts.length}</h3>
            <p className="text-[10px] font-bold text-slate-400">Database health: 99.9% uptime</p>
          </div>

        </div>

        {/* Main Grid: Registrations vs Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* New Registrations Queue */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">New Partner Registrations</h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Verify and approve subscription outlets to activate their QR ordering capabilities.</p>
              </div>
              <span className="bg-orange-50 text-orange-600 border border-orange-100 text-xs font-bold px-2.5 py-1 rounded-lg">
                {pendingRegistrations.length} Pending
              </span>
            </div>

            {pendingRegistrations.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-800 text-sm">All clear!</h4>
                <p className="text-xs text-slate-400 font-semibold mt-1">No pending registrations are awaiting review.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-2">Outlet</th>
                      <th className="py-3 px-2 hidden sm:table-cell">Owner</th>
                      <th className="py-3 px-2">Plan</th>
                      <th className="py-3 px-2 hidden md:table-cell">Location</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-xs text-slate-700">
                    {pendingRegistrations.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-2">
                          <p className="font-bold text-slate-800">{item.name}</p>
                          <p className="text-[10px] text-slate-400 font-semibold">{item.email}</p>
                          <p className="text-[9px] text-slate-400 font-semibold mt-0.5 block md:hidden"><strong className="text-slate-500 font-bold">Loc:</strong> {item.location}</p>
                        </td>
                        <td className="py-3.5 px-2 font-medium hidden sm:table-cell">{item.owner}</td>
                        <td className="py-3.5 px-2">
                          <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                            {item.plan}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 font-medium text-slate-400 hidden md:table-cell">{item.location}</td>
                        <td className="py-3.5 px-2 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => handleReject(item.id)}
                            className="px-2.5 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg font-bold text-[10px] transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-[10px] transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* System Alerts and reports panel */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-4 flex flex-col justify-between">
            <div>
              <div className="pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-slate-900 text-base">System Alerts & Reports</h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Real-time alerts, payment issues, and platform warnings.</p>
              </div>

              <div className="space-y-3">
                {alerts.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start p-3 bg-slate-50 hover:bg-slate-100/60 rounded-xl transition-colors border border-slate-100/50">
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      item.type === 'critical' ? 'bg-rose-500 animate-pulse' :
                      item.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                    <div className="min-w-0 flex-grow">
                      <p className="text-xs font-semibold text-slate-700 leading-normal">{item.message}</p>
                      <span className="text-[9px] text-slate-400 font-bold block mt-1">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setAlerts([])}
              className="w-full mt-6 py-2 border border-dashed border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Dismiss All Notifications
            </button>
          </div>

        </div>

      </div>
    </SuperAdminLayout>
  );
}
