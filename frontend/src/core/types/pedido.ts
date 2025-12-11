import { Producto } from './producto';

export type EstadoPedido =
  | 'REGISTRADO'
  | 'PAGADO'
  | 'PREPARADO'
  | 'DESPACHADO'
  | 'ENTREGADO';

export interface DetallePedido {
  id: number;
  producto: Producto;
  cantidad: number;
  precioUnitario: number;
}

export interface Pedido {
  id: number;
  codigo: string;
  fechaRegistro: string;
  total: number;
  estado: EstadoPedido;
  tipoEntrega: 'ENVIO' | 'RETIRO';
  detalles: DetallePedido[];
  comprobanteUrl?: string;
}
