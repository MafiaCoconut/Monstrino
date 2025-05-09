import { useState, useEffect, useContext } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './features/homepage/Homepage';
import RegisterForm from './modules/Auth/Register/RegisterForm';
import LoginForm from './modules/Auth/Login/LoginForm';
import { Context } from './main';

function App() {
    const {userStore} = useContext(Context);

    useEffect(() => {
      userStore.checkAuth();
    }, [])


  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )

}

export default App
