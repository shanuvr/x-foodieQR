import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../../layouts/UserLayout';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerName: '',
    ownerMobile: '',
    ownerEmail: '',
    otp: '',
    password: '',
    confirmPassword: ''
  });

  const [showOtpModal, setShowOtpModal] = useState(false);

  useEffect(() => {
    // Load existing form data from localStorage if available
    const existing = localStorage.getItem('register_formData');
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        setFormData((prev) => ({
          ...prev,
          ownerName: parsed.ownerName || '',
          ownerMobile: parsed.ownerMobile || '',
          ownerEmail: parsed.ownerEmail || '',
          otp: parsed.otp || '',
          password: parsed.password || '',
          confirmPassword: parsed.confirmPassword || ''
        }));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const stepsList = [
    { number: 1, label: 'Your Details', desc: 'Owner information', active: true },
    { number: 2, label: 'Select Package', desc: 'Choose pricing plan' },
    { number: 3, label: 'Outlet Type', desc: 'Category of restaurant' },
    { number: 4, label: 'Outlet Details', desc: 'Menu and operations' },
    { number: 5, label: 'Payment', desc: 'Secure registration' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.ownerName.trim() !== '' &&
      formData.ownerMobile.trim() !== '' &&
      formData.ownerEmail.trim() !== '' &&
      formData.otp.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.password === formData.confirmPassword
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    // Save to localStorage
    const existing = localStorage.getItem('register_formData') || '{}';
    try {
      const parsed = JSON.parse(existing);
      const updated = {
        ...parsed,
        ...formData
      };
      localStorage.setItem('register_formData', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    // Route to Step 2: Packages
    navigate('/packages');
  };

  const handleSendOtp = () => {
    if (!formData.ownerEmail.trim()) {
      alert('Please enter your email address first.');
      return;
    }
    setShowOtpModal(true);
  };

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
              disabled={step.number > 1}
              onClick={() => navigate('/register')}
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-all cursor-pointer ${
                step.active
                  ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/35 ring-4 ring-orange-500/20'
                  : 'bg-slate-800 border-slate-700 text-gray-400'
              }`}
            >
              {step.number}
            </button>
            {idx < stepsList.length - 1 && (
              <div className="h-0.5 w-4 flex-shrink-0 bg-slate-800" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center mt-3">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Step 1 of 5</p>
        <h4 className="text-white text-sm font-bold mt-0.5">Your Details</h4>
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

          return (
            <div 
              key={step.number}
              className="flex items-start gap-4 relative z-10 group transition-all duration-300"
            >
              {/* Number Bubble */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm border transition-all duration-300 ${
                  isActive
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/40 ring-4 ring-orange-500/10 scale-105'
                    : 'bg-slate-900 border-slate-800 text-gray-500 group-hover:border-slate-700'
                }`}
              >
                {step.number}
              </div>

              {/* Text info */}
              <div className="text-left py-0.5">
                <p
                  className={`text-sm font-bold transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-500'
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
      <div className="max-w-6xl mx-auto px-0 sm:px-4 md:px-6 py-6 md:py-12 font-sans">
        
        {/* Multi-Step Wizard Layout */}
        <div className="bg-white rounded-2xl border border-[#d9c3ac] shadow-2xl overflow-hidden min-h-[520px] grid grid-cols-1 md:grid-cols-12 md:h-[85vh]">
          
          {/* Sidebar (Stepper) */}
          {renderMobileSteps()}
          {renderDesktopSteps()}

          {/* Form Section */}
          <form 
            onSubmit={handleSubmit}
            className="md:col-span-9 p-6 sm:p-8 md:p-10 flex flex-col justify-center overflow-y-auto"
          >
            {/* Active Step Panel */}
            <div className="flex-grow">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Your Details</h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">Enter your business owner contact details</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Your Name *</label>
                    <input 
                      type="text" 
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-[#FFA500] bg-white transition-all shadow-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Mobile Number *</label>
                    <input 
                      type="tel" 
                      name="ownerMobile"
                      value={formData.ownerMobile}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-[#FFA500] bg-white transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email Address *</label>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleInputChange}
                      required
                      className="flex-grow border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-[#FFA500] bg-white transition-all shadow-sm"
                    />
                    <button 
                      type="button" 
                      onClick={handleSendOtp}
                      className="px-4 py-2.5 bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm hover:bg-slate-900 cursor-pointer flex-shrink-0"
                    >
                      Send OTP
                    </button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Enter OTP *</label>
                  <input 
                    type="text" 
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter the code sent to your email"
                    className="border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-[#FFA500] bg-white transition-all shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Password *</label>
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-[#FFA500] bg-white transition-all shadow-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Confirm Password *</label>
                    <input 
                      type="password" 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-[#FFA500] bg-white transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="flex-shrink-0 pt-6 mt-8 border-t border-gray-100 flex items-center justify-end">
              <button
                type="submit"
                disabled={!isFormValid()}
                className="px-6 py-2.5 bg-[#FFA500] disabled:bg-gray-200 hover:bg-orange-600 disabled:text-gray-400 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-[0.98] disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </form>

        </div>

      </div>

      {/* OTP Sent Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">OTP Sent!</h3>
              <p className="text-sm font-semibold text-gray-500 mb-6">
                A verification code has been sent to <br/><span className="text-gray-900 font-bold">{formData.ownerEmail}</span>
              </p>
              <button
                onClick={() => setShowOtpModal(false)}
                className="w-full py-3 bg-[#FFA500] hover:bg-orange-600 text-white rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

    </UserLayout>
  );
}
