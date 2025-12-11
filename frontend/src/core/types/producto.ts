export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  marca?: string;
  precio: number;
  stock: number;
  imagenUrl?: string;
  enPromocion?: boolean;
}
