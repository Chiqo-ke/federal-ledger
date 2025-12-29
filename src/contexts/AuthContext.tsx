import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  office_name: string;
  wallet_address: string;
  role: 'super_admin' | 'ministry_admin' | 'ministry_officer' | 'citizen';
  ministry_id?: number;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isMinistryAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load auth data from localStorage on mount
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setAccessToken(token);
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setAccessToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setAccessToken(null);
    setUser(null);
    navigate('/login');
  };

  const value: AuthContextType = {
    user,
    accessToken,
    login,
    logout,
    isAuthenticated: !!accessToken && !!user,
    isSuperAdmin: user?.role === 'super_admin',
    isMinistryAdmin: user?.role === 'ministry_admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
