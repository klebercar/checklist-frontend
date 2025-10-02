import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Anexa automaticamente o JWT (se existir)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // ajuste se usar outro storage
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
