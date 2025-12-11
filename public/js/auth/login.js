import { login } from '../api/authApi.js';
import { saveAuth, redirectByRole } from '../utils/auth.js';
import { showToast } from '../utils/ui.js';

const form = document.getElementById('login-form');
const errorsEl = document.getElementById('login-errors');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorsEl.innerHTML = '';
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  try {
    const res = await login(payload);
    saveAuth({ token: res.token, role: res.role, user: res.user });
    showToast('Bienvenido de nuevo');
    redirectByRole(res.role);
  } catch (err) {
    errorsEl.innerHTML = `<div class="alert">${err.message}</div>`;
  }
});
