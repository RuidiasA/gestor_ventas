import { useQuery } from '@tanstack/react-query';
import { listarReclamosCliente } from '../../api/reclamosApi';
import Loader from '../../components/ui/Loader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { Link } from 'react-router-dom';

const ReclamosPage = () => {
  const { data, isLoading } = useQuery({ queryKey: ['reclamos-cliente'], queryFn: listarReclamosCliente });

  if (isLoading) return <Loader />;

  return (
    <div className="card">
      <h2>Mis reclamos</h2>
      <Link to="/reclamos/crear">Crear reclamo</Link>
      <Table headers={["Pedido", "Motivo", "Estado", "Fecha"]}>
        {data?.map((reclamo) => (
          <tr key={reclamo.id}>
            <td>{reclamo.pedido.codigo}</td>
            <td>{reclamo.motivo}</td>
            <td>
              <Badge label={reclamo.estado} tone={reclamo.estado === 'RESUELTO' ? 'success' : 'warning'} />
            </td>
            <td>{new Date(reclamo.fecha).toLocaleDateString()}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default ReclamosPage;
