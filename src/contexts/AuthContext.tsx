import React, { createContext, useContext, useMemo, useState } from 'react'
import { getToken, saveToken, clearToken, isAuthenticated as _isAuthenticated } from '../utils/auth'

type AuthContextType = {
  token: string | null
  isAuthenticated: boolean
  setAuthToken: (t: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(getToken())

  const setAuthToken = (t: string) => {
    saveToken(t)
    setTokenState(t)
  }

  const logout = () => {
    clearToken()
    setTokenState(null)
  }

  const value = useMemo<AuthContextType>(() => ({
    token,
    isAuthenticated: _isAuthenticated(),
    setAuthToken,
    logout
  }), [token])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
