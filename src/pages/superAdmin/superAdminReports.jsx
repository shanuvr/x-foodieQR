import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../../layouts/SuperAdminLayout';

export default function SuperAdminReports() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('super_admin_reports');
    if (saved) {
      setReports(JSON.parse(saved));
    } else {
      const seedReports = [
        { id: 'RPT-101', name: 'Paradise Biryani', reporter: 'Vijay M.', desc: 'QR code scanning issues. Page shows a white screen on iOS Safari browser.', priority: 'High', date: '2026-06-12', status: 'Open' },
        { id: 'RPT-102', name: 'Gourmet Central Kitchen', reporter: 'Swati K.', desc: 'Flagged inappropriate customer review mentioning unrelated content.', priority: 'Medium', date: '2026-06-11', status: 'Open' },
        { id: 'RPT-103', name: 'Absolute Barbecues', reporter: 'Karan J.', desc: 'Billing dispute. Charged standard plan fee twice on June 8.', priority: 'High', date: '2026-06-08', status: 'Resolved' },
        { id: 'RPT-104', name: 'Cafe Niloufer', reporter: 'Ramesh R.', desc: 'Requesting custom font integration support for the minimal templates.', priority: 'Low', date: '2026-06-13', status: 'Open' },
      ];
      localStorage.setItem('super_admin_reports', JSON.stringify(seedReports));
      setReports(seedReports);
    }
  }, []);

  const handleResolve = (id, actionType) => {
    const updated = reports.map(r => r.id === id ? { ...r, status: actionType } : r);
    localStorage.setItem('super_admin_reports', JSON.stringify(updated));
    setReports(updated);
  };

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || r.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  return (
    <SuperAdminLayout>
      <div className="space-y-6 pb-12 text-left">
        
        {/* Title */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Reports & Flags</h1>
          <p className="text-slate-500 text-sm mt-1">Review bug reports, customer billing queries, content disputes, and partner flags.</p>
        </div>

        {/* Filter Row */}
        <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search reports, reporter, content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 w-full sm:w-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Priority Filter:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer w-full sm:w-auto"
            >
              <option value="all">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                  <th className="py-4 px-6">Issue ID & Partner</th>
                  <th className="py-4 px-4 hidden md:table-cell">Flagged Details</th>
                  <th className="py-4 px-4 hidden sm:table-cell">Reporter</th>
                  <th className="py-4 px-4">Priority</th>
                  <th className="py-4 px-4 hidden md:table-cell">Date</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs text-slate-700">
                {filteredReports.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                    
                    {/* ID & Restaurant */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">{item.id}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-semibold sm:hidden block mt-0.5"><span className="text-slate-500">Rep:</span> {item.reporter}</p>
                      <p className="text-[10px] text-slate-500 font-medium md:hidden block mt-0.5 max-w-xs line-clamp-1">{item.desc}</p>
                    </td>

                    {/* Desc */}
                    <td className="py-4 px-4 text-slate-500 leading-normal max-w-sm font-medium hidden md:table-cell">{item.desc}</td>

                    {/* Reporter */}
                    <td className="py-4 px-4 font-semibold text-slate-700 hidden sm:table-cell">{item.reporter}</td>

                    {/* Priority badge */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-lg border ${
                        item.priority === 'High' ? 'bg-red-50 border-red-100 text-red-700' :
                        item.priority === 'Medium' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                        'bg-blue-50 border-blue-100 text-blue-700'
                      }`}>
                        {item.priority}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-slate-400 font-medium hidden md:table-cell">{item.date}</td>

                    {/* Status badge */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'Open' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                        item.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        'bg-slate-50 text-slate-500 border border-slate-100'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                      {item.status === 'Open' ? (
                        <>
                          <button
                            onClick={() => handleResolve(item.id, 'Dismissed')}
                            className="px-2 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg font-bold text-[10px] transition-colors cursor-pointer"
                          >
                            Dismiss
                          </button>
                          <button
                            onClick={() => handleResolve(item.id, 'Resolved')}
                            className="px-2.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-[10px] transition-colors cursor-pointer shadow-sm"
                          >
                            Resolve Flag
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 italic">No Action Pending</span>
                      )}
                    </td>

                  </tr>
                ))}
                {filteredReports.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-400 italic">
                      No reported issues matched your filters.
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
