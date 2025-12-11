export type Rol = 'CLIENTE' | 'VENDEDOR' | 'ADMINISTRADOR' | 'SOPORTE';

export interface AuthUser {
  id: number;
  nombre: string;
  email: string;
  rol: Rol;
}

export interface AuthResponse {
  token: string;
  usuario: AuthUser;
}

export interface LoginPayload {
  username: string;
  password: string;
}
