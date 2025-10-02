import axios from 'axios';
import { getToken } from '../utils/auth';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: false, // mantenha false se usa Bearer (JWT)
});

// Anexa Authorization: Bearer <token> a cada requisição
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
  (err) => Promise.reject(err)
);

// Exporta named e default para compatibilizar ambos os tipos de import
export { api };
export default api;
