import { pedidosApi } from '../api/pedidosApi.js';
import { authGuard } from '../utils/auth.js';
import { renderNavbar } from '../utils/ui.js';

authGuard(['cliente']);
renderNavbar('/cliente/pedido-detalle.html');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const detailEl = document.getElementById('pedido-detalle');

async function loadDetail() {
  if (!id) {
    detailEl.innerHTML = '<div class="alert">Pedido no encontrado</div>';
    return;
  }
  try {
    const pedido = await pedidosApi.detail(id);
    detailEl.innerHTML = `
      <div class="order-card">
        <div class="flex" style="justify-content: space-between;">
          <div>
            <h2>Pedido #${pedido.id}</h2>
            <div class="text-muted">${new Date(pedido.fechaCreacion).toLocaleString()}</div>
          </div>
          <div class="status-chip">${pedido.estado}</div>
        </div>
        <h4>Productos</h4>
        <div class="grid" style="gap:0.75rem;">
          ${pedido.items.map(item => `<div class="flex" style="justify-content: space-between;"><span>${item.productoNombre} x${item.cantidad}</span><strong>S/ ${(item.precioUnitario * item.cantidad).toFixed(2)}</strong></div>`).join('')}
        </div>
        <h4>Línea de tiempo</h4>
        <ul class="timeline">
          ${pedido.historial?.map(event => `<li><strong>${event.estado}</strong><span class="text-muted">${new Date(event.fecha).toLocaleString()}</span></li>`).join('') || '<li>Sin eventos</li>'}
        </ul>
        <div class="flex" style="justify-content: space-between;">
          <div>Total pagado:</div>
          <strong>S/ ${Number(pedido.total).toFixed(2)}</strong>
        </div>
        <a class="button ghost" href="/cliente/reclamo-nuevo.html?pedido=${pedido.id}">Crear reclamo</a>
      </div>`;
  } catch (err) {
    detailEl.innerHTML = `<div class="alert">${err.message}</div>`;
  }
}

loadDetail();
