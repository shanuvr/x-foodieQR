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
    </Routes>
  )
}

export default App
