import { apiGet, apiPost, apiPut, apiDelete } from '../utils/httpClient.js';

export const productosApi = {
  list: (params = '') => apiGet(`/productos${params}`),
  detail: (id) => apiGet(`/productos/${id}`),
  create: (payload) => apiPost('/productos', payload),
  update: (id, payload) => apiPut(`/productos/${id}`, payload),
  remove: (id) => apiDelete(`/productos/${id}`)
};
