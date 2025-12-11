import api from '../core/config/axiosConfig';
import { ReporteRangoFechas, ReporteReclamos, ReporteVentasCanal } from '../core/types/reporte';

export const ventasPorCanal = async (): Promise<ReporteVentasCanal[]> => {
  const response = await api.get<ReporteVentasCanal[]>('/reportes/ventas-canal');
  return response.data;
};

export const ventasPorRango = async (inicio: string, fin: string): Promise<ReporteRangoFechas[]> => {
  const response = await api.get<ReporteRangoFechas[]>('/reportes/ventas-rango', {
    params: { inicio, fin }
  });
  return response.data;
};

export const reclamosPorEstado = async (): Promise<ReporteReclamos[]> => {
  const response = await api.get<ReporteReclamos[]>('/reportes/reclamos');
  return response.data;
};
