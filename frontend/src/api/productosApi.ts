import api from '../core/config/axiosConfig';
import { Producto } from '../core/types/producto';

export interface ProductoFiltro {
  categoria?: string;
  marca?: string;
  minPrecio?: number;
  maxPrecio?: number;
  orden?: 'asc' | 'desc';
  page?: number;
  size?: number;
}

export interface PaginatedProductos {
  content: Producto[];
  total: number;
}

export const obtenerProductos = async (filtro: ProductoFiltro): Promise<PaginatedProductos> => {
  const response = await api.get<PaginatedProductos>('/productos', { params: filtro });
  return response.data;
};

export const obtenerProducto = async (id: number): Promise<Producto> => {
  const response = await api.get<Producto>(`/productos/${id}`);
  return response.data;
};

export const crearProducto = async (producto: Partial<Producto>): Promise<Producto> => {
  const response = await api.post<Producto>('/productos', producto);
  return response.data;
};

export const actualizarProducto = async (id: number, producto: Partial<Producto>): Promise<Producto> => {
  const response = await api.put<Producto>(`/productos/${id}`, producto);
  return response.data;
};

export const eliminarProducto = async (id: number) => {
  await api.delete(`/productos/${id}`);
};
