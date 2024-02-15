import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [logged, isLogged] = useState(false)

  return (
    <div>
      <Routes>
        <Route path="/" element={logged ? <Welcome /> : <Welcome />} />
      </ Routes>
    </ div>
  )
}

export default App
