import { pedidosApi } from '../api/pedidosApi.js';
import { authGuard } from '../utils/auth.js';
import { renderNavbar, showToast } from '../utils/ui.js';

authGuard(['vendedor']);
renderNavbar('/views/vendedor/pedido-detalle.html');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const detailEl = document.getElementById('detalle-vendedor');

async function loadDetalle() {
  if (!id) {
    detailEl.innerHTML = '<div class="alert">Pedido no encontrado</div>';
    return;
  }
  try {
    const pedido = await pedidosApi.detail(id);
    detailEl.innerHTML = `
      <div class="order-card">
        <div class="flex" style="justify-content: space-between; align-items:center;">
          <div>
            <h2>Pedido #${pedido.id}</h2>
            <div class="text-muted">${pedido.clienteNombre || ''}</div>
          </div>
          <div class="status-chip">${pedido.estado}</div>
        </div>
        <div class="grid" style="gap:0.5rem;">
          ${pedido.items.map(i => `<div class="flex" style="justify-content: space-between;"><span>${i.productoNombre} x${i.cantidad}</span><strong>S/ ${(i.precioUnitario * i.cantidad).toFixed(2)}</strong></div>`).join('')}
        </div>
        <div class="form-footer">
          <button class="button ghost" id="btn-preparado">Preparado</button>
          <button class="button" id="btn-retiro">Marcar retirado</button>
        </div>
        <div class="alert text-sm">Escanea el QR simulado o ingresa código para marcar retiro.</div>
      </div>`;

    document.getElementById('btn-preparado').onclick = () => changeEstado('PREPARADO');
    document.getElementById('btn-retiro').onclick = () => changeEstado('RETIRADO');
  } catch (err) {
    detailEl.innerHTML = `<div class="alert">${err.message}</div>`;
  }
}

async function changeEstado(estado) {
  await pedidosApi.updateEstado(id, estado);
  showToast('Estado actualizado');
  loadDetalle();
}

loadDetalle();
