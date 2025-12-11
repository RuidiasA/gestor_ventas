import { getAuth, clearAuth } from './auth.js';

export function renderNavbar(activePage = '') {
  const auth = getAuth();
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const roleLinks = {
    cliente: [
      { href: '/views/cliente/home.html', label: 'Inicio' },
      { href: '/views/cliente/catalogo.html', label: 'Catálogo' },
      { href: '/views/cliente/carrito.html', label: 'Carrito' },
      { href: '/views/cliente/pedidos.html', label: 'Mis pedidos' },
      { href: '/views/cliente/reclamos.html', label: 'Reclamos' },
    ],
    vendedor: [
      { href: '/views/vendedor/pedidos.html', label: 'Pedidos en tienda' },
    ],
    administrador: [
      { href: '/views/admin/dashboard.html', label: 'Dashboard' },
      { href: '/views/admin/productos.html', label: 'Productos' },
      { href: '/views/admin/proveedores.html', label: 'Proveedores' },
      { href: '/views/admin/inventario.html', label: 'Inventario' },
      { href: '/views/admin/usuarios.html', label: 'Usuarios' },
      { href: '/views/admin/reportes.html', label: 'Reportes' },
    ],
    soporte: [
      { href: '/views/soporte/reclamos.html', label: 'Reclamos' },
      { href: '/views/soporte/panel.html', label: 'Buscar pedido' },
    ],
  };

  const links = auth.role ? roleLinks[auth.role] || [] : [
    { href: '/views/index.html', label: 'Inicio' },
    { href: '/views/cliente/catalogo.html', label: 'Catálogo' },
    { href: '/views/login.html', label: 'Login' },
  ];

  nav.innerHTML = `
    <div class="navbar container">
      <a class="brand" href="/views/index.html">
        <span>Falabella</span>
        <small class="text-muted">Gestión de ventas</small>
      </a>
      <div class="nav-links" id="nav-links">
        ${links.map(link => `<a href="${link.href}" class="${activePage === link.href ? 'active' : ''}">${link.label}</a>`).join('')}
        ${auth.token ? `<button class="button ghost" id="logout-btn">Salir</button>` : '<a class="button" href="/views/login.html">Login</a>'}
      </div>
    </div>`;

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearAuth();
      window.location.href = '/views/login.html';
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
