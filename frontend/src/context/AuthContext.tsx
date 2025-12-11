import { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest, profileRequest } from '../api/authApi';
import { AuthResponse, AuthUser, LoginPayload } from '../core/types/auth';

interface AuthContextState {
  user?: AuthUser;
  token?: string;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('gv_token');
    const storedUser = localStorage.getItem('gv_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (payload: LoginPayload) => {
    const response: AuthResponse = await loginRequest(payload);
    localStorage.setItem('gv_token', response.token);
    localStorage.setItem('gv_user', JSON.stringify(response.usuario));
    setToken(response.token);
    setUser(response.usuario);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('gv_token');
    localStorage.removeItem('gv_user');
    setToken(undefined);
    setUser(undefined);
    navigate('/login');
  };

  const refreshProfile = async () => {
    try {
      const profile = await profileRequest();
      setUser(profile);
      localStorage.setItem('gv_user', JSON.stringify(profile));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      void refreshProfile();
    }
  }, [token]);

  const value = useMemo(
    () => ({ user, token, loading, login, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
