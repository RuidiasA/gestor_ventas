import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

const AuthLayout = () => (
  <div className={styles.wrapper}>
    <div className={styles.card}>
      <h2>Gestión de Ventas Saga Falabella</h2>
      <p>Inicia sesión para continuar</p>
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;
