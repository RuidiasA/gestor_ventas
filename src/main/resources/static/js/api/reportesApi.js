import { apiGet } from '../utils/httpClient.js';

export const reportesApi = {
  ventasPorFecha: () => apiGet('/reportes/ventas-fecha'),
  productosTop: () => apiGet('/reportes/productos-top'),
  reclamosAbiertos: () => apiGet('/reportes/reclamos-abiertos'),
};
