import { apiGet, apiPost, apiPut, apiDelete } from '../utils/httpClient.js';
import { authGuard } from '../utils/auth.js';
import { renderNavbar, showToast, openModal, showLoader } from '../utils/ui.js';

authGuard(['administrador']);
renderNavbar('/views/admin/proveedores.html');

const tableBody = document.getElementById('proveedores-table');
const form = document.getElementById('proveedor-form');

async function load() {
  showLoader('proveedores-table');
  try {
    const proveedores = await apiGet('/proveedores');
    tableBody.innerHTML = proveedores.map(p => `
      <tr>
        <td>${p.nombre}</td>
        <td>${p.contacto}</td>
        <td>${p.telefono}</td>
        <td class="table-actions">
          <button class="button ghost" data-edit='${JSON.stringify(p)}'>Editar</button>
          <button class="button danger" data-remove="${p.id}">Eliminar</button>
        </td>
      </tr>`).join('');

    tableBody.querySelectorAll('button[data-remove]').forEach(btn => {
      btn.onclick = () => openModal({
        title: 'Eliminar proveedor',
        content: '<p>Confirma la eliminación</p>',
        onConfirm: async () => { await apiDelete(`/proveedores/${btn.dataset.remove}`); load(); }
      });
    });

    tableBody.querySelectorAll('button[data-edit]').forEach(btn => {
      btn.onclick = () => {
        const p = JSON.parse(btn.dataset.edit);
        form.nombre.value = p.nombre;
        form.contacto.value = p.contacto;
        form.telefono.value = p.telefono;
        form.dataset.id = p.id;
      };
    });
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="4"><div class="alert">${err.message}</div></td></tr>`;
  }
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    if (form.dataset.id) {
      await apiPut(`/proveedores/${form.dataset.id}`, data);
      showToast('Proveedor actualizado');
    } else {
      await apiPost('/proveedores', data);
      showToast('Proveedor creado');
    }
    form.reset();
    form.dataset.id = '';
    load();
  } catch (err) {
    showToast(err.message, 'error');
  }
});

load();
