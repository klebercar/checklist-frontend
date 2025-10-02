import { createContext, useContext, useEffect, useState } from 'react';
import { login as loginFn, logout as logoutFn, isAuthenticated } from '../services/auth';

type AuthContextType = {
  authenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  async function login(email: string, password: string) {
    await loginFn({ email, password });
    setAuthenticated(true);
  }

  function logout() {
    logoutFn();
    setAuthenticated(false);
  }

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
