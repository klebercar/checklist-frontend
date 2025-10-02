import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;
const AUTH_KEY = (import.meta.env.VITE_AUTH_STORAGE_KEY as string) || "checklist.auth";

export type AuthData = {
  accessToken: string;
  tokenType?: string; // ex: "Bearer"
};

function getAuth(): AuthData | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAuth(auth: AuthData | null) {
  if (auth) localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  else localStorage.removeItem(AUTH_KEY);
}

export function getAuthHeader() {
  const auth = getAuth();
  if (!auth?.accessToken) return undefined;
  const scheme = auth.tokenType ?? "Bearer";
  return `${scheme} ${auth.accessToken}`;
}

export const api = axios.create({
  baseURL,
  withCredentials: false,
});

// Anexa o Authorization automaticamente
api.interceptors.request.use((config) => {
  const token = getAuthHeader();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = token;
  }
  return config;
});

// Trata 401 globalmente (logout simples)
api.interceptors.response.use(
  (resp) => resp,
  (err) => {
    if (err?.response?.status === 401) {
      setAuth(null);
    }
    return Promise.reject(err);
  }
);
