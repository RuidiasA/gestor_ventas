import { Pedido } from './pedido';

export type EstadoReclamo = 'PENDIENTE' | 'EN_REVISION' | 'RESUELTO';

export interface Reclamo {
  id: number;
  pedido: Pedido;
  motivo: string;
  descripcion: string;
  estado: EstadoReclamo;
  fecha: string;
}
