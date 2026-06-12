import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

export default function Settings() {
  // Reset Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Alert Status
  const [notification, setNotification] = useState(null); // { type: 'success'|'error', message: string }

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setNotification({ type: 'error', message: 'New passwords do not match!' });
      return;
    }
    
    setNotification({ type: 'success', message: 'Password updated successfully! ✓' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleForgotPassword = () => {
    setNotification({ type: 'success', message: 'Password recovery email sent! Check your inbox. ✓' });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <AdminLayout>
      <div className="font-sans text-slate-800 text-left max-w-md">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Security Settings
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Update your account password or initiate a password recovery email.
          </p>
        </div>

        {/* Dynamic Alerts */}
        {notification && (
          <div className={`mb-5 p-3.5 border rounded-xl text-xs sm:text-sm font-semibold animate-fadeIn ${
            notification.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            {notification.message}
          </div>
        )}

        {/* Card Container */}
        <div className="space-y-6">
          {/* Section 1: Reset Password */}
          <form onSubmit={handleResetSubmit} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2.5">
              Reset Password
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="px-3.5 py-2 bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 rounded-xl text-xs sm:text-sm font-medium outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="px-3.5 py-2 bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 rounded-xl text-xs sm:text-sm font-medium outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="px-3.5 py-2 bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 rounded-xl text-xs sm:text-sm font-medium outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              Update Password
            </button>
          </form>

          {/* Section 2: Forgot Password */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2.5">
              Forgot Password?
            </h3>
            
            <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">
              If you forgot your password, you can request a secure reset link to be sent to your registered email address.
            </p>

            <button
              onClick={handleForgotPassword}
              className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs sm:text-sm font-extrabold active:scale-95 transition-all cursor-pointer"
            >
              Send Reset Link
            </button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
