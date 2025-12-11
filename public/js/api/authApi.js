import { apiPost } from '../utils/httpClient.js';

export function login(credentials) {
  return apiPost('/auth/login', credentials);
}

export function register(payload) {
  return apiPost('/auth/register', payload);
}
