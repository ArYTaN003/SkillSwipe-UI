import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  async function login(email, password) {
    setLoading(true);
    try {
      await authService.login(email, password);
      const profile = await userService.getMe();
      authService.setCurrentUser(profile);
      setUser(profile);
      return profile;
    } finally {
      setLoading(false);
    }
  }

  async function register(userData) {
    setLoading(true);
    try {
      const profile = await authService.register(userData);
      authService.setCurrentUser(profile);
      setUser(profile);
      return profile;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  function refreshUser(updated) {
    authService.setCurrentUser(updated);
    setUser(updated);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
