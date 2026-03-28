// src/hooks/useAuth.js
import { useState, useEffect } from 'react'
import api from '../api/axios'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Runs once on app load — fetches user if token exists
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me')
        setUser(response.data.data)
      } catch (err) {
        // Token is invalid or expired — clean up
        localStorage.removeItem('token')
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.post('/auth/login', { email, password })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      setUser(user)
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed'
      setError(message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.post('/auth/register', { name, email, password })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      setUser(user)
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed'
      setError(message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return { user, loading, error, login, register, logout }
}