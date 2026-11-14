import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import {
  FaShoppingBag,
  FaDollarSign,
  FaUtensils,
  FaStar,
  FaArrowUp,
  FaArrowDown,
  FaDownload,
  FaCalendarAlt,
  FaClock,
  FaFire,
  FaQrcode
} from 'react-icons/fa';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Revenue & Order Data over last 7 days
const revenueData = [
  { day: 'Mon', revenue: 1420, orders: 124 },
  { day: 'Tue', revenue: 1850, orders: 156 },
  { day: 'Wed', revenue: 1680, orders: 142 },
  { day: 'Thu', revenue: 2240, orders: 198 },
  { day: 'Fri', revenue: 2890, orders: 245 },
  { day: 'Sat', revenue: 3450, orders: 290 },
  { day: 'Sun', revenue: 3120, orders: 265 }
];

// Category Share Data
const categoryData = [
  { name: 'Main Course', value: 45, color: '#f97316' }, // orange-500
  { name: 'Beverages', value: 25, color: '#06b6d4' },   // cyan-500
  { name: 'Desserts', value: 18, color: '#8b5cf6' },    // violet-500
  { name: 'Starters', value: 12, color: '#10b981' }     // emerald-500
];

// Peak Hours Data
const peakHoursData = [
  { hour: '11 AM', orders: 28 },
  { hour: '1 PM', orders: 94 },
  { hour: '3 PM', orders: 36 },
  { hour: '5 PM', orders: 48 },
  { hour: '7 PM', orders: 112 },
  { hour: '9 PM', orders: 86 },
  { hour: '11 PM', orders: 32 }
];

// Recent Orders
const recentOrders = [
  { id: '#FQR-9041', table: 'Table 04', items: 'Truffle Burrata, Cold Brew', amount: '$42.50', status: 'Completed', time: '5m ago' },
  { id: '#FQR-9040', table: 'Table 12', items: 'Classic Burger, Fries, Cola', amount: '$24.00', status: 'In Kitchen', time: '12m ago' },
  { id: '#FQR-9039', table: 'Table 08', items: 'Salmon Risotto, Sparkling Water', amount: '$58.00', status: 'Completed', time: '25m ago' },
  { id: '#FQR-9038', table: 'Table 02', items: 'Chocolate Cake, Latte', amount: '$18.50', status: 'Pending', time: '34m ago' }
];

export default function Dashboard() {
  const [ownerName, setOwnerName] = useState('John');
  const [restaurantName, setRestaurantName] = useState('Restaurant');
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    const saved = localStorage.getItem('register_formData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.ownerName) setOwnerName(parsed.ownerName);
        if (parsed.outletDetails && parsed.outletDetails.kitchenName) {
          setRestaurantName(parsed.outletDetails.kitchenName);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const profileSaved = localStorage.getItem('admin_profile_data');
    if (profileSaved) {
      try {
        const parsedProfile = JSON.parse(profileSaved);
        if (parsedProfile.kitchenName) setRestaurantName(parsedProfile.kitchenName);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const stats = [
    {
      label: 'Total Orders',
      value: '1,248',
      change: '+12.5%',
      isUp: true,
      subtext: 'vs last week',
      icon: FaShoppingBag,
      color: 'orange'
    },
    {
      label: 'Total Revenue',
      value: '$12,400',
      change: '+8.2%',
      isUp: true,
      subtext: 'vs last week',
      icon: FaDollarSign,
      color: 'emerald'
    },
    {
      label: 'Active Menus',
      value: '4',
      change: '100% Live',
      isUp: true,
      subtext: 'Template 1 active',
      icon: FaUtensils,
      color: 'cyan'
    },
    {
      label: 'Customer Reviews',
      value: '452',
      change: '4.8 ★',
      isUp: true,
      subtext: '94% positive',
      icon: FaStar,
      color: 'amber'
    }
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans text-slate-800">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm">
          <div>
            <span className="text-[11px] font-extrabold text-orange-500 uppercase tracking-widest block mb-1">
              Admin Overview
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {restaurantName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Welcome back, <span className="font-semibold text-slate-700">{ownerName}</span>! Here is your dining performance summary.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Time Filter */}
            <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeRange === '7d' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeRange === '30d' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                30 Days
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              <FaDownload className="text-xs" />
              Download Report
            </button>
          </div>
        </div>

        {/* Metrics Grid: 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Top row: Label & Icon */}
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider truncate">
                    {stat.label}
                  </span>
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      stat.color === 'orange'
                        ? 'bg-orange-50 text-orange-500'
                        : stat.color === 'emerald'
                        ? 'bg-emerald-50 text-emerald-500'
                        : stat.color === 'cyan'
                        ? 'bg-cyan-50 text-cyan-500'
                        : 'bg-amber-50 text-amber-500'
                    }`}
                  >
                    <Icon className="text-sm sm:text-base" />
                  </div>
                </div>

                {/* Middle: Big Metric */}
                <div className="my-1">
                  <span className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight block">
                    {stat.value}
                  </span>
                </div>

                {/* Bottom: Change Badge & Subtext */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-[10px] sm:text-xs">
                  <span
                    className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-extrabold ${
                      stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {stat.isUp ? <FaArrowUp className="text-[8px]" /> : <FaArrowDown className="text-[8px]" />}
                    {stat.change}
                  </span>
                  <span className="text-slate-400 font-medium truncate">
                    {stat.subtext}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Area Chart: Revenue & Orders (2 Cols on Desktop) */}
          <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Revenue & Orders Trend
                </h2>
                <p className="text-xs text-slate-400">
                  Daily incoming revenue and order volumes
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span className="text-slate-600">Revenue ($)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span className="text-slate-600">Orders</span>
                </div>
              </div>
            </div>

            <div className="w-full h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '12px',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
                    }}
                    itemStyle={{ color: '#ffffff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f97316"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    name="Revenue ($)"
                  />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorOrders)"
                    name="Orders"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart: Sales by Category (1 Col on Desktop) */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Menu Category Sales
              </h2>
              <p className="text-xs text-slate-400">
                Distribution across dish categories
              </p>
            </div>

            <div className="w-full h-56 sm:h-64 my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Share']}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '12px',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Legend list */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-slate-600 font-medium truncate">{cat.name}</span>
                  <span className="font-bold text-slate-900 ml-auto">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row: Peak Dining Hours & Recent Live Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Peak Hours Bar Chart */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Peak Dining Hours
                </h2>
                <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">
                  Rush Hours
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Hourly table order volume
              </p>
            </div>

            <div className="w-full h-56 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHoursData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '12px',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="orders" fill="#f97316" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Live Orders Table (2 cols on desktop) */}
          <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Recent Table Orders
                </h2>
                <p className="text-xs text-slate-400">
                  Live orders submitted from QR menus
                </p>
              </div>
              <a
                href="/admin/orders"
                className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                View All Orders →
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Order</th>
                    <th className="pb-3 font-semibold">Table</th>
                    <th className="pb-3 font-semibold hidden sm:table-cell">Dishes</th>
                    <th className="pb-3 font-semibold">Amount</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 font-extrabold text-slate-900">
                        {order.id}
                        <span className="block text-[10px] font-normal text-slate-400 sm:hidden">
                          {order.time}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-slate-700">
                        {order.table}
                      </td>
                      <td className="py-3 text-slate-500 hidden sm:table-cell truncate max-w-[200px]">
                        {order.items}
                      </td>
                      <td className="py-3 font-bold text-slate-900">
                        {order.amount}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold ${
                            order.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-600'
                              : order.status === 'In Kitchen'
                              ? 'bg-orange-50 text-orange-600'
                              : 'bg-amber-50 text-amber-600'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
