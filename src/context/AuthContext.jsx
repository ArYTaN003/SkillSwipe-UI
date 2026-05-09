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
      // Decode user id from JWT payload to fetch full profile
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Find user by searching email (backend returns user on register; login only returns token)
      const results = await userService.search(email.split('@')[0]);
      // Try to find exact match by email in results, fallback to first result
      let profile = results.find((u) => u.userEmail === email) || results[0];
      if (!profile) profile = { userEmail: email };
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
