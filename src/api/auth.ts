import { api } from './client';

type LoginRequest = { username: string; password: string };
type LoginResponse = { token: string };

export async function login(data: LoginRequest) {
  const res = await api.post<LoginResponse>('/auth/login', data);
  localStorage.setItem('token', res.data.token);
  return res.data;
}

export function logout() {
  localStorage.removeItem('token');
}

export async function me() {
  const res = await api.get('/users/me'); // ajuste se o seu endpoint for outro
  return res.data;
}
