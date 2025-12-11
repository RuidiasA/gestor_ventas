export function saveAuth(auth) {
  localStorage.setItem('auth', JSON.stringify(auth));
}

export function getAuth() {
  return JSON.parse(localStorage.getItem('auth') || '{}');
}

export function clearAuth() {
  localStorage.removeItem('auth');
}

export function isAuthenticated() {
  return Boolean(getAuth().token);
}

export function authGuard(roles = []) {
  const auth = getAuth();
  if (!auth.token) {
    window.location.href = '/login.html';
    return;
  }
  if (roles.length && !roles.includes(auth.role)) {
    alert('Acceso restringido para su rol.');
    window.location.href = '/';
  }
}

export function redirectByRole(role) {
  switch (role) {
    case 'cliente':
      window.location.href = '/cliente/home.html';
      break;
    case 'vendedor':
      window.location.href = '/vendedor/panel.html';
      break;
    case 'administrador':
      window.location.href = '/admin/dashboard.html';
      break;
    case 'soporte':
      window.location.href = '/soporte/panel.html';
      break;
    default:
      window.location.href = '/';
  }
}
