import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../../layouts/UserLayout';

const PLANS = [
  { id: 'standard', name: 'STANDARD', price: 200, discount: 20, billing: 'Monthly', features: { digitalMenu: true, qrOrdering: true, tableBooking: false, billing: false, analytics: false, reviews: false } },
  { id: 'premium', name: 'PREMIUM', price: 400, discount: 20, billing: 'Monthly', features: { digitalMenu: true, qrOrdering: true, tableBooking: false, billing: false, analytics: false, reviews: false } },
  { id: 'gold', name: 'GOLD', price: 600, discount: 15, billing: 'Monthly', features: { digitalMenu: true, qrOrdering: true, tableBooking: true, billing: false, analytics: true, reviews: false } },
  { id: 'platinum', name: 'PLATINUM', price: 800, discount: 10, billing: 'Monthly', features: { digitalMenu: true, qrOrdering: true, tableBooking: true, billing: true, analytics: true, reviews: true } }
];

export default function Packages() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('standard');

  useEffect(() => {
    // Load existing form data or initialize
    const existing = localStorage.getItem('register_formData');
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        if (parsed.selectedPackage) {
          setSelectedPlan(parsed.selectedPackage);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    
    // Save to localStorage
    const existing = localStorage.getItem('register_formData') || '{}';
    try {
      const parsed = JSON.parse(existing);
      parsed.selectedPackage = planId;
      localStorage.setItem('register_formData', JSON.stringify(parsed));
    } catch (e) {
      console.error(e);
    }
    
    // Navigate to next step: Outlet Type
    navigate('/outlet');
  };

  const stepsList = [
    { number: 1, label: 'Your Details', desc: 'Owner information', completed: true },
    { number: 2, label: 'Select Package', desc: 'Choose pricing plan', active: true },
    { number: 3, label: 'Outlet Type', desc: 'Category of restaurant' },
    { number: 4, label: 'Outlet Details', desc: 'Menu and operations' },
    { number: 5, label: 'Payment', desc: 'Secure registration' }
  ];

  // Stepper Header for Mobile view
  const renderMobileSteps = () => (
    <div className="md:hidden w-full bg-[#0d1527] px-4 py-6 border-b border-[#d9c3ac]/10 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-bold tracking-tight text-white">
          Foodie<span className="text-primary">QR</span>
        </span>
        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"></path>
        </svg>
      </div>
      <div className="flex items-center gap-1.5 w-full justify-center overflow-x-auto scrollbar-none py-1">
        {stepsList.map((step, idx) => (
          <React.Fragment key={step.number}>
            <button
              onClick={() => {
                if (step.number === 1) navigate('/register');
                if (step.number === 2) navigate('/packages');
              }}
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-all cursor-pointer ${
                step.active
                  ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/35 ring-4 ring-orange-500/20'
                  : step.completed
                  ? 'bg-green-600 border-green-600 text-white'
                  : 'bg-slate-800 border-slate-700 text-gray-400'
              }`}
            >
              {step.completed ? '✓' : step.number}
            </button>
            {idx < stepsList.length - 1 && (
              <div
                className={`h-0.5 w-4 flex-shrink-0 transition-all ${
                  step.completed ? 'bg-green-600' : 'bg-slate-800'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center mt-3">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Step 2 of 5</p>
        <h4 className="text-white text-sm font-bold mt-0.5">Select Package</h4>
      </div>
    </div>
  );

  // Stepper Sidebar for Desktop view
  const renderDesktopSteps = () => (
    <div className="hidden md:flex md:col-span-3 flex-col bg-[#0d1527] px-8 py-10 relative overflow-hidden border-r border-[#d9c3ac]/10 select-none">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12 relative flex-shrink-0">
        <Link className="flex items-center gap-2" to="/">
          <span className="text-2xl font-bold tracking-tight text-white">
            Foodie<span className="text-primary">QR</span>
          </span>
          <svg className="w-6 h-6 text-primary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"></path>
          </svg>
        </Link>
        <span className="text-[9px] font-bold text-gray-500 absolute -top-1 -right-4">TM</span>
      </div>

      {/* Progress Timeline */}
      <div className="relative flex-grow flex flex-col justify-start space-y-8 pl-1">
        <div className="absolute left-[17px] top-4 bottom-6 w-0.5 bg-slate-800 pointer-events-none z-0" />
        
        {stepsList.map((step) => {
          const isActive = step.active;
          const isCompleted = step.completed;

          return (
            <div 
              key={step.number}
              onClick={() => {
                if (isCompleted) {
                  if (step.number === 1) navigate('/register');
                }
              }}
              className={`flex items-start gap-4 relative z-10 group transition-all duration-300 ${
                isCompleted ? 'cursor-pointer' : ''
              }`}
            >
              {/* Number Bubble */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm border transition-all duration-300 ${
                  isActive
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/40 ring-4 ring-orange-500/10 scale-105'
                    : isCompleted
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'bg-slate-900 border-slate-800 text-gray-500 group-hover:border-slate-700'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>

              {/* Text info */}
              <div className="text-left py-0.5">
                <p
                  className={`text-sm font-bold transition-colors duration-300 ${
                    isActive ? 'text-white' : isCompleted ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-xs transition-colors duration-300 mt-0.5 ${
                    isActive ? 'text-orange-400 font-medium' : 'text-gray-600'
                  }`}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <UserLayout>
      <div className="max-w-screen-2xl mx-auto px-0 sm:px-4 md:px-6 py-6 md:py-12 font-sans">
        
        {/* Multi-Step Wizard Layout */}
        <div className="bg-white rounded-2xl border border-[#d9c3ac] shadow-2xl overflow-hidden min-h-[580px] grid grid-cols-1 md:grid-cols-12 md:h-[85vh]">
          
          {/* Sidebar (Stepper) */}
          {renderMobileSteps()}
          {renderDesktopSteps()}

          {/* Plan Comparison Section */}
          <div className="md:col-span-9 flex flex-col overflow-y-auto justify-between p-6 sm:p-8 text-left min-w-0">
            <div className="flex-grow">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Choose Your Plan</h2>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">Select the best package to grow your restaurant's digital presence</p>
              </div>

              {/* Comparison Table Panel */}
              <div className="border border-[#d9c3ac]/40 rounded-xl overflow-hidden shadow-sm bg-white mb-6">
                <table className="w-full text-left border-collapse" style={{tableLayout: 'fixed'}}>
                  <colgroup>
                    <col style={{width: '22%'}} />
                    <col style={{width: '19.5%'}} />
                    <col style={{width: '19.5%'}} />
                    <col style={{width: '19.5%'}} />
                    <col style={{width: '19.5%'}} />
                  </colgroup>
                  <thead>
                    <tr className="bg-[#fffcf5] border-b border-[#d9c3ac]/35">
                      <th className="p-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Features</th>
                      {PLANS.map((pkg) => (
                        <th key={pkg.id} className="p-3 text-center border-l border-[#d9c3ac]/20">
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="text-[10px] font-extrabold text-gray-900 tracking-tight uppercase">{pkg.name}</span>
                            <span className="text-xl font-black text-orange-500">₹{pkg.price}</span>
                            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">{pkg.discount}% OFF</span>
                            <span className="text-[8px] text-gray-400 font-semibold uppercase">{pkg.billing}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {/* Digital Menu */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3 font-bold text-gray-700">Digital Menu</td>
                      {PLANS.map(pkg => (
                        <td key={pkg.id} className="p-3 text-center border-l border-[#d9c3ac]/20">
                          {pkg.features.digitalMenu ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-50 text-green-600">✓</span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-50 text-red-500 font-extrabold text-[10px]">✕</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* QR Ordering */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3 font-bold text-gray-700">QR Ordering</td>
                      {PLANS.map(pkg => (
                        <td key={pkg.id} className="p-3 text-center border-l border-[#d9c3ac]/20">
                          {pkg.features.qrOrdering ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-50 text-green-600">✓</span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-50 text-red-500 font-extrabold text-[10px]">✕</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Table Booking */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3 font-bold text-gray-700">Table Booking</td>
                      {PLANS.map(pkg => (
                        <td key={pkg.id} className="p-3 text-center border-l border-[#d9c3ac]/20">
                          {pkg.features.tableBooking ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-50 text-green-600">✓</span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-50 text-red-500 font-extrabold text-[10px]">✕</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Billing */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3 font-bold text-gray-700">Billing</td>
                      {PLANS.map(pkg => (
                        <td key={pkg.id} className="p-3 text-center border-l border-[#d9c3ac]/20">
                          {pkg.features.billing ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-50 text-green-600">✓</span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-50 text-red-500 font-extrabold text-[10px]">✕</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Analytics */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3 font-bold text-gray-700">Analytics</td>
                      {PLANS.map(pkg => (
                        <td key={pkg.id} className="p-3 text-center border-l border-[#d9c3ac]/20">
                          {pkg.features.analytics ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-50 text-green-600">✓</span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-50 text-red-500 font-extrabold text-[10px]">✕</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Reviews */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3 font-bold text-gray-700">Reviews</td>
                      {PLANS.map(pkg => (
                        <td key={pkg.id} className="p-3 text-center border-l border-[#d9c3ac]/20">
                          {pkg.features.reviews ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-50 text-green-600">✓</span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-50 text-red-500 font-extrabold text-[10px]">✕</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Actions Row */}
                    <tr className="bg-gray-50/30">
                      <td className="p-3 font-bold text-gray-400 text-xs">Action</td>
                      {PLANS.map(pkg => (
                        <td key={pkg.id} className="p-3 text-center border-l border-[#d9c3ac]/20">
                          <div className="flex flex-col gap-1.5 w-full">
                            <button type="button" onClick={() => handlePlanSelect(`${pkg.id}-trial`)}
                              className="w-full inline-flex justify-center items-center gap-1 py-1.5 bg-[#0f172a] text-white rounded text-[10px] font-bold hover:bg-slate-800 transition-all cursor-pointer">
                              🚀 Trial
                            </button>
                            <button type="button" onClick={() => handlePlanSelect(pkg.id)}
                              className="w-full py-1.5 bg-[#FFA500] hover:bg-orange-600 text-white rounded text-[10px] font-bold transition-all cursor-pointer">
                              Register
                            </button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Back Button Action */}
            <div className="flex-shrink-0 pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="px-5 py-2.5 bg-white border border-[#d9c3ac] text-[#855400] rounded-lg text-xs font-extrabold hover:bg-gray-50 transition-all cursor-pointer shadow-sm"
              >
                ← Back
              </button>
            </div>

          </div>

        </div>

      </div>
    </UserLayout>
  );
}
