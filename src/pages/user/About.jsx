import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { value: '5,000+', label: 'Active Restaurants' },
    { value: '2.5M+', label: 'Monthly Orders' },
    { value: '99.99%', label: 'Platform Uptime' },
    { value: '4.8★', label: 'App Store Rating' },
  ];

  const features = [
    {
      emoji: '📱',
      title: 'Smart QR Menus',
      desc: 'Say goodbye to paper menus. Customers scan, browse a media-rich digital menu, filter preferences, and order instantly.',
    },
    {
      emoji: '⚡',
      title: 'Real-time Controls',
      desc: 'Update menu prices, disable out-of-stock items, or highlight daily specials in real-time from the admin dashboard.',
    },
    {
      emoji: '📅',
      title: 'Seamless Bookings',
      desc: 'Enable instant table reservations and guest management with zero booking fees for your customers.',
    },
  ];

  return (
    <UserLayout>
      <div className="font-sans text-gray-800 bg-[#fcfcfd]">
        
        {/* Hero Section */}
        <section className="relative bg-[#0d1527] py-20 sm:py-28 overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />
          
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <span className="text-orange-500 text-xs sm:text-sm font-extrabold uppercase tracking-widest bg-orange-500/10 px-4 py-1.5 rounded-full">
              Our Vision
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-6 leading-tight tracking-tight">
              Revolutionizing Dining<br />
              <span className="text-orange-500">One Scan At A Time</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
              FoodieQR connects food lovers with premium dining experiences through smart, beautiful digital menus and frictionless table ordering.
            </p>
          </div>
        </section>

        {/* Brand Mission & Showcase */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story/Text */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Empowering Restaurants. Delightful Experiences.
              </h2>
              <div className="w-16 h-1.5 bg-orange-500 rounded-full" />
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Founded in 2024, FoodieQR was built on a simple promise: dining out should be seamless. We noticed how physical paper menus, busy waitstaff, and manual orders often slow down the culinary experience. 
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Our platform equips restaurateurs with beautiful, interactive web menus, lightning-fast order synchronization, and detailed analytics. For guests, we provide an intuitive web portal to explore food galleries, read verified ratings, and book a table beforehand.
              </p>
            </div>

            {/* Visual Showcase (Using local restaurant interior image) */}
            <div className="lg:col-span-6 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl aspect-[4/3] bg-gray-100">
                <img
                  src="/restaurant-interior.jpg"
                  alt="Premium Restaurant Dining"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-white border-y border-gray-100 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose FoodieQR / Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center overflow-hidden">
          <span className="text-orange-500 text-xs sm:text-sm font-extrabold uppercase tracking-widest">
            Core Benefits
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-12">
            Why Restaurants Love FoodieQR
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-left px-2 sm:px-4 md:px-0">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`bg-white p-4 sm:p-8 rounded-2xl border border-gray-200 hover:border-orange-300 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between ${
                  idx === 2 ? 'col-span-2 md:col-span-1 mx-auto w-full max-w-[calc(50%-8px)] md:max-w-none md:mx-0' : ''
                }`}
              >
                <div>
                  <div className="text-2xl sm:text-4xl mb-4 sm:mb-6 p-3 sm:p-4 bg-orange-50 group-hover:bg-orange-500 group-hover:text-white rounded-xl w-fit transition-all duration-300">
                    {feature.emoji}
                  </div>
                  <h3 className="text-sm sm:text-xl font-extrabold text-gray-900 mb-2 sm:mb-3 group-hover:text-orange-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-[11px] sm:text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
                <div className="mt-4 sm:mt-6 flex items-center gap-1.5 text-xs font-bold text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  Learn more <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partner CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-orange-950 p-8 sm:p-16 overflow-hidden shadow-2xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 blur-3xl pointer-events-none rounded-full" />
            
            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Ready to digitize your restaurant?
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mt-3 leading-relaxed">
                Join thousands of premium outlets and start delivering interactive dining experiences within 15 minutes.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3.5 border-0 rounded-xl text-sm font-extrabold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
              >
                Get Started Free →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </UserLayout>
  );
}
