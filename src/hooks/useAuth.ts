import { useState } from "react";
import { login, logout } from "../services/auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Falha ao autenticar");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { signin, logout, loading, error };
}
