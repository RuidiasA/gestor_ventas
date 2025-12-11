import api from '../core/config/axiosConfig';
import { Pedido } from '../core/types/pedido';

export const crearPedido = async (payload: Partial<Pedido>): Promise<Pedido> => {
  const response = await api.post<Pedido>('/pedidos', payload);
  return response.data;
};

export const listarPedidosCliente = async (): Promise<Pedido[]> => {
  const response = await api.get<Pedido[]>('/pedidos/mis');
  return response.data;
};

export const obtenerPedido = async (id: number): Promise<Pedido> => {
  const response = await api.get<Pedido>(`/pedidos/${id}`);
  return response.data;
};

export const listarPedidosVendedor = async (): Promise<Pedido[]> => {
  const response = await api.get<Pedido[]>('/pedidos/vendedor');
  return response.data;
};

export const actualizarEstadoPedido = async (id: number, estado: string) => {
  await api.patch(`/pedidos/${id}/estado`, { estado });
};
