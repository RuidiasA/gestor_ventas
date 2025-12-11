import { apiGet, apiPost, apiPut } from '../utils/httpClient.js';

export const reclamosApi = {
  list: (query = '') => apiGet(`/reclamos${query}`),
  detail: (id) => apiGet(`/reclamos/${id}`),
  create: (payload) => apiPost('/reclamos', payload),
  updateEstado: (id, estado) => apiPut(`/reclamos/${id}/estado`, { estado }),
};
