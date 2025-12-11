import api from '../core/config/axiosConfig';
import { Reclamo } from '../core/types/reclamo';

export const crearReclamo = async (payload: Partial<Reclamo>): Promise<Reclamo> => {
  const response = await api.post<Reclamo>('/reclamos', payload);
  return response.data;
};

export const listarReclamosCliente = async (): Promise<Reclamo[]> => {
  const response = await api.get<Reclamo[]>('/reclamos/mis');
  return response.data;
};

export const listarReclamos = async (): Promise<Reclamo[]> => {
  const response = await api.get<Reclamo[]>('/reclamos');
  return response.data;
};

export const actualizarEstadoReclamo = async (id: number, estado: string) => {
  await api.patch(`/reclamos/${id}`, { estado });
};
