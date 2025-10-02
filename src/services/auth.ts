import api from './api';

type LoginPayload = { email: string; password: string };

// Ajuste o body conforme o backend espera:
// Aqui mapeamos email -> username para compatibilizar.
export async function login({ email, password }: LoginPayload) {
  const body = { username: email, password };
  const { data } = await api.post('/auth/login', body);

  const token: string =
    data?.accessToken ?? data?.token ?? data?.jwt ?? '';

  if (!token || typeof token !== 'string') {
    throw new Error('Token ausente na resposta do login');
  }
  localStorage.setItem('token', token);
  return token;
}

export function logout() {
  localStorage.removeItem('token');
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
