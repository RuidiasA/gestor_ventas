import { pedidosApi } from '../api/pedidosApi.js';
import { authGuard } from '../utils/auth.js';
import { renderNavbar, openModal, showToast, showLoader } from '../utils/ui.js';

authGuard(['vendedor']);
renderNavbar('/vendedor/pedidos');

const listEl = document.getElementById('pedidos-vendedor');

async function loadPedidos() {
  showLoader('pedidos-vendedor');
  try {
    const pedidos = await pedidosApi.list('?canal=tienda');
    listEl.innerHTML = pedidos.map(p => `
      <article class="order-card">
        <div class="flex" style="justify-content: space-between; align-items:center;">
          <div>
            <h4>Pedido #${p.id}</h4>
            <div class="text-muted">${p.clienteNombre || 'Cliente'}</div>
            <div class="status-chip">${p.estado}</div>
          </div>
          <div class="table-actions">
            <button class="button ghost" data-preparado="${p.id}">Preparado</button>
            <button class="button" data-retirar="${p.id}">Retirado</button>
            <a class="button secondary" href="/vendedor/pedido-detalle?id=${p.id}">Detalle</a>
          </div>
        </div>
      </article>`).join('');

    listEl.querySelectorAll('button[data-preparado]').forEach(btn => {
      btn.onclick = () => updateEstado(btn.dataset.preparado, 'PREPARADO');
    });
    listEl.querySelectorAll('button[data-retirar]').forEach(btn => {
      btn.onclick = () => abrirRetiro(btn.dataset.retirar);
    });
  } catch (err) {
    listEl.innerHTML = `<div class="alert">${err.message}</div>`;
  }
}

function abrirRetiro(id) {
  openModal({
    title: 'Confirmar retiro',
    content: '<p>Ingresa código de retiro simulado</p><input id="codigo-retiro" class="input" placeholder="0000" />',
    onConfirm: async () => {
      const codigo = document.getElementById('codigo-retiro').value || '0000';
      await pedidosApi.marcarRetirado(id, codigo);
      showToast('Pedido marcado como retirado');
      loadPedidos();
    }
  });
}

async function updateEstado(id, estado) {
  await pedidosApi.updateEstado(id, estado);
  showToast('Estado actualizado');
  loadPedidos();
}

loadPedidos();
