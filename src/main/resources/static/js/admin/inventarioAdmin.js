import { apiGet, apiPut } from '../utils/httpClient.js';
import { authGuard } from '../utils/auth.js';
import { renderNavbar, showToast, showLoader } from '../utils/ui.js';

authGuard(['administrador']);
renderNavbar('/admin/inventario');

const container = document.getElementById('inventario-grid');

async function load() {
  showLoader('inventario-grid');
  try {
    const data = await apiGet('/inventario');
    container.innerHTML = data.map(item => `
      <article class="order-card" data-id="${item.id}">
        <div class="flex" style="justify-content: space-between; align-items:center;">
          <div>
            <h4>${item.productoNombre}</h4>
            <div class="text-muted">Stock actual: ${item.stock}</div>
          </div>
          <span class="badge ${item.stock < item.stockMinimo ? 'danger' : 'success'}">${item.stock < item.stockMinimo ? 'Bajo' : 'Ok'}</span>
        </div>
        <div class="form-row">
          <input type="number" class="input" placeholder="Ajuste" data-ajuste value="0">
          <button class="button" data-actualizar>Actualizar</button>
        </div>
      </article>`).join('');

    container.querySelectorAll('button[data-actualizar]').forEach(btn => {
      btn.onclick = async () => {
        const card = btn.closest('[data-id]');
        const delta = Number(card.querySelector('[data-ajuste]').value || 0);
        await apiPut(`/inventario/${card.dataset.id}`, { ajuste: delta });
        showToast('Inventario actualizado');
        load();
      };
    });
  } catch (err) {
    container.innerHTML = `<div class="alert">${err.message}</div>`;
  }
}

load();
