import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../../layouts/SuperAdminLayout';

export default function SuperAdminPayments() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('super_admin_payments');
    if (saved) {
      setPayments(JSON.parse(saved));
    } else {
      const seedPayments = [
        { txnId: 'TXN-9021', name: 'Gourmet Central Kitchen', type: 'Subscription Renewal', plan: 'Premium', amount: 400, date: '2026-06-12', status: 'Success' },
        { txnId: 'TXN-9022', name: 'Cafe Niloufer', type: 'Subscription Renewal', plan: 'Gold', amount: 600, date: '2026-06-11', status: 'Success' },
        { txnId: 'TXN-9023', name: 'Absolute Barbecues', type: 'Commission Settlement', plan: 'Platinum', amount: 345, date: '2026-06-10', status: 'Success' },
        { txnId: 'TXN-9024', name: 'Paradise Biryani', type: 'Subscription Upgrade', plan: 'Standard', amount: 200, date: '2026-06-09', status: 'Failed' },
        { txnId: 'TXN-9025', name: 'Olive Bistro', type: 'First-time License Fee', plan: 'Premium', amount: 400, date: '2026-06-13', status: 'Pending' },
      ];
      localStorage.setItem('super_admin_payments', JSON.stringify(seedPayments));
      setPayments(seedPayments);
    }
  }, []);

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.txnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSuccess = payments
    .filter(p => p.status === 'Success')
    .reduce((acc, p) => acc + p.amount, 0);

  const totalCommissions = payments
    .filter(p => p.status === 'Success' && p.type.includes('Commission'))
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <SuperAdminLayout>
      <div className="space-y-6 pb-12 text-left">
        
        {/* Title */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Platform Payments</h1>
          <p className="text-slate-500 text-sm mt-1">Audit subscription billing events, transaction logs, and platform commission ledger.</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Platform Gross Revenue</span>
            <span className="text-2xl font-black text-slate-900 mt-2 block">₹{totalSuccess.toLocaleString()}</span>
            <p className="text-[10px] text-emerald-600 font-bold mt-1">✓ Verified processed earnings</p>
          </div>
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Commissions Settled (5%)</span>
            <span className="text-2xl font-black text-orange-500 mt-2 block">₹{totalCommissions.toLocaleString()}</span>
            <p className="text-[10px] text-slate-400 font-semibold mt-1">From partner QR digital orders</p>
          </div>
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Unsettled / Pending Deposits</span>
            <span className="text-2xl font-black text-amber-500 mt-2 block">
              ₹{payments.filter(p => p.status === 'Pending').reduce((acc, p) => acc + p.amount, 0).toLocaleString()}
            </span>
            <p className="text-[10px] text-slate-400 font-semibold mt-1">Awaiting bank clearing cycles</p>
          </div>
        </div>

        {/* Search controls */}
        <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search txn ID, outlet name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 w-full sm:w-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Txn Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer w-full sm:w-auto"
            >
              <option value="all">All Transactions</option>
              <option value="Success">Success Only</option>
              <option value="Pending">Pending Only</option>
              <option value="Failed">Failed Only</option>
            </select>
          </div>
        </div>

        {/* Ledger table */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                  <th className="py-4 px-6">Transaction ID</th>
                  <th className="py-4 px-4">Restaurant Partner</th>
                  <th className="py-4 px-4 hidden sm:table-cell">Billing Category</th>
                  <th className="py-4 px-4 hidden md:table-cell">Tier</th>
                  <th className="py-4 px-4">Amount</th>
                  <th className="py-4 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs text-slate-700">
                {filteredPayments.map((item) => (
                  <tr key={item.txnId} className="hover:bg-slate-50/30 transition-colors">
                    
                    {/* Txn ID */}
                    <td className="py-4 px-6 font-bold text-slate-800">{item.txnId}</td>
                    
                    {/* Partner */}
                    <td className="py-4 px-4">
                      <p className="font-semibold text-slate-700">{item.name}</p>
                      <p className="text-[9px] text-slate-400 font-bold sm:hidden block mt-0.5">{item.type}</p>
                      <p className="text-[9px] text-slate-500 font-bold md:hidden block mt-0.5"><span className="bg-slate-100 text-slate-600 px-1 rounded">{item.plan}</span></p>
                    </td>
                    
                    {/* Billing Type */}
                    <td className="py-4 px-4 font-medium text-slate-500 hidden sm:table-cell">{item.type}</td>
                    
                    {/* Plan */}
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                        {item.plan}
                      </span>
                    </td>
                    
                    {/* Amount */}
                    <td className="py-4 px-4 font-black text-slate-800">₹{item.amount}</td>
                    
                    {/* Status badge */}
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.status === 'Success' ? 'bg-green-50 text-green-700 border border-green-100' :
                        item.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100 animate-pulse' :
                        'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                  </tr>
                ))}
                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400 italic">
                      No matching payments found.
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
