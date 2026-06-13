import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password requirements checks
  const isLengthValid = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!isLengthValid || !hasNumber || !hasSpecial) {
      setError('Please meet all password requirements.');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the Terms and Conditions.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Clear form
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      setAgreeTerms(false);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1200);
  };

  return (
    <UserLayout>
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 font-sans relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />

        <div className="max-w-md w-full space-y-6 bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-xl relative z-10">
          
          {/* Header */}
          <div className="text-center">
            <Link className="inline-flex items-center gap-2 mb-3" to="/">
              <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                Foodie<span className="text-orange-500">QR</span>
              </span>
              <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
              </svg>
            </Link>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Create your account</h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Join the platform to access digital menu reservations and fast scan order placing.
            </p>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2 animate-fade-in text-left">
              <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2 animate-fade-in text-left">
              <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Registration successful! Redirecting to login...
            </div>
          )}

          {/* Form */}
          <form className="space-y-4 text-left" onSubmit={handleRegister}>
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 9988776655"
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all"
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all"
                />
              </div>
            </div>

            {/* Password Requirements Indicator */}
            {password && (
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-[10px] font-bold text-left animate-fade-in select-none">
                <span className="text-slate-400 block mb-0.5">Password Requirements:</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black ${isLengthValid ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>✓</span>
                  <span className={isLengthValid ? 'text-slate-700' : 'text-slate-400'}>Minimum 8 characters</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black ${hasNumber ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>✓</span>
                  <span className={hasNumber ? 'text-slate-700' : 'text-slate-400'}>Contains at least 1 number</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black ${hasSpecial ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>✓</span>
                  <span className={hasSpecial ? 'text-slate-700' : 'text-slate-400'}>Contains at least 1 special char</span>
                </div>
              </div>
            )}

            {/* Terms of Service Checkbox */}
            <div className="flex items-start gap-2 pt-1 select-none">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-orange-500 border-slate-200 rounded accent-orange-500 cursor-pointer mt-0.5"
              />
              <label htmlFor="terms" className="text-[11px] font-semibold text-slate-500 cursor-pointer leading-tight">
                I agree to the FoodieQR{' '}
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms and Conditions Modal simulation."); }} className="font-bold text-orange-500 hover:text-orange-600">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy Modal simulation."); }} className="font-bold text-orange-500 hover:text-orange-600">
                  Privacy Policy
                </a>.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Registering...
                </>
              ) : 'Register Account'}
            </button>
          </form>

          {/* Sign in toggle footer */}
          <div className="text-center text-xs font-medium text-slate-500 pt-1 select-none">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-orange-500 hover:text-orange-600 transition-colors">
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </UserLayout>
  );
}
