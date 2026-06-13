import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../../layouts/SuperAdminLayout';

export default function SuperAdminRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  
  // Selected restaurant for detail view modal
  const [selectedRest, setSelectedRest] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('super_admin_restaurants');
    if (saved) {
      setRestaurants(JSON.parse(saved));
    }
  }, []);

  // Save changes
  const saveToStorage = (updated) => {
    localStorage.setItem('super_admin_restaurants', JSON.stringify(updated));
    setRestaurants(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this restaurant and suspend its QR code listings?")) {
      const updated = restaurants.filter(r => r.id !== id);
      saveToStorage(updated);
      if (selectedRest && selectedRest.id === id) {
        setSelectedRest(null);
      }
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = restaurants.map(r => r.id === id ? { ...r, status: newStatus } : r);
    saveToStorage(updated);
    if (selectedRest && selectedRest.id === id) {
      setSelectedRest({ ...selectedRest, status: newStatus });
    }
  };

  const handlePlanChange = (id, newPlan) => {
    const updated = restaurants.map(r => r.id === id ? { ...r, plan: newPlan } : r);
    saveToStorage(updated);
    if (selectedRest && selectedRest.id === id) {
      setSelectedRest({ ...selectedRest, plan: newPlan });
    }
  };

  // Filtered List
  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesPlan = planFilter === 'all' || r.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <SuperAdminLayout>
      <div className="space-y-6 pb-12 text-left">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Partner Restaurants</h1>
            <p className="text-slate-500 text-sm mt-1">Search, update plans, view registrations status, and manage partner listings.</p>
          </div>
          <button
            onClick={() => {
              const name = prompt("Enter Restaurant Name:");
              if (!name) return;
              const owner = prompt("Enter Owner Name:");
              const location = prompt("Enter Location (e.g. Kondapur, Hyd):");
              const email = prompt("Enter Contact Email:");
              const plan = prompt("Enter Plan (Standard, Premium, Gold, Platinum):", "Standard");
              
              const newRest = {
                id: String(Date.now()),
                name,
                owner: owner || 'Unknown',
                plan: plan || 'Standard',
                status: 'Trial',
                location: location || 'Hyderabad',
                date: new Date().toISOString().split('T')[0],
                email: email || 'contact@restaurant.com'
              };
              const updated = [...restaurants, newRest];
              saveToStorage(updated);
            }}
            className="w-full sm:w-auto px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2"
          >
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Partner
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search outlet, owner, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all"
            />
          </div>

          {/* Selector filters */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
            
            {/* Status Select */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Outlets</option>
                <option value="Active">Active</option>
                <option value="Trial">Trial</option>
                <option value="Expired">Expired</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Plan Select */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Plan:</span>
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Plans</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>

          </div>
        </div>

        {/* Table/Listing Grid */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                  <th className="py-4 px-6">Outlet Information</th>
                  <th className="py-4 px-4 hidden sm:table-cell">Owner Name</th>
                  <th className="py-4 px-4">Plan Name</th>
                  <th className="py-4 px-4 hidden md:table-cell">Location</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs text-slate-700">
                {filteredRestaurants.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                    
                    {/* Info */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{item.email}</p>
                      <p className="text-[9px] text-slate-400 font-semibold mt-0.5 block md:hidden"><strong className="text-slate-500 font-bold">Loc:</strong> {item.location}</p>
                      <span className="text-[9px] text-slate-400 font-semibold mt-0.5 block">Joined: {item.date}</span>
                    </td>

                    {/* Owner */}
                    <td className="py-4 px-4 font-semibold text-slate-700 hidden sm:table-cell">{item.owner}</td>

                    {/* Plan */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg border ${
                        item.plan === 'Platinum' ? 'bg-indigo-50 border-indigo-100 text-indigo-700' :
                        item.plan === 'Gold' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                        item.plan === 'Premium' ? 'bg-orange-50 border-orange-100 text-orange-700' :
                        'bg-slate-100 border-slate-200 text-slate-700'
                      }`}>
                        {item.plan}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4 font-medium text-slate-500 hidden md:table-cell">{item.location}</td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        item.status === 'Trial' ? 'bg-sky-50 text-sky-700 border border-sky-100' :
                        item.status === 'Expired' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                        item.status === 'Pending Approval' ? 'bg-amber-50 text-amber-700 border border-amber-100 animate-pulse' :
                        'bg-slate-50 text-slate-600 border border-slate-100'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      {item.status === 'Pending Approval' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(item.id, 'Active')}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px] transition-colors cursor-pointer shadow-sm shadow-emerald-600/10"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedRest(item)}
                        className="px-2.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg font-bold text-[10px] transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-100 hover:border-rose-200 text-rose-600 rounded-lg font-bold text-[10px] transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
                {filteredRestaurants.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400 italic">
                      No partner restaurants matched your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail drawer / Modal */}
        {selectedRest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden border border-slate-100 shadow-2xl flex flex-col">
              
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <h3 className="font-bold text-slate-900 text-[18px]">{selectedRest.name}</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">Outlet System Diagnostics & Plan configuration</p>
                </div>
                <button
                  onClick={() => setSelectedRest(null)}
                  className="bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors border border-slate-200 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide">Owner Name</span>
                    <span className="text-sm font-semibold text-slate-800">{selectedRest.owner}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide">Email address</span>
                    <span className="text-sm font-semibold text-slate-800">{selectedRest.email}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide">Location Details</span>
                    <span className="text-sm font-semibold text-slate-800">{selectedRest.location}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide">Registration Date</span>
                    <span className="text-sm font-semibold text-slate-800">{selectedRest.date}</span>
                  </div>
                </div>

                {selectedRest.status === 'Pending Approval' && (
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-between gap-4">
                    <div className="text-left">
                      <p className="text-xs font-bold text-amber-800">Pending Listing Approval</p>
                      <p className="text-[10px] text-amber-600 font-semibold mt-0.5">This restaurant has completed registration and is awaiting admin approval to go live.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(selectedRest.id, 'Active')}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px] transition-colors cursor-pointer shadow-md shadow-emerald-600/10 whitespace-nowrap"
                    >
                      Approve Listing
                    </button>
                  </div>
                )}

                <hr className="border-slate-100" />

                {/* Configuration Controls */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configure Subscription Plan</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Status selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Outlet Status</label>
                      <select
                        value={selectedRest.status}
                        onChange={(e) => handleStatusChange(selectedRest.id, e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 cursor-pointer focus:outline-none focus:border-orange-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Trial">Trial</option>
                        <option value="Expired">Expired</option>
                        <option value="Pending Approval">Pending Approval</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    {/* Plan selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Pricing Tier</label>
                      <select
                        value={selectedRest.plan}
                        onChange={(e) => handlePlanChange(selectedRest.id, e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 cursor-pointer focus:outline-none focus:border-orange-500"
                      >
                        <option value="Standard">Standard (₹200/mo)</option>
                        <option value="Premium">Premium (₹400/mo)</option>
                        <option value="Gold">Gold (₹600/mo)</option>
                        <option value="Platinum">Platinum (₹800/mo)</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* Subscription Meta */}
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-slate-600 text-[11px] font-medium">
                  <p>• <strong>Menu items count:</strong> 42 items online</p>
                  <p>• <strong>Active QR codes generated:</strong> 12 tables active</p>
                  <p>• <strong>Last scanned:</strong> 4 mins ago from Table #4</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button
                  onClick={() => setSelectedRest(null)}
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-md shadow-orange-500/10"
                >
                  Save & Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </SuperAdminLayout>
  );
}
