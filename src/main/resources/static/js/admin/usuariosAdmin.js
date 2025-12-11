import { apiGet, apiPut } from '../utils/httpClient.js';
import { authGuard } from '../utils/auth.js';
import { renderNavbar, showToast, showLoader } from '../utils/ui.js';

authGuard(['administrador']);
renderNavbar('/admin/usuarios');

const tableBody = document.getElementById('usuarios-table');

async function load() {
  showLoader('usuarios-table');
  try {
    const usuarios = await apiGet('/usuarios');
    tableBody.innerHTML = usuarios.map(u => `
      <tr>
        <td>${u.nombre}</td>
        <td>${u.email}</td>
        <td>
          <select class="select" data-role="${u.id}">
            <option value="cliente" ${u.rol === 'cliente' ? 'selected' : ''}>Cliente</option>
            <option value="vendedor" ${u.rol === 'vendedor' ? 'selected' : ''}>Vendedor</option>
            <option value="administrador" ${u.rol === 'administrador' ? 'selected' : ''}>Administrador</option>
            <option value="soporte" ${u.rol === 'soporte' ? 'selected' : ''}>Soporte</option>
          </select>
        </td>
        <td><label><input type="checkbox" data-activo="${u.id}" ${u.activo ? 'checked' : ''}/> Activo</label></td>
      </tr>`).join('');

    tableBody.querySelectorAll('select[data-role]').forEach(sel => {
      sel.onchange = () => updateUser(sel.dataset.role, { rol: sel.value });
    });
    tableBody.querySelectorAll('input[data-activo]').forEach(chk => {
      chk.onchange = () => updateUser(chk.dataset.activo, { activo: chk.checked });
    });
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="4"><div class="alert">${err.message}</div></td></tr>`;
  }
}

async function updateUser(id, payload) {
  await apiPut(`/usuarios/${id}`, payload);
  showToast('Usuario actualizado');
}

load();
