import { productosApi } from '../api/productosApi.js';
import { addToCart } from '../utils/cart.js';
import { renderNavbar, showLoader, showToast } from '../utils/ui.js';

renderNavbar('/cliente/catalogo');

const productsGrid = document.getElementById('catalogo-grid');

async function loadProducts() {
  showLoader('catalogo-grid');
  try {
    const productos = await productosApi.list('');
    productsGrid.innerHTML = productos.map((p) => `
      <article class="product-card">
        <img src="${p.imagen || 'https://via.placeholder.com/400x240?text=Producto'}" alt="${p.nombre}">
        <div class="product-info">
          <div class="text-sm text-muted">${p.proveedor?.nombre || 'Proveedor'}</div>
          <h3>${p.nombre}</h3>
          <div class="product-price">S/ ${Number(p.precio).toFixed(2)}</div>
          <div class="text-xs text-muted">Stock: ${p.stock}</div>
          <div class="flex">
            <a class="button ghost" href="/cliente/producto?id=${p.id}">Ver detalle</a>
            <button class="button" data-id="${p.id}">Agregar</button>
          </div>
        </div>
      </article>`).join('');

    productsGrid.querySelectorAll('button[data-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const producto = productos.find((p) => String(p.id) === btn.dataset.id);
        addToCart({ id: producto.id, name: producto.nombre, price: producto.precio, imagen: producto.imagen });
        showToast('Producto agregado al carrito');
      });
    });
  } catch (err) {
    productsGrid.innerHTML = `<div class="alert">${err.message}</div>`;
  }
}

loadProducts();
