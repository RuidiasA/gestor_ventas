import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { listarPedidosCliente } from '../../api/pedidosApi';
import Table from '../../components/ui/Table';
import OrderStatusBadge from '../../components/ecommerce/OrderStatusBadge';
import Loader from '../../components/ui/Loader';

const MisPedidosPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({ queryKey: ['mis-pedidos'], queryFn: listarPedidosCliente });

  if (isLoading) return <Loader />;

  return (
    <div className="card">
      <h2>Mis pedidos</h2>
      <Table headers={["Código", "Fecha", "Total", "Estado", "Entrega", ""]}>
        {data?.map((pedido) => (
          <tr key={pedido.id}>
            <td>{pedido.codigo}</td>
            <td>{new Date(pedido.fechaRegistro).toLocaleDateString()}</td>
            <td>S/ {pedido.total.toFixed(2)}</td>
            <td>
              <OrderStatusBadge estado={pedido.estado} />
            </td>
            <td>{pedido.tipoEntrega}</td>
            <td>
              <button onClick={() => navigate(`/mis-pedidos/${pedido.id}`)}>Ver</button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default MisPedidosPage;
