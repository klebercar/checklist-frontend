import { api, setAuth, type AuthData } from "../lib/api";

type LoginPayload = { email: string; password: string };

type LoginResponse =
  | { accessToken: string; tokenType?: string }
  // ajuste se seu backend retornar { token, type }
  | { token: string; type?: string };

// Ajuste esta rota para a de login real do seu backend
const LOGIN_URL = "/auth/login";

export async function login(payload: LoginPayload) {
  const { data } = await api.post<LoginResponse>(LOGIN_URL, payload);

  // normaliza para { accessToken, tokenType }
  const normalized: AuthData =
    "accessToken" in data
      ? { accessToken: data.accessToken, tokenType: data.tokenType }
      : { accessToken: (data as any).token, tokenType: (data as any).type };

  setAuth(normalized);
  return normalized;
}

export function logout() {
  setAuth(null);
}
