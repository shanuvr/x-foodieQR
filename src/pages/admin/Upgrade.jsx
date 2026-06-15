import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';

const PLANS = [
  { id: 'standard', name: 'STANDARD', price: 0, discount: 0, billing: 'Free Plan', features: { listing: true, scanQr: false, ordering: false, billing: false, payment: false } },
  { id: 'silver', name: 'SILVER', price: 400, discount: 20, billing: 'Monthly', features: { listing: true, scanQr: true, ordering: false, billing: false, payment: false } },
  { id: 'gold', name: 'GOLD', price: 600, discount: 15, billing: 'Monthly', features: { listing: true, scanQr: true, ordering: true, billing: false, payment: false } },
  { id: 'platinum', name: 'PLATINAM', price: 800, discount: 10, billing: 'Monthly', features: { listing: true, scanQr: true, ordering: true, billing: true, payment: false } },
  { id: 'diamond', name: 'DIAMOND', price: 1000, discount: 5, billing: 'Monthly', features: { listing: true, scanQr: true, ordering: true, billing: true, payment: true } }
];

export default function Upgrade() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('standard');

  useEffect(() => {
    const saved = localStorage.getItem('register_formData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.selectedPackage) {
          setSelectedPlan(parsed.selectedPackage.replace('-trial', ''));
        }
      } catch (e) {}
    }
  }, []);

  const handlePlanSelect = (planId) => {
    const saved = localStorage.getItem('register_formData') || '{}';
    try {
      const parsed = JSON.parse(saved);
      parsed.selectedPackage = planId;
      localStorage.setItem('register_formData', JSON.stringify(parsed));
      
      // Navigate back to my-plan page after upgrading
      navigate('/admin/my-plan');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 font-sans text-left max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-orange-500 uppercase tracking-widest block mb-1">Subscription Upgrade</span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Upgrade Your Plan</h1>
            <p className="text-sm text-slate-500 mt-1">Unlock powerful features to automate your kitchen operations, order flows, and table reservations.</p>
          </div>
          <button
            onClick={() => navigate('/admin/my-plan')}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            ← Back to Plan
          </button>
        </div>

        {/* Package Comparison Grid */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
          <table className="w-full text-left border-collapse" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '19%' }} />
              <col style={{ width: '16.2%' }} />
              <col style={{ width: '16.2%' }} />
              <col style={{ width: '16.2%' }} />
              <col style={{ width: '16.2%' }} />
              <col style={{ width: '16.2%' }} />
            </colgroup>
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Features</th>
                {PLANS.map((pkg) => {
                  const isCurrent = selectedPlan === pkg.id;
                  return (
                    <th key={pkg.id} className="p-4 text-center border-l border-slate-100">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-extrabold text-slate-900 tracking-tight uppercase">{pkg.name}</span>
                        <span className="text-2xl font-black text-orange-500">{pkg.price > 0 ? `₹${pkg.price}` : 'Free'}</span>
                        {pkg.price > 0 ? (
                          <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">{pkg.discount}% OFF</span>
                        ) : (
                          <span className="text-[9px] font-extrabold text-emerald-600 uppercase tracking-wider">LIFETIME</span>
                        )}
                        <span className="text-[8px] text-slate-400 font-semibold uppercase">{pkg.billing}</span>
                        {isCurrent && (
                          <span className="text-[8px] font-extrabold px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full uppercase tracking-wider mt-1">
                            Current Plan
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {/* Listing */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700">Listing</td>
                {PLANS.map(pkg => (
                  <td key={pkg.id} className="p-4 text-center border-l border-slate-100">
                    {pkg.features.listing ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600">✓</span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-50 text-rose-500 font-extrabold text-[10px]">✕</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Scan & QR */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700">Scan & QR</td>
                {PLANS.map(pkg => (
                  <td key={pkg.id} className="p-4 text-center border-l border-slate-100">
                    {pkg.features.scanQr ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600">✓</span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-50 text-rose-500 font-extrabold text-[10px]">✕</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Ordering */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700">Ordering</td>
                {PLANS.map(pkg => (
                  <td key={pkg.id} className="p-4 text-center border-l border-slate-100">
                    {pkg.features.ordering ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600">✓</span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-50 text-rose-500 font-extrabold text-[10px]">✕</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Billing */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700">Billing</td>
                {PLANS.map(pkg => (
                  <td key={pkg.id} className="p-4 text-center border-l border-slate-100">
                    {pkg.features.billing ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600">✓</span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-50 text-rose-500 font-extrabold text-[10px]">✕</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Online Payment */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700">Online Payment</td>
                {PLANS.map(pkg => (
                  <td key={pkg.id} className="p-4 text-center border-l border-slate-100">
                    {pkg.features.payment ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600">✓</span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-50 text-rose-500 font-extrabold text-[10px]">✕</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Action Buttons */}
              <tr className="bg-slate-50/50">
                <td className="p-4 font-bold text-slate-400 text-xs">Action</td>
                {PLANS.map(pkg => {
                  const isCurrent = selectedPlan === pkg.id;
                  const currentPlanObj = PLANS.find(p => p.id === selectedPlan) || PLANS[0];
                  const isUpgrade = pkg.price > currentPlanObj.price;
                  const buttonLabel = isUpgrade ? 'Upgrade Now' : 'Downgrade';
                  return (
                    <td key={pkg.id} className="p-4 text-center border-l border-slate-100">
                      {isCurrent ? (
                        <button
                          type="button"
                          disabled
                          className="w-full py-2 bg-slate-200 text-slate-400 rounded-lg text-xs font-bold cursor-not-allowed"
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handlePlanSelect(pkg.id)}
                          className="w-full py-2 bg-[#FFA500] hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                        >
                          {buttonLabel}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
