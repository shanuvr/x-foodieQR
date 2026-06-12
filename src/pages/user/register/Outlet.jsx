import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../../layouts/UserLayout';

const outletTypes = [
  {
    id: 'restaurant',
    label: 'Restaurant',
    description: 'Full-service dining with a diverse menu',
    image: '/outlet_restaurant.png',
    emoji: '🍽️',
    gradient: 'from-black/70 via-black/30 to-transparent',
    badge: 'bg-amber-500',
  },
  {
    id: 'bakery',
    label: 'Bakery',
    description: 'Fresh baked goods, pastries & breads',
    image: '/outlet_bakery.png',
    emoji: '🥐',
    gradient: 'from-black/70 via-black/30 to-transparent',
    badge: 'bg-yellow-500',
  },
  {
    id: 'restobar',
    label: 'Resto Bar',
    description: 'Restaurant + bar — food and cocktails',
    image: '/outlet_restobar.png',
    emoji: '🍸',
    gradient: 'from-black/70 via-black/30 to-transparent',
    badge: 'bg-violet-500',
  },
  {
    id: 'beer-parlour',
    label: 'Beer Parlour',
    description: 'Casual pub vibes with chilled beers',
    image: '/outlet_beerparlour.png',
    emoji: '🍺',
    gradient: 'from-black/70 via-black/30 to-transparent',
    badge: 'bg-orange-500',
  },
  {
    id: 'chayakada',
    label: 'Chayakada',
    description: 'Traditional tea stall with snacks & chai',
    image: '/outlet_chayakada.png',
    emoji: '☕',
    gradient: 'from-black/70 via-black/30 to-transparent',
    badge: 'bg-yellow-700',
  },
  {
    id: 'street-food',
    label: 'Street Food',
    description: 'Fast, flavorful bites from the streets',
    image: '/outlet_streetfood.png',
    emoji: '🌮',
    gradient: 'from-black/70 via-black/30 to-transparent',
    badge: 'bg-red-500',
  },
  {
    id: 'homely-meals',
    label: 'Homely Meals',
    description: 'Wholesome home-style comfort food',
    image: '/outlet_homelymeal.png',
    emoji: '🍱',
    gradient: 'from-black/70 via-black/30 to-transparent',
    badge: 'bg-green-600',
  },
];

export default function Outlet() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const stepsList = [
    { number: 1, label: 'Your Details', desc: 'Owner information', completed: true },
    { number: 2, label: 'Select Package', desc: 'Choose pricing plan', completed: true },
    { number: 3, label: 'Outlet Type', desc: 'Category of restaurant', active: true },
    { number: 4, label: 'Outlet Details', desc: 'Menu and operations' },
    { number: 5, label: 'Payment', desc: 'Secure registration' },
  ];

  const handleSelect = (id) => {
    setSelected(id);
    const existing = localStorage.getItem('register_formData') || '{}';
    try {
      const parsed = JSON.parse(existing);
      parsed.outletType = id;
      localStorage.setItem('register_formData', JSON.stringify(parsed));
    } catch (e) {
      console.error(e);
    }
  };

  const handleContinue = () => {
    if (selected) navigate('/outlet-details');
  };

  const renderMobileSteps = () => (
    <div className="md:hidden w-full bg-[#0d1527] px-4 py-5 border-b border-[#d9c3ac]/10 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-bold tracking-tight text-white">Foodie<span className="text-orange-500">QR</span></span>
        <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
        </svg>
      </div>
      <div className="flex items-center gap-1.5 w-full justify-center py-1">
        {stepsList.map((step, idx) => (
          <React.Fragment key={step.number}>
            <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
              step.active ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/35 ring-2 ring-orange-500/20'
              : step.completed ? 'bg-green-600 border-green-600 text-white'
              : 'bg-slate-800 border-slate-700 text-gray-400'
            }`}>
              {step.completed ? '✓' : step.number}
            </div>
            {idx < stepsList.length - 1 && (
              <div className={`h-0.5 flex-1 max-w-[24px] ${step.completed ? 'bg-green-600' : 'bg-slate-700'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center mt-2">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Step 3 of 5</p>
        <h4 className="text-white text-sm font-bold mt-0.5">Outlet Type</h4>
      </div>
    </div>
  );

  const renderDesktopSteps = () => (
    <div className="hidden md:flex md:col-span-3 flex-col bg-[#0d1527] px-8 py-10 relative overflow-hidden border-r border-[#d9c3ac]/10 select-none">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="flex items-center gap-2 mb-12 relative flex-shrink-0">
        <Link className="flex items-center gap-2" to="/">
          <span className="text-2xl font-bold tracking-tight text-white">Foodie<span className="text-orange-500">QR</span></span>
          <svg className="w-6 h-6 text-orange-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
          </svg>
        </Link>
        <span className="text-[9px] font-bold text-gray-500 absolute -top-1 -right-4">TM</span>
      </div>
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
                  if (step.number === 2) navigate('/packages');
                }
              }}
              className={`flex items-start gap-4 relative z-10 group transition-all duration-300 ${isCompleted ? 'cursor-pointer' : ''}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm border transition-all duration-300 ${
                isActive ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/40 ring-4 ring-orange-500/10 scale-105'
                : isCompleted ? 'bg-green-600 border-green-600 text-white'
                : 'bg-slate-900 border-slate-800 text-gray-500'
              }`}>
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : step.number}
              </div>
              <div className="text-left py-0.5">
                <p className={`text-sm font-bold transition-colors duration-300 ${isActive ? 'text-white' : isCompleted ? 'text-gray-300' : 'text-gray-500'}`}>
                  {step.label}
                </p>
                <p className={`text-xs transition-colors duration-300 mt-0.5 ${isActive ? 'text-orange-400 font-medium' : 'text-gray-600'}`}>
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
      <div className="max-w-screen-2xl mx-auto px-0 sm:px-4 md:px-6 py-0 sm:py-6 md:py-10 font-sans">
        <div className="bg-white sm:rounded-2xl border-0 sm:border border-[#d9c3ac] shadow-none sm:shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 md:h-[85vh]">
          {renderMobileSteps()}
          {renderDesktopSteps()}

          {/* Content Panel */}
          <div className="md:col-span-9 flex flex-col min-h-0 p-4 sm:p-6 md:p-8 overflow-y-auto">
            {/* Header */}
            <div className="mb-5 sm:mb-7">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                Select Your Outlet Type
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                Choose the category that best describes your business
              </p>
            </div>

            {/* Cards Grid — 2 cols on mobile, 4 on md+ */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 md:gap-5 flex-grow">
              {outletTypes.map((outlet) => {
                const isSelected = selected === outlet.id;
                return (
                  <button
                    key={outlet.id}
                    type="button"
                    onClick={() => handleSelect(outlet.id)}
                    className={`relative group rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 focus:outline-none w-full border-2 ${
                      isSelected
                        ? 'border-orange-500 shadow-xl shadow-orange-500/20 scale-[1.02]'
                        : 'border-gray-200 hover:border-orange-300 shadow-sm hover:shadow-lg hover:scale-[1.01]'
                    }`}
                    style={{ aspectRatio: '3/4' }}
                  >
                    {/* Background image */}
                    <img
                      src={outlet.image}
                      alt={outlet.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Dark gradient from bottom */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${outlet.gradient}`} />

                    {/* Top tint for better contrast */}
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Selected ring overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 ring-4 ring-orange-500 ring-inset rounded-xl sm:rounded-2xl pointer-events-none z-20" />
                    )}

                    {/* Check badge */}
                    <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-30 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                      isSelected ? 'bg-orange-500 scale-100 opacity-100' : 'bg-black/30 scale-75 opacity-0 group-hover:opacity-40 group-hover:scale-90'
                    }`}>
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>

                    {/* Bottom text */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 z-10">
                      {/* Emoji */}
                      <div className="text-base sm:text-2xl mb-0.5 drop-shadow">{outlet.emoji}</div>

                      {/* Label */}
                      <h3 className="text-white font-extrabold text-[11px] sm:text-base leading-tight drop-shadow-md">
                        {outlet.label}
                      </h3>

                      {/* Description — always visible on mobile, hover on desktop */}
                      <p className="text-white/80 text-[10px] sm:text-xs font-medium mt-0.5 leading-snug drop-shadow sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0 transition-all duration-300">
                        {outlet.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="flex-shrink-0 pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/packages')}
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white border border-[#d9c3ac] text-[#855400] rounded-lg text-xs font-extrabold hover:bg-gray-50 transition-all cursor-pointer shadow-sm"
              >
                ← Back
              </button>

              <div className="flex items-center gap-3">
                {selected && (
                  <span className="hidden sm:block text-xs text-gray-500 font-semibold">
                    Selected: <span className="text-orange-500 font-bold">{outletTypes.find(o => o.id === selected)?.label}</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!selected}
                  className={`px-5 py-2 sm:px-7 sm:py-2.5 rounded-lg text-xs sm:text-sm font-extrabold transition-all shadow-sm ${
                    selected
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/30 shadow-md cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
