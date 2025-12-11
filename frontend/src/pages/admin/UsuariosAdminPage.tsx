import Table from '../../components/ui/Table';
import Select from '../../components/ui/Select';

const UsuariosAdminPage = () => (
  <div className="card">
    <h2>Usuarios</h2>
    <Table headers={["Nombre", "Rol", "Estado"]}>
      <tr>
        <td>Usuario demo</td>
        <td>
          <Select defaultValue="CLIENTE">
            <option value="CLIENTE">Cliente</option>
            <option value="VENDEDOR">Vendedor</option>
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="SOPORTE">Soporte</option>
          </Select>
        </td>
        <td>Activo</td>
      </tr>
    </Table>
  </div>
);

export default UsuariosAdminPage;
