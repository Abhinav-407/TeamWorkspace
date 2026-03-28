// src/api/axios.js
import axios from 'axios'

// Create a custom axios instance with the backend URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Interceptor — runs before EVERY request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api

