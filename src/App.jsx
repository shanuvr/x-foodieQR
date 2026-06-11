import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/user/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Additional page routes can be added directly here */}
    </Routes>
  )
}

export default App
