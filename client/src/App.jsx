import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import {ToastContainer} from"react-toastify"
import PrivateComponent from './components/PrivateComponent'

const App = () => {
  return (
   
  <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateComponent />}>

        <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  )
}

export default App