import { productosApi } from '../api/productosApi.js';
import { authGuard } from '../utils/auth.js';
import { renderNavbar, openModal, showToast, showLoader } from '../utils/ui.js';

authGuard(['administrador']);
renderNavbar('/admin/productos');

const tableBody = document.getElementById('productos-table');
const form = document.getElementById('producto-form');

async function loadProductos() {
  showLoader('productos-table');
  try {
    const productos = await productosApi.list('');
    tableBody.innerHTML = productos.map(p => `
      <tr>
        <td>${p.nombre}</td>
        <td>S/ ${Number(p.precio).toFixed(2)}</td>
        <td>${p.stock}</td>
        <td>${p.proveedor?.nombre || '-'}</td>
        <td class="table-actions">
          <button class="button ghost" data-edit='${JSON.stringify(p)}'>Editar</button>
          <button class="button danger" data-remove="${p.id}">Eliminar</button>
        </td>
      </tr>`).join('');

    tableBody.querySelectorAll('button[data-remove]').forEach(btn => {
      btn.onclick = () => openModal({
        title: '¿Eliminar producto?',
        content: '<p>Esta acción no se puede deshacer</p>',
        onConfirm: async () => {
          await productosApi.remove(btn.dataset.remove);
          showToast('Producto eliminado');
          loadProductos();
        }
      });
    });

    tableBody.querySelectorAll('button[data-edit]').forEach(btn => {
      btn.onclick = () => {
        const data = JSON.parse(btn.dataset.edit);
        form.nombre.value = data.nombre;
        form.precio.value = data.precio;
        form.stock.value = data.stock;
        form.proveedorId.value = data.proveedorId || '';
        form.dataset.id = data.id;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    });
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="5"><div class="alert">${err.message}</div></td></tr>`;
  }
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(form).entries());
  payload.precio = Number(payload.precio);
  payload.stock = Number(payload.stock);
  try {
    if (form.dataset.id) {
      await productosApi.update(form.dataset.id, payload);
      showToast('Producto actualizado');
    } else {
      await productosApi.create(payload);
      showToast('Producto creado');
    }
    form.reset();
    form.dataset.id = '';
    loadProductos();
  } catch (err) {
    showToast(err.message, 'error');
  }
});

loadProductos();
