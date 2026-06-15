import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../../layouts/SuperAdminLayout';

const FEATURE_LABELS = {
  listing: 'Listing',
  scanQr: 'Scan & QR',
  ordering: 'Ordering',
  billing: 'Billing',
  payment: 'Online Payment'
};

export default function SuperAdminPackages() {
  const [packages, setPackages] = useState([]);
  const [editPkg, setEditPkg] = useState(null); // package currently being edited
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPkg, setNewPkg] = useState({
    name: '',
    price: 200,
    discount: 10,
    billing: 'Monthly',
    features: {
      listing: true,
      scanQr: true,
      ordering: false,
      billing: false,
      payment: false
    },
    enableFreeTrial: false,
    freeTrialDays: 14,
    isActive: true,
    enableReview: true,
    allowRegistration: true
  });

  const [coupons, setCoupons] = useState(['WELCOME20', 'GOURMETFEST', 'FESTIVE50', 'SUPERDEAL']);
  const [newCoupon, setNewCoupon] = useState('');

  // Initial seed
  useEffect(() => {
    const savedPkg = localStorage.getItem('super_admin_packages');
    if (savedPkg) {
      setPackages(JSON.parse(savedPkg));
    } else {
      const defaultPkg = [
        {
          id: 'standard',
          name: 'Standard',
          price: 0,
          discount: 0,
          billing: 'Free Plan',
          features: {
            listing: true,
            scanQr: false,
            ordering: false,
            billing: false,
            payment: false
          },
          enableFreeTrial: false,
          freeTrialDays: 0,
          isActive: true,
          enableReview: false,
          allowRegistration: true
        },
        {
          id: 'silver',
          name: 'Silver',
          price: 400,
          discount: 20,
          billing: 'Monthly',
          features: {
            listing: true,
            scanQr: true,
            ordering: false,
            billing: false,
            payment: false
          },
          enableFreeTrial: true,
          freeTrialDays: 14,
          isActive: true,
          enableReview: true,
          allowRegistration: true
        },
        {
          id: 'gold',
          name: 'Gold',
          price: 600,
          discount: 15,
          billing: 'Monthly',
          features: {
            listing: true,
            scanQr: true,
            ordering: true,
            billing: false,
            payment: false
          },
          enableFreeTrial: true,
          freeTrialDays: 14,
          isActive: true,
          enableReview: true,
          allowRegistration: true
        },
        {
          id: 'platinum',
          name: 'Platinam',
          price: 800,
          discount: 10,
          billing: 'Monthly',
          features: {
            listing: true,
            scanQr: true,
            ordering: true,
            billing: true,
            payment: false
          },
          enableFreeTrial: true,
          freeTrialDays: 14,
          isActive: true,
          enableReview: true,
          allowRegistration: true
        },
        {
          id: 'diamond',
          name: 'Diamond',
          price: 1000,
          discount: 5,
          billing: 'Monthly',
          features: {
            listing: true,
            scanQr: true,
            ordering: true,
            billing: true,
            payment: true
          },
          enableFreeTrial: true,
          freeTrialDays: 14,
          isActive: true,
          enableReview: true,
          allowRegistration: true
        }
      ];
      localStorage.setItem('super_admin_packages', JSON.stringify(defaultPkg));
      setPackages(defaultPkg);
    }

    const savedCoupons = localStorage.getItem('super_admin_active_coupons');
    if (savedCoupons) {
      setCoupons(JSON.parse(savedCoupons));
    }
  }, []);

  const savePackages = (updated) => {
    localStorage.setItem('super_admin_packages', JSON.stringify(updated));
    setPackages(updated);
  };

  const saveCoupons = (updated) => {
    localStorage.setItem('super_admin_active_coupons', JSON.stringify(updated));
    setCoupons(updated);
  };

  const handleUpdatePackage = (e) => {
    e.preventDefault();
    const updated = packages.map(p => p.id === editPkg.id ? editPkg : p);
    savePackages(updated);
    setEditPkg(null);
  };

  const handleFeatureToggle = (featureKey) => {
    setEditPkg(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [featureKey]: !prev.features[featureKey]
      }
    }));
  };

  const handleNewFeatureToggle = (featureKey) => {
    setNewPkg(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [featureKey]: !prev.features[featureKey]
      }
    }));
  };

  const handleDeletePackage = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this pricing tier?")) {
      const updated = packages.filter(p => p.id !== id);
      savePackages(updated);
    }
  };

  const handleCreatePackage = (e) => {
    e.preventDefault();
    if (!newPkg.name.trim()) return;
    const created = {
      ...newPkg,
      id: newPkg.name.toLowerCase().replace(/\s+/g, '-'),
    };
    const updated = [...packages, created];
    savePackages(updated);
    setShowCreateModal(false);
    // Reset form
    setNewPkg({
      name: '',
      price: 200,
      discount: 10,
      billing: 'Monthly',
      features: {
        listing: true,
        scanQr: true,
        ordering: false,
        billing: false,
        payment: false
      },
      enableFreeTrial: false,
      freeTrialDays: 14,
      isActive: true,
      enableReview: true,
      allowRegistration: true
    });
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.trim()) return;
    const code = newCoupon.toUpperCase().trim();
    if (coupons.includes(code)) {
      alert("Coupon already exists.");
      return;
    }
    const updated = [...coupons, code];
    saveCoupons(updated);
    setNewCoupon('');
  };

  const handleRemoveCoupon = (code) => {
    const updated = coupons.filter(c => c !== code);
    saveCoupons(updated);
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8 pb-12 text-left">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Subscription Plans & Coupon Deals</h1>
            <p className="text-slate-500 text-sm mt-1">Configure plan pricing, active feature lists, promotional percentage discounts, and coupon ledger.</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2"
          >
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Plan
          </button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between h-full hover:shadow-md transition-shadow">
              
              {/* Header block */}
              <div className="p-6 border-b border-slate-50 space-y-2 relative">
                <span className="text-[10px] font-bold text-orange-500 tracking-widest uppercase">Pricing Plan</span>
                <h3 className="font-extrabold text-slate-800 text-lg">{pkg.name}</h3>
                
                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-2xl font-black text-slate-950">₹{pkg.price}</span>
                  <span className="text-xs text-slate-400 font-semibold uppercase">/ {pkg.billing}</span>
                </div>
                
                <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-extrabold px-2 py-0.5 rounded">
                  {pkg.discount}% OFF
                </span>
              </div>

              {/* Body features */}
              <div className="p-6 flex-grow space-y-3.5 text-slate-600 text-xs border-b border-slate-50">
                {Object.entries(pkg.features).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500">{FEATURE_LABELS[key] || key}</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black ${
                      val ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-400'
                    }`}>
                      {val ? '✓' : '✕'}
                    </span>
                  </div>
                ))}
              </div>

              {/* System Flags */}
              <div className="p-6 pt-4 pb-5 space-y-3 text-slate-600 text-xs bg-slate-50/40">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-400 uppercase text-[9px] tracking-wider">Plan Status</span>
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${pkg.isActive ?? true ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'}`}>
                    {(pkg.isActive ?? true) ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-400 uppercase text-[9px] tracking-wider">Registration</span>
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${pkg.allowRegistration ?? true ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'}`}>
                    {(pkg.allowRegistration ?? true) ? 'Allowed' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-400 uppercase text-[9px] tracking-wider">Free Trial</span>
                  <span className="font-bold text-slate-700">
                    {pkg.enableFreeTrial ? `${pkg.freeTrialDays ?? 14} Days` : 'No Trial'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-400 uppercase text-[9px] tracking-wider">Review System</span>
                  <span className="font-bold text-slate-700">
                    {(pkg.enableReview ?? true) ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => setEditPkg(JSON.parse(JSON.stringify(pkg)))}
                  className="flex-grow py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                >
                  Configure
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletePackage(pkg.id)}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center"
                  title="Delete Plan"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Coupons and Promotion Codes Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Coupon Codes Panel */}
          <div className="lg:col-span-1 bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Active Coupon Codes</h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Define coupons that can be entered in restaurant registration billing panels.</p>
            </div>

            <form onSubmit={handleAddCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. FLASH30"
                value={newCoupon}
                onChange={(e) => setNewCoupon(e.target.value)}
                className="flex-grow bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 uppercase focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors"
              >
                Create
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-2">
              {coupons.map((code) => (
                <div key={code} className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  <span>{code}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCoupon(code)}
                    className="text-emerald-500 hover:text-emerald-700 cursor-pointer focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Promotion Details */}
          <div className="lg:col-span-2 bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Promotional Campaigns</h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Manage details of active platform-wide sign-up campaigns.</p>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl text-xs text-slate-700 space-y-2 leading-relaxed font-medium">
              <p>• <strong>Registration First-Year Discount:</strong> Currently set at 20% discount across all Standard and Premium sign-ups.</p>
              <p>• <strong>Free Trial Extension:</strong> Trials initialized by newly registered restaurants default to <strong>14 Days</strong> access to features.</p>
              <p>• <strong>KDS Kitchen Panel Integration:</strong> Available as a standard service inclusions for Gold and Platinum accounts.</p>
            </div>
          </div>

        </div>

        {/* Edit Package Modal */}
        {editPkg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <form onSubmit={handleUpdatePackage} className="bg-white rounded-2xl w-full max-w-md overflow-hidden border border-slate-100 shadow-2xl flex flex-col">
              
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Edit Plan: {editPkg.name}</h3>
                  <p className="text-xs text-slate-400 font-semibold">Change pricing, discounts, and toggle tier capabilities</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditPkg(null)}
                  className="bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-700 w-8 h-8 rounded-full flex items-center justify-center border border-slate-200 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                
                {/* Price and discount */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Price (Rs.)</label>
                    <input
                      type="number"
                      value={editPkg.price}
                      onChange={(e) => setEditPkg(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Discount (%)</label>
                    <input
                      type="number"
                      value={editPkg.discount}
                      onChange={(e) => setEditPkg(prev => ({ ...prev, discount: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Billing Cycle */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Billing Cycle</label>
                  <select
                    value={editPkg.billing ?? 'Monthly'}
                    onChange={(e) => setEditPkg(prev => ({ ...prev, billing: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-orange-500"
                  >
                    <option value="Free Plan">Free Plan</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Lifetime">Lifetime</option>
                  </select>
                </div>

                {/* Free Trial Days input */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">number of days for free trial</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editPkg.freeTrialDays ?? 14}
                    onChange={(e) => setEditPkg(prev => ({ ...prev, freeTrialDays: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Features toggles */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Included Platform Features</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(editPkg.features).map(([key, val]) => (
                      <label key={key} className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={val}
                          onChange={() => handleFeatureToggle(key)}
                          className="w-4 h-4 text-orange-500 accent-orange-500 cursor-pointer"
                        />
                        <span className="text-[11px] font-bold text-slate-600 leading-none">
                          {FEATURE_LABELS[key] || key}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* System Config & Flags */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Plan Configuration & Flags</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={editPkg.isActive ?? true}
                        onChange={(e) => setEditPkg(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="w-4 h-4 text-orange-500 accent-orange-500 cursor-pointer"
                      />
                      <span className="text-[11px] font-bold text-slate-600 leading-none">Is Active</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={editPkg.enableFreeTrial ?? false}
                        onChange={(e) => setEditPkg(prev => ({ ...prev, enableFreeTrial: e.target.checked }))}
                        className="w-4 h-4 text-orange-500 accent-orange-500 cursor-pointer"
                      />
                      <span className="text-[11px] font-bold text-slate-600 leading-none">Enable Free Trial</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={editPkg.enableReview ?? true}
                        onChange={(e) => setEditPkg(prev => ({ ...prev, enableReview: e.target.checked }))}
                        className="w-4 h-4 text-orange-500 accent-orange-500 cursor-pointer"
                      />
                      <span className="text-[11px] font-bold text-slate-600 leading-none">Enable Review</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={editPkg.allowRegistration ?? true}
                        onChange={(e) => setEditPkg(prev => ({ ...prev, allowRegistration: e.target.checked }))}
                        className="w-4 h-4 text-orange-500 accent-orange-500 cursor-pointer"
                      />
                      <span className="text-[11px] font-bold text-slate-600 leading-none">Allow Registration</span>
                    </label>
                  </div>
                </div>


              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditPkg(null)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-md shadow-orange-500/10"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Create Package Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <form onSubmit={handleCreatePackage} className="bg-white rounded-2xl w-full max-w-md overflow-hidden border border-slate-100 shadow-2xl flex flex-col">
              
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Add New Pricing Plan</h3>
                  <p className="text-xs text-slate-400 font-semibold">Define plan name, base monthly cost, discount percentage, and features.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-700 w-8 h-8 rounded-full flex items-center justify-center border border-slate-200 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 text-left max-h-[60vh] overflow-y-auto">
                
                {/* Plan Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Plan Name</label>
                  <input
                    type="text"
                    required
                    value={newPkg.name}
                    onChange={(e) => setNewPkg(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Diamond Plan"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Price and discount */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Price (Rs.)</label>
                    <input
                      type="number"
                      required
                      value={newPkg.price}
                      onChange={(e) => setNewPkg(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Discount (%)</label>
                    <input
                      type="number"
                      required
                      value={newPkg.discount}
                      onChange={(e) => setNewPkg(prev => ({ ...prev, discount: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Billing Cycle */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Billing Cycle</label>
                  <select
                    value={newPkg.billing}
                    onChange={(e) => setNewPkg(prev => ({ ...prev, billing: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-orange-500"
                  >
                    <option value="Free Plan">Free Plan</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Lifetime">Lifetime</option>
                  </select>
                </div>

                {/* Free Trial Days input */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">number of days for free trial</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newPkg.freeTrialDays}
                    onChange={(e) => setNewPkg(prev => ({ ...prev, freeTrialDays: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Features toggles */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Select Included Features</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(newPkg.features).map(([key, val]) => (
                      <label key={key} className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={val}
                          onChange={() => handleNewFeatureToggle(key)}
                          className="w-4 h-4 text-orange-500 accent-orange-500 cursor-pointer"
                        />
                        <span className="text-[11px] font-bold text-slate-600 leading-none">
                          {FEATURE_LABELS[key] || key}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* System Config & Flags */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Plan Configuration & Flags</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={newPkg.isActive}
                        onChange={(e) => setNewPkg(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="w-4 h-4 text-orange-500 accent-orange-500 cursor-pointer"
                      />
                      <span className="text-[11px] font-bold text-slate-600 leading-none">Is Active</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={newPkg.enableFreeTrial}
                        onChange={(e) => setNewPkg(prev => ({ ...prev, enableFreeTrial: e.target.checked }))}
                        className="w-4 h-4 text-orange-500 accent-orange-500 cursor-pointer"
                      />
                      <span className="text-[11px] font-bold text-slate-600 leading-none">Enable Free Trial</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={newPkg.enableReview}
                        onChange={(e) => setNewPkg(prev => ({ ...prev, enableReview: e.target.checked }))}
                        className="w-4 h-4 text-orange-500 accent-orange-500 cursor-pointer"
                      />
                      <span className="text-[11px] font-bold text-slate-600 leading-none">Enable Review</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={newPkg.allowRegistration}
                        onChange={(e) => setNewPkg(prev => ({ ...prev, allowRegistration: e.target.checked }))}
                        className="w-4 h-4 text-orange-500 accent-orange-500 cursor-pointer"
                      />
                      <span className="text-[11px] font-bold text-slate-600 leading-none">Allow Registration</span>
                    </label>
                  </div>
                </div>


              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-md shadow-orange-500/10"
                >
                  Create Plan
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </SuperAdminLayout>
  );
}
