import api from '../core/config/axiosConfig';
import { AuthResponse, LoginPayload } from '../core/types/auth';

export const loginRequest = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const profileRequest = async (): Promise<AuthResponse['usuario']> => {
  const response = await api.get<AuthResponse['usuario']>('/auth/profile');
  return response.data;
};
