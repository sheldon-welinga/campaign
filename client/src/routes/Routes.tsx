import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/logout' element={<Logout />} />
    </Routes>
  )
}

export default RoutesContainer
