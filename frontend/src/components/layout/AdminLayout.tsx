import { Link, Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css';

const AdminLayout = () => (
  <div className={styles.layout}>
    <aside className={styles.sidebar}>
      <h3>Administrador</h3>
      <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/productos">Productos</Link>
        <Link to="/admin/proveedores">Proveedores</Link>
        <Link to="/admin/inventario">Inventario</Link>
        <Link to="/admin/usuarios">Usuarios</Link>
        <Link to="/admin/reportes">Reportes</Link>
      </nav>
    </aside>
    <section className={styles.content}>
      <Outlet />
    </section>
  </div>
);

export default AdminLayout;
