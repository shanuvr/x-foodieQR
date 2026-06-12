import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

export default function Reviews() {
  // Stateful review moderation database
  const [reviews, setReviews] = useState([
    {
      id: 'REV-101',
      author: 'David Miller',
      rating: 5,
      date: 'June 10, 2026',
      listing: 'Grand Plaza Bistro',
      content: 'The Truffle Burrata was absolutely fantastic! The digital menu was super easy to navigate, browse photos, and scan. Order arrived very quickly.',
      ref: 'Table 04, Order #FQR-8823',
      status: 'Approved' // 'Pending', 'Approved', 'Rejected'
    },
    {
      id: 'REV-102',
      author: 'Sarah Jenkins',
      rating: 4,
      date: 'June 08, 2026',
      listing: 'Novotel Dine & Lounge',
      content: 'Great service and ambiance. The lamb rogan josh was rich and tasty, but the cocktail took a little longer to arrive than expected. The scanner process was flawless.',
      ref: 'Table 12, Order #FQR-8824',
      status: 'Pending'
    },
    {
      id: 'REV-103',
      author: 'Mark Watson',
      rating: 3,
      date: 'June 05, 2026',
      listing: 'JW Marriott Coffee House',
      content: 'The digital menu interface is clean and gorgeous, but our table QR code sticker was a bit scratched up so we had to scan twice. The food was decent.',
      ref: 'Table 08, Order #FQR-8821',
      status: 'Pending'
    }
  ]);

  // Selected filter: 'Pending', 'Approved', 'Rejected', 'All'
  const [selectedFilter, setSelectedFilter] = useState('Pending');

  const handleStatusUpdate = (revId, newStatus) => {
    setReviews(prevReviews =>
      prevReviews.map(rev =>
        rev.id === revId ? { ...rev, status: newStatus } : rev
      )
    );
  };

  // Moderation KPIs
  const totalReviews = reviews.length;
  const pendingCount = reviews.filter(r => r.status === 'Pending').length;
  const approvedCount = reviews.filter(r => r.status === 'Approved').length;
  const rejectedCount = reviews.filter(r => r.status === 'Rejected').length;

  // Average Rating of Approved (live) reviews
  const approvedReviews = reviews.filter(r => r.status === 'Approved');
  const averageRating = approvedReviews.length > 0
    ? (approvedReviews.reduce((acc, curr) => acc + curr.rating, 0) / approvedReviews.length).toFixed(1)
    : '0.0';

  // Apply filters
  const filteredReviews = reviews.filter(rev => {
    if (selectedFilter === 'All') return true;
    return rev.status === selectedFilter;
  });

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-sm sm:text-base">
            {i < rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="font-sans text-slate-800 text-left">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Review Moderation
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Approve submitted customer feedback to display them on the hotel listings portal, or reject inappropriate entries.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3.5 py-1.5 rounded-full w-fit">
            Moderator Portal Active
          </span>
        </div>

        {/* Moderation Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Approval</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-500">{pendingCount}</span>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Approved (Live)</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-500">{approvedCount}</span>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Rating Avg</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-800">{averageRating}</span>
              <span className="text-amber-500 text-lg sm:text-xl">★</span>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Received</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-800">{totalReviews}</span>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-100 pb-5">
          {[
            { key: 'Pending', label: `Pending (${pendingCount})` },
            { key: 'Approved', label: `Approved (${approvedCount})` },
            { key: 'Rejected', label: `Rejected (${rejectedCount})` },
            { key: 'All', label: `All Reviews (${totalReviews})` }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedFilter(tab.key)}
              className={`px-4 py-2 border rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === tab.key
                  ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/15'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Moderation Container */}
        <div className="space-y-6 max-w-4xl">
          {filteredReviews.length === 0 ? (
            <div className="bg-white py-12 px-6 text-center border border-slate-200 rounded-2xl">
              <span className="text-3xl">📭</span>
              <h3 className="text-base font-bold text-slate-800 mt-3">No reviews in this queue</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Excellent! The database moderation queue is clear.</p>
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div 
                key={rev.id} 
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 text-left"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">{rev.author}</h3>
                      <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded border border-orange-100/70">
                        {rev.listing}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(rev.rating)}
                      <span className="text-slate-300 text-xs">•</span>
                      <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{rev.id}</span>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400">{rev.date}</span>
                </div>

                {/* Review Body */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.content}"
                </p>

                {/* Order References */}
                <div className="flex items-center justify-between flex-wrap gap-4 border-t border-slate-100 pt-4 mt-2">
                  <span className="text-[10px] sm:text-xs text-slate-400 font-bold bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                    🍴 {rev.ref}
                  </span>

                  {/* Action Buttons based on status */}
                  <div className="flex items-center gap-2.5 ml-auto">
                    {rev.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(rev.id, 'Rejected')}
                          className="px-4 py-2 border border-rose-200 text-rose-500 hover:bg-rose-50 rounded-xl text-xs sm:text-sm font-extrabold active:scale-95 transition-all cursor-pointer"
                        >
                          Reject Feedback
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(rev.id, 'Approved')}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-sm active:scale-95 transition-all cursor-pointer"
                        >
                          Approve Review
                        </button>
                      </>
                    )}

                    {rev.status === 'Approved' && (
                      <>
                        <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg">
                          ✓ Live on Portal
                        </span>
                        <button
                          onClick={() => handleStatusUpdate(rev.id, 'Rejected')}
                          className="px-3 py-1.5 border border-slate-200 text-rose-500 hover:bg-rose-50 rounded-lg text-[10px] sm:text-xs font-bold active:scale-95 transition-all cursor-pointer"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {rev.status === 'Rejected' && (
                      <>
                        <span className="text-xs font-extrabold text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-lg">
                          ✕ Rejected
                        </span>
                        <button
                          onClick={() => handleStatusUpdate(rev.id, 'Approved')}
                          className="px-3 py-1.5 border border-slate-200 text-emerald-600 hover:bg-emerald-50 rounded-lg text-[10px] sm:text-xs font-bold active:scale-95 transition-all cursor-pointer"
                        >
                          Approve
                        </button>
                      </>
                    )}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
