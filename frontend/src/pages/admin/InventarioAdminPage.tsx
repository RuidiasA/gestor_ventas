import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';

const InventarioAdminPage = () => (
  <div className="card">
    <h2>Inventario</h2>
    <Table headers={["Producto", "Stock", "Acción"]}>
      <tr>
        <td>Producto demo</td>
        <td>10</td>
        <td>
          <Button variant="ghost">Ajustar</Button>
        </td>
      </tr>
    </Table>
  </div>
);

export default InventarioAdminPage;
