const API_BASE = window.__API_BASE || '/api/v1';

function withAuth(headers = {}) {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  if (auth.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }
  return headers;
}

async function handleResponse(response) {
  if (response.status === 401) {
    localStorage.removeItem('auth');
    window.location.href = '/login';
    throw new Error('Sesión expirada');
  }
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) {
    const message = data?.message || response.statusText;
    throw new Error(message);
  }
  return data;
}

export async function apiGet(url) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: withAuth(),
    credentials: 'include'
  });
  return handleResponse(res);
}

export async function apiPost(url, body) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'POST',
    headers: withAuth({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
    credentials: 'include'
  });
  return handleResponse(res);
}

export async function apiPut(url, body) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'PUT',
    headers: withAuth({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
    credentials: 'include'
  });
  return handleResponse(res);
}

export async function apiDelete(url) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'DELETE',
    headers: withAuth(),
    credentials: 'include'
  });
  return handleResponse(res);
}
