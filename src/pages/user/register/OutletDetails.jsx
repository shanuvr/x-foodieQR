import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import UserLayout from '../../../layouts/UserLayout';

// Fix Leaflet default marker icons broken by Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const businessTypes = ['LLC', 'Private Limited', 'Proprietor'];

const inputCls =
  'w-full bg-white border border-gray-200 rounded-lg px-3 py-2 sm:px-3.5 sm:py-2.5 text-sm text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/15 transition-all';
const labelCls = 'block text-xs font-semibold text-gray-500 mb-1.5';

function Field({ label, children }) {
  return (
    <div className="flex flex-col">
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="flex items-center gap-3 mb-3 sm:mb-4">
      <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">{title}</span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}

// Reverse geocode a lat/lon using Nominatim
async function reverseGeocode(lat, lon) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
    { headers: { 'Accept-Language': 'en' } }
  );
  const data = await res.json();
  const a = data.address || {};
  return {
    location:    a.neighbourhood || a.suburb || a.village || a.town || a.road || '',
    subLocation: a.road || a.hamlet || a.quarter || '',
    district:    a.district || a.county || a.state_district || a.city || '',
    state:       a.state || '',
    pincode:     a.postcode || '',
    country:     a.country || '',
    fullAddress: data.display_name || '',
  };
}

// Inner component that handles map click → moves marker
function MapClickHandler({ onMapClick }) {
  useMapEvents({ click: (e) => onMapClick(e.latlng.lat, e.latlng.lng) });
  return null;
}

// Fly map to new position when coords change from outside
function MapFlyTo({ lat, lng }) {
  const map = useMap();
  const prevRef = useRef(null);
  useEffect(() => {
    if (!lat || !lng) return;
    const key = `${lat},${lng}`;
    if (prevRef.current === key) return;
    prevRef.current = key;
    map.flyTo([parseFloat(lat), parseFloat(lng)], 16, { duration: 1.2 });
  }, [lat, lng, map]);
  return null;
}

export default function OutletDetails() {
  const navigate = useNavigate();
  const [locating, setLocating] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [form, setForm] = useState({
    kitchenName: '',
    businessType: '',
    location: '',
    subLocation: '',
    pincode: '',
    district: '',
    state: '',
    country: 'India',
    fullAddress: '',
    latitude: '',
    longitude: '',
    contactPerson: '',
    mobileNumber: '',
    gstNumber: '',
    foodLicenseNumber: '',
  });

  // Default map center — India
  const defaultCenter = [20.5937, 78.9629];
  const markerPos =
    form.latitude && form.longitude
      ? [parseFloat(form.latitude), parseFloat(form.longitude)]
      : null;

  useEffect(() => {
    const saved = localStorage.getItem('register_formData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.outletDetails) setForm((p) => ({ ...p, ...parsed.outletDetails }));
      } catch (e) {}
    }
  }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Apply reverse-geocoded data to form
  const applyGeocode = useCallback(async (lat, lon) => {
    setGeocoding(true);
    try {
      const geo = await reverseGeocode(lat, lon);
      setForm((p) => ({
        ...p,
        latitude:  String(lat),
        longitude: String(lon),
        ...geo,
      }));
    } catch {
      alert('Address lookup failed. Coordinates saved — please fill remaining fields manually.');
    } finally {
      setGeocoding(false);
    }
  }, []);

  // Use current GPS location
  const handleUseLocation = () => {
    if (!navigator.geolocation) { alert('Geolocation not supported.'); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lon = pos.coords.longitude.toFixed(6);
        setForm((p) => ({ ...p, latitude: lat, longitude: lon }));
        setLocating(false);
        applyGeocode(lat, lon);
      },
      () => {
        setLocating(false);
        alert('Location access denied. Enable permissions and try again.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Map click / marker drag → update form
  const handleMapPin = useCallback((lat, lon) => {
    const latStr = parseFloat(lat).toFixed(6);
    const lonStr = parseFloat(lon).toFixed(6);
    setForm((p) => ({ ...p, latitude: latStr, longitude: lonStr }));
    applyGeocode(latStr, lonStr);
  }, [applyGeocode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(localStorage.getItem('register_formData') || '{}');
      parsed.outletDetails = form;
      localStorage.setItem('register_formData', JSON.stringify(parsed));
    } catch (e) {}
    navigate('/payment');
  };

  const stepsList = [
    { number: 1, label: 'Your Details',   desc: 'Owner information',      completed: true },
    { number: 2, label: 'Select Package', desc: 'Choose pricing plan',    completed: true },
    { number: 3, label: 'Outlet Type',    desc: 'Category of restaurant', completed: true },
    { number: 4, label: 'Outlet Details', desc: 'Business information',   active: true    },
    { number: 5, label: 'Payment',        desc: 'Secure registration'                     },
  ];

  const renderMobileSteps = () => (
    <div className="md:hidden w-full bg-[#0d1527] px-4 py-5 border-b border-white/5 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-bold text-white">Foodie<span className="text-orange-500">QR</span></span>
      </div>
      <div className="flex items-center gap-1 w-full justify-center">
        {stepsList.map((step, idx) => (
          <React.Fragment key={step.number}>
            <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border-2 ${
              step.active    ? 'bg-orange-500 border-orange-500 text-white ring-2 ring-orange-500/20'
              : step.completed ? 'bg-green-600 border-green-600 text-white'
              : 'bg-slate-800 border-slate-700 text-gray-400'
            }`}>
              {step.completed ? '✓' : step.number}
            </div>
            {idx < stepsList.length - 1 && (
              <div className={`h-px flex-1 max-w-[20px] ${step.completed ? 'bg-green-600' : 'bg-slate-700'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center mt-2">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Step 4 of 5</p>
        <h4 className="text-white text-sm font-bold mt-0.5">Outlet Details</h4>
      </div>
    </div>
  );

  const renderDesktopSteps = () => (
    <div className="hidden md:flex md:col-span-3 flex-col bg-[#0d1527] px-8 py-10 relative overflow-hidden border-r border-white/5 select-none">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-500/8 to-transparent blur-3xl pointer-events-none rounded-full" />
      <Link className="flex items-center gap-2 mb-12 relative" to="/">
        <span className="text-2xl font-bold text-white">Foodie<span className="text-orange-500">QR</span></span>
        <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
        </svg>
      </Link>
      <div className="relative flex-grow flex flex-col justify-start space-y-7 pl-1">
        <div className="absolute left-[17px] top-3 bottom-4 w-px bg-slate-800 pointer-events-none z-0" />
        {stepsList.map((step) => {
          const isActive = step.active;
          const isDone   = step.completed;
          return (
            <div
              key={step.number}
              onClick={() => {
                if (isDone) {
                  const paths = { 1: '/register', 2: '/packages', 3: '/outlet' };
                  if (paths[step.number]) navigate(paths[step.number]);
                }
              }}
              className={`flex items-start gap-4 relative z-10 transition-all ${isDone ? 'cursor-pointer' : ''}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
                isActive ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                : isDone  ? 'bg-green-600 border-green-600 text-white'
                :           'bg-slate-900 border-slate-800 text-gray-500'
              }`}>
                {isDone ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : step.number}
              </div>
              <div className="py-0.5">
                <p className={`text-sm font-semibold ${isActive ? 'text-white' : isDone ? 'text-gray-300' : 'text-gray-500'}`}>
                  {step.label}
                </p>
                <p className={`text-xs mt-0.5 ${isActive ? 'text-orange-400' : 'text-gray-600'}`}>
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
        <div className="bg-white sm:rounded-2xl border-0 sm:border border-gray-200 sm:shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 md:h-[85vh]">
          {renderMobileSteps()}
          {renderDesktopSteps()}

          {/* ── Form Panel ── */}
          <div className="md:col-span-9 flex flex-col p-4 sm:p-7 md:p-9 overflow-y-auto">

            {/* Header */}
            <div className="mb-4 pb-4 sm:mb-6 sm:pb-5 border-b border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Cloud Registration</h2>
              <p className="text-sm text-gray-400 mt-1">Complete your business setup</p>
            </div>

            {/* Use Current Location button */}
            <button
              type="button"
              onClick={handleUseLocation}
              disabled={locating || geocoding}
              className="mb-5 sm:mb-7 inline-flex items-center gap-2 self-start px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {(locating || geocoding) ? (
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              )}
              {locating ? 'Detecting GPS…' : geocoding ? 'Looking up address…' : 'Use Current Location'}
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-7">

              {/* Business Information */}
              <div>
                <SectionTitle title="Business Information" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 sm:gap-y-4">
                  <Field label="Name">
                    <input name="kitchenName" value={form.kitchenName} onChange={handleChange}
                      className={inputCls} />
                  </Field>
                  <Field label="Business Type">
                    <select name="businessType" value={form.businessType} onChange={handleChange} className={inputCls}>
                      <option value="">Select type</option>
                      {businessTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                </div>
              </div>

              {/* Location Details */}
              <div>
                <SectionTitle title="Location Details" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 sm:gap-y-4">
                  <Field label="Location">
                    <input name="location" value={form.location} onChange={handleChange}
                      className={inputCls} />
                  </Field>
                  <Field label="Sub Location">
                    <input name="subLocation" value={form.subLocation} onChange={handleChange}
                      className={inputCls} />
                  </Field>
                  <Field label="Pincode">
                    <input name="pincode" value={form.pincode} onChange={handleChange}
                      className={inputCls} maxLength={6} />
                  </Field>
                  <Field label="District">
                    <input name="district" value={form.district} onChange={handleChange}
                      className={inputCls} />
                  </Field>
                  <Field label="State">
                    <input name="state" value={form.state} onChange={handleChange}
                      className={inputCls} />
                  </Field>
                  <Field label="Country">
                    <input name="country" value={form.country} onChange={handleChange}
                      className={inputCls} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Full Address">
                      <textarea name="fullAddress" value={form.fullAddress} onChange={handleChange}
                        className={`${inputCls} resize-none`} rows={2} />
                    </Field>
                  </div>
                  <Field label="Latitude">
                    <input name="latitude" value={form.latitude} onChange={handleChange}
                      className={inputCls} />
                  </Field>
                  <Field label="Longitude">
                    <input name="longitude" value={form.longitude} onChange={handleChange}
                      className={inputCls} />
                  </Field>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <SectionTitle title="Contact Information" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 sm:gap-y-4">
                  <Field label="Contact Person">
                    <input name="contactPerson" value={form.contactPerson} onChange={handleChange}
                      className={inputCls} />
                  </Field>
                  <Field label="Mobile Number">
                    <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange}
                      className={inputCls} maxLength={13} />
                  </Field>
                </div>
              </div>

              {/* Compliance */}
              <div>
                <SectionTitle title="Compliance & Licensing" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 sm:gap-y-4">
                  <Field label="GST Number">
                    <input name="gstNumber" value={form.gstNumber} onChange={handleChange}
                      className={inputCls} />
                  </Field>
                  <Field label="Food License Number">
                    <input name="foodLicenseNumber" value={form.foodLicenseNumber} onChange={handleChange}
                      className={inputCls} />
                  </Field>
                </div>
              </div>

              {/* ── Interactive Map ── */}
              <div>
                <SectionTitle title="Pin Your Location" />
                <p className="text-xs text-gray-500 mb-3">
                  Click anywhere on the map or drag the marker to set your exact location. All address fields will update automatically.
                  {geocoding && <span className="ml-2 text-orange-500 font-semibold">Updating address…</span>}
                </p>
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm h-64 sm:h-[340px]">
                  <MapContainer
                    center={defaultCenter}
                    zoom={5}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler onMapClick={handleMapPin} />
                    {/* Always mounted so it reacts immediately to GPS / map-click changes */}
                    <MapFlyTo lat={form.latitude} lng={form.longitude} />
                    {markerPos && (
                      <Marker
                        position={markerPos}
                        draggable={true}
                        eventHandlers={{
                          dragend: (e) => {
                            const { lat, lng } = e.target.getLatLng();
                            handleMapPin(lat, lng);
                          },
                        }}
                      />
                    )}
                  </MapContainer>
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5">Map data © OpenStreetMap contributors</p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate('/outlet')}
                  className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-all cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-bold transition-all cursor-pointer shadow-sm shadow-orange-500/20"
                >
                  Register
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
