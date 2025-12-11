import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';

const ProductosAdminPage = () => (
  <div className="card">
    <h2>Gestión de productos</h2>
    <Button>Nuevo producto</Button>
    <Table headers={["Nombre", "Precio", "Stock", ""]}>
      <tr>
        <td>Producto demo</td>
        <td>S/ 0.00</td>
        <td>0</td>
        <td>
          <Button variant="ghost">Editar</Button>
        </td>
      </tr>
    </Table>
  </div>
);

export default ProductosAdminPage;
