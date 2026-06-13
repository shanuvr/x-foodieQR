import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../../layouts/UserLayout';

const PLANS = {
  'standard-trial': { name: 'Standard',  price: 0,   trial: true  },
  'standard':       { name: 'Standard',  price: 200,  trial: false },
  'premium-trial':  { name: 'Premium',   price: 0,   trial: true  },
  'premium':        { name: 'Premium',   price: 400,  trial: false },
  'gold-trial':     { name: 'Gold',      price: 0,   trial: true  },
  'gold':           { name: 'Gold',      price: 600,  trial: false },
  'platinum-trial': { name: 'Platinum',  price: 0,   trial: true  },
  'platinum':       { name: 'Platinum',  price: 800,  trial: false },
};

const GST_RATE = 0.18;

const stepsList = [
  { number: 1, label: 'Your Details',   desc: 'Owner information',      completed: true  },
  { number: 2, label: 'Select Package', desc: 'Choose pricing plan',    completed: true  },
  { number: 3, label: 'Outlet Type',    desc: 'Category of restaurant', completed: true  },
  { number: 4, label: 'Outlet Details', desc: 'Business information',   completed: true  },
  { number: 5, label: 'Payment',        desc: 'Secure registration',    active:    true  },
];

const navPaths = { 1: '/register', 2: '/packages', 3: '/outlet', 4: '/outlet-details' };

export default function Payment() {
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);
  const [plan, setPlan]     = useState(null);

  useEffect(() => {
    try {
      const saved  = JSON.parse(localStorage.getItem('register_formData') || '{}');
      const planId = saved.selectedPackage || saved.selectedPlan || 'standard';
      setPlan({ id: planId, ...(PLANS[planId] || PLANS['standard']) });
    } catch {
      setPlan({ id: 'standard', ...PLANS['standard'] });
    }
  }, []);

  const base  = plan?.price ?? 0;
  const gst   = Math.round(base * GST_RATE);
  const total = base + gst;
  const isTrial = plan?.trial;

  const handlePay = async () => {
    setPaying(true);
    await new Promise((r) => setTimeout(r, 1600));
    setPaying(false);
    navigate('/');
  };

  /* ── Sidebar ── */
  const Stepper = ({ mobile = false }) => (
    <div className={mobile
      ? 'md:hidden w-full bg-[#0d1527] px-4 py-5 border-b border-white/5 flex flex-col items-center'
      : 'hidden md:flex md:col-span-3 flex-col bg-[#0d1527] px-8 py-10 relative overflow-hidden border-r border-white/5 select-none'
    }>
      {!mobile && (
        <>
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-500/8 to-transparent blur-3xl pointer-events-none rounded-full" />
          <Link className="flex items-center gap-2 mb-12 relative" to="/">
            <span className="text-2xl font-bold text-white">Foodie<span className="text-orange-500">QR</span></span>
            <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
            </svg>
          </Link>
        </>
      )}

      {mobile && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-white">Foodie<span className="text-orange-500">QR</span></span>
        </div>
      )}

      {/* Steps */}
      {mobile ? (
        <>
          <div className="flex items-center gap-1 w-full justify-center">
            {stepsList.map((s, idx) => (
              <React.Fragment key={s.number}>
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border-2 ${
                  s.active ? 'bg-orange-500 border-orange-500 text-white ring-2 ring-orange-500/20'
                  : s.completed ? 'bg-green-600 border-green-600 text-white'
                  : 'bg-slate-800 border-slate-700 text-gray-400'
                }`}>{s.completed ? '✓' : s.number}</div>
                {idx < stepsList.length - 1 && <div className={`h-px flex-1 max-w-[20px] ${s.completed ? 'bg-green-600' : 'bg-slate-700'}`} />}
              </React.Fragment>
            ))}
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Step 5 of 5</p>
            <h4 className="text-white text-sm font-bold mt-0.5">Payment</h4>
          </div>
        </>
      ) : (
        <>
          <div className="relative flex-grow flex flex-col justify-start space-y-7 pl-1">
            <div className="absolute left-[17px] top-3 bottom-4 w-px bg-slate-800 pointer-events-none z-0" />
            {stepsList.map((s) => (
              <div
                key={s.number}
                onClick={() => s.completed && navPaths[s.number] && navigate(navPaths[s.number])}
                className={`flex items-start gap-4 relative z-10 transition-all ${s.completed && navPaths[s.number] ? 'cursor-pointer' : ''}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
                  s.active ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                  : s.completed ? 'bg-green-600 border-green-600 text-white'
                  : 'bg-slate-900 border-slate-800 text-gray-500'
                }`}>
                  {s.completed
                    ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    : s.number}
                </div>
                <div className="py-0.5">
                  <p className={`text-sm font-semibold ${s.active ? 'text-white' : s.completed ? 'text-gray-300' : 'text-gray-500'}`}>{s.label}</p>
                  <p className={`text-xs mt-0.5 ${s.active ? 'text-orange-400' : 'text-gray-600'}`}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <UserLayout>
      <div className="max-w-screen-2xl mx-auto px-0 sm:px-4 md:px-6 py-0 sm:py-6 md:py-10 font-sans">
        <div className="bg-white sm:rounded-2xl border-0 sm:border border-gray-200 sm:shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[520px] md:h-[85vh]">
          <Stepper mobile />
          <Stepper />

          {/* ── Right Panel ── */}
          <div className="md:col-span-9 flex items-center justify-center p-6 sm:p-10 md:p-14 bg-gray-50/40">
            <div className="w-full max-w-sm">

              {/* Heading */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                  </svg>
                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Secure Checkout</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Complete Payment</h2>
                <p className="text-sm text-gray-400 mt-1">Review your order and confirm</p>
              </div>

              {/* Order card */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-5 shadow-sm">

                {/* Plan row */}
                <div className="px-5 pt-5 pb-4 border-b border-gray-100">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Plan</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-gray-900 uppercase tracking-wide">
                      {plan?.name ?? '—'}
                    </span>
                    {isTrial && (
                      <span className="text-[11px] font-bold text-orange-500 border border-orange-200 bg-orange-50 rounded px-2 py-0.5 uppercase tracking-wide">
                        Trial
                      </span>
                    )}
                  </div>
                </div>

                {/* Line items */}
                <div className="px-5 py-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Subscription</span>
                    <span className="text-gray-800 font-medium">
                      {isTrial ? '₹0' : `₹${base.toLocaleString()}`}
                    </span>
                  </div>
                  {!isTrial && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">GST (18%)</span>
                      <span className="text-gray-800 font-medium">₹{gst}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Total Payable</span>
                  <span className="text-xl font-black text-gray-900">
                    ₹{isTrial ? 0 : total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Pay button */}
              <button
                type="button"
                onClick={handlePay}
                disabled={paying}
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-bold rounded-xl transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm shadow-orange-400/30"
              >
                {paying ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Processing…
                  </>
                ) : isTrial ? 'Activate Free Trial' : `Pay ₹${total.toLocaleString()}`}
              </button>

              {/* Security note */}
              <p className="text-center text-[11px] text-gray-400 mt-3">
                256-bit SSL encrypted · PCI DSS compliant
              </p>

              {/* Back */}
              <div className="mt-5 pt-5 border-t border-gray-100 flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate('/outlet-details')}
                  className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors cursor-pointer"
                >
                  ← Back to Outlet Details
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
