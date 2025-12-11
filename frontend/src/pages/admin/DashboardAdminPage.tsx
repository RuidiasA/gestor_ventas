import Table from '../../components/ui/Table';

const DashboardAdminPage = () => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h2>Dashboard</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
      <div className="card">
        <p>Ventas del día</p>
        <h3>S/ 0.00</h3>
      </div>
      <div className="card">
        <p>Reclamos abiertos</p>
        <h3>0</h3>
      </div>
      <div className="card">
        <p>Top productos</p>
        <h3>--</h3>
      </div>
    </div>
    <Table headers={["Canal", "Total"]}>
      <tr>
        <td>Online</td>
        <td>S/ 0.00</td>
      </tr>
      <tr>
        <td>Tienda</td>
        <td>S/ 0.00</td>
      </tr>
    </Table>
  </div>
);

export default DashboardAdminPage;
