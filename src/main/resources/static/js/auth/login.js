import { saveAuth, redirectByRole } from '../utils/auth.js';
import { showToast } from '../utils/ui.js';

const form = document.getElementById('login-form');
const errorsEl = document.getElementById('login-errors');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorsEl.innerHTML = '';

  const username = document.getElementById('username')?.value || '';
  const password = document.getElementById('password')?.value || '';

  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || 'Error al iniciar sesión');
    }

    saveAuth({ token: data.token, role: data.role, user: data.user });
    showToast('Bienvenido de nuevo');
    redirectByRole(data.role);
  } catch (err) {
    errorsEl.innerHTML = `<div class="alert">${err.message}</div>`;
  }
});
