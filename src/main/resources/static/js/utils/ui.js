import { getAuth, clearAuth } from './auth.js';

export function renderNavbar(activePage = '') {
  const auth = getAuth();
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const roleLinks = {
    cliente: [
      { href: '/home', label: 'Inicio' },
      { href: '/cliente/catalogo', label: 'Catálogo' },
      { href: '/cliente/carrito', label: 'Carrito' },
      { href: '/cliente/pedidos', label: 'Mis pedidos' },
      { href: '/cliente/reclamos', label: 'Reclamos' },
    ],
    vendedor: [
      { href: '/vendedor/pedidos', label: 'Pedidos en tienda' },
    ],
    administrador: [
      { href: '/admin/dashboard', label: 'Dashboard' },
      { href: '/admin/productos', label: 'Productos' },
      { href: '/admin/proveedores', label: 'Proveedores' },
      { href: '/admin/inventario', label: 'Inventario' },
      { href: '/admin/usuarios', label: 'Usuarios' },
      { href: '/admin/reportes', label: 'Reportes' },
    ],
    soporte: [
      { href: '/soporte/reclamos', label: 'Reclamos' },
      { href: '/soporte/panel', label: 'Buscar pedido' },
    ],
  };

  const links = auth.role ? roleLinks[auth.role] || [] : [
    { href: '/', label: 'Inicio' },
    { href: '/cliente/catalogo', label: 'Catálogo' },
    { href: '/login', label: 'Login' },
  ];

  nav.innerHTML = `
    <div class="navbar container">
      <a class="brand" href="/">
        <span>Falabella</span>
        <small class="text-muted">Gestión de ventas</small>
      </a>
      <div class="nav-links" id="nav-links">
        ${links.map(link => `<a href="${link.href}" class="${activePage === link.href ? 'active' : ''}">${link.label}</a>`).join('')}
        ${auth.token ? `<button class="button ghost" id="logout-btn">Salir</button>` : '<a class="button" href="/login">Login</a>'}
      </div>
    </div>`;

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearAuth();
      window.location.href = '/login';
    });
  }
}

export function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<div>${message}</div>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

export function showLoader(targetId) {
  const el = document.getElementById(targetId);
  if (el) {
    el.innerHTML = '<div class="loader"></div>';
  }
}

export function openModal({ title, content, onConfirm }) {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = `
    <div class="modal">
      <header>
        <h3>${title}</h3>
        <button class="button ghost" id="modal-close">×</button>
      </header>
      <div class="modal-body">${content}</div>
      <footer>
        <button class="button secondary" id="modal-cancel">Cancelar</button>
        <button class="button" id="modal-confirm">Confirmar</button>
      </footer>
    </div>`;
  document.body.appendChild(backdrop);

  function close() { backdrop.remove(); }

  backdrop.querySelector('#modal-close').onclick = close;
  backdrop.querySelector('#modal-cancel').onclick = close;
  backdrop.querySelector('#modal-confirm').onclick = () => {
    onConfirm?.();
    close();
  };
}
