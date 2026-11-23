import { createContext, useContext, useState } from 'react';
import api from '../api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('shopnest_user')); } catch { return null; }
  });
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('shopnest_token', data.token);
    localStorage.setItem('shopnest_user', JSON.stringify(data.user));
    setUser(data.user);
  };
  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('shopnest_token', data.token);
    localStorage.setItem('shopnest_user', JSON.stringify(data.user));
    setUser(data.user);
  };
  const logout = () => {
    localStorage.removeItem('shopnest_token');
    localStorage.removeItem('shopnest_user');
    setUser(null);
  };
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}
