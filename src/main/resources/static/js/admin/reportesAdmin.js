import { reportesApi } from '../api/reportesApi.js';
import { authGuard } from '../utils/auth.js';
import { renderNavbar, showLoader } from '../utils/ui.js';

authGuard(['administrador']);
renderNavbar('/admin/reportes.html');

const ventasList = document.getElementById('ventas-fecha');
const productosList = document.getElementById('productos-top');

async function load() {
  showLoader('ventas-fecha');
  try {
    const ventas = await reportesApi.ventasPorFecha();
    const productos = await reportesApi.productosTop();
    ventasList.innerHTML = ventas.detalle?.map(v => `<li>${v.fecha}: S/ ${v.monto.toFixed(2)}</li>`).join('') || 'Sin datos';
    productosList.innerHTML = productos.map(p => `<li>${p.nombre} — ${p.cantidad} uds.</li>`).join('');
  } catch (err) {
    ventasList.innerHTML = `<div class="alert">${err.message}</div>`;
  }
}

load();
