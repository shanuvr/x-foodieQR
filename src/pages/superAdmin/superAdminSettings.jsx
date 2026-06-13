import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../../layouts/SuperAdminLayout';

export default function SuperAdminSettings() {
  const [settings, setSettings] = useState({
    platformName: 'FoodieQR',
    supportEmail: 'support@foodieqr.com',
    supportPhone: '+91 800-3663-4377',
    commissionPercent: '5',
    maintenanceMode: false,
    emailNotifications: true,
    weeklyDigest: false,
  });

  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('super_admin_settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaveStatus('saving');
    setTimeout(() => {
      localStorage.setItem('super_admin_settings', JSON.stringify(settings));
      setSaveStatus('saved');
      setTimeout(() => {
        setSaveStatus('');
      }, 2000);
    }, 600);
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8 pb-12 text-left max-w-2xl">
        
        {/* Title */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Global Configuration</h1>
            <p className="text-slate-500 text-sm mt-1">Configure platform commission structures, global brand details, and core toggle switches.</p>
          </div>

          {saveStatus === 'saved' && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 animate-fade-in">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Saved!
            </span>
          )}
        </div>

        {/* Form panel */}
        <form onSubmit={handleSave} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-6">
          
          {/* General Brand Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-50">General Brand Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Platform Name</label>
                <input
                  type="text"
                  name="platformName"
                  value={settings.platformName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Commission Cut (%)</label>
                <input
                  type="number"
                  name="commissionPercent"
                  value={settings.commissionPercent}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Support and contact info */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-50">Customer Support Inbound</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Support Email Address</label>
                <input
                  type="email"
                  name="supportEmail"
                  value={settings.supportEmail}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Support Hotline Phone</label>
                <input
                  type="text"
                  name="supportPhone"
                  value={settings.supportPhone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Core Controls */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-50">Core Platform Status</h3>
            
            <div className="space-y-3">
              
              {/* Maintenance Mode Toggle */}
              <label className="flex items-center justify-between p-4 bg-rose-50/20 hover:bg-rose-50/40 border border-rose-100/50 rounded-2xl cursor-pointer transition-colors group select-none">
                <div className="min-w-0 pr-4">
                  <span className="text-xs font-bold text-rose-800 block">System Maintenance Mode</span>
                  <span className="text-[10px] text-slate-400 font-semibold leading-normal mt-0.5 block">Offline the entire platform with a custom warning page. QR menus and order placing will freeze.</span>
                </div>
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  className="w-4 h-4 text-rose-600 focus:ring-rose-500/20 border-rose-200 rounded accent-rose-600 cursor-pointer"
                />
              </label>

              {/* Email Notifications Toggle */}
              <label className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/60 border border-slate-100 rounded-2xl cursor-pointer transition-colors group select-none">
                <div className="min-w-0 pr-4">
                  <span className="text-xs font-bold text-slate-700 block">Real-time Admin Email Alerts</span>
                  <span className="text-[10px] text-slate-400 font-semibold leading-normal mt-0.5 block">Send email notification when new restaurants register or when a platform bug flag is submitted.</span>
                </div>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500/20 border-slate-200 rounded accent-orange-500 cursor-pointer"
                />
              </label>

              {/* Weekly digest */}
              <label className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/60 border border-slate-100 rounded-2xl cursor-pointer transition-colors group select-none">
                <div className="min-w-0 pr-4">
                  <span className="text-xs font-bold text-slate-700 block">Weekly Platform Summaries</span>
                  <span className="text-[10px] text-slate-400 font-semibold leading-normal mt-0.5 block">Compile a weekly performance digest of gross subscription income and scans reports.</span>
                </div>
                <input
                  type="checkbox"
                  name="weeklyDigest"
                  checked={settings.weeklyDigest}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500/20 border-slate-200 rounded accent-orange-500 cursor-pointer"
                />
              </label>

            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={saveStatus === 'saving'}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            {saveStatus === 'saving' ? (
              <>
                <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Saving Settings...
              </>
            ) : 'Save Configuration'}
          </button>

        </form>

      </div>
    </SuperAdminLayout>
  );
}
