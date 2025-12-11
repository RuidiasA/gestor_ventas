import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';

const ProveedoresAdminPage = () => (
  <div className="card">
    <h2>Proveedores</h2>
    <Button>Agregar proveedor</Button>
    <Table headers={["Nombre", "Contacto", "Teléfono", ""]}>
      <tr>
        <td>Proveedor demo</td>
        <td>contacto@proveedor.com</td>
        <td>999999999</td>
        <td>
          <Button variant="ghost">Editar</Button>
        </td>
      </tr>
    </Table>
  </div>
);

export default ProveedoresAdminPage;
