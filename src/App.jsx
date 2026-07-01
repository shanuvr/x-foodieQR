import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/user/Home'
import DetailedView from './pages/user/DetailedView'
import About from './pages/user/About'
import Contact from './pages/user/Contact'
import Cart from './pages/user/Cart'
import Favorites from './pages/user/Favorites'
import MyOrders from './pages/user/MyOrders'
import Register from './pages/user/register/Register'
import Packages from './pages/user/register/Packages'
import Outlet from './pages/user/register/Outlet'
import OutletDetails from './pages/user/register/OutletDetails'
import Payment from './pages/user/register/Payment'
import UserLogin from './pages/user/Login'
import UserSignUp from './pages/user/SignUp'
import AdminLogin from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Orders from './pages/admin/Oders'
import AddCategory from './pages/admin/AddCategory'
import AddMenu from './pages/admin/AddMenu'
import Upload from './pages/admin/Upload'
import QrCentre from './pages/admin/QrCentre'
import Reviews from './pages/admin/Reviews'
import Settings from './pages/admin/Settings'
import Template from './pages/admin/Template'
import Profile from './pages/admin/Profile'
import MyPlan from './pages/admin/MyPlan'
import Upgrade from './pages/admin/Upgrade'

// Super Admin Pages
import SuperAdminLogin from './pages/superAdmin/Login'
import SuperAdminDashboard from './pages/superAdmin/superAdminDashboard'
import SuperAdminRestaurants from './pages/superAdmin/superAdminRetaurants'
import SuperAdminUsers from './pages/superAdmin/superAdminUsers'
import SuperAdminPayments from './pages/superAdmin/superAdminPayments'
import SuperAdminPackages from './pages/superAdmin/superAdminPackages'
import SuperAdminOutletTypes from './pages/superAdmin/superAdminOutletTypes'
import SuperAdminAnalytics from './pages/superAdmin/superAdminAnalytics'
import SuperAdminReports from './pages/superAdmin/superAdminReports'
import SuperAdminSettings from './pages/superAdmin/superAdminSettings'
import TestTemplate1 from './MenuTemplates/testTemplate1/TestTemplate1'
import TestTemplate2 from './MenuTemplates/testTemplate2/TestTemplate2'
import TestTemplate3 from './MenuTemplates/testTemplate3/TestTemplate3'
import TestTemplate4 from './MenuTemplates/testTemplate4/TestTemplate4'
import TestTemplate5 from './MenuTemplates/testTemplate5/TestTemplate5'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurant/:id" element={<DetailedView />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/register" element={<Register />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/outlet" element={<Outlet />} />
      <Route path="/outlet-details" element={<OutletDetails />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/menu/category" element={<AddCategory />} />
      <Route path="/admin/menu/add" element={<AddMenu />} />
      <Route path="/admin/menu/upload" element={<Upload />} />
      <Route path="/admin/qr" element={<QrCentre />} />
      <Route path="/admin/templates" element={<Template />} />
      <Route path="/admin/reviews" element={<Reviews />} />
      <Route path="/admin/settings" element={<Settings />} />
      <Route path="/admin/profile" element={<Profile />} />
      <Route path="/admin/my-plan" element={<MyPlan />} />
      <Route path="/admin/upgrade" element={<Upgrade />} />

      {/* Super Admin Routes */}
      <Route path="/super-admin/login" element={<SuperAdminLogin />} />
      <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
      <Route path="/super-admin/restaurants" element={<SuperAdminRestaurants />} />
      <Route path="/super-admin/users" element={<SuperAdminUsers />} />
      <Route path="/super-admin/payments" element={<SuperAdminPayments />} />
      <Route path="/super-admin/packages" element={<SuperAdminPackages />} />
      <Route path="/super-admin/outlet-types" element={<SuperAdminOutletTypes />} />
      <Route path="/super-admin/analytics" element={<SuperAdminAnalytics />} />
      <Route path="/super-admin/reports" element={<SuperAdminReports />} />
      <Route path="/super-admin/settings" element={<SuperAdminSettings />} />

      {/* Menu Templates Routes */}
      <Route path="/test-template-1" element={<TestTemplate1 />} />
      <Route path="/test-template-2" element={<TestTemplate2 />} />
      <Route path="/test-template-3" element={<TestTemplate3 />} />
      <Route path="/test-template-4" element={<TestTemplate4 />} />
      <Route path="/test-template-5" element={<TestTemplate5 />} />
      </Routes>
    </>
  )
}

export default App
