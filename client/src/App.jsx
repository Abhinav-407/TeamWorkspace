import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'


import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Board from './pages/Board'
import Chat from './pages/Chat'
import Calendar from './pages/Calendar'
import Analytics from './pages/Analytics'

export default function App() {
  return (
    <BrowserRouter
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
>
      <Routes>
        <Route 
          path="/" 
          element={
            localStorage.getItem('token') 
              ? <Navigate to="/dashboard" /> 
              : <Navigate to="/login" />
            } 
/>
        {/* Public Routes — anyone can visit */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes — must be logged in */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/board/:id" element={<Board />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}