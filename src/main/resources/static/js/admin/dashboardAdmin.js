import { authGuard } from '../utils/auth.js';
import { renderNavbar, showLoader } from '../utils/ui.js';
import { reportesApi } from '../api/reportesApi.js';

authGuard(['administrador']);
renderNavbar('/admin/dashboard.html');

const kpiVentas = document.getElementById('kpi-ventas');
const kpiReclamos = document.getElementById('kpi-reclamos');
const topProductos = document.getElementById('top-productos');

async function loadDashboard() {
  showLoader('top-productos');
  try {
    const [ventas, productos, reclamos] = await Promise.all([
      reportesApi.ventasPorFecha(),
      reportesApi.productosTop(),
      reportesApi.reclamosAbiertos(),
    ]);
    kpiVentas.textContent = `S/ ${ventas.totalMes?.toFixed(2) || '0.00'}`;
    kpiReclamos.textContent = reclamos.total || 0;
    topProductos.innerHTML = productos.map(p => `<li>${p.nombre} — ${p.cantidad} uds.</li>`).join('');
  } catch (err) {
    topProductos.innerHTML = `<div class="alert">${err.message}</div>`;
  }
}

loadDashboard();
