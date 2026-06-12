import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/user/Home'
import DetailedView from './pages/user/DetailedView'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurant/:id" element={<DetailedView />} />
    </Routes>
  )
}

export default App
