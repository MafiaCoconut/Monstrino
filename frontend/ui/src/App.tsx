import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './features/homepage/Homepage';
import RegisterForm from './modules/Auth/Register/RegisterForm';

function App() {

  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )

}

export default App
