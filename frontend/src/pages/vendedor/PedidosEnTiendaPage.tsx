import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listarPedidosVendedor, actualizarEstadoPedido } from '../../api/pedidosApi';
import Table from '../../components/ui/Table';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import OrderStatusBadge from '../../components/ecommerce/OrderStatusBadge';

const PedidosEnTiendaPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['pedidos-vendedor'], queryFn: listarPedidosVendedor });
  const mutation = useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: string }) => actualizarEstadoPedido(id, estado),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['pedidos-vendedor'] })
  });

  if (isLoading) return <Loader />;

  return (
    <div className="card">
      <h2>Pedidos en tienda</h2>
      <Table headers={["Código", "Entrega", "Estado", "Acciones"]}>
        {data?.map((pedido) => (
          <tr key={pedido.id}>
            <td>{pedido.codigo}</td>
            <td>{pedido.tipoEntrega}</td>
            <td>
              <OrderStatusBadge estado={pedido.estado} />
            </td>
            <td style={{ display: 'flex', gap: 8 }}>
              <Button
                variant="ghost"
                onClick={() => mutation.mutate({ id: pedido.id, estado: 'PREPARADO' })}
                disabled={pedido.estado !== 'PAGADO'}
              >
                Marcar preparado
              </Button>
              <Button
                variant="primary"
                onClick={() => mutation.mutate({ id: pedido.id, estado: 'ENTREGADO' })}
                disabled={pedido.estado !== 'DESPACHADO'}
              >
                Confirmar retiro
              </Button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default PedidosEnTiendaPage;
