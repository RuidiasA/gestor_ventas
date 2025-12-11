import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { obtenerPedido } from '../../api/pedidosApi';
import Loader from '../../components/ui/Loader';
import OrderTimeline from '../../components/ecommerce/OrderTimeline';

const PedidoDetalleVendedorPage = () => {
  const { id } = useParams();
  const pedidoId = Number(id);
  const { data, isLoading } = useQuery({
    queryKey: ['pedido', pedidoId],
    queryFn: () => obtenerPedido(pedidoId),
    enabled: !!pedidoId
  });

  if (isLoading || !data) return <Loader />;

  return (
    <div className="card">
      <h2>Pedido {data.codigo}</h2>
      <OrderTimeline estado={data.estado} />
      <p>Total: S/ {data.total.toFixed(2)}</p>
      <p>Entrega: {data.tipoEntrega}</p>
    </div>
  );
};

export default PedidoDetalleVendedorPage;
