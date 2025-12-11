import { Route, Routes } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import AuthLayout from '../../components/layout/AuthLayout';
import AdminLayout from '../../components/layout/AdminLayout';
import PrivateRoute from './PrivateRoute';
import RoleGuard from './RoleGuard';
import LoginPage from '../../pages/auth/LoginPage';
import RegisterPage from '../../pages/auth/RegisterPage';
import HomePage from '../../pages/cliente/HomePage';
import CatalogoPage from '../../pages/cliente/CatalogoPage';
import DetalleProductoPage from '../../pages/cliente/DetalleProductoPage';
import CarritoPage from '../../pages/cliente/CarritoPage';
import CheckoutPage from '../../pages/cliente/CheckoutPage';
import MisPedidosPage from '../../pages/cliente/MisPedidosPage';
import DetallePedidoPage from '../../pages/cliente/DetallePedidoPage';
import ReclamosPage from '../../pages/cliente/ReclamosPage';
import CrearReclamoPage from '../../pages/cliente/CrearReclamoPage';
import PanelVendedorPage from '../../pages/vendedor/PanelVendedorPage';
import PedidosEnTiendaPage from '../../pages/vendedor/PedidosEnTiendaPage';
import PedidoDetalleVendedorPage from '../../pages/vendedor/PedidoDetalleVendedorPage';
import DashboardAdminPage from '../../pages/admin/DashboardAdminPage';
import ProductosAdminPage from '../../pages/admin/ProductosAdminPage';
import ProveedoresAdminPage from '../../pages/admin/ProveedoresAdminPage';
import InventarioAdminPage from '../../pages/admin/InventarioAdminPage';
import UsuariosAdminPage from '../../pages/admin/UsuariosAdminPage';
import ReportesAdminPage from '../../pages/admin/ReportesAdminPage';
import PanelSoportePage from '../../pages/soporte/PanelSoportePage';
import ReclamosSoportePage from '../../pages/soporte/ReclamosSoportePage';

const AppRouter = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
    </Route>

    <Route element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="catalogo" element={<CatalogoPage />} />
      <Route path="producto/:id" element={<DetalleProductoPage />} />
      <Route path="carrito" element={<CarritoPage />} />
      <Route path="checkout" element={<CheckoutPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="mis-pedidos" element={<MisPedidosPage />} />
        <Route path="mis-pedidos/:id" element={<DetallePedidoPage />} />
        <Route path="reclamos" element={<ReclamosPage />} />
        <Route path="reclamos/crear" element={<CrearReclamoPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<RoleGuard roles={['VENDEDOR']} />}>
          <Route path="vendedor" element={<PanelVendedorPage />} />
          <Route path="vendedor/pedidos" element={<PedidosEnTiendaPage />} />
          <Route path="vendedor/pedidos/:id" element={<PedidoDetalleVendedorPage />} />
        </Route>
        <Route element={<RoleGuard roles={['ADMINISTRADOR']} />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<DashboardAdminPage />} />
            <Route path="productos" element={<ProductosAdminPage />} />
            <Route path="proveedores" element={<ProveedoresAdminPage />} />
            <Route path="inventario" element={<InventarioAdminPage />} />
            <Route path="usuarios" element={<UsuariosAdminPage />} />
            <Route path="reportes" element={<ReportesAdminPage />} />
          </Route>
        </Route>
        <Route element={<RoleGuard roles={['SOPORTE']} />}>
          <Route path="soporte" element={<PanelSoportePage />} />
          <Route path="soporte/reclamos" element={<ReclamosSoportePage />} />
        </Route>
      </Route>
    </Route>
  </Routes>
);

export default AppRouter;
