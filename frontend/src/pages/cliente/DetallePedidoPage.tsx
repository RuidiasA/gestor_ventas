import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { obtenerPedido } from '../../api/pedidosApi';
import Loader from '../../components/ui/Loader';
import OrderTimeline from '../../components/ecommerce/OrderTimeline';

const DetallePedidoPage = () => {
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
      <p>Fecha: {new Date(data.fechaRegistro).toLocaleString()}</p>
      <OrderTimeline estado={data.estado} />
      <h3>Productos</h3>
      <ul>
        {data.detalles.map((detalle) => (
          <li key={detalle.id}>
            {detalle.producto.nombre} x{detalle.cantidad} - S/ {detalle.precioUnitario}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetallePedidoPage;
