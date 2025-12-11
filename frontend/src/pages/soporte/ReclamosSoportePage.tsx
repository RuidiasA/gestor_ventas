import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listarReclamos, actualizarEstadoReclamo } from '../../api/reclamosApi';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';

const ReclamosSoportePage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['reclamos'], queryFn: listarReclamos });
  const mutation = useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: string }) => actualizarEstadoReclamo(id, estado),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['reclamos'] })
  });

  if (isLoading) return <Loader />;

  return (
    <div className="card">
      <h2>Reclamos</h2>
      <Table headers={["Pedido", "Motivo", "Estado", ""]}>
        {data?.map((reclamo) => (
          <tr key={reclamo.id}>
            <td>{reclamo.pedido.codigo}</td>
            <td>{reclamo.motivo}</td>
            <td>
              <Badge label={reclamo.estado} tone={reclamo.estado === 'RESUELTO' ? 'success' : 'warning'} />
            </td>
            <td style={{ display: 'flex', gap: 8 }}>
              <Button onClick={() => mutation.mutate({ id: reclamo.id, estado: 'EN_REVISION' })} variant="ghost">
                Revisar
              </Button>
              <Button onClick={() => mutation.mutate({ id: reclamo.id, estado: 'RESUELTO' })} variant="primary">
                Resolver
              </Button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default ReclamosSoportePage;
