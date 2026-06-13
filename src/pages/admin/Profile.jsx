import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const businessTypes = ['LLC', 'Private Limited', 'Proprietor', 'Partnership', 'Individual'];
const starOptions = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];

const inputCls =
  'w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed';
const selectCls =
  'w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all appearance-none cursor-pointer disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed';
const labelCls = 'block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2';

// Helper for rendering amenity icons matching HotelListings.jsx
function renderAmenityIcon(amenity) {
  switch (amenity) {
    case 'WiFi':
      return (
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a9.5 9.5 0 0114.142 0M6.228 6.228a14.5 14.5 0 0120.544 0" />
        </svg>
      );
    case 'Parking':
      return (
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      );
    case 'AC':
      return (
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      );
    case 'Pure Veg':
      return (
        <span className="w-3.5 h-3.5 border border-green-600 flex items-center justify-center p-0.5" title="Pure Veg">
          <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
        </span>
      );
    case 'Non Veg':
      return (
        <span className="w-3.5 h-3.5 border border-[#e12d5b] flex items-center justify-center p-0.5" title="Non Veg">
          <span className="w-1.5 h-1.5 bg-[#e12d5b] rounded-full"></span>
        </span>
      );
    case 'Bar':
      return (
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'Rooftop Seating':
      return (
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3a9 9 0 019 9H3a9 9 0 019-9z" />
        </svg>
      );
    case 'Live Music':
      return (
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 10l12-3M9 14a3 3 0 11-6-3 3 3 0 016 3zm12 2a3 3 0 11-6-3 3 3 0 016 3z" />
        </svg>
      );
    case 'Valet Parking':
      return (
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H3.75v-2.25a3.375 3.375 0 01.99-2.384l2.24-2.24c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      );
    case 'Wheelchair Accessible':
      return (
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a2 2 0 100-4 2 2 0 000 4zm-1.5 5.5h3v4.25L18.75 19H16.5l-3.25-3.75v-4.5H10.5v3.5a2 2 0 11-4 0v-5.25A2.25 2.25 0 018.75 7.5h1.75z" />
        </svg>
      );
    case 'Pet Friendly':
      return (
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z M16 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z M11 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      );
    case 'Smoking Area':
      return (
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 10h3M3 10h12v4H3v-4zM6 14v2M9 14v2M12 14v2M18 6c0-2-2-2-2-4M21 6c0-2-2-2-2-4" />
        </svg>
      );
    case 'Kids Play Area':
      return (
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a6 6 0 106.9 6.9M12 18.75h.008v.008H12V18.75zm0-2.25h.008v.008H12V16.5z" />
        </svg>
      );
    case 'Cards Accepted':
      return (
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-6.75 3h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
        </svg>
      );
    default:
      return (
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState(''); // 'saving', 'saved', ''
  const [couponInput, setCouponInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempForm, setTempForm] = useState(null);

  const startEditing = () => {
    setTempForm(JSON.parse(JSON.stringify(form)));
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (tempForm) {
      setForm(tempForm);
    }
    setIsEditing(false);
  };
  
  // Default and saved State
  const [form, setForm] = useState({
    kitchenName: 'Gourmet Central Kitchen',
    tagline: 'Legendary Hyderabadi Dum Biryani since 1953',
    tagline2: 'Highly recommended for families and groups',
    businessType: 'Private Limited',
    contactPerson: 'Sarah Jenkins',
    mobileNumber: '+91 98765 43210',
    gstNumber: '22AAAAA0000A1Z5',
    foodLicenseNumber: '10021043000123',
    location: 'Jubilee Hills, Hyderabad',
    subLocation: '200m from Peddamma Temple Metro Station',
    openingTime: '11:00',
    closingTime: '23:00',
    starCategory: '4 Stars',
    averagePrice: '800',
    website: 'https://gourmetcentral.com',
    instagram: 'https://instagram.com/gourmetcentral',
    onlineOrder: true,
    parking: true,
    dineIn: true,
    outdoorSitting: false,
    takeAway: true,
    foodPreference: 'Both',
    amenities: ['WiFi', 'Parking', 'AC'],
    promoTagline: 'Flat 20% Off on First Dine-in',
    discount: '20',
    coupons: ['WELCOME20', 'GOURMETFEST'],
    logo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150',
    coverPhoto: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=800'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-fresh-vegetable-salad-40011-large.mp4'
  });

  // Load from local storage if available
  useEffect(() => {
    const saved = localStorage.getItem('admin_profile_data');
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load profile data', e);
      }
    } else {
      // Fallback: see if there's any data from register flow
      const registerData = localStorage.getItem('register_formData');
      if (registerData) {
        try {
          const parsed = JSON.parse(registerData);
          const outlet = parsed.outletDetails || {};
          setForm(prev => ({
            ...prev,
            kitchenName: outlet.kitchenName || prev.kitchenName,
            businessType: outlet.businessType || prev.businessType,
            contactPerson: outlet.contactPerson || prev.contactPerson,
            mobileNumber: outlet.mobileNumber || prev.mobileNumber,
            gstNumber: outlet.gstNumber || prev.gstNumber,
            foodLicenseNumber: outlet.foodLicenseNumber || prev.foodLicenseNumber,
            location: outlet.location || prev.location,
            subLocation: outlet.subLocation || prev.subLocation,
          }));
        } catch (e) {}
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle Image Upload with Base64 Conversion
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({
        ...prev,
        [field]: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Handle Video Upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2.5 * 1024 * 1024) {
      alert("Video size must be less than 2.5MB for the database storage.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({
        ...prev,
        video: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Handle Gallery Uploads
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({
          ...prev,
          gallery: [...prev.gallery, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index) => {
    setForm(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setForm(prev => {
      const alreadyHas = prev.amenities.includes(amenity);
      const updated = alreadyHas
        ? prev.amenities.filter(item => item !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updated };
    });
  };

  const addCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setForm(prev => ({
      ...prev,
      coupons: [...prev.coupons, couponInput.trim().toUpperCase()]
    }));
    setCouponInput('');
  };

  const removeCoupon = (index) => {
    setForm(prev => ({
      ...prev,
      coupons: prev.coupons.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaveStatus('saving');
    
    setTimeout(() => {
      localStorage.setItem('admin_profile_data', JSON.stringify(form));
      setSaveStatus('saved');
      setIsEditing(false);
      
      setTimeout(() => {
        setSaveStatus('');
      }, 2500);
    }, 800);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Restaurant Profile</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your branding, hours, features, and visual details visible on search listings.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {saveStatus === 'saved' && (
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3.5 py-2 rounded-xl flex items-center gap-1.5 animate-fade-in">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Changes Saved!
              </span>
            )}
            {!isEditing ? (
              <button
                onClick={startEditing}
                className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Update Profile
              </button>
            ) : (
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={cancelEditing}
                  className="w-1/2 sm:w-auto px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saveStatus === 'saving'}
                  className="w-1/2 sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2"
                >
                  {saveStatus === 'saving' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Saving...
                    </>
                  ) : 'Done'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Tabs Selector */}
            <div className="flex border-b border-slate-100 overflow-x-auto select-none [&::-webkit-scrollbar]:hidden">
              {[
                { id: 'general', label: 'Basic Info', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                { id: 'operations', label: 'Operations & hours', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
                { id: 'amenities', label: 'Amenities & Offers', icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.125 1.125 0 001.591 0l7.25-7.25a1.125 1.125 0 000-1.591L12.75 3.659A2.25 2.25 0 0011.159 3z' },
                { id: 'media', label: 'Branding & Gallery', icon: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-6 py-4.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-500 bg-orange-50/10'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            <div className="p-6 sm:p-8">
              
              {/* TAB 1: General Info */}
              {activeTab === 'general' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Restaurant / Kitchen Name</label>
                      <input name="kitchenName" value={form.kitchenName} onChange={handleChange} className={inputCls} placeholder="e.g. Paradise Biryani" disabled={!isEditing} />
                    </div>
                    <div>
                      <label className={labelCls}>Business Type</label>
                      <div className="relative">
                        <select name="businessType" value={form.businessType} onChange={handleChange} className={selectCls} disabled={!isEditing}>
                          {businessTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Contact Person</label>
                      <input name="contactPerson" value={form.contactPerson} onChange={handleChange} className={inputCls} placeholder="Manager or Owner Name" disabled={!isEditing} />
                    </div>
                    <div>
                      <label className={labelCls}>Mobile Number</label>
                      <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange} className={inputCls} placeholder="+91 XXXXX XXXXX" disabled={!isEditing} />
                    </div>
                    <div>
                      <label className={labelCls}>Location (City / Area)</label>
                      <input name="location" value={form.location} onChange={handleChange} className={inputCls} placeholder="e.g. Jubilee Hills, Hyderabad" disabled={!isEditing} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Sub-location (Landmarks)</label>
                      <input name="subLocation" value={form.subLocation} onChange={handleChange} className={inputCls} placeholder="e.g. 50 m from Secunderabad Metro Station" disabled={!isEditing} />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Compliance Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>GST Number</label>
                        <input name="gstNumber" value={form.gstNumber} onChange={handleChange} className={inputCls} placeholder="15-digit GSTIN" disabled={!isEditing} />
                      </div>
                      <div>
                        <label className={labelCls}>Food License Number (FSSAI)</label>
                        <input name="foodLicenseNumber" value={form.foodLicenseNumber} onChange={handleChange} className={inputCls} placeholder="14-digit FSSAI Number" disabled={!isEditing} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Operations & hours */}
              {activeTab === 'operations' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Opening Time</label>
                      <input type="time" name="openingTime" value={form.openingTime} onChange={handleChange} className={inputCls} disabled={!isEditing} />
                    </div>
                    <div>
                      <label className={labelCls}>Closing Time</label>
                      <input type="time" name="closingTime" value={form.closingTime} onChange={handleChange} className={inputCls} disabled={!isEditing} />
                    </div>
                    <div>
                      <label className={labelCls}>Star Category</label>
                      <div className="relative">
                        <select name="starCategory" value={form.starCategory} onChange={handleChange} className={selectCls} disabled={!isEditing}>
                          {starOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Average Price For Two (Rs.)</label>
                      <input type="number" name="averagePrice" value={form.averagePrice} onChange={handleChange} className={inputCls} placeholder="e.g. 800" disabled={!isEditing} />
                    </div>
                    <div>
                      <label className={labelCls}>Website Link</label>
                      <input name="website" value={form.website} onChange={handleChange} className={inputCls} placeholder="https://example.com" disabled={!isEditing} />
                    </div>
                    <div>
                      <label className={labelCls}>Instagram Link</label>
                      <input name="instagram" value={form.instagram} onChange={handleChange} className={inputCls} placeholder="https://instagram.com/handle" disabled={!isEditing} />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Availability & Dining Options</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { name: 'onlineOrder', label: 'Online Order Available' },
                        { name: 'dineIn', label: 'Dine-In Available' },
                        { name: 'takeAway', label: 'Take Away Available' },
                        { name: 'parking', label: 'Parking Available' },
                        { name: 'outdoorSitting', label: 'Outdoor Seating' }
                      ].map(item => (
                        <label key={item.name} className="flex items-center gap-3 p-3.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-100 rounded-xl cursor-pointer transition-colors group">
                          <input
                            type="checkbox"
                            name={item.name}
                            checked={form[item.name]}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-4 h-4 text-orange-500 focus:ring-orange-500/20 border-slate-200 rounded accent-orange-500 cursor-pointer disabled:opacity-50"
                          />
                          <span className="text-xs font-bold text-slate-700 select-none group-hover:text-slate-900 transition-colors">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Amenities & Offers */}
              {activeTab === 'amenities' && (
                <div className="space-y-8 animate-fade-in">
                  {/* Food Preference (Veg/Non-Veg/Both) */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Food Preference</h3>
                      <p className="text-slate-500 text-xs">Specify the type of food preference served at your outlet.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {['Pure Veg', 'Non Veg', 'Both'].map((pref) => {
                        const isSelected = form.foodPreference === pref;
                        return (
                          <button
                            key={pref}
                            type="button"
                            onClick={() => setForm(prev => ({ ...prev, foodPreference: pref }))}
                            disabled={!isEditing}
                            className={`px-4 py-2.5 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
                              isSelected
                                ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm shadow-orange-500/5'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                            }`}
                          >
                            {pref === 'Pure Veg' && (
                              <span className="w-3.5 h-3.5 border border-green-600 flex items-center justify-center p-0.5">
                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                              </span>
                            )}
                            {pref === 'Non Veg' && (
                              <span className="w-3.5 h-3.5 border border-[#e12d5b] flex items-center justify-center p-0.5">
                                <span className="w-1.5 h-1.5 bg-[#e12d5b] rounded-full"></span>
                              </span>
                            )}
                            {pref === 'Both' && (
                              <div className="flex gap-0.5">
                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                                <span className="w-1.5 h-1.5 bg-[#e12d5b] rounded-full"></span>
                              </div>
                            )}
                            {pref}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Amenities tags */}
                  <div className="pt-6 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Amenities tags</h3>
                    <p className="text-slate-500 text-xs mb-4">Select the amenities that your outlet provides. These will display as icon chips in search cards.</p>
                    
                    <div className="flex flex-wrap gap-2.5">
                      {['WiFi', 'Parking', 'AC', 'Bar', 'Rooftop Seating', 'Live Music', 'Valet Parking', 'Wheelchair Accessible', 'Pet Friendly', 'Smoking Area', 'Kids Play Area', 'Cards Accepted'].map((amenity) => {
                        const isSelected = form.amenities.includes(amenity);
                        return (
                          <button
                            key={amenity}
                            type="button"
                            onClick={() => handleAmenityToggle(amenity)}
                            disabled={!isEditing}
                            className={`px-4 py-2 text-xs font-bold rounded-xl border flex items-center gap-2 cursor-pointer transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
                              isSelected
                                ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm shadow-orange-500/5'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                            }`}
                          >
                            {renderAmenityIcon(amenity)}
                            {amenity}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Card Taglines</h3>
                      <p className="text-slate-500 text-xs mb-4">Highlight special messages on your listing card.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <label className={labelCls}>Primary Tagline</label>
                        <input name="tagline" value={form.tagline} onChange={handleChange} className={inputCls} placeholder="e.g. Legendary Hyderabadi Dum Biryani since 1953" disabled={!isEditing} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelCls}>Secondary Tagline</label>
                        <input name="tagline2" value={form.tagline2 || ''} onChange={handleChange} className={inputCls} placeholder="e.g. Highly recommended for families and groups" disabled={!isEditing} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 space-y-6">
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Promotional Deals</h3>
                      <p className="text-slate-500 text-xs mb-4">Display striking tags and discount labels on your listing card.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Promo Offer Tagline</label>
                        <input name="promoTagline" value={form.promoTagline} onChange={handleChange} className={inputCls} placeholder="e.g. Flat 20% Off on First Dine-in" disabled={!isEditing} />
                      </div>
                      <div>
                        <label className={labelCls}>Listing Discount (%)</label>
                        <input type="number" name="discount" value={form.discount} onChange={handleChange} className={inputCls} placeholder="e.g. 20" disabled={!isEditing} />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className={labelCls}>Active Coupon Codes</label>
                      <form onSubmit={addCoupon} className="flex gap-2">
                        <input
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="e.g. FESTIVE50"
                          disabled={!isEditing}
                          className={`${inputCls} uppercase`}
                        />
                        <button
                          type="submit"
                          disabled={!isEditing}
                          className="px-5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors shrink-0 disabled:text-slate-400 disabled:cursor-not-allowed"
                        >
                          Add
                        </button>
                      </form>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {form.coupons.map((coupon, idx) => (
                          <div key={idx} className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                            <span>{coupon}</span>
                            {isEditing && (
                              <button
                                type="button"
                                onClick={() => removeCoupon(idx)}
                                className="text-emerald-500 hover:text-emerald-700 cursor-pointer focus:outline-none"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                        {form.coupons.length === 0 && (
                          <span className="text-slate-400 text-xs italic">No coupons added yet.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Media Uploads */}
              {activeTab === 'media' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Logo Upload */}
                    <div className="space-y-3">
                      <label className={labelCls}>Restaurant Logo</label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50">
                          {form.logo ? (
                            <div className="relative w-full h-full">
                              <img src={form.logo} alt="Logo Preview" className="w-full h-full object-cover" />
                              {isEditing && (
                                <button type="button" onClick={() => setForm(prev => ({...prev, logo: ''}))} className="absolute top-1 right-1 p-0.5 bg-black/60 hover:bg-red-500/90 text-white rounded transition-colors cursor-pointer opacity-100">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          {isEditing ? (
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" 
                              onChange={(e) => handleImageUpload(e, 'logo')} 
                            />
                          ) : (
                            <span className="text-[11px] text-slate-400 italic font-semibold">View Only</span>
                          )}
                          <p className="text-[10px] text-slate-400 mt-1">Recommended square dimension, PNG or JPG.</p>
                        </div>
                      </div>
                    </div>

                    {/* Main Photo Upload */}
                    <div className="space-y-3">
                      <label className={labelCls}>Main Photo</label>
                      <div className="flex items-center gap-4">
                        <div className="w-28 h-20 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50">
                          {form.coverPhoto ? (
                            <div className="relative w-full h-full">
                              <img src={form.coverPhoto} alt="Cover Preview" className="w-full h-full object-cover" />
                              {isEditing && (
                                <button type="button" onClick={() => setForm(prev => ({...prev, coverPhoto: ''}))} className="absolute top-1 right-1 p-0.5 bg-black/60 hover:bg-red-500/90 text-white rounded transition-colors cursor-pointer opacity-100">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          {isEditing ? (
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" 
                              onChange={(e) => handleImageUpload(e, 'coverPhoto')} 
                            />
                          ) : (
                            <span className="text-[11px] text-slate-400 italic font-semibold">View Only</span>
                          )}
                          <p className="text-[10px] text-slate-400 mt-1">Large featured image displayed as the main photo on your menu page.</p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Gallery Upload Grid */}
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <div>
                      <label className={labelCls}>Gallery Photos</label>
                      <p className="text-slate-500 text-xs mb-3">Upload multiple food, dining, or interior photos to showcase on your detailed menu view.</p>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                      {/* Previews */}
                      {form.gallery.map((img, idx) => (
                        <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-slate-100 group shadow-sm bg-slate-50">
                          <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(idx)}
                              className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-red-500/90 text-white rounded-lg transition-colors cursor-pointer opacity-100 shadow-sm"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          )}
                        </div>
                      ))}

                      {/* Upload Box */}
                      {isEditing ? (
                        <label className="aspect-video rounded-xl border-2 border-dashed border-slate-200 hover:border-orange-500 hover:bg-orange-50/5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all text-slate-400 hover:text-orange-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                          <span className="text-[10px] font-bold uppercase tracking-wider">Add Photo</span>
                          <input type="file" multiple accept="image/*" className="hidden" onChange={handleGalleryUpload} />
                        </label>
                      ) : (
                        <div className="aspect-video rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                          <span className="text-[10px] font-semibold text-slate-400 italic">No Actions</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Video Upload Section */}
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <label className={labelCls}>Promotional Video</label>
                    <p className="text-slate-500 text-xs mb-3">Upload a short promotional video (max 2.5MB) to highlight your restaurant interior, chef, or special dishes.</p>
                    
                    <div className="flex items-start gap-4">
                      {form.video ? (
                        <div className="relative w-64 aspect-video rounded-xl overflow-hidden border border-slate-200 bg-black flex-shrink-0 shadow-sm">
                          <video src={form.video} controls className="w-full h-full object-cover" />
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => setForm(prev => ({ ...prev, video: '' }))}
                              className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-red-500/90 text-white rounded-lg transition-colors cursor-pointer opacity-100 shadow-sm z-10"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="w-64 aspect-video rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 bg-slate-50 flex-shrink-0">
                          <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.625 19.5 6 18.75 6 18V6c0-.75-.375-1.5-1.125-1.5h-1.5M20.625 19.5h-1.5c-.75 0-1.125-.75-1.125-1.5V6c0-.75.375-1.5 1.125-1.5h1.5M12 18.75a6 6 0 100-12 6 6 0 000 12z" />
                          </svg>
                          <span className="text-[10px] font-bold text-slate-400">NO VIDEO UPLOADED</span>
                        </div>
                      )}
                      
                      <div className="flex-grow pt-2">
                        {isEditing ? (
                          <input 
                            type="file" 
                            accept="video/*" 
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" 
                            onChange={handleVideoUpload} 
                          />
                        ) : (
                          <span className="text-[11px] text-slate-400 italic font-semibold">View Only</span>
                        )}
                        <p className="text-[10px] text-slate-400 mt-2">Recommended landscape format, MP4 or WebM (Max size: 2.5MB).</p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
