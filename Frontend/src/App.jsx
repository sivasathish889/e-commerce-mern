import React, { useState } from 'react'
import Login from './components/Login/Login'
import { Route,Routes, BrowserRouter } from "react-router-dom"
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Verify from './components/Verify/Verify'
import NavBar from './components/Inc/Nav/NavBar'
import Profile from './components/Profile/Profile'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/login' element= {<Login/>} />
        <Route path='/register' element= {<Register/>} />
        <Route path='/register/verify' element= {<Verify />} />
        <Route path='/profile' element= {<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App