import { useState, useRef, useEffect, useContext } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
// import Homepage from './features/homepage/Homepage';
import RegisterForm from './features/auth-register/ui/RegisterForm';
import LoginForm from './features/auth-login/ui/LoginForm';
import { Context } from './main';
import LandingPage from './pages/home/Homepage';

function App() {
  const { userStore } = useContext(Context);

  const didRun = useRef(false);
  // useEffect(() => {
  //   userStore.checkAuth();
  // }, [])
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    // userStore.checkAuth();
  }, []);


  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )

}

export default App
