import { apiGet, apiPost, apiPut } from '../utils/httpClient.js';

export const pedidosApi = {
  list: (query = '') => apiGet(`/pedidos${query}`),
  detail: (id) => apiGet(`/pedidos/${id}`),
  create: (payload) => apiPost('/pedidos', payload),
  updateEstado: (id, estado) => apiPut(`/pedidos/${id}/estado`, { estado }),
  marcarRetirado: (id, codigo) => apiPut(`/pedidos/${id}/retiro`, { codigo }),
};
