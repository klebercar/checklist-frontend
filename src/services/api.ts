import axios from 'axios';
import { getToken } from '../utils/auth';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL,
  withCredentials: false, // manter false se você usa Bearer; true se precisar de cookies
});

// Anexa Authorization: Bearer <token> em todas as requisições
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

// Opcional: tratar erros globais
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // console.warn('API error:', err?.response || err);
    return Promise.reject(err);
  }
);
