import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(localStorage.getItem('username') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('username', user);
    else localStorage.removeItem('username');
  }, [user]);

  const register = async ({ username, password }) => {
    await api.post('/auth/register', { username, password });
    // optionally auto-login after register
    return true;
  };

  const login = async ({ username, password }) => {
    const res = await api.post('/auth/login', { username, password });
    // backend may return plain token string or { token: '...' }
    const tokenResp = res.data?.token || res.data;
    setToken(tokenResp);
    setUser(username);
    return tokenResp;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('cart'); // optional
  };

  const value = { token, user, login, logout, register, isAuthenticated: !!token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
