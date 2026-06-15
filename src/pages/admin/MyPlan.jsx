import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';

const PLANS = [
  { id: 'standard', name: 'Standard Plan', price: 0, billing: 'Free Plan', features: ['Listing'] },
  { id: 'silver', name: 'Silver Plan', price: 400, billing: 'Monthly', features: ['Listing', 'Scan & QR'] },
  { id: 'gold', name: 'Gold Plan', price: 600, billing: 'Monthly', features: ['Listing', 'Scan & QR', 'Ordering'] },
  { id: 'platinum', name: 'Platinam Plan', price: 800, billing: 'Monthly', features: ['Listing', 'Scan & QR', 'Ordering', 'Billing'] },
  { id: 'diamond', name: 'Diamond Plan', price: 1000, billing: 'Monthly', features: ['Listing', 'Scan & QR', 'Ordering', 'Billing', 'Online Payment'] }
];

export default function MyPlan() {
  const navigate = useNavigate();
  const [activePlan, setActivePlan] = useState(PLANS[0]);
  const [isTrial, setIsTrial] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('register_formData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const pkgId = parsed.selectedPackage || 'standard';
        
        const isTrialPlan = pkgId.endsWith('-trial');
        const cleanId = pkgId.replace('-trial', '');
        setIsTrial(isTrialPlan);

        const foundPlan = PLANS.find(p => p.id === cleanId) || PLANS[0];
        setActivePlan(foundPlan);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 font-sans text-left max-w-4xl">
        {/* Page Header */}
        <div>
          <span className="text-xs font-extrabold text-orange-500 uppercase tracking-widest block mb-1">Billing & Subscription</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Plan</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your restaurant subscription package and billing cycles.</p>
        </div>

        {/* Current Plan Overview Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Details Block */}
          <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-[10px] font-extrabold px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full uppercase tracking-wider">
                  Active
                </span>
                {isTrial && (
                  <span className="text-[10px] font-extrabold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full uppercase tracking-wider">
                    Free Trial
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">{activePlan.name}</h2>
              <p className="text-sm text-slate-400 font-semibold mt-1">
                {activePlan.id === 'standard' ? 'Lifetime free access' : 'Next renewal date: July 15, 2026'}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price</span>
                  <p className="text-xl font-extrabold text-slate-800 mt-0.5">
                    {activePlan.id === 'standard' ? 'Free' : `₹${activePlan.price}`} 
                    {activePlan.id !== 'standard' && (
                      <span className="text-xs font-semibold text-slate-400"> /{activePlan.billing.toLowerCase()}</span>
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Remaining Days</span>
                  <p className="text-xl font-extrabold text-slate-800 mt-0.5">
                    {activePlan.id === 'standard' ? 'Lifetime' : (isTrial ? '14 Days' : '29 Days')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Block */}
          <div className="p-6 sm:p-8 bg-slate-50 md:w-[280px] flex-shrink-0 flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-4 shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Need more features?</h3>
            <p className="text-xs text-slate-500 mt-1 leading-normal max-w-[200px] mb-6">Upgrade to another plan instantly to unlock QR table bookings, advanced analytics, and custom feedback reports.</p>
            <button
              onClick={() => navigate('/admin/upgrade')}
              className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-orange-500/10 cursor-pointer active:scale-[0.98]"
            >
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Plan Features Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <h3 className="font-bold text-slate-900 text-lg mb-4">Included Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activePlan.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-slate-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
