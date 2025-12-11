import { getCart, updateQuantity, removeFromCart, totals, clearCart } from '../utils/cart.js';
import { renderNavbar, showToast } from '../utils/ui.js';

renderNavbar('/cliente/carrito');

const cartList = document.getElementById('cart-items');
const summary = document.getElementById('cart-summary');

function renderCart() {
  const cart = getCart();
  if (!cart.length) {
    cartList.innerHTML = '<p>Tu carrito está vacío.</p>';
    summary.innerHTML = '';
    return;
  }

  cartList.innerHTML = cart.map(item => `
    <div class="order-card">
      <div class="flex" style="justify-content: space-between; align-items: center;">
        <div>
          <h4>${item.name}</h4>
          <div class="text-muted">S/ ${Number(item.price).toFixed(2)}</div>
        </div>
        <div class="flex" style="align-items: center;">
          <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="input" style="width:90px;">
          <button class="button ghost" data-remove="${item.id}">Eliminar</button>
        </div>
      </div>
    </div>`).join('');

  cartList.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('change', () => {
      const qty = parseInt(input.value, 10) || 1;
      updateQuantity(Number(input.dataset.id), qty);
      renderCart();
    });
  });

  cartList.querySelectorAll('button[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(Number(btn.dataset.remove));
      renderCart();
      showToast('Producto eliminado');
    });
  });

  const { subtotal, igv, total } = totals();
  summary.innerHTML = `
    <div class="cart-summary">
      <div class="flex" style="justify-content: space-between;"><span>Subtotal</span><strong>S/ ${subtotal.toFixed(2)}</strong></div>
      <div class="flex" style="justify-content: space-between;"><span>IGV (18%)</span><strong>S/ ${igv.toFixed(2)}</strong></div>
      <div class="flex" style="justify-content: space-between;"><span>Total</span><strong>S/ ${total.toFixed(2)}</strong></div>
      <a class="button" href="/cliente/checkout">Proceder al pago</a>
      <button class="button secondary" id="clear-cart">Vaciar carrito</button>
    </div>`;

  document.getElementById('clear-cart').onclick = () => {
    clearCart();
    renderCart();
  };
}

renderCart();
