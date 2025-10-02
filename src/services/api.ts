import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Lê o token direto do localStorage com try/catch para não quebrar SSR/privacidade
function readToken(): string | null {
  try {
    return localStorage.getItem('auth_token');
  } catch {
    return null;
  }
}

const api = axios.create({
  baseURL,
  withCredentials: false, // JWT via Authorization header (Bearer)
});

// Anexa Authorization: Bearer <token> quando existir
api.interceptors.request.use((config) => {
  const token = readToken();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export { api };
export default api;
