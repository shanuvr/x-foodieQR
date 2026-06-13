import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../../layouts/SuperAdminLayout';

export default function SuperAdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('super_admin_users');
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      const seedUsers = [
        { id: '1', name: 'Rohan Sharma', email: 'rohan.sharma@gmail.com', phone: '+91 99887 76655', status: 'Active', joined: '2026-05-15', lastActive: '2 mins ago' },
        { id: '2', name: 'Nisha Reddy', email: 'nisha.reddy@yahoo.com', phone: '+91 88776 65544', status: 'Active', joined: '2026-05-20', lastActive: '1 hour ago' },
        { id: '3', name: 'Arjun Verma', email: 'arjun.verma@outlook.com', phone: '+91 77665 54433', status: 'Blocked', joined: '2026-04-10', lastActive: '3 days ago' },
        { id: '4', name: 'Deepika Sen', email: 'deepika.sen@gmail.com', phone: '+91 91234 56789', status: 'Active', joined: '2026-06-01', lastActive: 'Just now' },
        { id: '5', name: 'Kabir Mehta', email: 'kabir.mehta@hotmail.com', phone: '+91 98123 45678', status: 'Blocked', joined: '2026-03-25', lastActive: '1 week ago' },
      ];
      localStorage.setItem('super_admin_users', JSON.stringify(seedUsers));
      setUsers(seedUsers);
    }
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem('super_admin_users', JSON.stringify(updated));
    setUsers(updated);
  };

  const handleToggleBlock = (id) => {
    const updated = users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Blocked' : 'Active';
        return { ...u, status: nextStatus };
      }
      return u;
    });
    saveToStorage(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this user account?")) {
      const updated = users.filter(u => u.id !== id);
      saveToStorage(updated);
    }
  };

  // Filter
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <SuperAdminLayout>
      <div className="space-y-6 pb-12 text-left">
        
        {/* Title */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Customer Accounts</h1>
          <p className="text-slate-500 text-sm mt-1">Manage platform consumers, view user histories, and block/delete profiles.</p>
        </div>

        {/* Filter controls */}
        <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 w-full sm:w-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Account Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer w-full sm:w-auto"
            >
              <option value="all">All Accounts</option>
              <option value="Active">Active Only</option>
              <option value="Blocked">Blocked Only</option>
            </select>
          </div>
        </div>

        {/* Table Listing */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                  <th className="py-4 px-6">User Details</th>
                  <th className="py-4 px-4">Contact Phone</th>
                  <th className="py-4 px-4 hidden sm:table-cell">Joined Date</th>
                  <th className="py-4 px-4 hidden md:table-cell">Last Active</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs text-slate-700">
                {filteredUsers.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                    
                    {/* User info */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{item.email}</p>
                      <p className="text-[9px] text-slate-400 font-semibold mt-0.5 block md:hidden"><strong className="text-slate-500 font-bold">Active:</strong> {item.lastActive}</p>
                      <p className="text-[9px] text-slate-400 font-semibold mt-0.5 block sm:hidden">Joined: {item.joined}</p>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-4 font-semibold text-slate-600">{item.phone}</td>

                    {/* Joined */}
                    <td className="py-4 px-4 font-medium text-slate-400 hidden sm:table-cell">{item.joined}</td>

                    {/* Last Active */}
                    <td className="py-4 px-4 font-semibold text-[#855400] hidden md:table-cell">{item.lastActive}</td>

                    {/* Status badge */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-100' :
                        'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleBlock(item.id)}
                        className={`px-3 py-1.5 border rounded-lg font-bold text-[10px] transition-colors cursor-pointer ${
                          item.status === 'Active'
                            ? 'bg-amber-50 hover:bg-amber-100 border-amber-100 hover:border-amber-200 text-amber-600'
                            : 'bg-green-50 hover:bg-green-100 border-green-100 hover:border-green-200 text-green-600'
                        }`}
                      >
                        {item.status === 'Active' ? 'Block Account' : 'Unblock Account'}
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
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400 italic">
                      No user accounts found matching search filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </SuperAdminLayout>
  );
}
