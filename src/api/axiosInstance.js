// src/api/axiosInstance.js
import axios from 'axios';

// Create base axios instance
const axiosInstance = axios.create({
  baseURL: 'https://api.aureliaestates.internal/v1', // Mock endpoint
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem('aurelia_auth_user');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch (e) {
        // Ignore
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Graceful error logging
    console.warn('API Request failed (simulated backend):', error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
