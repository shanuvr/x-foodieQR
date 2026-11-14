import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import {
  FaEye,
  FaCheck,
  FaExternalLinkAlt,
  FaMobileAlt,
  FaDesktop,
  FaPalette,
  FaStar,
  FaUtensils,
  FaLeaf,
  FaWineGlassAlt,
  FaCoffee,
  FaHamburger,
  FaTimes,
  FaQrcode,
  FaSearch,
  FaFire
} from 'react-icons/fa';
import { GiCupcake } from 'react-icons/gi';

const TEMPLATES = [
  {
    id: 'template-1',
    number: 1,
    name: 'Modern Minimalist Bistro',
    subtitle: 'Contemporary Dine-in & Cafe',
    route: '/test-template-1',
    category: 'bistro',
    categoryLabel: 'Bistro & Cafe',
    theme: 'Charcoal & Clean Gray',
    primaryColor: '#27272a',
    accentColor: '#71717a',
    bgColor: '#fafafa',
    badge: 'Clean Minimalist',
    heroImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=700&q=80',
    sampleItem: 'Artisan Chocolate Cake • ₹750',
    description: 'A refined minimalist layout with dark charcoal typography, glassmorphism item cards, preparation times, and recipe modals. Clean, elegant, and effortless for diners.',
    features: ['Dietary tags (Veg/Egg)', 'Recipe & ingredients modal', 'Prep time & serving size', 'Customer favorite likes', 'Fast mobile loading'],
    stats: { rating: '4.9', style: 'Minimal Light', target: 'Modern Cafes & Bistros' }
  },
  {
    id: 'template-2',
    number: 2,
    name: 'Bold Street Gourmet & Grill',
    subtitle: 'Burgers, Steaks & Street Food',
    route: '/test-template-2',
    category: 'grill',
    categoryLabel: 'Burgers & Grill',
    theme: 'Dark Street Food & Amber',
    primaryColor: '#f59e0b',
    accentColor: '#ef4444',
    bgColor: '#111827',
    badge: 'Bold & High Impact',
    heroImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    sampleItem: 'Classic Beef Burger • $10',
    description: 'High-energy dark mode theme with bold uppercase typography, fiery spice meters, social media handles, and vibrant visual dish highlights.',
    features: ['Dark mode with amber accents', 'Spice level indicators', 'Calories & preparation time', 'Social media shortcuts', 'Interactive recipe popup'],
    stats: { rating: '4.8', style: 'Dark Casual', target: 'Burger Bars & Smokehouse' }
  },
  {
    id: 'template-3',
    number: 3,
    name: 'Sweet Delights & Patisserie',
    subtitle: 'Bakery, Pastry & Artisan Coffee',
    route: '/test-template-3',
    category: 'bakery',
    categoryLabel: 'Bakery & Desserts',
    theme: 'Warm Amber & Espresso',
    primaryColor: '#d97706',
    accentColor: '#b45309',
    bgColor: '#fdfaf6',
    badge: 'Warm & Artisan',
    heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
    sampleItem: 'Artisan Chocolate Cake • ₹750',
    description: 'Warm, cozy aesthetic tailored for bakeries, dessert parlors, and artisan roasteries. Includes sweetness intensity meters and coffee/pastry pairings.',
    features: ['Sweetness intensity rating', 'Pastry & coffee pairings', 'Warm artisan color scheme', 'Serves & calories indicators', 'Heart favorite toggle'],
    stats: { rating: '4.9', style: 'Warm Pastel', target: 'Bakeries & Coffee Shops' }
  },
  {
    id: 'template-4',
    number: 4,
    name: 'Fresh Botanical & Organic Deli',
    subtitle: 'Salads, Bowls, Juices & Healthy Dining',
    route: '/test-template-4',
    category: 'healthy',
    categoryLabel: 'Healthy & Organic',
    theme: 'Botanical Green & Crisp White',
    primaryColor: '#16a34a',
    accentColor: '#22c55e',
    bgColor: '#f0fdf4',
    badge: 'Fresh & Vibrant',
    heroImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
    sampleItem: 'Eggs Benedict & Avocado • $5',
    description: 'Crisp and health-focused theme with emerald green tones, vegetarian/egg-free highlights, and clean ingredient transparency.',
    features: ['Dietary filters & badges', 'Calorie & macro counter', 'Quick horizontal category scroll', 'High-contrast clean layout', 'Recipe & step walkthrough'],
    stats: { rating: '4.7', style: 'Botanical Fresh', target: 'Salad & Health Bars' }
  },
  {
    id: 'template-5',
    number: 5,
    name: "Royal Amber Luxury Fine Dining",
    subtitle: "L'Élégance Gourmet & Lounge",
    route: '/test-template-5',
    category: 'luxury',
    categoryLabel: 'Fine Dining & Bar',
    theme: 'Noir Velvet & Gold Foil',
    primaryColor: '#f59e0b',
    accentColor: '#fbbf24',
    bgColor: '#09090b',
    badge: 'Prestige & Luxury',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',
    sampleItem: 'Blackforest Cake • ₹850',
    description: 'Ultra-luxurious dark backdrop with opulent gold accents, multi-course storytelling, chef recommendations, and wine/cocktail pairing suggestions.',
    features: ['Opulent dark & gold aesthetics', 'Course-by-course layout', 'Chef signature highlights', 'Beverage & cocktail curation', 'Sophisticated typography'],
    stats: { rating: '5.0', style: 'Luxury Noir', target: 'Fine Dining & Rooftops' }
  }
];

export default function Template() {
  const [activeTemplateId, setActiveTemplateId] = useState(() => {
    return localStorage.getItem('selected_menu_template') || 'template-1';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewModalTemplate, setPreviewModalTemplate] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('mobile'); // 'mobile' or 'desktop'
  const [toastMessage, setToastMessage] = useState(null);

  // Profile data for restaurant name
  const [restaurantName, setRestaurantName] = useState('Your Restaurant');

  useEffect(() => {
    const saved = localStorage.getItem('admin_profile_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.kitchenName) setRestaurantName(parsed.kitchenName);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleActivateTemplate = (tmpl) => {
    setActiveTemplateId(tmpl.id);
    localStorage.setItem('selected_menu_template', tmpl.id);
    setToastMessage(`"${tmpl.name}" is now your active digital menu template!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const activeTemplate = TEMPLATES.find((t) => t.id === activeTemplateId) || TEMPLATES[0];

  const filteredTemplates = TEMPLATES.filter((tmpl) => {
    const matchesCategory = selectedCategory === 'all' || tmpl.category === selectedCategory;
    const matchesSearch =
      tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-16 font-sans text-slate-800">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-emerald-600/30 font-semibold text-sm animate-bounce">
            <FaCheck className="text-white text-base" />
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-white/80 hover:text-white"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* Top Header Block */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200/70 rounded-full text-xs font-bold text-orange-600 uppercase tracking-wider">
              <FaPalette className="text-orange-500" />
              Menu Design & Templates
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Customer Menu Templates
            </h1>
            <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
              Select the interactive design layout that appears on diners' phones when they scan your QR code. Switch anytime — your dishes, prices, and categories stay intact.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/admin/qr"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold transition-all"
            >
              <FaQrcode className="text-slate-500" />
              QR Code Centre
            </Link>
            <button
              onClick={() => setPreviewModalTemplate(activeTemplate)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
            >
              <FaEye />
              Preview Active Menu
            </button>
          </div>
        </div>

        {/* Current Active Template Highlight Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/60">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Currently Live For Diners
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {restaurantName}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Template {activeTemplate.number}: {activeTemplate.name}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                {activeTemplate.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {activeTemplate.features.slice(0, 3).map((feat, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-semibold bg-white/10 text-slate-200 px-2.5 py-1 rounded-lg backdrop-blur-sm"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-3 shrink-0">
              <button
                onClick={() => setPreviewModalTemplate(activeTemplate)}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
              >
                <FaEye />
                Live Preview
              </button>
              <a
                href={activeTemplate.route}
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all border border-white/10 cursor-pointer"
              >
                <FaExternalLinkAlt className="text-xs" />
                Open New Tab
              </a>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Templates (5)' },
              { id: 'bistro', label: 'Bistro & Cafe', icon: FaCoffee },
              { id: 'grill', label: 'Burgers & Grill', icon: FaHamburger },
              { id: 'bakery', label: 'Bakery & Sweets', icon: GiCupcake },
              { id: 'healthy', label: 'Healthy & Organic', icon: FaLeaf },
              { id: 'luxury', label: 'Fine Dining', icon: FaWineGlassAlt }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {Icon && <Icon className="text-xs" />}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
            />
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((tmpl) => {
            const isActive = tmpl.id === activeTemplateId;
            return (
              <div
                key={tmpl.id}
                className={`group bg-white rounded-3xl border transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-xl ${
                  isActive
                    ? 'border-orange-500 ring-2 ring-orange-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Visual Preview Header */}
                <div className="relative h-56 bg-slate-900 overflow-hidden cursor-pointer" onClick={() => setPreviewModalTemplate(tmpl)}>
                  <img
                    src={tmpl.heroImage}
                    alt={tmpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white rounded-lg text-[11px] font-extrabold uppercase tracking-wider border border-white/10">
                      Template {tmpl.number}
                    </span>
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-slate-800 rounded-lg text-[11px] font-bold">
                      {tmpl.categoryLabel}
                    </span>
                  </div>

                  {/* Active Indicator Top Right */}
                  {isActive && (
                    <div className="absolute top-3.5 right-3.5 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/40">
                      <FaCheck className="text-[10px]" />
                      ACTIVE
                    </div>
                  )}

                  {/* Bottom Preview Overlay */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <div className="p-2.5 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 text-white flex items-center justify-between">
                      <div className="truncate">
                        <span className="text-[10px] text-slate-300 uppercase font-semibold block">Sample Item</span>
                        <span className="text-xs font-bold text-white truncate block">{tmpl.sampleItem}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold ml-2 shrink-0">
                        <FaStar />
                        <span>{tmpl.stats.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 bg-white text-slate-900 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <FaEye /> Quick View
                    </button>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-orange-600 transition-colors">
                        {tmpl.name}
                      </h3>
                    </div>
                    <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">
                      {tmpl.subtitle}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {tmpl.description}
                    </p>
                  </div>

                  {/* Theme Palette Swatches & Features */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-400">Theme Style:</span>
                      <span className="font-bold text-slate-700">{tmpl.theme}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-400">Best For:</span>
                      <span className="font-bold text-slate-700">{tmpl.stats.target}</span>
                    </div>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tmpl.features.slice(0, 3).map((feat, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-medium"
                        >
                          • {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 flex items-center gap-2">
                    <button
                      onClick={() => setPreviewModalTemplate(tmpl)}
                      className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FaEye /> Preview
                    </button>

                    {isActive ? (
                      <button
                        disabled
                        className="flex-1 py-2.5 px-3 bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-default"
                      >
                        <FaCheck /> Active
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivateTemplate(tmpl)}
                        className="flex-1 py-2.5 px-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 cursor-pointer"
                      >
                        Select Template
                      </button>
                    )}

                    <a
                      href={tmpl.route}
                      target="_blank"
                      rel="noreferrer"
                      title="Open full page in new tab"
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all cursor-pointer"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Preview Modal */}
        {previewModalTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-2 sm:p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
              
              {/* Modal Header Bar */}
              <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center font-extrabold text-white text-sm">
                    T{previewModalTemplate.number}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                      {previewModalTemplate.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Live interactive preview • Diners experience
                    </p>
                  </div>
                </div>

                {/* Device Frame Switcher */}
                <div className="hidden sm:flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewDevice === 'mobile'
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FaMobileAlt /> Mobile (390px)
                  </button>
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewDevice === 'desktop'
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FaDesktop /> Desktop / Tablet
                  </button>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center gap-2">
                  {previewModalTemplate.id !== activeTemplateId ? (
                    <button
                      onClick={() => handleActivateTemplate(previewModalTemplate)}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <FaCheck /> Set As Active
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-1 border border-emerald-500/30">
                      <FaCheck /> Active Menu
                    </span>
                  )}

                  <a
                    href={previewModalTemplate.route}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all cursor-pointer"
                    title="Open in new window"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                  </a>

                  <button
                    onClick={() => setPreviewModalTemplate(null)}
                    className="p-2 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer"
                    title="Close preview"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Modal Iframe Content Area */}
              <div className="flex-1 bg-slate-950 p-2 sm:p-6 flex items-center justify-center overflow-auto">
                <div
                  className={`transition-all duration-300 h-full flex flex-col items-center justify-center ${
                    previewDevice === 'mobile'
                      ? 'w-[390px] max-w-full rounded-[40px] shadow-2xl border-[10px] border-slate-800 bg-white overflow-hidden relative'
                      : 'w-full h-full rounded-2xl shadow-xl overflow-hidden bg-white border border-slate-800'
                  }`}
                >
                  {/* Mock Phone Notch on Mobile Frame */}
                  {previewDevice === 'mobile' && (
                    <div className="w-full bg-slate-900 py-1.5 px-6 flex items-center justify-between shrink-0 select-none">
                      <span className="text-[10px] font-bold text-slate-400">9:41</span>
                      <div className="w-20 h-4 bg-black rounded-full" />
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <span>5G</span>
                        <span>100%</span>
                      </div>
                    </div>
                  )}

                  {/* The Live Interactive Template */}
                  <iframe
                    src={previewModalTemplate.route}
                    title={previewModalTemplate.name}
                    className="w-full flex-1 border-0 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
