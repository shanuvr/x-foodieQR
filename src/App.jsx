import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/user/Home'
import DetailedView from './pages/user/DetailedView'
import Register from './pages/user/register/Register'
import Packages from './pages/user/register/Packages'
import Outlet from './pages/user/register/Outlet'
import OutletDetails from './pages/user/register/OutletDetails'
import Payment from './pages/user/register/Payment'
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurant/:id" element={<DetailedView />} />
      <Route path="/register" element={<Register />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/outlet" element={<Outlet />} />
      <Route path="/outlet-details" element={<OutletDetails />} />
      <Route path="/payment" element={<Payment />} />
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
    </Routes>
  )
}

export default App
