import Badge from '../ui/Badge';
import { EstadoPedido } from '../../core/types/pedido';

const getTone = (estado: EstadoPedido) => {
  switch (estado) {
    case 'PAGADO':
    case 'ENTREGADO':
      return 'success';
    case 'PREPARADO':
      return 'warning';
    case 'DESPACHADO':
      return 'info';
    default:
      return 'info';
  }
};

const OrderStatusBadge = ({ estado }: { estado: EstadoPedido }) => (
  <Badge label={estado} tone={getTone(estado)} />
);

export default OrderStatusBadge;
