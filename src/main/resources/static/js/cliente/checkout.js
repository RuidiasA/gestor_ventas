import { getCart, totals, clearCart } from '../utils/cart.js';
import { pedidosApi } from '../api/pedidosApi.js';
import { renderNavbar, showToast } from '../utils/ui.js';
import { authGuard } from '../utils/auth.js';

authGuard(['cliente']);
renderNavbar('/cliente/checkout');

const form = document.getElementById('checkout-form');
const resume = document.getElementById('checkout-resumen');

function renderResumen() {
  const cart = getCart();
  if (!cart.length) {
    resume.innerHTML = '<p>No hay productos en el carrito.</p>';
    return;
  }
  const { subtotal, igv, total } = totals();
  resume.innerHTML = `
    <div class="cart-summary">
      <h3>Resumen</h3>
      ${cart.map(i => `<div class="flex" style="justify-content: space-between;"><span>${i.name} x${i.quantity}</span><strong>S/ ${(i.price * i.quantity).toFixed(2)}</strong></div>`).join('')}
      <hr>
      <div class="flex" style="justify-content: space-between;"><span>Subtotal</span><strong>S/ ${subtotal.toFixed(2)}</strong></div>
      <div class="flex" style="justify-content: space-between;"><span>IGV</span><strong>S/ ${igv.toFixed(2)}</strong></div>
      <div class="flex" style="justify-content: space-between;"><span>Total</span><strong>S/ ${total.toFixed(2)}</strong></div>
    </div>`;
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cart = getCart();
  if (!cart.length) {
    showToast('Agrega productos antes de pagar', 'error');
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  const payload = {
    tipoEntrega: data.tipoEntrega,
    notas: data.notas,
    direccion: data.direccion,
    items: cart.map((item) => ({ productoId: item.id, cantidad: item.quantity })),
  };
  try {
    await pedidosApi.create(payload);
    clearCart();
    showToast('Pedido creado con éxito');
    window.location.href = '/cliente/pedidos';
  } catch (err) {
    showToast(err.message, 'error');
  }
});

renderResumen();
