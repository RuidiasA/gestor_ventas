import { reclamosApi } from '../api/reclamosApi.js';
import { authGuard } from '../utils/auth.js';
import { renderNavbar, showToast, showLoader } from '../utils/ui.js';

authGuard(['soporte']);
renderNavbar('/soporte/reclamos.html');

const listEl = document.getElementById('reclamos-soporte');
const filtroEstado = document.getElementById('filtro-estado');

async function load() {
  showLoader('reclamos-soporte');
  const estado = filtroEstado?.value;
  const query = estado ? `?estado=${estado}` : '';
  try {
    const reclamos = await reclamosApi.list(query);
    listEl.innerHTML = reclamos.map(r => `
      <article class="order-card">
        <div class="flex" style="justify-content: space-between; align-items:center;">
          <div>
            <h4>Reclamo #${r.id}</h4>
            <div class="text-muted">Cliente: ${r.clienteNombre || ''}</div>
            <div class="text-muted">Pedido #${r.pedidoId}</div>
          </div>
          <div class="table-actions">
            <select class="select" data-id="${r.id}">
              <option value="PENDIENTE" ${r.estado === 'PENDIENTE' ? 'selected' : ''}>Pendiente</option>
              <option value="REVISADO" ${r.estado === 'REVISADO' ? 'selected' : ''}>Revisado</option>
              <option value="RESUELTO" ${r.estado === 'RESUELTO' ? 'selected' : ''}>Resuelto</option>
            </select>
            <a class="button secondary" href="/soporte/reclamo-detalle.html?id=${r.id}">Detalle</a>
          </div>
        </div>
        <p>${r.descripcion}</p>
      </article>`).join('');

    listEl.querySelectorAll('select[data-id]').forEach(sel => {
      sel.onchange = async () => {
        await reclamosApi.updateEstado(sel.dataset.id, sel.value);
        showToast('Estado actualizado');
      };
    });
  } catch (err) {
    listEl.innerHTML = `<div class="alert">${err.message}</div>`;
  }
}

filtroEstado?.addEventListener('change', load);
load();
