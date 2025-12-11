import { register } from '../api/authApi.js';
import { showToast } from '../utils/ui.js';

const form = document.getElementById('register-form');
const errorsEl = document.getElementById('register-errors');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorsEl.innerHTML = '';
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  try {
    await register(payload);
    showToast('Cuenta creada, ingresa con tus credenciales');
    window.location.href = '/login.html';
  } catch (err) {
    errorsEl.innerHTML = `<div class="alert">${err.message}</div>`;
  }
});
