import { reclamosApi } from '../api/reclamosApi.js';
import { authGuard } from '../utils/auth.js';
import { renderNavbar, showToast } from '../utils/ui.js';

authGuard(['cliente']);
renderNavbar('/cliente/reclamos');

const listEl = document.getElementById('reclamos-list');
const form = document.getElementById('reclamo-form');
const pedidoSelect = document.getElementById('pedido-id');

async function loadReclamos() {
  try {
    const data = await reclamosApi.list('');
    listEl.innerHTML = data.map(r => `
      <article class="order-card">
        <div class="flex" style="justify-content: space-between; align-items:center;">
          <div>
            <h4>Reclamo #${r.id}</h4>
            <div class="text-muted">Pedido #${r.pedidoId}</div>
          </div>
          <div class="status-chip">${r.estado}</div>
        </div>
        <p>${r.descripcion}</p>
      </article>`).join('');
  } catch (err) {
    listEl.innerHTML = `<div class="alert">${err.message}</div>`;
  }
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(form).entries());
  payload.pedidoId = Number(payload.pedidoId);
  try {
    await reclamosApi.create(payload);
    showToast('Reclamo enviado');
    form.reset();
    loadReclamos();
  } catch (err) {
    showToast(err.message, 'error');
  }
});

if (pedidoSelect && !pedidoSelect.options.length) {
  const urlParams = new URLSearchParams(window.location.search);
  const pedidoId = urlParams.get('pedido');
  if (pedidoId) {
    pedidoSelect.innerHTML = `<option value="${pedidoId}" selected>Pedido #${pedidoId}</option>`;
  }
}

loadReclamos();
