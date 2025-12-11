import { useQuery } from '@tanstack/react-query';
import { reclamosPorEstado, ventasPorCanal } from '../../api/reportesApi';
import Table from '../../components/ui/Table';
import Loader from '../../components/ui/Loader';

const ReportesAdminPage = () => {
  const { data: ventas, isLoading: loadingVentas } = useQuery({ queryKey: ['ventas-canal'], queryFn: ventasPorCanal });
  const { data: reclamos, isLoading: loadingReclamos } = useQuery({ queryKey: ['reclamos-reporte'], queryFn: reclamosPorEstado });

  if (loadingVentas || loadingReclamos) return <Loader />;

  return (
    <div className="card" style={{ display: 'grid', gap: 16 }}>
      <h2>Reportes</h2>
      <Table headers={["Canal", "Total"]}>
        {ventas?.map((item) => (
          <tr key={item.canal}>
            <td>{item.canal}</td>
            <td>S/ {item.total.toFixed(2)}</td>
          </tr>
        ))}
      </Table>
      <Table headers={["Estado reclamo", "Cantidad"]}>
        {reclamos?.map((item) => (
          <tr key={item.estado}>
            <td>{item.estado}</td>
            <td>{item.cantidad}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default ReportesAdminPage;
