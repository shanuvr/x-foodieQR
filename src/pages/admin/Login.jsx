import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#f7f8fa] font-sans">

      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[46%] h-screen relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80"
          alt="Restaurant interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/70 to-orange-950/60" />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <Link className="flex items-center gap-2 relative w-fit" to="/">
            <span className="text-2xl font-bold tracking-tight text-white">
              Foodie<span className="text-orange-500">QR</span>
            </span>
            <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"></path>
            </svg>
            <span className="text-[10px] font-bold text-gray-400 absolute -top-1 -right-4">TM</span>
          </Link>
        </div>

        {/* Bottom copy */}
        <div className="relative z-10 mt-auto p-10 pb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[11px] font-semibold text-white/80 tracking-wide uppercase">Operational Dashboard</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold text-white leading-[1.12] mb-4 tracking-tight">
            Elevate your<br />dining experience.
          </h1>
          <p className="text-[14px] text-white/55 leading-relaxed max-w-[340px]">
            Manage menus, track orders, and deliver hospitality — all from one place.
          </p>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { val: '2,400+', label: 'Orders Today' },
              { val: '98.2%', label: 'Uptime' },
              { val: '4.9★', label: 'Avg Rating' },
            ].map(({ val, label }) => (
              <div key={label} className="bg-white/8 border border-white/10 rounded-xl p-3.5 backdrop-blur-sm">
                <div className="text-[18px] font-extrabold text-white">{val}</div>
                <div className="text-[10px] font-medium text-white/45 mt-0.5 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">



        {/* Form centred */}
        <div className="flex-1 flex items-center justify-center px-4 py-4 sm:py-10">
          <div className="w-full max-w-[320px] sm:max-w-[400px]">

            {/* Header */}
            <div className="mb-6 sm:mb-8 flex flex-col items-center text-center">
              <Link className="flex items-center gap-2 relative w-fit mb-4 sm:mb-5" to="/">
                <span className="text-3xl font-bold tracking-tight text-slate-800">
                  Foodie<span className="text-orange-500">QR</span>
                </span>
                <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"></path>
                </svg>
                <span className="text-[10px] font-bold text-gray-400 absolute -top-1 -right-4">TM</span>
              </Link>
              <h2 className="text-[20px] sm:text-[26px] font-extrabold text-slate-900 tracking-tight leading-tight">Welcome back</h2>
              <p className="text-[12px] sm:text-[13.5px] text-slate-500 mt-0.5 sm:mt-1.5 leading-relaxed">Sign in to your admin dashboard</p>
            </div>

            {/* Form card */}
            <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-7 flex flex-col gap-3 sm:gap-5">

              {/* Registration Number */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Registration No.</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                    <svg className="h-[15px] w-[15px] text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. REG-2024-891"
                    className="w-full pl-9 pr-4 py-2 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-[12px] sm:text-[13px] text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                    <svg className="h-[15px] w-[15px] text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="admin@foodieqr.com"
                    className="w-full pl-9 pr-4 py-2 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-[12px] sm:text-[13px] text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Password</label>
                  <Link to="/forgot-password" className="text-[11px] font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                    <svg className="h-[15px] w-[15px] text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-[12px] sm:text-[13px] text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer group w-fit">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400 accent-orange-500 cursor-pointer" />
                <span className="text-[12px] font-medium text-slate-600">Remember me for 30 days</span>
              </label>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full mt-1 py-2.5 sm:py-3.5 bg-slate-900 hover:bg-slate-800 active:bg-black text-white text-[12.5px] sm:text-[13.5px] font-bold rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
              >
                Sign In
                <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

            {/* Secure badge */}
            <div className="mt-5 flex items-center justify-center gap-1.5 text-slate-400">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-[11px] font-medium tracking-wide">Secure encrypted connection</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-medium text-slate-400 gap-3">
          <span>© 2024 FoodieQR. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}