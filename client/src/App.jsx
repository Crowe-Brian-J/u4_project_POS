import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './components/Search'
import Navbar from './components/Navbar'

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
        </Routes>
      </main>
    </div>
  )
}

export default App
