import React from 'react'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth'
import { Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'
import UserProfile from './pages/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'
import Vocabulary from './pages/Vocabulary'
import { LanguageSelector } from './components/LanguageSelector'



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<ProtectedRoute> <UserProfile /> </ProtectedRoute>} />
        <Route path="/vocabulary" element={<ProtectedRoute> <Vocabulary /> </ProtectedRoute>} />
        <Route path="/select-languagues" element={<ProtectedRoute> <LanguageSelector /> </ProtectedRoute>} />
      </Routes>
      
      <Toaster />
    </>
  )
}

export default App