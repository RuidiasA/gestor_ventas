import { pedidosApi } from '../api/pedidosApi.js';
import { authGuard } from '../utils/auth.js';
import { renderNavbar, showLoader } from '../utils/ui.js';

authGuard(['cliente']);
renderNavbar('/views/cliente/pedidos.html');

const listEl = document.getElementById('pedidos-list');
const filterSelect = document.getElementById('filtro-estado');

async function loadPedidos() {
  showLoader('pedidos-list');
  const estado = filterSelect?.value;
  const query = estado ? `?estado=${estado}` : '';
  try {
    const pedidos = await pedidosApi.list(query);
    listEl.innerHTML = pedidos.map(p => `
      <article class="order-card">
        <div class="flex" style="justify-content: space-between; align-items:center;">
          <div>
            <h4>Pedido #${p.id}</h4>
            <div class="text-muted">${new Date(p.fechaCreacion).toLocaleString()}</div>
            <div class="status-chip">${p.estado}</div>
          </div>
          <div class="text-right">
            <div>Total: <strong>S/ ${Number(p.total).toFixed(2)}</strong></div>
            <div><a class="button ghost" href="/views/cliente/pedido-detalle.html?id=${p.id}">Ver detalle</a></div>
          </div>
        </div>
      </article>`).join('');
  } catch (err) {
    listEl.innerHTML = `<div class="alert">${err.message}</div>`;
  }
}

filterSelect?.addEventListener('change', loadPedidos);
loadPedidos();
