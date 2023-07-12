import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Order from './pages/Order'
import Vendors from './pages/Vendors'
import VendorDetails from './pages/VendorDetails'
import Search from './components/Search'
import Navbar from './components/Navbar'
import NewVendor from './pages/NewVendor'

const App = () => {
  return (
    <div className="App">
      <header className="top-bar">
        <Search />
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/new" element={<NewVendor />} />
          <Route path="/vendors/:id" element={<VendorDetails />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
