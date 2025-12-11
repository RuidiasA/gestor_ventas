import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import Button from '../ui/Button';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <Link to="/" className={styles.logo}>
            Saga Falabella
          </Link>
          <nav className={styles.links}>
            <Link to="/catalogo">Catálogo</Link>
            {user?.rol === 'CLIENTE' && (
              <>
                <Link to="/mis-pedidos">Mis pedidos</Link>
                <Link to="/reclamos">Reclamos</Link>
              </>
            )}
            {user?.rol === 'VENDEDOR' && <Link to="/vendedor/pedidos">Pedidos en tienda</Link>}
            {user?.rol === 'ADMINISTRADOR' && <Link to="/admin">Admin</Link>}
            {user?.rol === 'SOPORTE' && <Link to="/soporte/reclamos">Reclamos</Link>}
          </nav>
          <div className={styles.actions}>
            <Link to="/carrito">🛒 {items.length}</Link>
            {user ? (
              <Button variant="ghost" onClick={logout}>
                Cerrar sesión
              </Button>
            ) : (
              <Link to="/login">
                <Button>Ingresar</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
